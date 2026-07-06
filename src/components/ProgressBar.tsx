import { DIMENSION_ORDER, DIMENSION_LABELS, DIMENSION_ICONS } from '../data/questions'

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100)

  return (
    <div className="mb-6">
      {/* 步骤指示器 */}
      <div className="flex justify-between items-center mb-3">
        {DIMENSION_ORDER.map((dim, index) => {
          const stepNum = index + 1
          const isActive = stepNum === currentStep
          const isDone = stepNum < currentStep
          return (
            <div key={dim} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  isDone
                    ? 'bg-green-500 text-white'
                    : isActive
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                      : 'bg-gray-200 text-gray-500'
                }`}
              >
                {isDone ? '✓' : stepNum}
              </div>
              <span
                className={`text-xs mt-1 text-center hidden sm:block ${
                  isActive ? 'text-blue-600 font-semibold' : isDone ? 'text-green-600' : 'text-gray-400'
                }`}
              >
                {DIMENSION_ICONS[dim]} {DIMENSION_LABELS[dim]}
              </span>
            </div>
          )
        })}
      </div>
      {/* 进度条 */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-center text-sm text-gray-500 mt-1">
        进度 {percentage}%（{currentStep}/{totalSteps}）
      </p>
    </div>
  )
}
