import { describe, expect, it } from 'vitest'
import type { Quiz } from '../types.ts'
import { isComplete, scoreQuiz } from './score.ts'

const quiz: Quiz = {
  id: 'demo',
  title: 'Demo',
  tagline: '',
  description: '',
  minutes: 1,
  premium: false,
  scope: null,
  accent: '#2F6D58',
  cover: 'leaf',
  questions: [
    {
      id: 'q1',
      title: 'Q1',
      options: [
        { id: 'a', label: 'A', scores: { red: 2, blue: 0 } },
        { id: 'b', label: 'B', scores: { red: 0, blue: 2 } },
      ],
    },
    {
      id: 'q2',
      title: 'Q2',
      options: [
        { id: 'a', label: 'A', scores: { red: 1, blue: 0 } },
        { id: 'b', label: 'B', scores: { red: 0, blue: 1 } },
      ],
    },
  ],
  results: [
    { id: 'red', title: 'Red', subtitle: '', summary: '', traits: [], suggestion: '' },
    { id: 'blue', title: 'Blue', subtitle: '', summary: '', traits: [], suggestion: '' },
  ],
}

describe('scoreQuiz', () => {
  it('picks the highest total', () => {
    expect(scoreQuiz(quiz, { q1: 'a', q2: 'a' }).id).toBe('red')
    expect(scoreQuiz(quiz, { q1: 'b', q2: 'b' }).id).toBe('blue')
  })

  it('breaks a tie by keeping the earlier result', () => {
    const mixed = {
      ...quiz,
      questions: [
        {
          id: 'q1',
          title: 'Q1',
          options: [{ id: 'tie', label: 'Tie', scores: { red: 1, blue: 1 } }],
        },
      ],
    }
    expect(scoreQuiz(mixed, { q1: 'tie' }).id).toBe('red')
  })

  it('knows when answers are complete', () => {
    expect(isComplete(quiz, { q1: 'a' })).toBe(false)
    expect(isComplete(quiz, { q1: 'a', q2: 'b' })).toBe(true)
  })
})
