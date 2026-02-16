'use client'

import { useReducer, useCallback } from 'react'
import type {
  ResourceType,
  Resources,
  GameState,
  GameAction,
  GameStats,
  EndingType,
  Choice,
} from '@/types/game'

// --- 常量 ---

const MAX_STAMINA = 100
const MAX_MOOD = 100
const MAX_MONEY = 99999
const MIN_RESOURCE = 0

const INITIAL_RESOURCES: Resources = {
  stamina: MAX_STAMINA,
  money: 5000,
  mood: MAX_MOOD,
}

const INITIAL_STATS: GameStats = {
  totalMoneySpent: 0,
  relationshipQuestions: 0,
  noodleCupsEaten: 0,
  choicesMade: [],
  itemsCollected: 0,
  helpfulActions: 0,
  totalChoices: 0,
  funnyMoments: 0,
  itemsUsed: 0,
  lowestStamina: MAX_STAMINA,
  highestMood: MAX_MOOD,
  totalStaminaSpent: 0,
}

const INITIAL_GAME_STATE: GameState = {
  currentNodeId: 'start',
  chapter: 1,
  resources: INITIAL_RESOURCES,
  inventory: [],
  stats: INITIAL_STATS,
  transportMode: null,
  isGameOver: false,
  ending: null,
  narrativeIndex: 0,
}

// --- 辅助函数 ---

function clampResource(value: number, resource: ResourceType): number {
  const max = resource === 'money' ? MAX_MONEY : MAX_STAMINA
  return Math.max(MIN_RESOURCE, Math.min(max, value))
}

function checkGameOver(resources: Resources): EndingType | null {
  if (resources.stamina <= MIN_RESOURCE) return 'exhausted'
  if (resources.money <= MIN_RESOURCE) return 'broke'
  return null
}

function computeChoiceUpdates(state: GameState, choice: Choice) {
  const updatedResources = choice.effects.reduce<Resources>(
    (res, effect) => ({
      ...res,
      [effect.resource]: clampResource(
        res[effect.resource] + effect.delta,
        effect.resource,
      ),
    }),
    state.resources,
  )

  const moneySpent = choice.effects
    .filter((e) => e.resource === 'money' && e.delta < 0)
    .reduce((sum, e) => sum + Math.abs(e.delta), 0)

  const staminaSpent = choice.effects
    .filter((e) => e.resource === 'stamina' && e.delta < 0)
    .reduce((sum, e) => sum + Math.abs(e.delta), 0)

  const isRelationshipQuestion = choice.id.startsWith('relationship_')
  const isNoodle = ['pack1_noodles', 'pack2_noodles', 'ch2_train2_noodle', 'ch2_car2_noodle'].includes(choice.id)

  // 通过 tag 或 choice id 前缀识别助人/搞笑选择
  const isHelpful = choice.tag === 'helpful' || choice.id.startsWith('help_')
  const isFunny = choice.tag === 'funny'

  const updatedStats: GameStats = {
    ...state.stats,
    totalMoneySpent: state.stats.totalMoneySpent + moneySpent,
    relationshipQuestions: state.stats.relationshipQuestions + (isRelationshipQuestion ? 1 : 0),
    noodleCupsEaten: state.stats.noodleCupsEaten + (isNoodle ? 1 : 0),
    choicesMade: [...state.stats.choicesMade, choice.id],
    totalChoices: state.stats.totalChoices + 1,
    helpfulActions: state.stats.helpfulActions + (isHelpful ? 1 : 0),
    funnyMoments: state.stats.funnyMoments + (isFunny ? 1 : 0),
    lowestStamina: Math.min(state.stats.lowestStamina, updatedResources.stamina),
    highestMood: Math.max(state.stats.highestMood, updatedResources.mood),
    totalStaminaSpent: state.stats.totalStaminaSpent + staminaSpent,
  }

  return { updatedResources, updatedStats }
}

function applyChoiceEffects(state: GameState, choice: Choice): GameState {
  const { updatedResources, updatedStats } = computeChoiceUpdates(state, choice)
  return {
    ...state,
    currentNodeId: choice.nextNodeId,
    resources: updatedResources,
    stats: updatedStats,
    narrativeIndex: 0,
  }
}

/** Apply resource effects and record stats, but stay on the current node. */
function applyEffectsOnly(state: GameState, choice: Choice): GameState {
  const { updatedResources, updatedStats } = computeChoiceUpdates(state, choice)
  return {
    ...state,
    resources: updatedResources,
    stats: updatedStats,
  }
}

/** Apply addItem / removeItem from a choice. */
function applyItemChanges(state: GameState, choice: Choice): GameState {
  let inventory = state.inventory
  let itemsCollected = state.stats.itemsCollected
  let itemsUsed = state.stats.itemsUsed

  if (choice.addItem && !inventory.includes(choice.addItem)) {
    inventory = [...inventory, choice.addItem]
    itemsCollected += 1
  }

  if (choice.removeItem) {
    inventory = inventory.filter((id) => id !== choice.removeItem)
    itemsUsed += 1
  }

  if (inventory === state.inventory && itemsUsed === state.stats.itemsUsed) return state

  return {
    ...state,
    inventory,
    stats: { ...state.stats, itemsCollected, itemsUsed },
  }
}

// --- Reducer ---

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'MAKE_CHOICE': {
      let next = applyChoiceEffects(state, action.choice)
      next = applyItemChanges(next, action.choice)
      const ending = checkGameOver(next.resources)
      if (ending) {
        return { ...next, isGameOver: true, ending }
      }
      return next
    }

    case 'APPLY_CHOICE_EFFECTS': {
      let next = applyEffectsOnly(state, action.choice)
      next = applyItemChanges(next, action.choice)
      const ending = checkGameOver(next.resources)
      if (ending) {
        return { ...next, isGameOver: true, ending }
      }
      return next
    }

    case 'NAVIGATE_TO_NODE':
      return { ...state, currentNodeId: action.nodeId, narrativeIndex: 0 }

    case 'ADVANCE_NARRATIVE':
      return { ...state, narrativeIndex: state.narrativeIndex + 1 }

    case 'SET_TRANSPORT':
      return { ...state, transportMode: action.mode }

    case 'ADD_ITEM':
      return { ...state, inventory: [...state.inventory, action.itemId] }

    case 'REMOVE_ITEM':
      return {
        ...state,
        inventory: state.inventory.filter((id) => id !== action.itemId),
      }

    case 'GAME_OVER':
      return { ...state, isGameOver: true, ending: action.ending }

    case 'RESTART':
      return INITIAL_GAME_STATE

    default:
      return state
  }
}

// --- Hook ---

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE)

  const makeChoice = useCallback(
    (choice: Choice) => dispatch({ type: 'MAKE_CHOICE', choice }),
    [],
  )

  const applyChoiceEffects = useCallback(
    (choice: Choice) => dispatch({ type: 'APPLY_CHOICE_EFFECTS', choice }),
    [],
  )

  const navigateToNode = useCallback(
    (nodeId: string) => dispatch({ type: 'NAVIGATE_TO_NODE', nodeId }),
    [],
  )

  const advanceNarrative = useCallback(
    () => dispatch({ type: 'ADVANCE_NARRATIVE' }),
    [],
  )

  const setTransport = useCallback(
    (mode: 'train' | 'car' | 'plane' | 'hsr') =>
      dispatch({ type: 'SET_TRANSPORT', mode }),
    [],
  )

  const addItem = useCallback(
    (itemId: string) => dispatch({ type: 'ADD_ITEM', itemId }),
    [],
  )

  const removeItem = useCallback(
    (itemId: string) => dispatch({ type: 'REMOVE_ITEM', itemId }),
    [],
  )

  const triggerGameOver = useCallback(
    (ending: EndingType) => dispatch({ type: 'GAME_OVER', ending }),
    [],
  )

  const restart = useCallback(() => dispatch({ type: 'RESTART' }), [])

  return {
    state,
    makeChoice,
    applyChoiceEffects,
    navigateToNode,
    advanceNarrative,
    setTransport,
    addItem,
    removeItem,
    triggerGameOver,
    restart,
  }
}
