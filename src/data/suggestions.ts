import { Dimension, DIMENSION_LABELS } from './questions'
import { DimensionScore } from './scoring'

export interface Suggestion {
  text: string
  priority: 'high' | 'medium' | 'positive'
  dimension?: Dimension
}

export function generateSuggestions(dimensionScores: DimensionScore[]): Suggestion[] {
  const suggestions: Suggestion[] = []

  // 低分建议库
  const lowScoreSuggestions: Record<Dimension, string[]> = {
    data: [
      '建议从核心业务流程入手，梳理数据资产清单，建立自动化数据采集管道',
      '引入数据质量管理工具，建立数据校验规则和清洗流程，确保数据可用性',
      '实施数据分级分类管理，建立统一的数据字典和元数据标准',
    ],
    infrastructure: [
      '评估现有IT基础设施的AI适配能力，制定云迁移或混合部署方案',
      '搭建轻量级ML实验环境，优先采用云端GPU实例降低初期投入',
      '推动核心系统API标准化改造，打通数据孤岛，构建统一数据中台',
    ],
    talent: [
      '制定AI人才引进计划，结合外部招聘和内部培养双轨并行策略',
      '与高校或培训机构合作，建立定期的AI技能培训体系',
      '选拔业务骨干作为"AI大使"，在业务团队中推动数据驱动文化',
    ],
    strategy: [
      '建议管理层参加AI战略研讨会，明确AI对业务的核心价值和优先级',
      '选择1-2个高价值、低风险场景作为AI试点项目，快速验证效果',
      '设立AI专项预算，建立项目投资回报评估模型和里程碑评审机制',
    ],
    governance: [
      '制定AI应用白皮书，明确AI伦理原则、数据隐私和安全底线',
      '建立AI项目评审委员会，制定从概念验证到生产上线的标准流程',
      '引入MLOps实践，建立模型版本管理、性能监控和自动回滚机制',
    ],
    culture: [
      '组织AI科普和体验活动，降低员工对AI的陌生感和抵触情绪',
      '在内部树立AI应用标杆案例，通过实际效果激发员工参与热情',
      '设立创新激励机制，鼓励跨部门协作的AI应用探索和分享',
    ],
  }

  // 高分肯定库
  const highScoreKudos: Record<Dimension, string> = {
    data: '企业在数据治理方面基础扎实，建议持续优化数据质量并向实时数据处理方向演进',
    infrastructure: '技术基础设施较为完善，可进一步探索边缘计算和AI芯片等前沿技术',
    talent: '人才团队建设成效显著，建议关注AI人才梯队建设和知识传承',
    strategy: 'AI战略方向清晰，建议定期审视战略执行效果并根据市场变化动态调整',
    governance: 'AI治理体系成熟，可考虑对外输出治理经验，提升行业影响力',
    culture: '创新文化氛围良好，建议持续保持并关注大规模变革中的员工体验',
  }

  // 综合建议
  let lowCount = 0
  let highCount = 0

  for (const ds of dimensionScores) {
    const dim = ds.dimension
    if (ds.score < 60) {
      lowCount++
      const dimLowSuggestions = lowScoreSuggestions[dim]
      const severity = ds.score < 40 ? 'high' : 'medium'
      for (let i = 0; i < Math.min(2, dimLowSuggestions.length); i++) {
        suggestions.push({
          text: dimLowSuggestions[i],
          priority: i === 0 && ds.score < 40 ? 'high' : 'medium',
          dimension: dim,
        })
      }
    } else if (ds.score >= 80) {
      highCount++
      suggestions.push({
        text: highScoreKudos[dim],
        priority: 'positive',
        dimension: dim,
      })
    }
  }

  // 综合评估建议
  if (lowCount >= 3) {
    suggestions.unshift({
      text: '企业在多个维度存在明显短板，建议优先聚焦数据基础和人才建设，以此为突破口推动全面AI就绪',
      priority: 'high',
    })
  } else if (lowCount > 0) {
    suggestions.unshift({
      text: '企业已具备一定AI基础，建议针对性补齐短板维度，同时巩固优势领域',
      priority: 'medium',
    })
  }

  if (highCount >= 4) {
    suggestions.unshift({
      text: '企业在多数维度表现优异，已具备全面AI转型的条件，建议加速从试点向规模化推广迈进',
      priority: 'positive',
    })
  }

  return suggestions
}
