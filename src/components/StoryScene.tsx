'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { StoryNode, Choice, ResourceEffect } from '@/types/game'
import ChoiceButton from '@/components/ChoiceButton'

interface StorySceneProps {
  node: StoryNode
  narrativeIndex: number
  onAdvance: () => void
  onChoose: (choice: Choice) => void
  isChoosing: boolean
  feedbackText?: string | null
  feedbackEffects?: ResourceEffect[]
  onDismissFeedback?: () => void
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

const RESOURCE_LABELS: Record<string, { icon: string; name: string }> = {
  stamina: { icon: '体', name: '体力' },
  money: { icon: '财', name: '钱包' },
  mood: { icon: '心', name: '心情' },
}

export default function StoryScene({
  node,
  narrativeIndex,
  onAdvance,
  onChoose,
  isChoosing,
  feedbackText,
  feedbackEffects,
  onDismissFeedback,
}: StorySceneProps) {
  const visibleParagraphs = node.narrative.slice(0, narrativeIndex + 1)
  const hasMoreNarrative = narrativeIndex < node.narrative.length - 1
  const isTappable = !!feedbackText || hasMoreNarrative

  const handleTap = () => {
    if (feedbackText) {
      onDismissFeedback?.()
    } else if (hasMoreNarrative) {
      onAdvance()
    }
  }

  return (
    <motion.div
      key={node.id}
      className={`flex flex-col flex-1 min-h-0 px-6 py-8 ${isTappable ? 'cursor-pointer' : ''}`}
      onClick={isTappable ? handleTap : undefined}
      {...SCENE_FADE}
      transition={SCENE_TRANSITION}
    >
      {/* 章节标题 */}
      {node.title && (
        <div className="text-center mb-6">
          <span className="text-xs tracking-[0.2em] text-text-secondary uppercase">Chapter {node.chapter}</span>
          <h2 className="text-base font-semibold text-festival-red mt-1">
            {node.title}
          </h2>
        </div>
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

        {/* Feedback 内嵌在叙事区域 */}
        {feedbackText && (
          <motion.div
            key="feedback-inline"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="bg-white/80 border border-festival-red/12 rounded-xl px-5 py-4 shadow-sm"
          >
            {feedbackEffects && feedbackEffects.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {feedbackEffects.map((effect, i) => {
                  const info = RESOURCE_LABELS[effect.resource]
                  const isPositive = effect.delta > 0
                  return (
                    <span
                      key={i}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                        isPositive
                          ? 'bg-green-500/10 text-green-600'
                          : 'bg-red-500/10 text-red-500'
                      }`}
                    >
                      <span>{info?.icon}</span>
                      <span>{isPositive ? '+' : ''}{effect.delta}</span>
                    </span>
                  )
                })}
              </div>
            )}
            <p className="text-base leading-relaxed text-text-primary/90 italic">
              {feedbackText}
            </p>
          </motion.div>
        )}
      </div>

      {/* 底部操作区 */}
      <div className="shrink-0 flex flex-col items-center gap-3">
        {(feedbackText || hasMoreNarrative) ? (
          <div className="flex flex-col items-center gap-1 text-text-secondary py-2 pointer-events-none">
            <span className="text-sm">{feedbackText ? '点击任意处继续' : '继续'}</span>
            <motion.span animate={BOUNCE_Y} className="text-lg">
              ↓
            </motion.span>
          </div>
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
