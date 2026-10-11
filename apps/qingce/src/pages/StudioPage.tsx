import { useState } from 'react'
import {
  KEY_SCOPE_LABEL,
  KEY_SCOPES,
  generateKey,
  getKeySecret,
  type KeyScope,
} from '../lib/keys.ts'

const studioPassword = import.meta.env.VITE_STUDIO_PASSWORD || 'qingce-studio'

type Issued = { key: string; scope: KeyScope }

export function StudioPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [scope, setScope] = useState<KeyScope>('ALL')
  const [count, setCount] = useState(3)
  const [issued, setIssued] = useState<Issued[]>([])
  const [copied, setCopied] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  function login() {
    if (password !== studioPassword) {
      setError('口令不对。默认是 qingce-studio，可在 .env 里改。')
      return
    }
    setError(null)
    setAuthed(true)
  }

  function issue() {
    const next = Array.from({ length: Math.min(20, Math.max(1, count)) }, () => ({
      scope,
      key: generateKey(scope, getKeySecret()),
    }))
    setIssued((current) => [...next, ...current])
  }

  async function copy(text: string) {
    await navigator.clipboard.writeText(text)
    setCopied(text)
  }

  if (!authed) {
    return (
      <main className="page">
        <section className="result-hero">
          <p className="eyebrow">只给你用</p>
          <h1>工作室</h1>
          <p className="lede">在这里批量生成密钥，复制后发给闲鱼或小红书的买家。</p>
        </section>
        <section className="card panel">
          <label className="field">
            口令
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') login()
              }}
            />
          </label>
          <button className="btn" type="button" onClick={login}>
            进入
          </button>
          {error ? <p className="notice">{error}</p> : null}
        </section>
      </main>
    )
  }

  return (
    <main className="page">
      <section className="result-hero">
        <p className="eyebrow">发售用</p>
        <h1>生成密钥</h1>
        <p className="lede">
          盐值来自 VITE_KEY_SECRET。换盐之后旧钥匙全部作废。密钥校验在前端，能挡住随手乱填，挡不住肯拆包的人。
        </p>
      </section>
      <section className="card panel">
        <label className="field">
          范围
          <select value={scope} onChange={(event) => setScope(event.target.value as KeyScope)}>
            {KEY_SCOPES.map((item) => (
              <option key={item} value={item}>
                {KEY_SCOPE_LABEL[item]}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          数量
          <input
            type="number"
            min={1}
            max={20}
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
          />
        </label>
        <button className="btn" type="button" onClick={issue}>
          生成
        </button>
      </section>
      <section className="card panel">
        <h2>本次生成</h2>
        {issued.length === 0 ? (
          <p className="muted">还没有。生成后可以一条条复制。</p>
        ) : (
          <div className="keys">
            {issued.map((item) => (
              <div className="key-row" key={item.key}>
                <span>
                  {item.key}
                  <div className="muted">{KEY_SCOPE_LABEL[item.scope]}</div>
                </span>
                <button className="btn secondary" type="button" onClick={() => copy(item.key)}>
                  {copied === item.key ? '已复制' : '复制'}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
