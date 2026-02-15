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
  if (resources.mood <= MIN_RESOURCE) return 'breakdown'
  return null
}

function applyChoiceEffects(state: GameState, choice: Choice): GameState {
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

  const isRelationshipQuestion = choice.id.startsWith('relationship_')
  const isNoodle = ['pack1_noodles', 'pack2_noodles', 'ch2_train2_noodle', 'ch2_car2_noodle'].includes(choice.id)

  const updatedStats: GameStats = {
    ...state.stats,
    totalMoneySpent: state.stats.totalMoneySpent + moneySpent,
    relationshipQuestions: state.stats.relationshipQuestions + (isRelationshipQuestion ? 1 : 0),
    noodleCupsEaten: state.stats.noodleCupsEaten + (isNoodle ? 1 : 0),
    choicesMade: [...state.stats.choicesMade, choice.id],
  }

  return {
    ...state,
    currentNodeId: choice.nextNodeId,
    resources: updatedResources,
    stats: updatedStats,
    narrativeIndex: 0,
  }
}

// --- Reducer ---

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'MAKE_CHOICE': {
      const next = applyChoiceEffects(state, action.choice)
      const ending = checkGameOver(next.resources)
      if (ending) {
        return { ...next, isGameOver: true, ending }
      }
      return next
    }

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

  const advanceNarrative = useCallback(
    () => dispatch({ type: 'ADVANCE_NARRATIVE' }),
    [],
  )

  const setTransport = useCallback(
    (mode: 'train' | 'car' | 'plane') =>
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
    advanceNarrative,
    setTransport,
    addItem,
    removeItem,
    triggerGameOver,
    restart,
  }
}
