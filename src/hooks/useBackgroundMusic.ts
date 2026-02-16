import { useEffect, useRef, useCallback } from 'react'

/**
 * 通用背景音乐 hook。
 * - active 为 true 时淡入播放指定音源
 * - active 变为 false 时淡出停止
 */
export function useBackgroundMusic(src: string, active: boolean) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const srcRef = useRef(src)
  const fadeTimer = useRef<ReturnType<typeof setInterval> | null>(null)

  // 懒初始化 Audio 实例（仅客户端）
  const getAudio = useCallback(() => {
    if (typeof window === 'undefined') return null
    if (!audioRef.current || srcRef.current !== src) {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      const a = new Audio(src)
      a.loop = true
      a.volume = 0
      audioRef.current = a
      srcRef.current = src
    }
    return audioRef.current
  }, [src])

  useEffect(() => {
    const audio = getAudio()
    if (!audio) return

    if (fadeTimer.current) {
      clearInterval(fadeTimer.current)
      fadeTimer.current = null
    }

    if (active) {
      // 淡入
      audio.volume = 0
      audio.play().catch(() => {})
      fadeTimer.current = setInterval(() => {
        if (audio.volume < 0.45) {
          audio.volume = Math.min(audio.volume + 0.05, 0.5)
        } else {
          if (fadeTimer.current) clearInterval(fadeTimer.current)
          fadeTimer.current = null
        }
      }, 100)
    } else if (!audio.paused) {
      // 淡出
      fadeTimer.current = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(audio.volume - 0.05, 0)
        } else {
          audio.pause()
          audio.currentTime = 0
          audio.volume = 0
          if (fadeTimer.current) clearInterval(fadeTimer.current)
          fadeTimer.current = null
        }
      }, 80)
    }

    return () => {
      if (fadeTimer.current) {
        clearInterval(fadeTimer.current)
        fadeTimer.current = null
      }
    }
  }, [active, getAudio])

  /** 立即停止（用于 restart） */
  const stop = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (fadeTimer.current) {
      clearInterval(fadeTimer.current)
      fadeTimer.current = null
    }
    audio.pause()
    audio.currentTime = 0
    audio.volume = 0
  }, [])

  return { stop }
}
