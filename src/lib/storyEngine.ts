import type { Condition, GameState, StoryNode, Choice, EndingType, ResourceType } from '@/types/game'

// --- 常量 ---

const RESOURCE_PERFECT_THRESHOLD = 60
const RESOURCE_BARELY_THRESHOLD = 30
const RESOURCE_ZERO = 0

/** 触发隐藏结局所需的好事件 ID */
const LUCKY_CHOICE_IDS = [
  'help_fainted',
  'share_food',
  'give_seat',
  'help_cook_success',
] as const

const CHAPTER_TITLES: Record<number, string> = {
  1: '第一章：出发准备',
  2: '第二章：春运大作战',
  3: '第三章：旅途奇遇',
  4: '第四章：到站风波',
  5: '第五章：亲戚围攻',
  6: '第六章：年夜饭大作战',
  7: '第七章：结局',
}

// --- 条件判断 ---

function getResourceValue(resource: ResourceType, state: GameState): number {
  return state.resources[resource]
}

export function evaluateCondition(condition: Condition, state: GameState): boolean {
  switch (condition.type) {
    case 'resource_above':
      return getResourceValue(condition.resource!, state) > condition.threshold!
    case 'resource_below':
      return getResourceValue(condition.resource!, state) < condition.threshold!
    case 'has_item':
      return state.inventory.includes(condition.itemId!)
    case 'choice_made':
      return state.stats.choicesMade.includes(condition.choiceId!)
  }
}

// --- 可用选项过滤 ---

export function getAvailableChoices(node: StoryNode, state: GameState): Choice[] {
  return node.choices.filter(
    (choice) => !choice.condition || evaluateCondition(choice.condition, state)
  )
}

// --- 节点查找 ---

export function findNextNode(
  nodeId: string,
  nodes: Record<string, StoryNode>,
  state: GameState
): StoryNode | null {
  const node = nodes[nodeId]
  if (!node) return null
  if (node.condition && !evaluateCondition(node.condition, state)) return null
  return node
}

// --- 结局判定 ---

function isAllLuckyChoicesMade(choicesMade: string[]): boolean {
  return LUCKY_CHOICE_IDS.every((id) => choicesMade.includes(id))
}

function isAnyResourceZero(state: GameState): EndingType | null {
  if (state.resources.stamina === RESOURCE_ZERO) return 'exhausted'
  if (state.resources.money === RESOURCE_ZERO) return 'broke'
  if (state.resources.mood === RESOURCE_ZERO) return 'breakdown'
  return null
}

export function determineEnding(state: GameState): EndingType {
  // 隐藏结局优先级最高
  if (isAllLuckyChoicesMade(state.stats.choicesMade)) return 'hidden_lucky'

  // 归零结局
  const zeroEnding = isAnyResourceZero(state)
  if (zeroEnding) return zeroEnding

  // 三项资源都高于阈值 → 完美结局
  const { stamina, money, mood } = state.resources
  const isAllAbove = stamina > RESOURCE_PERFECT_THRESHOLD
    && money > RESOURCE_PERFECT_THRESHOLD
    && mood > RESOURCE_PERFECT_THRESHOLD
  if (isAllAbove) return 'perfect'

  // 有一项低于警戒线 → 勉强结局
  const isAnyBarely = stamina < RESOURCE_BARELY_THRESHOLD
    || money < RESOURCE_BARELY_THRESHOLD
    || mood < RESOURCE_BARELY_THRESHOLD
  if (isAnyBarely) return 'barely'

  // 兜底：普通完美（资源都在 30-60 之间，不算完美但也没危险）
  return 'perfect'
}

// --- 章节标题 ---

export function getChapterTitle(chapter: number): string {
  return CHAPTER_TITLES[chapter] ?? `第${chapter}章`
}
