import { describe, expect, it } from 'vitest'
import { checksum4, generateKey, parseKey, scopeUnlocksQuiz } from './keys.ts'

const SECRET = 'qingce-change-me'

describe('keys', () => {
  it('generates a key that validates with the same secret', () => {
    const key = generateKey('ALL', SECRET, 'K8M2P4')
    expect(key).toBe(`QZ1-ALL-K8M2P4-${checksum4(SECRET, 'ALL', 'K8M2P4')}`)
    expect(parseKey(key, SECRET)).toEqual({ ok: true, key, scope: 'ALL' })
  })

  it('accepts messy user input', () => {
    const key = generateKey('TRAVEL', SECRET, 'AB23CD')
    const parsed = parseKey(`  ${key.toLowerCase().replaceAll('-', '—')}  `, SECRET)
    expect(parsed.ok).toBe(true)
    if (parsed.ok) expect(parsed.scope).toBe('TRAVEL')
  })

  it('rejects a tampered checksum', () => {
    const key = generateKey('CAREER', SECRET, 'ZZZZZZ')
    const broken = key.slice(0, -1) + (key.endsWith('A') ? 'B' : 'A')
    expect(parseKey(broken, SECRET).ok).toBe(false)
  })

  it('rejects a different secret', () => {
    const key = generateKey('LOVE', SECRET)
    expect(parseKey(key, 'another-secret').ok).toBe(false)
  })

  it('maps scopes onto quizzes', () => {
    expect(scopeUnlocksQuiz('ALL', 'TRAVEL')).toBe(true)
    expect(scopeUnlocksQuiz('TRAVEL', 'TRAVEL')).toBe(true)
    expect(scopeUnlocksQuiz('TRAVEL', 'CAREER')).toBe(false)
    expect(scopeUnlocksQuiz('LOVE', null)).toBe(true)
  })
})
