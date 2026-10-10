import type { AnswerMap, Quiz, QuizResult } from '../types.ts'

export function scoreQuiz(quiz: Quiz, answers: AnswerMap): QuizResult {
  const totals = new Map<string, number>()
  for (const result of quiz.results) {
    totals.set(result.id, 0)
  }

  for (const question of quiz.questions) {
    const optionId = answers[question.id]
    const option = question.options.find((item) => item.id === optionId)
    if (!option) continue
    for (const [resultId, points] of Object.entries(option.scores)) {
      totals.set(resultId, (totals.get(resultId) ?? 0) + points)
    }
  }

  let winner = quiz.results[0]
  let best = Number.NEGATIVE_INFINITY
  for (const result of quiz.results) {
    const total = totals.get(result.id) ?? 0
    if (total > best) {
      winner = result
      best = total
    }
  }
  return winner
}

export function isComplete(quiz: Quiz, answers: AnswerMap): boolean {
  return quiz.questions.every((question) => Boolean(answers[question.id]))
}
