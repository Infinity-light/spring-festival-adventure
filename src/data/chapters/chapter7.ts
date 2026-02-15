import type { StoryNode } from '@/types/game'

const chapter7Nodes: Record<string, StoryNode> = {
  ch7_ending: {
    id: 'ch7_ending',
    chapter: 7,
    title: '第七章：结局',
    narrative: [
      '春节回家历险记，到此结束。',
      '让我们来看看你的旅途成绩单……',
    ],
    choices: [
      {
        id: 'ch7_view_ending',
        text: '查看我的结局',
        effects: [],
        nextNodeId: 'game_end',
      },
    ],
  },
}

export default chapter7Nodes
