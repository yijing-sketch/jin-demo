import { useNavigate } from 'react-router-dom'
import { DIMENSION_ORDER, DIMENSION_LABELS, DIMENSION_ICONS, DIMENSION_DESCRIPTIONS } from '../data/questions'
import { loadHistory, loadCurrentQuiz, clearCurrentQuiz } from '../utils/storage'
import { useState } from 'react'

export default function HomePage() {
  const navigate = useNavigate()
  const history = loadHistory()
  const savedQuiz = loadCurrentQuiz()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleStart = () => {
    if (savedQuiz) {
      setShowConfirm(true)
    } else {
      navigate('/quiz')
    }
  }

  const handleContinue = () => {
    navigate('/quiz')
  }

  const handleRestart = () => {
    clearCurrentQuiz()
    setShowConfirm(false)
    navigate('/quiz')
  }

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center py-8">
        <div className="text-7xl mb-4">🤖</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">企业AI就绪度评估</h2>
        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
          通过6个维度、30道题目的系统评估，全面了解贵企业在AI转型道路上的准备情况。
          预计耗时 <strong className="text-blue-600">5分钟</strong>，数据仅保存在您的浏览器中。
        </p>
        <button
          onClick={handleStart}
          className="mt-6 px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
        >
          开始评估
        </button>

        {savedQuiz && (
          <p className="mt-2 text-sm text-amber-600">
            检测到上次未完成的评估，点击将询问是否继续
          </p>
        )}

        {/* 确认弹窗 */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 mx-4 max-w-sm shadow-2xl">
              <h3 className="text-lg font-bold text-gray-800 mb-2">继续上次评估？</h3>
              <p className="text-gray-500 text-sm mb-5">
                检测到您有未完成的评估记录（已完成第{savedQuiz!.currentStep}步）。
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleRestart}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition"
                >
                  重新开始
                </button>
                <button
                  onClick={handleContinue}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  继续评估
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 维度介绍 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">评估维度</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DIMENSION_ORDER.map((dim) => (
            <div
              key={dim}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">{DIMENSION_ICONS[dim]}</div>
              <h4 className="font-semibold text-gray-800 mb-1">{DIMENSION_LABELS[dim]}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                {DIMENSION_DESCRIPTIONS[dim]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 历史记录 */}
      {history.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">历史评估记录</h3>
          </div>
          <div className="space-y-3">
            {history.map((record) => (
              <div
                key={record.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm text-gray-400">{record.date}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xl font-bold text-blue-600">
                      {record.totalScore}分
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        record.level === '领先期'
                          ? 'bg-green-100 text-green-700'
                          : record.level === '成熟期'
                            ? 'bg-blue-100 text-blue-700'
                            : record.level === '成长期'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {record.level}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/result', { state: { result: record } })}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  查看详情 →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
