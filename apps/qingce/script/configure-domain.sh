#!/bin/bash
# Point q.caelus.cc at the web-qingce container through Nginx Proxy Manager.
set -eu

DOMAIN="${DOMAIN:-q.caelus.cc}"
UPSTREAM="${UPSTREAM:-web-qingce}"
UPSTREAM_PORT="${UPSTREAM_PORT:-80}"
PUBLIC_IP="${ECS_PUBLIC_IP:-}"

if [ -z "$PUBLIC_IP" ]; then
  echo "ECS_PUBLIC_IP is empty"
  exit 1
fi

NPM="$(docker ps --format '{{.Names}}' | grep -E 'nginx-proxy-manager|proxy-manager' | head -n 1 || true)"
if [ -z "$NPM" ]; then
  echo "Nginx Proxy Manager container not found"
  exit 1
fi
echo "npm container: $NPM"

docker network connect compose_default "$UPSTREAM" 2>/dev/null || true
if ! docker exec "$NPM" getent hosts "$UPSTREAM" >/dev/null 2>&1; then
  echo "NPM cannot resolve $UPSTREAM on compose_default"
  docker network inspect compose_default --format '{{range .Containers}}{{.Name}} {{end}}'
  exit 1
fi

DATA="$(docker inspect -f '{{range .Mounts}}{{if eq .Destination "/data"}}{{.Source}}{{end}}{{end}}' "$NPM")"
DB="$DATA/database.sqlite"
if [ ! -f "$DB" ]; then
  echo "NPM database not found at $DB"
  exit 1
fi

python3 - "$DB" "$DOMAIN" "$UPSTREAM" "$UPSTREAM_PORT" "$DATA" <<'PY'
import json, sqlite3, sys
from datetime import datetime, timezone

db, domain, upstream, port, data = sys.argv[1:]
port = int(port)
con = sqlite3.connect(db, timeout=30)
con.row_factory = sqlite3.Row

def parse_domains(raw):
    if not raw:
        return []
    try:
        value = json.loads(raw)
    except json.JSONDecodeError:
        return [str(raw)]
    return value if isinstance(value, list) else [str(value)]

cols = [row[1] for row in con.execute("PRAGMA table_info(proxy_host)")]
rows = list(con.execute("SELECT * FROM proxy_host WHERE is_deleted = 0"))
found = None
for row in rows:
    if domain in parse_domains(row["domain_names"]):
        found = row
        break

if found is None:
    if not rows:
        sys.exit("proxy_host has no row to copy")
    base = dict(rows[0])
    base.pop("id", None)
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
    base["domain_names"] = json.dumps([domain])
    base["forward_scheme"] = "http"
    base["forward_host"] = upstream
    base["forward_port"] = port
    base["certificate_id"] = 0
    base["ssl_forced"] = 0
    base["enabled"] = 1
    base["is_deleted"] = 0
    if "advanced_config" in base:
        base["advanced_config"] = ""
    if "meta" in base:
        base["meta"] = json.dumps({"letsencrypt_agree": True, "dns_challenge": False})
    if "locations" in base:
        base["locations"] = "[]"
    if "access_list_id" in base:
        base["access_list_id"] = 0
    if "caching_enabled" in base:
        base["caching_enabled"] = 0
    if "block_exploits" in base:
        base["block_exploits"] = 1
    if "allow_websocket_upgrade" in base:
        base["allow_websocket_upgrade"] = 0
    if "http2_support" in base:
        base["http2_support"] = 1
    if "hsts_enabled" in base:
        base["hsts_enabled"] = 0
    if "hsts_subdomains" in base:
        base["hsts_subdomains"] = 0
    if "created_on" in base:
        base["created_on"] = now
    if "modified_on" in base:
        base["modified_on"] = now
    names = list(base)
    con.execute(
        f"INSERT INTO proxy_host ({', '.join(names)}) VALUES ({', '.join('?' for _ in names)})",
        [base[name] for name in names],
    )
    con.commit()
    host_id = con.execute("SELECT last_insert_rowid()").fetchone()[0]
    print(f"created proxy_host {host_id}")
else:
    host_id = found["id"]
    con.execute(
        "UPDATE proxy_host SET forward_scheme = ?, forward_host = ?, forward_port = ?, enabled = 1, is_deleted = 0, modified_on = ? WHERE id = ?",
        ("http", upstream, port, datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S"), host_id),
    )
    con.commit()
    print(f"updated proxy_host {host_id}")

conf_path = f"{data}/nginx/proxy_host/{host_id}.conf"
open("/tmp/qingce-proxy-id", "w").write(str(host_id))
open("/tmp/qingce-proxy-conf", "w").write(conf_path)
print(f"conf {conf_path}")
PY

HOST_ID="$(cat /tmp/qingce-proxy-id)"
CONF="$(cat /tmp/qingce-proxy-conf)"
mkdir -p "$(dirname "$CONF")" "$DATA/logs" "$DATA/nginx/custom" "$DATA/letsencrypt-acme-challenge/.well-known/acme-challenge"
touch "$DATA/nginx/custom/server_proxy.conf"

write_conf() {
  local cert_id="${1:-0}"
  {
    echo "server {"
    echo "  set \$forward_scheme http;"
    echo "  set \$server \"${UPSTREAM}\";"
    echo "  set \$port ${UPSTREAM_PORT};"
    echo "  listen 80;"
    echo "  listen [::]:80;"
    if [ "$cert_id" != "0" ]; then
      echo "  listen 443 ssl;"
      echo "  listen [::]:443 ssl;"
      echo "  http2 on;"
    fi
    echo "  server_name ${DOMAIN};"
    echo "  access_log /data/logs/proxy-host-${HOST_ID}_access.log proxy;"
    echo "  error_log /data/logs/proxy-host-${HOST_ID}_error.log warn;"
    echo "  include conf.d/include/letsencrypt-acme-challenge.conf;"
    if [ "$cert_id" != "0" ]; then
      echo "  include conf.d/include/ssl-ciphers.conf;"
      echo "  include conf.d/include/ssl-cache.conf;"
      echo "  ssl_certificate /etc/letsencrypt/live/npm-${cert_id}/fullchain.pem;"
      echo "  ssl_certificate_key /etc/letsencrypt/live/npm-${cert_id}/privkey.pem;"
      echo "  set \$force_https \"\";"
      echo "  if (\$scheme = \"http\") { set \$force_https \"1\"; }"
      echo "  if (\$request_uri ~* \"^/.well-known/acme-challenge/\") { set \$force_https \"0\"; }"
      echo "  if (\$force_https = \"1\") { return 301 https://\$host\$request_uri; }"
    fi
    echo "  location / {"
    echo "    include conf.d/include/proxy.conf;"
    echo "  }"
    echo "  include /data/nginx/custom/server_proxy[.]conf;"
    echo "}"
  } > "$CONF"
}

write_conf 0
docker exec "$NPM" nginx -t
docker exec "$NPM" nginx -s reload

for _ in $(seq 1 20); do
  if curl -fsS -H "Host: ${DOMAIN}" http://127.0.0.1/ | grep -q '青测'; then
    echo "local proxy ok"
    break
  fi
  sleep 1
done
curl -fsS -H "Host: ${DOMAIN}" http://127.0.0.1/ | grep -q '青测'

ensure_dns() {
  current="$(dig +short "$DOMAIN" A @dns11.hichina.com | head -n 1 || true)"
  if [ "$current" = "$PUBLIC_IP" ]; then
    echo "dns already $PUBLIC_IP"
    return 0
  fi

  cli=""
  if command -v aliyun >/dev/null 2>&1; then
    cli="$(command -v aliyun)"
  else
    curl -fsSL --max-time 30 https://aliyuncli.alicdn.com/aliyun-cli-linux-latest-amd64.tgz -o /tmp/aliyun-cli.tgz || true
    if [ -f /tmp/aliyun-cli.tgz ]; then
      tar -xzf /tmp/aliyun-cli.tgz -C /tmp
      cli="$(find /tmp -maxdepth 2 -type f -name aliyun | head -n 1)"
    fi
  fi
  if [ -z "$cli" ]; then
    echo "DNS_RECORD_REQUIRED ${DOMAIN} A ${PUBLIC_IP}"
    return 1
  fi

  profile=""
  role="$(curl -fsS --max-time 2 http://100.100.100.200/latest/meta-data/ram/security-credentials/ || true)"
  if [ -n "$role" ] && ! printf '%s' "$role" | grep -q '<'; then
    role_name="$(printf '%s\n' "$role" | head -n 1)"
    "$cli" configure set --profile ecsdns --mode EcsRamRole --ram-role-name "$role_name" --region cn-hangzhou >/dev/null
    profile="ecsdns"
    echo "using ecs ram role"
  elif [ ! -f /root/.aliyun/config.json ]; then
    echo "DNS_RECORD_REQUIRED ${DOMAIN} A ${PUBLIC_IP}"
    return 1
  fi

  if ! dns_cli DescribeDomainRecords --DomainName caelus.cc --RRKeyWord q --Type A > /tmp/qingce-dns.json; then
    echo "DNS_RECORD_REQUIRED ${DOMAIN} A ${PUBLIC_IP}"
    return 1
  fi

  action="$(python3 - /tmp/qingce-dns.json "$PUBLIC_IP" <<'PY'
import json, sys
doc = json.load(open(sys.argv[1]))
ip = sys.argv[2]
records = doc.get("DomainRecords", {}).get("Record", [])
match = [item for item in records if item.get("RR") == "q" and item.get("Type") == "A"]
if match and match[0].get("Value") == ip:
    print("keep")
elif match:
    print(match[0]["RecordId"])
else:
    print("add")
PY
)"
  if [ "$action" = "keep" ]; then
    echo "dns record already correct"
  elif [ "$action" = "add" ]; then
    dns_cli AddDomainRecord --DomainName caelus.cc --RR q --Type A --Value "$PUBLIC_IP" >/tmp/qingce-dns-write.json
    echo "dns record added"
  else
    dns_cli UpdateDomainRecord --RecordId "$action" --RR q --Type A --Value "$PUBLIC_IP" >/tmp/qingce-dns-write.json
    echo "dns record updated"
  fi
}

dns_cli() {
  if [ -n "$profile" ]; then
    "$cli" --profile "$profile" alidns "$@"
  else
    "$cli" alidns "$@"
  fi
}

if ! ensure_dns; then
  echo "proxy is ready; public dns is not"
  exit 0
fi

for _ in $(seq 1 15); do
  resolved="$(dig +short "$DOMAIN" A @dns11.hichina.com | head -n 1 || true)"
  if [ "$resolved" = "$PUBLIC_IP" ]; then
    break
  fi
  sleep 2
done
if [ "$resolved" != "$PUBLIC_IP" ]; then
  echo "authoritative dns is $resolved, expected $PUBLIC_IP"
  exit 0
fi
echo "authoritative dns ok"

if ! docker exec "$NPM" certbot --version >/dev/null 2>&1; then
  echo "CERT_SKIPPED certbot missing"
  exit 0
fi

docker exec "$NPM" certbot certonly \
  --webroot -w /data/letsencrypt-acme-challenge \
  --non-interactive --agree-tos --register-unsafely-without-email \
  --keep-until-expiring \
  --cert-name "npm-qingce" \
  -d "$DOMAIN"

CERT_DIR="/etc/letsencrypt/live/npm-qingce"
docker exec "$NPM" test -f "$CERT_DIR/fullchain.pem"

python3 - "$DB" "$DOMAIN" "$CERT_DIR" <<'PY'
import json, sqlite3, sys
from datetime import datetime, timezone

db, domain, cert_dir = sys.argv[1:]
con = sqlite3.connect(db, timeout=30)
con.row_factory = sqlite3.Row
cols = [row[1] for row in con.execute("PRAGMA table_info(certificate)")]
now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
existing = list(con.execute("SELECT * FROM certificate WHERE is_deleted = 0"))
found = None
for row in existing:
    raw = row["domain_names"]
    try:
        names = json.loads(raw) if raw else []
    except json.JSONDecodeError:
        names = [raw]
    if domain in names and row["provider"] == "letsencrypt":
        found = row
        break
if found is None:
    if not existing:
        sys.exit("certificate table is empty")
    base = dict(existing[0])
    base.pop("id", None)
    base["provider"] = "letsencrypt"
    base["nice_name"] = domain
    base["domain_names"] = json.dumps([domain])
    base["is_deleted"] = 0
    if "owner_user_id" in base:
        base["owner_user_id"] = base.get("owner_user_id") or 1
    if "expires_on" in base:
        base["expires_on"] = now
    if "created_on" in base:
        base["created_on"] = now
    if "modified_on" in base:
        base["modified_on"] = now
    if "meta" in base:
        base["meta"] = json.dumps({"letsencrypt_agree": True, "dns_challenge": False})
    names = list(base)
    con.execute(
        f"INSERT INTO certificate ({', '.join(names)}) VALUES ({', '.join('?' for _ in names)})",
        [base[name] for name in names],
    )
    con.commit()
    cert_id = con.execute("SELECT last_insert_rowid()").fetchone()[0]
else:
    cert_id = found["id"]
open("/tmp/qingce-cert-id", "w").write(str(cert_id))
print(f"certificate {cert_id}")
PY

CERT_ID="$(cat /tmp/qingce-cert-id)"
docker exec "$NPM" sh -c "mkdir -p /etc/letsencrypt/live/npm-${CERT_ID} && ln -sfn ../npm-qingce/fullchain.pem /etc/letsencrypt/live/npm-${CERT_ID}/fullchain.pem && ln -sfn ../npm-qingce/privkey.pem /etc/letsencrypt/live/npm-${CERT_ID}/privkey.pem && ln -sfn ../npm-qingce/chain.pem /etc/letsencrypt/live/npm-${CERT_ID}/chain.pem"
python3 - "$DB" "$HOST_ID" "$CERT_ID" <<'PY'
import sqlite3, sys
db, host_id, cert_id = sys.argv[1:]
con = sqlite3.connect(db, timeout=30)
con.execute(
    "UPDATE proxy_host SET certificate_id = ?, ssl_forced = 1 WHERE id = ?",
    (int(cert_id), int(host_id)),
)
con.commit()
PY

write_conf "$CERT_ID"
if ! docker exec "$NPM" nginx -t; then
  echo "ssl config rejected, falling back to http"
  python3 - "$DB" "$HOST_ID" <<'PY'
import sqlite3, sys
con = sqlite3.connect(sys.argv[1], timeout=30)
con.execute("UPDATE proxy_host SET certificate_id = 0, ssl_forced = 0 WHERE id = ?", (int(sys.argv[2]),))
con.commit()
PY
  write_conf 0
  docker exec "$NPM" nginx -t
  docker exec "$NPM" nginx -s reload
  exit 0
fi
docker exec "$NPM" nginx -s reload
echo "https proxy reloaded"
