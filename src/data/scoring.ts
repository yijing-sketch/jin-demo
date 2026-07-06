import { Dimension, questions, DIMENSION_ORDER } from './questions'

export interface Answer {
  questionId: string
  score: 1 | 2 | 3 | 4 | 5
}

export interface DimensionScore {
  dimension: Dimension
  score: number // 百分制
  avgRaw: number // 原始平均分
}

export interface AssessmentResult {
  id: string
  date: string
  answers: Answer[]
  dimensionScores: DimensionScore[]
  totalScore: number
  level: '探索期' | '成长期' | '成熟期' | '领先期'
  levelIndex: number
}

export function calculateScore(answers: Answer[]): AssessmentResult {
  const dimensionScores: DimensionScore[] = DIMENSION_ORDER.map((dim) => {
    const dimQuestions = questions.filter((q) => q.dimension === dim)
    const dimAnswers = answers.filter((a) =>
      dimQuestions.some((q) => q.id === a.questionId),
    )
    const total = dimAnswers.reduce((sum, a) => sum + a.score, 0)
    const avgRaw = dimAnswers.length > 0 ? total / dimAnswers.length : 0
    return {
      dimension: dim,
      score: Math.round(avgRaw * 20), // 转为百分制
      avgRaw: Math.round(avgRaw * 10) / 10,
    }
  })

  const totalScore = Math.round(
    dimensionScores.reduce((sum, d) => sum + d.score, 0) / dimensionScores.length,
  )

  let level: AssessmentResult['level'] = '探索期'
  if (totalScore >= 80) level = '领先期'
  else if (totalScore >= 60) level = '成熟期'
  else if (totalScore >= 40) level = '成长期'

  return {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    date: new Date().toLocaleString('zh-CN'),
    answers,
    dimensionScores,
    totalScore,
    level,
    levelIndex: ['探索期', '成长期', '成熟期', '领先期'].indexOf(level),
  }
}
