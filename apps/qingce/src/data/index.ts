import type { Quiz } from '../types.ts'
import { careerQuiz } from './career.ts'
import { loveQuiz } from './love.ts'
import { personalityQuiz } from './personality.ts'
import { travelQuiz } from './travel.ts'
import { weekendQuiz } from './weekend.ts'

export const quizzes: Quiz[] = [
  personalityQuiz,
  weekendQuiz,
  travelQuiz,
  careerQuiz,
  loveQuiz,
]

export function getQuiz(id: string): Quiz | undefined {
  return quizzes.find((quiz) => quiz.id === id)
}

export function listQuizzes(): Quiz[] {
  return quizzes
}
