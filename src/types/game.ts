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
}

// --- 结局 ---

export type EndingType =
  | 'perfect'
  | 'barely'
  | 'exhausted'
  | 'broke'
  | 'breakdown'
  | 'hidden_lucky'

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

// --- 游戏状态 ---

export interface GameState {
  currentNodeId: string
  chapter: number
  resources: Resources
  /** 道具ID列表 */
  inventory: string[]
  stats: GameStats
  transportMode: 'train' | 'car' | 'plane' | null
  isGameOver: boolean
  ending: EndingType | null
  /** 当前叙事文本的显示进度 */
  narrativeIndex: number
}

// --- 游戏动作 ---

export type GameAction =
  | { type: 'MAKE_CHOICE'; choice: Choice }
  | { type: 'ADVANCE_NARRATIVE' }
  | { type: 'SET_TRANSPORT'; mode: 'train' | 'car' | 'plane' }
  | { type: 'ADD_ITEM'; itemId: string }
  | { type: 'REMOVE_ITEM'; itemId: string }
  | { type: 'GAME_OVER'; ending: EndingType }
  | { type: 'RESTART' }
