'use client'

import { useState, useCallback } from 'react'
import { useGameState } from '@/lib/gameState'
import { determineEnding } from '@/lib/storyEngine'
import ResourceBar from '@/components/ResourceBar'
import StoryScene from '@/components/StoryScene'
import ParticleEffect from '@/components/ParticleEffect'
import EndingCard from '@/components/EndingCard'
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

  const currentNode = storyNodes[state.currentNodeId] ?? null
  const endingData: Ending | undefined = state.ending ? ENDINGS[state.ending] : undefined

  const handleChoice = useCallback(
    (choice: Choice) => {
      if (isChoosing) return
      setIsChoosing(true)
      setPreviousResources(state.resources)

      // 第7章查看结局：触发结局判定
      if (choice.nextNodeId === 'game_end') {
        const endingType = determineEnding(state)
        triggerGameOver(endingType)
        setIsChoosing(false)
        return
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
    [isChoosing, state, makeChoice, applyChoiceEffects, triggerGameOver],
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
    <div className="flex flex-col min-h-screen">
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
      <main className="flex-1 flex flex-col p-4 max-w-lg mx-auto w-full">
        {state.isGameOver ? (
          <div className="flex-1 flex flex-col items-center justify-start pt-16 overflow-y-auto">
            <ParticleEffect type="firework" count={20} />
            {endingData ? (
              <EndingCard
                ending={endingData}
                stats={state.stats}
                resources={state.resources}
                inventory={state.inventory}
                items={ITEMS}
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
