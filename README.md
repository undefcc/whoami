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
