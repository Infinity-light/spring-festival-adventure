'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { StoryNode, Choice } from '@/types/game'
import ChoiceButton from '@/components/ChoiceButton'

interface StorySceneProps {
  node: StoryNode
  narrativeIndex: number
  onAdvance: () => void
  onChoose: (choice: Choice) => void
  isChoosing: boolean
}

const SCENE_FADE = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
const SCENE_TRANSITION = { duration: 0.6, ease: 'easeOut' as const }

const PARAGRAPH_VARIANTS = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const BOUNCE_Y = {
  y: [0, 6, 0],
  transition: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' as const },
}

export default function StoryScene({
  node,
  narrativeIndex,
  onAdvance,
  onChoose,
  isChoosing,
}: StorySceneProps) {
  const visibleParagraphs = node.narrative.slice(0, narrativeIndex + 1)
  const hasMoreNarrative = narrativeIndex < node.narrative.length - 1

  return (
    <motion.div
      key={node.id}
      className="flex flex-col flex-1 min-h-0 px-6 py-8"
      {...SCENE_FADE}
      transition={SCENE_TRANSITION}
    >
      {/* 章节标题 */}
      {node.title && (
        <h2 className="text-sm font-medium text-text-gold text-center tracking-widest mb-6">
          {node.title}
        </h2>
      )}

      {/* 叙事文本区域 */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-8">
        <AnimatePresence mode="sync">
          {visibleParagraphs.map((text, i) => (
            <motion.p
              key={`${node.id}-p-${i}`}
              variants={PARAGRAPH_VARIANTS}
              initial="hidden"
              animate="visible"
              className="text-lg leading-relaxed text-text-primary"
            >
              {text}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>

      {/* 底部操作区 */}
      <div className="shrink-0 flex flex-col items-center gap-3">
        {hasMoreNarrative ? (
          <button
            type="button"
            onClick={onAdvance}
            className="flex flex-col items-center gap-1 text-text-secondary hover:text-text-primary transition-colors py-2"
            aria-label="继续阅读"
          >
            <span className="text-sm">继续</span>
            <motion.span animate={BOUNCE_Y} className="text-lg">
              ↓
            </motion.span>
          </button>
        ) : (
          <AnimatePresence mode="sync">
            {node.choices.map((choice, index) => (
              <motion.div
                key={choice.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.35 }}
                className="w-full max-w-md"
              >
                <ChoiceButton
                  choice={choice}
                  index={index}
                  disabled={isChoosing}
                  onChoose={onChoose}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  )
}
