import { KEY_SCOPES, generateKey, isKeyScope, type KeyScope } from '../src/lib/keys.ts'

const secret = process.env.VITE_KEY_SECRET || 'qingce-change-me'
const scopeArg = (process.argv[2] || 'ALL').toUpperCase()
const count = Number(process.argv[3] || 1)

if (!isKeyScope(scopeArg)) {
  console.error(`范围只能是：${KEY_SCOPES.join(', ')}`)
  process.exit(1)
}

const scope = scopeArg as KeyScope
for (let i = 0; i < Math.max(1, count); i += 1) {
  console.log(generateKey(scope, secret))
}
