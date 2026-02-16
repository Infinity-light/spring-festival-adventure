'use client'

import type { GameState, Choice, EndingType } from '@/types/game'

const STORAGE_KEY = 'spring-festival-achievements'
const GLOBAL_STATS_KEY = 'spring-festival-global-stats'

// ---- localStorage 读写 ----

export interface UnlockedRecord {
  unlockedAt: string
}

export interface GlobalStats {
  totalMoneySpent: number
  totalStaminaSpent: number
  gamesPlayed: number
}

export function loadUnlocked(): Record<string, UnlockedRecord> {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveUnlocked(data: Record<string, UnlockedRecord>) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch { /* quota exceeded, silently fail */ }
}

export function unlockAchievements(ids: string[]): void {
  if (ids.length === 0) return
  const data = loadUnlocked()
  const now = new Date().toISOString()
  for (const id of ids) {
    if (!data[id]) data[id] = { unlockedAt: now }
  }
  saveUnlocked(data)
}

// ---- 跨局全局统计 ----

export function loadGlobalStats(): GlobalStats {
  if (typeof window === 'undefined') return { totalMoneySpent: 0, totalStaminaSpent: 0, gamesPlayed: 0 }
  try {
    const raw = localStorage.getItem(GLOBAL_STATS_KEY)
    return raw ? JSON.parse(raw) : { totalMoneySpent: 0, totalStaminaSpent: 0, gamesPlayed: 0 }
  } catch {
    return { totalMoneySpent: 0, totalStaminaSpent: 0, gamesPlayed: 0 }
  }
}

function saveGlobalStats(data: GlobalStats) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(GLOBAL_STATS_KEY, JSON.stringify(data))
  } catch { /* quota exceeded, silently fail */ }
}

/** 游戏结束时累加本局统计到全局，返回更新后的全局统计 */
export function accumulateGlobalStats(sessionStats: GameState['stats']): GlobalStats {
  const global = loadGlobalStats()
  const updated: GlobalStats = {
    totalMoneySpent: global.totalMoneySpent + sessionStats.totalMoneySpent,
    totalStaminaSpent: global.totalStaminaSpent + sessionStats.totalStaminaSpent,
    gamesPlayed: global.gamesPlayed + 1,
  }
  saveGlobalStats(updated)
  return updated
}

// ---- 剧情成就：choice ID → achievement ID ----

const CHOICE_ACHIEVEMENT_MAP: Record<string, string> = {
  relationship_reverse: 'reverse_attack',
  relationship_horse: 'horse_boyfriend',
  ch3_train_noodle_join: 'noodle_party',
  ch3_drive_service_yes: 'good_samaritan',
  ch5_salary_gift: 'gift_diplomacy',
  ch5_blind_date_redpacket: 'red_envelope_peace',
  ch6_cctv_roast: 'gala_roast',
  ch6_fireworks_light: 'firework_master',
  ch4_drive_parking_hug: 'hug_dad',
  ch2_plane1_refund: 'detour_master',
  ch2_plane_morning_yes: 'heli_rider',
}

// 前任重逢：到达 ch3_train_ex 节点时触发（通过 nextNodeId 检测）
const EX_ENCOUNTER_CHOICES = [
  'ch3_train_ex_greet',
  'ch3_train_ex_run',
  'ch3_train_ex_phone',
]

// ---- 检测逻辑 ----

/**
 * 选择后检测新解锁的成就。
 * 返回本次新解锁的成就 ID 列表。
 */
export function checkChoiceAchievements(
  choice: Choice,
  state: GameState,
): string[] {
  const unlocked = loadUnlocked()
  const newIds: string[] = []

  // 1. 剧情成就：直接映射
  const storyAch = CHOICE_ACHIEVEMENT_MAP[choice.id]
  if (storyAch && !unlocked[storyAch]) {
    newIds.push(storyAch)
  }

  // 2. 前任重逢
  if (EX_ENCOUNTER_CHOICES.includes(choice.id) && !unlocked['ex_encounter']) {
    newIds.push('ex_encounter')
  }

  return newIds
}

/**
 * 结局触发时检测成就。
 * globalStats 是已经累加了本局数据的全局统计。
 * 返回本次新解锁的成就 ID 列表。
 */
export function checkEndingAchievements(
  ending: EndingType,
  state: GameState,
  globalStats?: GlobalStats,
): string[] {
  const unlocked = loadUnlocked()
  const newIds: string[] = []

  // 结局成就
  const endingAchId = `ending_${ending}`
  if (!unlocked[endingAchId]) {
    newIds.push(endingAchId)
  }

  // 跨局里程碑：豪气冲天（累计花费 > 30000）
  if (globalStats && globalStats.totalMoneySpent > 30000 && !unlocked['big_spender']) {
    newIds.push('big_spender')
  }

  // 跨局里程碑：铁马精神（累计体力消耗 > 300）
  if (globalStats && globalStats.totalStaminaSpent > 300 && !unlocked['iron_horse']) {
    newIds.push('iron_horse')
  }

  return newIds
}
