'use client'

import { useState, useCallback } from 'react'
import { useGameState } from '@/lib/gameState'
import { determineEnding } from '@/lib/storyEngine'
import { checkChoiceAchievements, checkEndingAchievements, unlockAchievements } from '@/lib/achievements'
import ResourceBar from '@/components/ResourceBar'
import StoryScene from '@/components/StoryScene'
import ParticleEffect from '@/components/ParticleEffect'
import EndingCard from '@/components/EndingCard'
import AchievementToast from '@/components/AchievementToast'
import InventoryDrawer from '@/components/InventoryDrawer'
import ENDINGS from '@/data/endings'
import ITEMS from '@/data/items'
import { getAvailableChoices } from '@/lib/storyEngine'
import type { StoryNode, Choice, Resources, Ending } from '@/types/game'

const CHOICE_COOLDOWN_MS = 300

interface GameEngineProps {
  storyNodes: Record<string, StoryNode>
}

export function GameEngine({ storyNodes }: GameEngineProps) {
  const { state, makeChoice, applyChoiceEffects, navigateToNode, advanceNarrative, triggerGameOver, restart } = useGameState()
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

  const handleChoice = useCallback(
    (choice: Choice) => {
      if (isChoosing) return
      setIsChoosing(true)
      setPreviousResources(state.resources)

      // 第7章查看结局：触发结局判定
      if (choice.nextNodeId === 'game_end') {
        const endingType = determineEnding(state)
        const endingAchs = checkEndingAchievements(endingType, state)
        handleNewAchievements(endingAchs)
        triggerGameOver(endingType)
        setIsChoosing(false)
        return
      }

      // 检测剧情/里程碑成就
      const newAchs = checkChoiceAchievements(choice, state)
      handleNewAchievements(newAchs)

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
    <div className="flex flex-col min-h-[100dvh]">
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
      <main className="flex-1 flex flex-col p-4 pt-2 max-w-xl mx-auto w-full">
        {state.isGameOver ? (
          <div className="flex-1 flex flex-col items-center justify-start pt-8 overflow-y-auto pb-6">
            <ParticleEffect type="firework" count={20} />
            {endingData ? (
              <EndingCard
                ending={endingData}
                stats={state.stats}
                resources={state.resources}
                newlyUnlocked={sessionAchievements}
                onRestart={restart}
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
