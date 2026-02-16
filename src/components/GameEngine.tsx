'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useGameState } from '@/lib/gameState'
import { determineEnding } from '@/lib/storyEngine'
import { checkChoiceAchievements, checkEndingAchievements, unlockAchievements, accumulateGlobalStats, loadGlobalStats, isAllAchievementsUnlocked } from '@/lib/achievements'
import ResourceBar from '@/components/ResourceBar'
import StoryScene from '@/components/StoryScene'
import ParticleEffect from '@/components/ParticleEffect'
import EndingCard from '@/components/EndingCard'
import AchievementToast from '@/components/AchievementToast'
import InventoryDrawer from '@/components/InventoryDrawer'
import { useBackgroundMusic } from '@/hooks/useBackgroundMusic'
import ENDINGS from '@/data/endings'
import ITEMS from '@/data/items'
import { getAvailableChoices } from '@/lib/storyEngine'
import type { StoryNode, Choice, Resources, Ending, EndingType } from '@/types/game'

const CHOICE_COOLDOWN_MS = 300

interface GameEngineProps {
  storyNodes: Record<string, StoryNode>
}

export function GameEngine({ storyNodes }: GameEngineProps) {
  const { state, makeChoice, applyChoiceEffects, navigateToNode, advanceNarrative, addItem, triggerGameOver, restart } = useGameState()
  const ufoQualified = useRef(false)
  const unicornQualified = useRef(false)

  // 背景音乐：独角兽线 vs 其余节点互斥播放
  const isUnicornRoute = state.currentNodeId.startsWith('ch_unicorn_') || state.ending === 'unicorn_night'
  const { stop: stopUnicornMusic } = useBackgroundMusic('/unicorn.mp3', isUnicornRoute)
  const { stop: stopDefaultMusic } = useBackgroundMusic('/拾光机.mp3', !isUnicornRoute)

  // 挂载时检查是否解锁 UFO 线（玩过 3 局以上）和独角兽线（全成就）
  useEffect(() => {
    ufoQualified.current = loadGlobalStats().gamesPlayed >= 3
    if (ufoQualified.current) {
      addItem('ufo_pass')
    }
    unicornQualified.current = isAllAchievementsUnlocked()
    if (unicornQualified.current) {
      addItem('unicorn_pass')
    }
  }, [addItem])

  const handleRestart = useCallback(() => {
    stopUnicornMusic()
    stopDefaultMusic()
    restart()
    setFeedbackText(null)
    setFeedbackEffects([])
    setPendingNextNodeId(null)
    setPreviousResources(undefined)
    setIsChoosing(false)
    setSessionAchievements([])
    if (ufoQualified.current) {
      addItem('ufo_pass')
    }
    unicornQualified.current = isAllAchievementsUnlocked()
    if (unicornQualified.current) {
      addItem('unicorn_pass')
    }
  }, [restart, addItem, stopUnicornMusic, stopDefaultMusic])

  const [previousResources, setPreviousResources] = useState<
    Resources | undefined
  >(undefined)
  const [isChoosing, setIsChoosing] = useState(false)
  const [feedbackText, setFeedbackText] = useState<string | null>(null)
  const [feedbackEffects, setFeedbackEffects] = useState<Choice['effects']>([])
  const [pendingNextNodeId, setPendingNextNodeId] = useState<string | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [achievementQueue, setAchievementQueue] = useState<string[]>([])
  const [sessionAchievements, setSessionAchievements] = useState<string[]>([])

  const currentNode = storyNodes[state.currentNodeId] ?? null
  const endingData: Ending | undefined = state.ending ? ENDINGS[state.ending] : undefined

  /** 将新解锁的成就写入 localStorage 并推入弹窗队列 */
  const handleNewAchievements = useCallback((ids: string[]) => {
    if (ids.length === 0) return
    unlockAchievements(ids)
    setAchievementQueue((prev) => [...prev, ...ids])
    setSessionAchievements((prev) => [...prev, ...ids])
  }, [])

  // 资源归零结局（broke/exhausted）的成就与全局统计补录
  const resourceGameOverProcessed = useRef(false)
  useEffect(() => {
    if (!state.isGameOver) {
      resourceGameOverProcessed.current = false
      return
    }
    if (resourceGameOverProcessed.current) return
    const resourceEndings: EndingType[] = ['exhausted', 'broke', 'sky_rider_broke']
    if (state.ending && resourceEndings.includes(state.ending)) {
      resourceGameOverProcessed.current = true
      const globalStats = accumulateGlobalStats(state.stats)
      ufoQualified.current = globalStats.gamesPlayed >= 3
      const endingAchs = checkEndingAchievements(state.ending, state, globalStats)
      handleNewAchievements(endingAchs)
    }
  }, [state.isGameOver, state.ending, state.stats, handleNewAchievements])

  const handleChoice = useCallback(
    (choice: Choice) => {
      if (isChoosing) return
      setIsChoosing(true)
      setPreviousResources(state.resources)

      // 第7章查看结局：触发结局判定
      if (choice.nextNodeId === 'game_end') {
        const endingType = determineEnding(state)
        const globalStats = accumulateGlobalStats(state.stats)
        ufoQualified.current = globalStats.gamesPlayed >= 3
        const endingAchs = checkEndingAchievements(endingType, state, globalStats)
        handleNewAchievements(endingAchs)
        triggerGameOver(endingType)
        setIsChoosing(false)
        return
      }

      // 检测剧情/里程碑成就
      const newAchs = checkChoiceAchievements(choice, state)
      handleNewAchievements(newAchs)

      // 预判资源归零结局，同步处理成就（避免 useEffect 延迟导致 EndingCard 首帧不亮）
      const projected = choice.effects.reduce(
        (res, e) => ({ ...res, [e.resource]: Math.max(0, res[e.resource] + e.delta) }),
        state.resources,
      )
      if (projected.stamina <= 0 || projected.money <= 0) {
        const resourceEnding = projected.stamina <= 0
          ? 'exhausted' as EndingType
          : state.stats.choicesMade.includes('ch2_plane_morning_yes')
            ? 'sky_rider_broke' as EndingType
            : 'broke' as EndingType
        const globalStats = accumulateGlobalStats(state.stats)
        ufoQualified.current = globalStats.gamesPlayed >= 3
        const endingAchs = checkEndingAchievements(resourceEnding, state, globalStats)
        handleNewAchievements(endingAchs)
      }

      if (choice.feedback) {
        // Has feedback: apply effects now, but defer node transition
        applyChoiceEffects(choice)
        setFeedbackText(choice.feedback)
        setFeedbackEffects(choice.effects)
        setPendingNextNodeId(choice.nextNodeId)
        setTimeout(() => setIsChoosing(false), CHOICE_COOLDOWN_MS)
      } else {
        // No feedback: immediate transition as before
        makeChoice(choice)
        setTimeout(() => setIsChoosing(false), CHOICE_COOLDOWN_MS)
      }
    },
    [isChoosing, state, makeChoice, applyChoiceEffects, triggerGameOver, handleNewAchievements],
  )

  const handleDismissFeedback = useCallback(() => {
    if (pendingNextNodeId) {
      navigateToNode(pendingNextNodeId)
      setPendingNextNodeId(null)
    }
    setFeedbackText(null)
    setFeedbackEffects([])
  }, [pendingNextNodeId, navigateToNode])

  // Filter choices by condition so only valid options show
  const filteredNode = currentNode
    ? { ...currentNode, choices: getAvailableChoices(currentNode, state) }
    : null

  return (
    <div className="flex flex-col h-[100dvh]">
      <AchievementToast
        queue={achievementQueue}
        onDone={() => setAchievementQueue([])}
      />
      <ResourceBar
        resources={state.resources}
        previousResources={previousResources}
        onOpenInventory={() => setIsDrawerOpen(true)}
        inventoryCount={state.inventory.length}
      />
      <InventoryDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        inventory={state.inventory}
        items={ITEMS}
      />
      <main className="flex-1 flex flex-col min-h-0 p-4 max-w-lg mx-auto w-full">
        {state.isGameOver ? (
          <div className="flex-1 flex flex-col items-center justify-start pt-8 overflow-y-auto pb-6">
            <ParticleEffect type="firework" count={20} />
            {endingData ? (
              <EndingCard
                ending={endingData}
                stats={state.stats}
                resources={state.resources}
                newlyUnlocked={sessionAchievements}
                onRestart={handleRestart}
              />
            ) : (
              <div>加载结局中...</div>
            )}
          </div>
        ) : filteredNode ? (
          <StoryScene
            node={filteredNode}
            narrativeIndex={state.narrativeIndex}
            onAdvance={advanceNarrative}
            onChoose={handleChoice}
            isChoosing={isChoosing}
            feedbackText={feedbackText}
            feedbackEffects={feedbackEffects}
            onDismissFeedback={handleDismissFeedback}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            加载中...
          </div>
        )}
      </main>
    </div>
  )
}
