import { Link } from 'react-router-dom'
import { QuizCard } from '../components/QuizCard.tsx'
import { listQuizzes } from '../data/index.ts'

export function HomePage() {
  const quizzes = listQuizzes()
  return (
    <main>
      <section className="hero">
        <p className="eyebrow">性格 · 城市 · 旅行 · 工作 · 沟通</p>
        <h1>先问清楚，再出发。</h1>
        <p className="lede">几分钟做完一道测评。免费的可以直接开始，其余的用密钥解锁。</p>
        <div className="hero-actions">
          <Link className="btn" to="/quiz/personality">
            先做免费性格测评
          </Link>
          <Link className="btn secondary" to="/unlock">
            我有密钥
          </Link>
        </div>
      </section>
      <section className="grid">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </section>
    </main>
  )
}
