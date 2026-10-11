# 青测

干净清新的测评站：性格、周末去哪、旅行目的地、职业气质、恋爱沟通。  
用 **Vite + React** 做本地开发，启动比 Next.js SSR 快一截。付费测评先做成 **密钥解锁**，方便在闲鱼或小红书私下发售。

## 本地启动

```bash
npm install
npm run dev
```

浏览器打开终端里提示的本地地址即可，默认 `http://localhost:5173`。

```bash
npm test
npm run build
```

## 密钥怎么卖

1. 打开 `/studio`，口令默认 `qingce-studio`。
2. 选择范围后生成密钥，复制发给买家。
   - `ALL`：全部付费测评
   - `TRAVEL` / `CAREER` / `LOVE`：单题
3. 买家在「解锁」页或付费测评封面粘贴密钥。记录存在对方浏览器本地。

也可以用命令行：

```bash
npm run gen-key -- ALL 5
npm run gen-key -- TRAVEL 1
```

上线前请改 `.env`：

```bash
cp .env.example .env
```

- `VITE_KEY_SECRET`：生成和校验用的盐。**改了之后旧钥匙全部失效。**
- `VITE_STUDIO_PASSWORD`：工作室口令。

密钥算法在前端，能挡住随手乱填，挡不住拆包。这是为了先能卖，不是支付系统。以后要收款，可以把同一套范围接到微信/支付宝，再发同一格式的钥匙。

## 现在有的测评

| 测评 | 是否免费 |
| --- | --- |
| 性格色彩 | 免费 |
| 周末去哪儿 | 免费 |
| 旅行目的地 | 密钥 |
| 职业气质 | 密钥 |
| 恋爱沟通 | 密钥 |

加新题：在 `src/data/` 按现有结构写一份，再挂到 `src/data/index.ts`。

## 部署到阿里云 ECS

流程对齐 [intro](https://github.com/undefcc/intro)：GitHub Actions 构建 → 推阿里云 ACR → SSH 到 ECS 跑 Docker，并加入 `compose_default` 给 Nginx Proxy Manager 反代。

青测是 Vite 静态站，镜像里是 nginx，不占 intro 的 3000/3001。

| 项目 | 容器名 | 宿主机端口 |
| --- | --- | --- |
| intro | `web-intro` | 3000（+ 3001） |
| 青测 | `web-qingce` | 3002 |

推到 `main` 或在 Actions 里手动跑 `Build Vite and Deploy to Aliyun ECS`。

### 1. Secrets 只用配一次（Organization）

GitHub **个人仓库之间不能共用** Actions Secrets，intro 的钥匙 whoami 读不到，这不是漏配。要共用，需要一个 Organization：

1. GitHub 新建 Organization（例如 `cc4ever`）
2. 把 `intro`、`whoami`、以后的项目 Transfer 进去
3. Organization → Settings → Secrets and variables → Actions → New organization secret  
   Repository access 选 **All repositories**
4. 配这些名字（和 intro 里的一样即可）：

- `ALIYUN_DOCKER_USERNAME`
- `ALIYUN_DOCKER_PASSWORD`
- `ECS_HOST`
- `ECS_USERNAME`
- `ECS_SSH_PRIVATE_KEY`
- `ECS_SSH_FINGERPRINT`

可选：`VITE_KEY_SECRET`、`VITE_STUDIO_PASSWORD`

之后新仓库不用再加 Secrets。本仓库的 workflow 已不再依赖 intro 那个 `cc` Environment。

还没建 Organization 时，只能在本仓库 Settings → Secrets 里先加一份，才能部署这一次。

ACR 仍用：`crpi-zpvonb2nha7j0qgy.cn-shenzhen.personal.cr.aliyuncs.com/cc4ever/web-qingce`。

### 2. Nginx Proxy Manager

部署成功后，在 NPM 里加一条 Proxy Host：

- Forward Hostname / IP：`web-qingce`
- Forward Port：`80`
- 域名自己定，例如 `qingce.ccoding.cn`

没配域名时，可以直接用 `http://<ECS公网IP>:3002` 验。

### 3. 本机先看镜像

```bash
npm ci
npm run build
docker build -t web-qingce:local -f script/Dockerfile .
docker run --rm -p 3002:80 web-qingce:local
```

