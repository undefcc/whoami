import { useState } from 'react'
import { KEY_SCOPE_LABEL, getKeySecret, parseKey } from '../lib/keys.ts'
import { readUnlocks, saveUnlock } from '../lib/storage.ts'

export function UnlockPage() {
  const [value, setValue] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [unlocks, setUnlocks] = useState(readUnlocks)

  function redeem() {
    const parsed = parseKey(value, getKeySecret())
    if (!parsed.ok) {
      setError(parsed.reason)
      setMessage(null)
      return
    }
    setUnlocks(saveUnlock(parsed.scope, parsed.key))
    setError(null)
    setMessage(`已解锁：${KEY_SCOPE_LABEL[parsed.scope]}`)
    setValue('')
  }

  return (
    <main className="page">
      <section className="result-hero">
        <p className="eyebrow">密钥兑换</p>
        <h1>把买到的钥匙贴过来。</h1>
        <p className="lede">格式类似 QZ1-ALL-K8M2P4-A91C。解锁记录只存在这台设备的浏览器里。</p>
      </section>
      <section className="card panel">
        <label className="field">
          密钥
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="QZ1-ALL-XXXXXX-XXXX"
            autoComplete="off"
            spellCheck={false}
          />
        </label>
        <button className="btn" type="button" onClick={redeem}>
          解锁
        </button>
        {error ? <p className="notice">{error}</p> : null}
        {message ? <p className="ok">{message}</p> : null}
      </section>
      <section className="card panel">
        <h2>这台设备已解锁</h2>
        {unlocks.scopes.length === 0 ? (
          <p className="muted">还没有密钥。先做两道免费测评也可以。</p>
        ) : (
          <div className="traits">
            {unlocks.scopes.map((scope) => (
              <span className="pill premium" key={scope}>
                {KEY_SCOPE_LABEL[scope]}
              </span>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
