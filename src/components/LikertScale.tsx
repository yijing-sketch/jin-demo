interface LikertScaleProps {
  value: number | null
  onChange: (score: 1 | 2 | 3 | 4 | 5) => void
}

const LABELS = ['完全不符合', '比较不符合', '一般', '比较符合', '完全符合']

export default function LikertScale({ value, onChange }: LikertScaleProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-between mt-4">
      {[1, 2, 3, 4, 5].map((score, index) => {
        const isSelected = value === score
        return (
          <button
            key={score}
            onClick={() => onChange(score as 1 | 2 | 3 | 4 | 5)}
            className={`flex-1 py-3 px-2 rounded-lg border-2 text-sm font-medium transition-all duration-200
              ${
                isSelected
                  ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md scale-105'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50/50'
              }
            `}
          >
            <div className="text-lg mb-1">{score}</div>
            <div className="text-xs">{LABELS[index]}</div>
          </button>
        )
      })}
    </div>
  )
}
