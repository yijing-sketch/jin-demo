import { useLocation, useNavigate } from 'react-router-dom'
import { AssessmentResult } from '../data/scoring'
import { generateSuggestions } from '../data/suggestions'
import { DIMENSION_LABELS } from '../data/questions'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts'
import { useRef } from 'react'

const LEVEL_CONFIG = {
  '探索期': {
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    icon: '🔍',
    desc: '企业AI转型处于起步阶段，需要在多个维度建立基础能力',
  },
  '成长期': {
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    icon: '🌱',
    desc: '已具备一定AI基础，建议针对性补齐短板，加速能力建设',
  },
  '成熟期': {
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: '🚀',
    desc: 'AI能力体系较为完善，可进一步深化应用，扩大业务影响范围',
  },
  '领先期': {
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: '🏆',
    desc: 'AI就绪度达到领先水平，具备全面AI转型条件，可规模化推广',
  },
}

const BAR_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6']

export default function ResultPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const resultRef = useRef<HTMLDivElement>(null)

  const result = (location.state as { result?: AssessmentResult })?.result

  if (!result) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">暂无评估结果</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          返回首页
        </button>
      </div>
    )
  }

  const suggestions = generateSuggestions(result.dimensionScores)
  const config = LEVEL_CONFIG[result.level]
  const highPriorityItems = suggestions.filter((s) => s.priority === 'high')
  const mediumPriorityItems = suggestions.filter((s) => s.priority === 'medium')
  const positiveItems = suggestions.filter((s) => s.priority === 'positive')

  // 雷达图数据
  const radarData = result.dimensionScores.map((ds) => ({
    dimension: DIMENSION_LABELS[ds.dimension],
    score: ds.score,
  }))

  // 柱状图数据
  const barData = result.dimensionScores.map((ds) => ({
    dimension: DIMENSION_LABELS[ds.dimension],
    score: ds.score,
  }))

  return (
    <div className="space-y-6" ref={resultRef}>
      {/* 总分摘要 */}
      <div className={`rounded-2xl p-6 border ${config.bg} ${config.border}`}>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">{result.date}</p>
          <div className="text-6xl font-extrabold mb-2">
            <span className={config.color}>{result.totalScore}</span>
            <span className="text-2xl text-gray-400 font-normal"> 分</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">{config.icon}</span>
            <span className={`text-2xl font-bold ${config.color}`}>{result.level}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">{config.desc}</p>
        </div>
      </div>

      {/* 图表区 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 雷达图 */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">六维能力雷达图</h3>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: '#9ca3af' }}
              />
              <Radar
                name="得分"
                dataKey="score"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.25}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* 柱状图 */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">各维度得分</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={barData} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
              <YAxis
                dataKey="dimension"
                type="category"
                width={80}
                tick={{ fontSize: 12, fill: '#374151' }}
              />
              <Tooltip
                formatter={(value: number) => [`${value} 分`, '得分']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={28}>
                {barData.map((_, index) => (
                  <Cell key={index} fill={BAR_COLORS[index % BAR_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 维度详情卡片 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {result.dimensionScores.map((ds, index) => (
          <div key={ds.dimension} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <p className="text-sm text-gray-500 mb-1">{DIMENSION_LABELS[ds.dimension]}</p>
            <p className="text-2xl font-bold" style={{ color: BAR_COLORS[index] }}>
              {ds.score}
            </p>
            <p className="text-xs text-gray-400">分</p>
          </div>
        ))}
      </div>

      {/* 建议列表 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">改进建议</h3>
        <div className="space-y-4">
          {highPriorityItems.map((s, i) => (
            <div key={`h-${i}`} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
              <span className="text-red-500 text-lg flex-shrink-0">⚠️</span>
              <div>
                <span className="text-xs text-red-400 font-semibold">高优先级</span>
                <p className="text-sm text-gray-700 mt-0.5">{s.text}</p>
              </div>
            </div>
          ))}
          {mediumPriorityItems.map((s, i) => (
            <div key={`m-${i}`} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <span className="text-blue-500 text-lg flex-shrink-0">💡</span>
              <div>
                <span className="text-xs text-blue-400 font-semibold">中优先级</span>
                <p className="text-sm text-gray-700 mt-0.5">{s.text}</p>
              </div>
            </div>
          ))}
          {positiveItems.map((s, i) => (
            <div key={`p-${i}`} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
              <span className="text-green-500 text-lg flex-shrink-0">✅</span>
              <div>
                <span className="text-xs text-green-400 font-semibold">优势保持</span>
                <p className="text-sm text-gray-700 mt-0.5">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => {
            // PDF export will be handled in Task 7
            import('./pdfExport').then((m) => m.exportPDF(resultRef))
          }}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow-md"
        >
          📥 导出PDF报告
        </button>
        <button
          onClick={() => navigate('/quiz')}
          className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
        >
          重新评估
        </button>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
        >
          返回首页
        </button>
      </div>
    </div>
  )
}
