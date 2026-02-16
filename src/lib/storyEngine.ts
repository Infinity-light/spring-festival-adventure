import type { Condition, GameState, StoryNode, Choice, EndingType, ResourceType } from '@/types/game'

// --- 常量 ---

const RESOURCE_PERFECT_THRESHOLD = 60
const RESOURCE_BARELY_THRESHOLD = 30
const RESOURCE_ZERO = 0

const CHAPTER_TITLES: Record<number, string> = {
  1: '第一章：出发准备',
  2: '第二章：春运大作战',
  3: '第三章：旅途奇遇',
  4: '第四章：到站风波',
  5: '第五章：亲戚围攻',
  6: '第六章：年夜饭大作战',
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
// 按优先级从高到低匹配，第一个命中的就是最终结局

/**
 * 隐藏结局「马上有福」：
 * - 助人 >= 4 次
 * - 搞笑 >= 3 次
 * - 道具收集 >= 8 个
 * - 心情最高峰 >= 90
 *
 * 可达性分析：
 * helpful 标记的选择共约 8 个（ch1~ch6），拿到 4 次完全可行
 * funny 标记的选择共约 8 个，拿到 3 次可行
 * 12 个道具中拿到 8 个需要刻意收集但可达
 */
function isHiddenLucky(state: GameState): boolean {
  return (
    state.stats.helpfulActions >= 4 &&
    state.stats.funnyMoments >= 3 &&
    state.stats.itemsCollected >= 8 &&
    state.stats.highestMood >= 90
  )
}

/**
 * 完美结局「完美团圆」：
 * - 三项资源都 > 60
 * - 道具收集 >= 6
 */
function isPerfect(state: GameState): boolean {
  const { stamina, money, mood } = state.resources
  return (
    stamina > RESOURCE_PERFECT_THRESHOLD &&
    money > RESOURCE_PERFECT_THRESHOLD &&
    mood > RESOURCE_PERFECT_THRESHOLD &&
    state.stats.itemsCollected >= 6
  )
}

/**
 * 风格结局「活马雷锋」：助人为乐型
 * - 助人 >= 4 次
 * - 心情 > 50（好人有好报）
 */
function isHelpfulHero(state: GameState): boolean {
  return state.stats.helpfulActions >= 4 && state.resources.mood > 50
}

/**
 * 风格结局「快乐马戏团」：搞笑达马型
 * - 搞笑时刻 >= 4 次
 * - 心情最高峰 >= 80
 */
function isFunnyKing(state: GameState): boolean {
  return state.stats.funnyMoments >= 4 && state.stats.highestMood >= 80
}

/**
 * 风格结局「省钱达马」：精打细算型
 * - 总花费 <= 1500（初始5000，到家还剩3500+）
 * - 钱 > 3000
 */
function isFrugalMaster(state: GameState): boolean {
  return state.stats.totalMoneySpent <= 1500 && state.resources.money > 3000
}

export function determineEnding(state: GameState): EndingType {
  // P10 隐藏结局：最高优先级
  if (isHiddenLucky(state)) return 'hidden_lucky'

  // P9 完美结局
  if (isPerfect(state)) return 'perfect'

  // P7 风格结局（互斥，按优先级）
  if (isHelpfulHero(state)) return 'helpful_hero'
  if (isFunnyKing(state)) return 'funny_king'
  if (isFrugalMaster(state)) return 'frugal_master'

  // P2 勉强结局：有一项资源低于警戒线
  const { stamina, money, mood } = state.resources
  const isAnyBarely =
    stamina < RESOURCE_BARELY_THRESHOLD ||
    money < RESOURCE_BARELY_THRESHOLD ||
    mood < RESOURCE_BARELY_THRESHOLD
  if (isAnyBarely) return 'barely'

  // P0 默认结局：平安到家
  return 'normal'
}

// --- 章节标题 ---

export function getChapterTitle(chapter: number): string {
  return CHAPTER_TITLES[chapter] ?? `第${chapter}章`
}
