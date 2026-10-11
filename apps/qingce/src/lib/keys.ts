export const KEY_SCOPES = ['ALL', 'TRAVEL', 'CAREER', 'LOVE'] as const
export type KeyScope = (typeof KEY_SCOPES)[number]

export const KEY_SCOPE_LABEL: Record<KeyScope, string> = {
  ALL: '全部付费测评',
  TRAVEL: '旅行目的地',
  CAREER: '职业气质',
  LOVE: '恋爱沟通',
}

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const PREFIX = 'QZ1'

export function getKeySecret(): string {
  return import.meta.env?.VITE_KEY_SECRET || 'qingce-change-me'
}

export function isKeyScope(value: string): value is KeyScope {
  return (KEY_SCOPES as readonly string[]).includes(value)
}

export function normalizeKey(raw: string): string {
  return raw
    .trim()
    .toUpperCase()
    .replace(/[—–－]/g, '-')
    .replace(/\s+/g, '')
}

export function randomPayload(length = 6): string {
  const bytes = new Uint8Array(length)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (byte) => ALPHABET[byte % ALPHABET.length]).join('')
}

function fnv1a64(input: string): bigint {
  let hash = 0xcbf29ce484222325n
  const prime = 0x100000001b3n
  for (const char of input) {
    hash ^= BigInt(char.codePointAt(0) ?? 0)
    hash = (hash * prime) & 0xffffffffffffffffn
  }
  return hash
}

export function checksum4(secret: string, scope: KeyScope, payload: string): string {
  const hash = fnv1a64(`${secret}|${scope}|${payload}`)
  let value = hash
  let check = ''
  for (let i = 0; i < 4; i += 1) {
    check += ALPHABET[Number(value % BigInt(ALPHABET.length))]
    value /= BigInt(ALPHABET.length)
  }
  return check
}

export function generateKey(scope: KeyScope, secret: string, payload = randomPayload()): string {
  const normalizedPayload = payload.toUpperCase()
  return `${PREFIX}-${scope}-${normalizedPayload}-${checksum4(secret, scope, normalizedPayload)}`
}

export type KeyParseResult =
  | { ok: true; key: string; scope: KeyScope }
  | { ok: false; reason: string }

export function parseKey(raw: string, secret: string): KeyParseResult {
  const key = normalizeKey(raw)
  const parts = key.split('-')
  if (parts.length !== 4 || parts[0] !== PREFIX) {
    return { ok: false, reason: '格式不对，应类似 QZ1-ALL-K8M2P4-A91C' }
  }

  const [, scope, payload, check] = parts
  if (!isKeyScope(scope)) {
    return { ok: false, reason: '这个密钥没有对应的测评范围' }
  }
  if (!/^[A-Z2-9]{6}$/.test(payload) || !/^[A-Z2-9]{4}$/.test(check)) {
    return { ok: false, reason: '密钥位数不对，请检查有没有抄错' }
  }
  if (checksum4(secret, scope, payload) !== check) {
    return { ok: false, reason: '密钥无效或已过期（盐值可能已更换）' }
  }
  return { ok: true, key, scope }
}

export function scopeUnlocksQuiz(scope: KeyScope, quizScope: KeyScope | null): boolean {
  if (!quizScope) return true
  return scope === 'ALL' || scope === quizScope
}
