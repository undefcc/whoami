import type { KeyScope } from './keys.ts'
import type { AnswerMap } from '../types.ts'

const UNLOCK_KEY = 'qingce:unlocks'
const ANSWER_KEY = 'qingce:answers'

export type UnlockRecord = {
  scopes: KeyScope[]
  keys: string[]
}

function emptyUnlocks(): UnlockRecord {
  return { scopes: [], keys: [] }
}

export function readUnlocks(): UnlockRecord {
  if (typeof localStorage === 'undefined') return emptyUnlocks()
  try {
    const raw = localStorage.getItem(UNLOCK_KEY)
    if (!raw) return emptyUnlocks()
    const parsed = JSON.parse(raw) as UnlockRecord
    return {
      scopes: Array.isArray(parsed.scopes) ? parsed.scopes : [],
      keys: Array.isArray(parsed.keys) ? parsed.keys : [],
    }
  } catch {
    return emptyUnlocks()
  }
}

export function saveUnlock(scope: KeyScope, key: string): UnlockRecord {
  const current = readUnlocks()
  const next: UnlockRecord = {
    scopes: current.scopes.includes(scope) ? current.scopes : [...current.scopes, scope],
    keys: current.keys.includes(key) ? current.keys : [...current.keys, key],
  }
  localStorage.setItem(UNLOCK_KEY, JSON.stringify(next))
  return next
}

export function hasUnlocked(quizScope: KeyScope | null): boolean {
  if (!quizScope) return true
  const { scopes } = readUnlocks()
  return scopes.includes('ALL') || scopes.includes(quizScope)
}

export function saveAnswers(quizId: string, answers: AnswerMap): void {
  sessionStorage.setItem(`${ANSWER_KEY}:${quizId}`, JSON.stringify(answers))
}

export function readAnswers(quizId: string): AnswerMap | null {
  const raw = sessionStorage.getItem(`${ANSWER_KEY}:${quizId}`)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AnswerMap
  } catch {
    return null
  }
}
