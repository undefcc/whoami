import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getQuiz } from '../data/index.ts'
import { scoreQuiz } from '../lib/score.ts'
import { readAnswers } from '../lib/storage.ts'

export function ResultPage() {
  const { quizId = '' } = useParams()
  const quiz = getQuiz(quizId)
  const answers = quiz ? readAnswers(quiz.id) : null
  const result = useMemo(() => {
    if (!quiz || !answers) return null
    return scoreQuiz(quiz, answers)
  }, [quiz, answers])
  const [copied, setCopied] = useState(false)

  if (!quiz) return <Navigate to="/" replace />
  if (!result) return <Navigate to={`/quiz/${quiz.id}`} replace />

  async function copy() {
    if (!quiz || !result) return
    const text = [`青测 · ${quiz.title}`, `${result.title}：${result.subtitle}`, result.summary].join(
      '\n',
    )
    await navigator.clipboard.writeText(text)
    setCopied(true)
  }

  return (
    <main className="page">
      <section className="result-hero">
        <p className="eyebrow">{quiz.title} 结果</p>
        <h1>{result.title}</h1>
        <p className="lede">{result.subtitle}</p>
        <div className="traits">
          {result.traits.map((trait) => (
            <span className="pill" key={trait}>
              {trait}
            </span>
          ))}
        </div>
      </section>
      <section className="card panel">
        <h2>这一次看见的是</h2>
        <p>{result.summary}</p>
      </section>
      <section className="card panel">
        <h2>可以怎么用</h2>
        <p>{result.suggestion}</p>
      </section>
      <div className="hero-actions">
        <Link className="btn" to={`/quiz/${quiz.id}`}>
          再测一次
        </Link>
        <Link className="btn secondary" to="/">
          看其他测评
        </Link>
        <button className="btn secondary" type="button" onClick={copy}>
          {copied ? '已复制' : '复制结果'}
        </button>
      </div>
    </main>
  )
}
