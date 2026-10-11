# whoami

个人项目 monorepo。相关应用都放在 `apps/` 下，共用这一套 GitHub Secrets 和 ECS 部署，不必每做一个产品再开仓库。

```text
apps/
  qingce/    青测：性格 / 旅行 / 职业测评，密钥解锁
```

## 本地

```bash
npm install
npm run dev            # 默认启动青测
npm run dev:qingce
npm test
npm run build
npm run gen-key -- ALL 5
```

青测开发地址默认 `http://localhost:5173`。

## 加一个新应用

1. 在 `apps/` 下新建目录，自带 `package.json`（npm workspaces 会自动收进去）。
2. 根目录加对应脚本，例如 `"dev:foo": "npm run dev -w foo"`。
3. 写 `apps/foo/script/Dockerfile`（静态站可抄青测的 nginx）。
4. 在 `.github/workflows/deploy.yml` 的 `options` 和 `case` 里登记应用名、镜像名、宿主机端口。

共享代码以后再加 `packages/`。

## 青测

性格、周末去哪、旅行目的地、职业气质、恋爱沟通。Vite + React，付费题用密钥解锁，方便在闲鱼或小红书发售。

| 测评 | 是否免费 |
| --- | --- |
| 性格色彩 | 免费 |
| 周末去哪儿 | 免费 |
| 旅行目的地 | 密钥 |
| 职业气质 | 密钥 |
| 恋爱沟通 | 密钥 |

卖密钥：打开 `/studio`，口令默认 `qingce-studio`。范围 `ALL` / `TRAVEL` / `CAREER` / `LOVE`。买家在「解锁」页粘贴，记录在对方浏览器本地。

```bash
npm run gen-key -- ALL 5
cp apps/qingce/.env.example apps/qingce/.env
```

- `VITE_KEY_SECRET`：盐。改了之后旧钥匙全部失效。
- `VITE_STUDIO_PASSWORD`：工作室口令。

加新题：`apps/qingce/src/data/`，再挂到 `index.ts`。

## 部署到阿里云 ECS

和 [intro](https://github.com/undefcc/intro) 同一条链路：Actions 构建 → ACR → SSH 到 ECS，加入 `compose_default` 给 NPM 反代。推 `main` 或手动跑 workflow，可选择 `apps/` 里的应用。

| 项目 | 容器名 | 端口 |
| --- | --- | --- |
| intro（独立仓库） | `web-intro` | 3000 / 3001 |
| 青测 | `web-qingce` | 3002 |

whoami 是 public，标准托管 runner 不扣 2000 分钟。Secrets 在本仓库加一次，后面新应用共用：

- `ALIYUN_DOCKER_USERNAME`
- `ALIYUN_DOCKER_PASSWORD`
- `ECS_HOST`
- `ECS_USERNAME`
- `ECS_SSH_PRIVATE_KEY`
- `ECS_SSH_FINGERPRINT`

可选：`VITE_KEY_SECRET`、`VITE_STUDIO_PASSWORD`

NPM：Forward `web-qingce:80`。没域名用 `http://<ECS公网IP>:3002`。

```bash
npm ci
npm run build:qingce
docker build -t web-qingce:local -f apps/qingce/script/Dockerfile .
docker run --rm -p 3002:80 web-qingce:local
```
