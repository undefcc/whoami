import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { QuizPage } from './pages/QuizPage.tsx'
import { ResultPage } from './pages/ResultPage.tsx'
import { StudioPage } from './pages/StudioPage.tsx'
import { UnlockPage } from './pages/UnlockPage.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz/:quizId" element={<QuizPage />} />
          <Route path="/quiz/:quizId/result" element={<ResultPage />} />
          <Route path="/unlock" element={<UnlockPage />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
