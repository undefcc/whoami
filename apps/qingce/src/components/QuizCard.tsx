import { Link } from 'react-router-dom'
import type { Quiz } from '../types.ts'
import { hasUnlocked } from '../lib/storage.ts'

const covers: Record<string, string> = {
  leaf: '🌿',
  train: '🚃',
  map: '🗺️',
  desk: '✏️',
  letter: '✉️',
}

export function QuizCard({ quiz }: { quiz: Quiz }) {
  const unlocked = hasUnlocked(quiz.scope)
  return (
    <Link to={`/quiz/${quiz.id}`} className="card quiz-card">
      <div className="cover" style={{ background: `${quiz.accent}22` }}>
        {covers[quiz.cover] ?? '✦'}
      </div>
      <div className="meta">
        <span className="pill">{quiz.minutes} 分钟</span>
        {quiz.premium ? (
          <span className="pill premium">{unlocked ? '已解锁' : '密钥解锁'}</span>
        ) : (
          <span className="pill">免费</span>
        )}
      </div>
      <h2>{quiz.title}</h2>
      <p>{quiz.tagline}</p>
    </Link>
  )
}
