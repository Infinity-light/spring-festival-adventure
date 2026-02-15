'use client'

import { useMemo } from 'react'

interface ParticleEffectProps {
  type: 'redpacket' | 'firework' | 'blessing'
  count?: number
}

const FIREWORK_EMOJIS = ['✨', '🎆', '🎇', '⭐']

const contentMap = {
  redpacket: () => '🧧',
  firework: () => FIREWORK_EMOJIS[Math.floor(Math.random() * FIREWORK_EMOJIS.length)],
  blessing: () => '福',
}

export default function ParticleEffect({ type, count = 15 }: ParticleEffectProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
        size: type === 'blessing' ? 16 + Math.random() * 16 : 20 + Math.random() * 16,
        content: contentMap[type](),
      })),
    [type, count],
  )

  return (
    <div
      className="particle-container"
      style={{ position: 'fixed', inset: 0, zIndex: 10, pointerEvents: 'none', overflow: 'hidden' }}
    >
      <style>{`
        @keyframes pFall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          50% { transform: translateY(50vh) translateX(15px) rotate(180deg); opacity: 1; }
          100% { transform: translateY(110vh) translateX(-10px) rotate(360deg); opacity: 0; }
        }
        @keyframes pFirework {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          40% { transform: translateY(-50vh) scale(1.3); opacity: 1; }
          70% { transform: translateY(-60vh) scale(1.8); opacity: 0.6; }
          100% { transform: translateY(-70vh) scale(0.5); opacity: 0; }
        }
        @keyframes pBlessing {
          0% { transform: translateY(-10vh) rotate(-15deg); opacity: 0.9; }
          50% { transform: translateY(50vh) rotate(15deg); opacity: 0.7; }
          100% { transform: translateY(110vh) rotate(-10deg); opacity: 0; }
        }
      `}</style>
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: type === 'firework' ? 'auto' : '0',
            bottom: type === 'firework' ? '0' : 'auto',
            fontSize: p.size,
            animation: `${
              type === 'redpacket' ? 'pFall' : type === 'firework' ? 'pFirework' : 'pBlessing'
            } ${p.duration}s ${p.delay}s ease-in-out infinite`,
            color: type === 'blessing' ? 'var(--color-festival-red)' : undefined,
            fontWeight: type === 'blessing' ? 'bold' : undefined,
            willChange: 'transform, opacity',
          }}
        >
          {p.content}
        </span>
      ))}
    </div>
  )
}
