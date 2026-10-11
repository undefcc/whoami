import { Leaf, Mail, Map, Pencil, Sparkles, TrainFront, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Quiz } from '../types.ts'
import { hasUnlocked } from '../lib/storage.ts'

const covers: Record<string, LucideIcon> = {
  leaf: Leaf,
  train: TrainFront,
  map: Map,
  desk: Pencil,
  letter: Mail,
}

export function QuizCard({ quiz }: { quiz: Quiz }) {
  const unlocked = hasUnlocked(quiz.scope)
  const Icon = covers[quiz.cover] ?? Sparkles
  return (
    <Link to={`/quiz/${quiz.id}`} className="card quiz-card">
      <div className="cover" style={{ background: `${quiz.accent}22`, color: quiz.accent }}>
        <Icon size={26} strokeWidth={1.75} aria-hidden />
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
