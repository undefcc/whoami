import { useMemo, useRef, useState } from 'react'
import { toPng } from 'html-to-image'
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
  const sheetRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

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

  async function saveImage() {
    if (!sheetRef.current || !quiz || !result) return
    setSaving(true)
    setSaveError(null)
    try {
      await document.fonts.ready
      const dataUrl = await toPng(sheetRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#f3efe6',
      })
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = `青测-${quiz.title}-${result.title}.png`
      link.click()
      setSaved(true)
    } catch {
      setSaved(false)
      setSaveError('图片没生成成功，请再试一次')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="page">
      <div className="result-sheet" ref={sheetRef}>
        <div className="result-mark">
          <span>青测</span>
          <span>{quiz.title}</span>
        </div>
        <section className="result-hero">
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
      </div>
      <div className="hero-actions">
        <button className="btn" type="button" disabled={saving} onClick={saveImage}>
          {saving ? '正在生成…' : saved ? '已保存' : '保存为图片'}
        </button>
        <button className="btn secondary" type="button" onClick={copy}>
          {copied ? '已复制' : '复制结果'}
        </button>
        <Link className="btn secondary" to={`/quiz/${quiz.id}`}>
          再测一次
        </Link>
        <Link className="btn secondary" to="/">
          看其他测评
        </Link>
      </div>
      {saveError ? <p className="notice">{saveError}</p> : null}
    </main>
  )
}
