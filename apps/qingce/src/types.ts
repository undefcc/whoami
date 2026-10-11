import type { KeyScope } from './lib/keys.ts'

export type QuizOption = {
  id: string
  label: string
  hint?: string
  scores: Record<string, number>
}

export type QuizQuestion = {
  id: string
  title: string
  options: QuizOption[]
}

export type QuizResult = {
  id: string
  title: string
  subtitle: string
  summary: string
  traits: string[]
  suggestion: string
}

export type Quiz = {
  id: string
  title: string
  tagline: string
  description: string
  minutes: number
  premium: boolean
  scope: KeyScope | null
  accent: string
  cover: string
  questions: QuizQuestion[]
  results: QuizResult[]
}

export type AnswerMap = Record<string, string>
