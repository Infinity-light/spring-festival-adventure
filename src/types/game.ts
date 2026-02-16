// ============================================================
// 春节回家大冒险 - 游戏核心类型定义
// ============================================================

// --- 基础类型 ---

export type ResourceType = 'stamina' | 'money' | 'mood'

export interface ResourceEffect {
  resource: ResourceType
  delta: number
  /** 变化时的吐槽文案 */
  message?: string
}

// --- 条件系统 ---

export interface Condition {
  type: 'resource_above' | 'resource_below' | 'has_item' | 'choice_made'
  resource?: ResourceType
  threshold?: number
  itemId?: string
  choiceId?: string
}

// --- 选项与节点 ---

export interface Choice {
  id: string
  text: string
  emoji?: string
  effects: ResourceEffect[]
  nextNodeId: string
  tooltip?: string
  /** 显示此选项的前置条件 */
  condition?: Condition
  /** 选择后的即时反馈文案 */
  feedback?: string
  /** 选择后获得的道具ID */
  addItem?: string
  /** 选择后移除的道具ID */
  removeItem?: string
  /** 选择标签：helpful=助人为乐, funny=搞笑时刻 */
  tag?: 'helpful' | 'funny'
}

export interface StoryNode {
  id: string
  chapter: number
  title?: string
  background?: string
  narrative: string[]
  choices: Choice[]
  condition?: Condition
}

// --- 道具 ---

export interface Item {
  id: string
  name: string
  emoji: string
  description: string
  image: string
  effect?: ResourceEffect
}

// --- 游戏资源 ---

export interface Resources {
  stamina: number
  money: number
  mood: number
}

// --- 统计数据（用于结局贺卡） ---

export interface GameStats {
  totalMoneySpent: number
  /** 被问了几次有没有对象 */
  relationshipQuestions: number
  /** 吃了几碗泡面 */
  noodleCupsEaten: number
  /** 做过的关键选择ID */
  choicesMade: string[]
  /** 收集的道具总数 */
  itemsCollected: number
  /** 助人为乐次数 */
  helpfulActions: number
  /** 总选择次数 */
  totalChoices: number
  /** 搞笑时刻计数 */
  funnyMoments: number
  /** 使用（消耗）道具的次数 */
  itemsUsed: number
  /** 体力最低值 */
  lowestStamina: number
  /** 心情最高值 */
  highestMood: number
  /** 累计体力消耗（用于跨局里程碑） */
  totalStaminaSpent: number
}

// --- 结局 ---

export type EndingType =
  | 'perfect'
  | 'normal'
  | 'barely'
  | 'exhausted'
  | 'broke'
  | 'hidden_lucky'
  | 'helpful_hero'
  | 'funny_king'
  | 'frugal_master'
  | 'fate_reunion'
  | 'sky_rider'

export interface Ending {
  type: EndingType
  title: string
  emoji: string
  description: string
  /** 贺卡祝福语 */
  greeting: string
  /** 贺卡样式类名 */
  cardStyle: string
}

// --- 成就系统 ---

export type AchievementCategory = 'story' | 'ending' | 'milestone'

export interface Achievement {
  id: string
  name: string
  emoji: string
  description: string
  category: AchievementCategory
  /** 隐藏成就：解锁前不显示名称和描述 */
  hidden?: boolean
}

// --- 游戏状态 ---

export interface GameState {
  currentNodeId: string
  chapter: number
  resources: Resources
  /** 道具ID列表 */
  inventory: string[]
  stats: GameStats
  transportMode: 'train' | 'car' | 'plane' | 'hsr' | null
  isGameOver: boolean
  ending: EndingType | null
  /** 当前叙事文本的显示进度 */
  narrativeIndex: number
}

// --- 游戏动作 ---

export type GameAction =
  | { type: 'MAKE_CHOICE'; choice: Choice }
  | { type: 'APPLY_CHOICE_EFFECTS'; choice: Choice }
  | { type: 'NAVIGATE_TO_NODE'; nodeId: string }
  | { type: 'ADVANCE_NARRATIVE' }
  | { type: 'SET_TRANSPORT'; mode: 'train' | 'car' | 'plane' | 'hsr' }
  | { type: 'ADD_ITEM'; itemId: string }
  | { type: 'REMOVE_ITEM'; itemId: string }
  | { type: 'GAME_OVER'; ending: EndingType }
  | { type: 'RESTART' }
