export type Dimension = 'data' | 'infrastructure' | 'talent' | 'strategy' | 'governance' | 'culture'

export interface Question {
  id: string
  dimension: Dimension
  text: string
}

export const DIMENSION_LABELS: Record<Dimension, string> = {
  data: '数据就绪度',
  infrastructure: '技术基础设施',
  talent: '人才与技能',
  strategy: '战略与领导力',
  governance: '流程与治理',
  culture: '文化与变革',
}

export const DIMENSION_ORDER: Dimension[] = [
  'data',
  'infrastructure',
  'talent',
  'strategy',
  'governance',
  'culture',
]

export const DIMENSION_ICONS: Record<Dimension, string> = {
  data: '📊',
  infrastructure: '🖥️',
  talent: '👥',
  strategy: '🎯',
  governance: '⚖️',
  culture: '🌱',
}

export const DIMENSION_DESCRIPTIONS: Record<Dimension, string> = {
  data: '评估企业在数据采集、存储、质量管理和数据治理方面的能力水平',
  infrastructure: '评估云计算、算力资源、API集成及安全合规等技术底座',
  talent: '评估AI人才储备、团队技能结构和培训体系建设情况',
  strategy: '评估AI战略规划清晰度、管理层支持力度和预算投入',
  governance: '评估AI伦理规范、风险管控和效果评估机制的成熟度',
  culture: '评估组织创新文化、员工对AI的接受度和变革管理能力',
}

export const questions: Question[] = [
  // ===== 数据就绪度 (data) =====
  {
    id: 'data-1',
    dimension: 'data',
    text: '企业已建立完善的数据采集机制，核心业务数据实现了自动化归集',
  },
  {
    id: 'data-2',
    dimension: 'data',
    text: '数据质量有保障体系，包括数据清洗、去重、校验等标准化流程',
  },
  {
    id: 'data-3',
    dimension: 'data',
    text: '企业拥有足够规模和多样性的历史数据，能够支撑AI模型训练',
  },
  {
    id: 'data-4',
    dimension: 'data',
    text: '数据资产已进行有效分类和标注，数据目录清晰可用',
  },
  {
    id: 'data-5',
    dimension: 'data',
    text: '建立了统一的数据治理框架和权限管理体系',
  },

  // ===== 技术基础设施 (infrastructure) =====
  {
    id: 'infra-1',
    dimension: 'infrastructure',
    text: '核心业务系统已上云或具备弹性扩缩容能力',
  },
  {
    id: 'infra-2',
    dimension: 'infrastructure',
    text: '拥有AI/ML开发平台或实验环境（如GPU集群、MLOps工具链）',
  },
  {
    id: 'infra-3',
    dimension: 'infrastructure',
    text: '系统间通过标准化API实现互联互通，数据孤岛问题已基本解决',
  },
  {
    id: 'infra-4',
    dimension: 'infrastructure',
    text: '信息安全体系完善，具备数据加密、访问控制和审计能力',
  },
  {
    id: 'infra-5',
    dimension: 'infrastructure',
    text: '已建立满足AI应用需求的网络带宽和低延迟基础设施',
  },

  // ===== 人才与技能 (talent) =====
  {
    id: 'talent-1',
    dimension: 'talent',
    text: '企业拥有专职的数据科学家或AI/ML工程师团队',
  },
  {
    id: 'talent-2',
    dimension: 'talent',
    text: '业务部门员工具备基本的数据素养，能够理解和运用数据分析结果',
  },
  {
    id: 'talent-3',
    dimension: 'talent',
    text: '企业有系统的AI技能培训计划，定期组织技术学习和分享',
  },
  {
    id: 'talent-4',
    dimension: 'talent',
    text: '能够有效吸引和保留AI相关技术人才，薪酬竞争力强',
  },
  {
    id: 'talent-5',
    dimension: 'talent',
    text: '技术团队具备将AI模型从实验环境部署到生产环境的能力',
  },

  // ===== 战略与领导力 (strategy) =====
  {
    id: 'strategy-1',
    dimension: 'strategy',
    text: '企业已制定清晰的AI战略路线图，明确了短中长期目标',
  },
  {
    id: 'strategy-2',
    dimension: 'strategy',
    text: '高层管理者对AI转型有明确承诺，并亲自推动关键项目',
  },
  {
    id: 'strategy-3',
    dimension: 'strategy',
    text: 'AI相关预算充足，投资回报评估机制已建立',
  },
  {
    id: 'strategy-4',
    dimension: 'strategy',
    text: '已将AI能力建设纳入企业核心竞争力发展规划',
  },
  {
    id: 'strategy-5',
    dimension: 'strategy',
    text: '管理层对AI技术的边界和适用场景有客观理性的认知',
  },

  // ===== 流程与治理 (governance) =====
  {
    id: 'governance-1',
    dimension: 'governance',
    text: '企业已制定AI伦理准则和使用规范，明确了AI应用的红线',
  },
  {
    id: 'governance-2',
    dimension: 'governance',
    text: '建立了AI项目从立项到上线的标准化评审和审批流程',
  },
  {
    id: 'governance-3',
    dimension: 'governance',
    text: '具备AI模型的持续监控和迭代优化机制（模型漂移检测等）',
  },
  {
    id: 'governance-4',
    dimension: 'governance',
    text: '已建立AI相关风险应急预案，包括模型失效和偏差处理方案',
  },
  {
    id: 'governance-5',
    dimension: 'governance',
    text: 'AI应用的合规性审查已纳入现有法务和风控体系',
  },

  // ===== 文化与变革 (culture) =====
  {
    id: 'culture-1',
    dimension: 'culture',
    text: '企业内部形成了鼓励创新、容忍试错的文化氛围',
  },
  {
    id: 'culture-2',
    dimension: 'culture',
    text: '员工对引入AI工具持积极态度，愿意学习和适应新工作方式',
  },
  {
    id: 'culture-3',
    dimension: 'culture',
    text: '跨部门协作顺畅，AI项目能够获得业务部门的有效配合',
  },
  {
    id: 'culture-4',
    dimension: 'culture',
    text: '已有成功的AI应用案例在组织内部推广，形成示范效应',
  },
  {
    id: 'culture-5',
    dimension: 'culture',
    text: '建立了变革管理机制，能够有效管理AI引入带来的流程调整',
  },
]
