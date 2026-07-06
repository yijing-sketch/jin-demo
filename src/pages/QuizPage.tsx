import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { questions, DIMENSION_ORDER, DIMENSION_LABELS, DIMENSION_ICONS } from '../data/questions'
import { Answer, calculateScore } from '../data/scoring'
import { saveCurrentQuiz, loadCurrentQuiz, clearCurrentQuiz, saveToHistory } from '../utils/storage'
import ProgressBar from '../components/ProgressBar'
import LikertScale from '../components/LikertScale'

const TOTAL_STEPS = DIMENSION_ORDER.length

export default function QuizPage() {
  const navigate = useNavigate()
  const saved = loadCurrentQuiz()

  const [currentStep, setCurrentStep] = useState(saved?.currentStep ?? 1)
  const [answers, setAnswers] = useState<Answer[]>(saved?.answers ?? [])

  const currentDim = DIMENSION_ORDER[currentStep - 1]
  const dimQuestions = questions.filter((q) => q.dimension === currentDim)

  // 获取当前维度的答案
  const getAnswer = useCallback(
    (questionId: string): number | null => {
      return answers.find((a) => a.questionId === questionId)?.score ?? null
    },
    [answers],
  )

  const setAnswer = (questionId: string, score: 1 | 2 | 3 | 4 | 5) => {
    setAnswers((prev) => {
      const existing = prev.findIndex((a) => a.questionId === questionId)
      if (existing >= 0) {
        return prev.map((a, i) => (i === existing ? { ...a, score } : a))
      }
      return [...prev, { questionId, score }]
    })
  }

  // 当前维度是否全部答完
  const isCurrentStepComplete = dimQuestions.every(
    (q) => answers.find((a) => a.questionId === q.id)?.score,
  )

  // 所有维度是否全部答完
  const isAllComplete = questions.every(
    (q) => answers.find((a) => a.questionId === q.id)?.score,
  )

  // 自动暂存
  useEffect(() => {
    if (answers.length > 0) {
      saveCurrentQuiz({ answers, currentStep })
    }
  }, [answers, currentStep])

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    const result = calculateScore(answers)
    saveToHistory(result)
    clearCurrentQuiz()
    navigate('/result', { state: { result } })
  }

  return (
    <div>
      <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      {/* 维度标题 */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl">{DIMENSION_ICONS[currentDim]}</span>
          <h2 className="text-xl font-bold text-gray-800">
            {DIMENSION_LABELS[currentDim]}
          </h2>
          <span className="text-sm text-gray-400">
            第 {currentStep}/{TOTAL_STEPS} 步
          </span>
        </div>
        <p className="text-gray-500 text-sm mt-2">
          请根据企业实际情况，对以下陈述进行评分（1=完全不符合，5=完全符合）
        </p>
      </div>

      {/* 题目列表 */}
      <div className="space-y-5 mb-8">
        {dimQuestions.map((q, index) => (
          <div
            key={q.id}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
          >
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">
                {index + 1}
              </span>
              <div className="flex-1">
                <p className="text-gray-800 font-medium">{q.text}</p>
                <LikertScale
                  value={getAnswer(q.id)}
                  onChange={(score) => setAnswer(q.id, score)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 导航按钮 */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className={`px-5 py-2.5 rounded-lg font-medium transition ${
            currentStep === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          ← 上一步
        </button>

        <span className="text-sm text-gray-400">
          {isCurrentStepComplete ? '✓ 本维度已完成' : `请完成本维度 ${dimQuestions.length} 道题`}
        </span>

        {currentStep < TOTAL_STEPS ? (
          <button
            onClick={handleNext}
            disabled={!isCurrentStepComplete}
            className={`px-5 py-2.5 rounded-lg font-medium transition ${
              isCurrentStepComplete
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            下一步 →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!isAllComplete}
            className={`px-5 py-2.5 rounded-lg font-medium transition ${
              isAllComplete
                ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            提交评估 ✓
          </button>
        )}
      </div>

      {/* 未完成提示 */}
      {currentStep === TOTAL_STEPS && !isAllComplete && (
        <p className="text-center text-amber-600 text-sm mt-3">
          还有维度未完成，请返回检查
        </p>
      )}
    </div>
  )
}
