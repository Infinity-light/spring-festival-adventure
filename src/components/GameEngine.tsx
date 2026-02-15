'use client'

import { useState, useCallback } from 'react'
import { useGameState } from '@/lib/gameState'
import { determineEnding } from '@/lib/storyEngine'
import ResourceBar from '@/components/ResourceBar'
import StoryScene from '@/components/StoryScene'
import ParticleEffect from '@/components/ParticleEffect'
import EndingCard from '@/components/EndingCard'
import ENDINGS from '@/data/endings'
import type { StoryNode, Choice, Resources, Ending } from '@/types/game'

const CHOICE_COOLDOWN_MS = 300

interface GameEngineProps {
  storyNodes: Record<string, StoryNode>
}

export function GameEngine({ storyNodes }: GameEngineProps) {
  const { state, makeChoice, advanceNarrative, triggerGameOver, restart } = useGameState()
  const [previousResources, setPreviousResources] = useState<
    Resources | undefined
  >(undefined)
  const [isChoosing, setIsChoosing] = useState(false)

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

      makeChoice(choice)
      setTimeout(() => setIsChoosing(false), CHOICE_COOLDOWN_MS)
    },
    [isChoosing, state, makeChoice, triggerGameOver],
  )

  return (
    <div className="flex flex-col min-h-screen">
      <ResourceBar
        resources={state.resources}
        previousResources={previousResources}
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
                onRestart={restart}
              />
            ) : (
              <div>加载结局中...</div>
            )}
          </div>
        ) : currentNode ? (
          <StoryScene
            node={currentNode}
            narrativeIndex={state.narrativeIndex}
            onAdvance={advanceNarrative}
            onChoose={handleChoice}
            isChoosing={isChoosing}
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
