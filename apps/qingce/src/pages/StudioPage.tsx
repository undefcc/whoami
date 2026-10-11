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
      setError('口令不对')
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
      <div className="admin-shell">
        <header className="admin-nav">
          <span className="brand">青测管理</span>
        </header>
        <main className="page">
        <section className="result-hero">
          <p className="eyebrow">管理</p>
          <h1>进入工作室</h1>
          <p className="lede">这里用来生成解锁密钥，不在测评站导航里。</p>
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
      </div>
    )
  }

  return (
    <div className="admin-shell">
      <header className="admin-nav">
        <span className="brand">青测管理</span>
        <button className="btn secondary" type="button" onClick={() => setAuthed(false)}>
          退出
        </button>
      </header>
      <main className="page">
      <section className="result-hero">
        <p className="eyebrow">密钥</p>
        <h1>生成密钥</h1>
        <p className="lede">换掉 VITE_KEY_SECRET 之后，以前发出的密钥都会失效。</p>
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
    </div>
  )
}
