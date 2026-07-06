import { Answer } from '../data/scoring'
import { AssessmentResult } from '../data/scoring'

const CURRENT_QUIZ_KEY = 'ai-readiness-current-quiz'
const HISTORY_KEY = 'ai-readiness-history'
const MAX_HISTORY = 5

interface CurrentQuiz {
  answers: Answer[]
  currentStep: number
}

export function saveCurrentQuiz(data: CurrentQuiz): void {
  localStorage.setItem(CURRENT_QUIZ_KEY, JSON.stringify(data))
}

export function loadCurrentQuiz(): CurrentQuiz | null {
  const raw = localStorage.getItem(CURRENT_QUIZ_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function clearCurrentQuiz(): void {
  localStorage.removeItem(CURRENT_QUIZ_KEY)
}

export function saveToHistory(result: AssessmentResult): void {
  const history = loadHistory()
  history.unshift(result)
  if (history.length > MAX_HISTORY) {
    history.length = MAX_HISTORY
  }
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}

export function loadHistory(): AssessmentResult[] {
  const raw = localStorage.getItem(HISTORY_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY)
}
