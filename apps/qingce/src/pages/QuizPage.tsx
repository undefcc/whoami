import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getQuiz } from '../data/index.ts'
import { getKeySecret, parseKey } from '../lib/keys.ts'
import { isComplete } from '../lib/score.ts'
import { hasUnlocked, saveAnswers, saveUnlock } from '../lib/storage.ts'
import type { AnswerMap } from '../types.ts'

export function QuizPage() {
  const { quizId = '' } = useParams()
  const quiz = getQuiz(quizId)
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<AnswerMap>({})
  const [keyInput, setKeyInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [unlocked, setUnlocked] = useState(() => hasUnlocked(quiz?.scope ?? null))

  const question = quiz?.questions[step]
  const selected = question ? answers[question.id] : undefined
  const progress = useMemo(() => {
    if (!quiz) return 0
    return Math.round((step / quiz.questions.length) * 100)
  }, [quiz, step])

  if (!quiz) {
    return (
      <main className="page">
        <h1>没有这道测评</h1>
        <Link className="btn" to="/">
          回首页
        </Link>
      </main>
    )
  }

  function choose(optionId: string) {
    if (!quiz || !question) return
    const next = { ...answers, [question.id]: optionId }
    setAnswers(next)
  }

  function goNext() {
    if (!quiz || !question || !selected) return
    if (step + 1 >= quiz.questions.length) {
      const complete = { ...answers, [question.id]: selected }
      if (!isComplete(quiz, complete)) return
      saveAnswers(quiz.id, complete)
      navigate(`/quiz/${quiz.id}/result`)
      return
    }
    setStep((value) => value + 1)
  }

  function redeem() {
    if (!quiz) return
    const parsed = parseKey(keyInput, getKeySecret())
    if (!parsed.ok) {
      setError(parsed.reason)
      return
    }
    if (quiz.scope && parsed.scope !== 'ALL' && parsed.scope !== quiz.scope) {
      setError('这把钥匙对应的是另一道付费测评')
      return
    }
    saveUnlock(parsed.scope, parsed.key)
    setUnlocked(true)
    setError(null)
  }

  if (quiz.premium && !unlocked) {
    return (
      <main className="page">
        <section className="result-hero">
          <p className="eyebrow">付费测评</p>
          <h1>{quiz.title}</h1>
          <p className="lede">{quiz.description}</p>
        </section>
        <section className="card lock-box">
          <p>输入密钥后开始。单题钥匙或「全部付费测评」钥匙都可以。</p>
          <label className="field">
            密钥
            <input
              value={keyInput}
              onChange={(event) => setKeyInput(event.target.value)}
              placeholder="QZ1-ALL-XXXXXX-XXXX"
              autoComplete="off"
              spellCheck={false}
            />
          </label>
          <div className="hero-actions">
            <button className="btn" type="button" onClick={redeem}>
              解锁并开始
            </button>
            <Link className="btn secondary" to="/unlock">
              去兑换页
            </Link>
          </div>
          {error ? <p className="notice">{error}</p> : null}
        </section>
      </main>
    )
  }

  return (
    <main className="page">
      <div>
        <p className="eyebrow">
          {quiz.title} · {step + 1}/{quiz.questions.length}
        </p>
        <div className="progress" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
      {question ? (
        <section className="card question">
          <h1>{question.title}</h1>
          <div className="options">
            {question.options.map((option) => (
              <button
                key={option.id}
                type="button"
                className={option.id === selected ? 'option selected' : 'option'}
                onClick={() => choose(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>
      ) : null}
      <div className="toolbar">
        <button
          className="btn secondary"
          type="button"
          disabled={step === 0}
          onClick={() => setStep((value) => Math.max(0, value - 1))}
        >
          上一题
        </button>
        <button className="btn" type="button" disabled={!selected} onClick={goNext}>
          {step + 1 === quiz.questions.length ? '看结果' : '下一题'}
        </button>
      </div>
    </main>
  )
}
