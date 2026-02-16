'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { loadUnlocked } from '@/lib/achievements'

export default function AfterwordPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const unlocked = loadUnlocked()
    const hasEnding = Object.keys(unlocked).some((k) => k.startsWith('ending_'))
    if (!hasEnding) {
      router.replace('/')
    } else {
      setReady(true)
    }
  }, [router])

  if (!ready) return null

  return (
    <div className="min-h-screen bg-bg-main flex flex-col items-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <p className="text-5xl mb-4">📝</p>
          <h1 className="text-2xl font-bold text-festival-red-dark">
            后日谈
          </h1>
        </div>

        <div className="bg-bg-card border border-border rounded-2xl p-6 sm:p-8 mb-8">
          <div className="text-text-secondary text-[15px] leading-[2] text-left">

            <p>感谢你能玩到这里，这里是水中鱼。</p>

            <br />

            <p>
              又到了碎碎念的后日谈环节，那么就来讲一下项目的来龙去脉吧。
            </p>

            <br />

            <p>
              老实来说，这个项目的诞生起源于一个巧合。
            </p>

            <br />

            <p>
              这段时间以来，我一直在研究全自动化的 AI 开发工作流，磨合了很多项目，但始终缺乏一点创造的灵感。恰好昨天下午，我的朋友小X送了我一只小马挂件。
            </p>

            {/* 马图 */}
            <div className="flex justify-center my-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/afterword-horse.png"
                alt="小马挂件"
                className="w-48 rounded-xl shadow-md"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>

            <p>
              当时恰好没什么礼物可回，于是灵机一动，想着是否可以借此机会开发一款春节贺岁的小游戏，也算是回馈给朋友一点小惊喜。
            </p>

            <br />

            <p>
              于是从昨晚开始，吭哧吭哧做了大约 20 个小时，就有了现在这个作品。
            </p>

            <br />

            <p>
              不可否认的是，AI 发展至今已经对我们的开发流程产生了巨大的冲击和改变。这个项目是基于 Next.js 的，但是在此之前，我一年来都在写 Vue，没有接触过任何一款 React 应用，更遑论 Next.js 了。
            </p>

            <br />

            <p>
              仅仅 4 个小时的时间，AI 自动帮我探索、规划、迭代、部署、发版，就做好了这个应用的第一个版本。此后，我一路开着 YOLO 模式跟 AI 讨论需求，又连续迭代了几个版本，就有了现在这个样子。
            </p>

            <br />

            <p>
              这个项目已经开源在了{' '}
              <a
                href="https://github.com/Infinity-light/spring-festival-adventure"
                target="_blank"
                rel="noopener noreferrer"
                className="text-festival-red underline underline-offset-2 hover:opacity-80"
              >
                GitHub
              </a>
              {' '}上，感兴趣的朋友可以看看。
            </p>

            <br />

            <p>
              从 15 号 17:30 发布第一个 commit，直到 16 号凌晨 2 点正式上线，期间经历的时间也不过一天而已。
            </p>

            <br />

            <p>
              可以说，软件工程的时代或许已经真的结束了。
            </p>

            <br />

            <p>
              这段时间以来，伴随着 Open Claw 的爆火和新一代模型的竞相发布，我身边走在 AI 时代最前沿的工程师们，也或多或少地陷入了某种恐慌和无措之中。
            </p>

            <br />

            <p>
              AI 可以替我们做一切了，那我们存在的意义是什么呢？
            </p>

            <p>
              AI 替我们做的，任何人都能做，那我们还有什么存在的必要性呢？
            </p>

            <br />

            <p>
              这种对自我社会存在的质疑，在软件界开始蔓延。想来可能在不久的将来，或许就是 2026 年，会大规模地以行业智能化的形式向各行各业开始蔓延。
            </p>

            <br />

            <p>
              60 年前，所有人都期盼着一个人人平等、按需分配、物质极大丰富的社会到来，但是没有人真正能够理解所谓共产主义社会到底是什么样子。
            </p>

            <br />

            <p>
              60 年后的今天，似乎这样的社会真的开始席卷而来了，但是我们却又开始不得不面对这样一个问题：
            </p>

            <br />

            <p className="text-center text-text-primary font-medium">
              我们的心智真的准备好了吗？
            </p>

            <br />

            <p>
              我想面对这样的问题，每个人都有属于自己的答案。
            </p>

            <br />

            <p>
              这款小马春节回家历险记就是对这个问题的一种回答：无论世界和时光如何变迁，我们作为人的本真是不变的。就像是游戏里的小马一样，不管遇见了多少艰难险阻，最终总是要回家——回到那个或许充满了琐碎和喧闹，但最终总能够让自己的心安宁下来的地方。
            </p>

            <br />

            <p>
              或许明天，新的时代就将来临。
            </p>

            <br />

            <p>
              值此辞旧迎新、除夕佳节之际，小鱼谨祝大家能够找到并坚定自己内心真正想守护或追寻的事物，找到并握紧属于自己的主体性。
            </p>

            <br />

            <p>
              因为我们相信，在 AI 对人的十倍、百倍、千万倍的助力下，未来将是一个属于梦想家的时代。
            </p>

            <br />

            <p>
              而真正的梦想家，正是那些内心有着纯澈而坚定的热爱，并且无论如何都愿意为之奋斗不息的人。
            </p>

            <br />
            <br />

            <div className="border-t border-border/50 pt-5 mt-2">
              <p className="italic text-sm text-text-secondary/70 leading-[1.9]">
                最后，就以一本老书中的话结尾吧：
              </p>
              <br />
              <p className="italic text-sm text-text-secondary/70 leading-[1.9]">
                &ldquo;……我相信，爱是无法被虚拟世界所创造的。你们可以创造 AI，但你们无法创造爱。虽然这两个字的拼写是一样的，但它们的意义绝不相同。&rdquo;
              </p>
              <p className="text-right text-sm text-text-secondary/50 mt-3">
                ——《英雄监狱》黄溢
              </p>
            </div>

            <br />

            <p className="text-right text-text-secondary/60 text-sm">
              水中鱼
              <br />
              2026 年除夕
            </p>

          </div>
        </div>

        <div className="text-center">
          <Link href="/">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-6 py-2.5 rounded-full border-2 border-festival-gold text-festival-gold font-medium cursor-pointer transition-colors hover:bg-festival-gold/10"
            >
              返回首页
            </motion.span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
