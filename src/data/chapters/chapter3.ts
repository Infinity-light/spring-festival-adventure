import type { StoryNode } from '@/types/game'

const chapter3Nodes: Record<string, StoryNode> = {
  ch3_start: {
    id: 'ch3_start',
    chapter: 3,
    title: '第三章：旅途奇遇',
    narrative: [
      '旅途过半，你以为最难的部分已经过去了。',
      '然而命运这东西，总喜欢在你放松警惕的时候给你来一下。',
      '本马的春运奇遇记，正式开始。',
    ],
    choices: [
      {
        id: 'ch3_start_continue',
        text: '继续',
        effects: [],
        nextNodeId: 'ch3_talkative_uncle',
      },
    ],
  },

  ch3_talkative_uncle: {
    id: 'ch3_talkative_uncle',
    chapter: 3,
    narrative: [
      '旁边坐着一位大叔，看起来很想聊天。',
      '他热情地递过来一个橘子：\'小伙子，去哪儿啊？\'',
      '来了来了，春运社交名场面。',
      '大叔开始了他的人生故事：从下岗再就业到炒股亏了二十万再到儿子考上985……',
    ],
    choices: [
      {
        id: 'ch3_uncle_chat',
        text: '热情回应，陪他聊',
        effects: [
          { resource: 'mood', delta: 10, message: '社交达马' },
          { resource: 'stamina', delta: -20, message: '社交达马' },
        ],
        nextNodeId: 'ch3_fainted',
      },
      {
        id: 'ch3_uncle_sleep',
        text: '假装睡着',
        effects: [
          { resource: 'stamina', delta: 5, message: '装睡技能MAX' },
          { resource: 'mood', delta: -5, message: '装睡技能MAX' },
        ],
        nextNodeId: 'ch3_fainted',
      },
      {
        id: 'ch3_uncle_earphone',
        text: '戴上耳机，礼貌微笑',
        effects: [
          { resource: 'mood', delta: 5 },
          { resource: 'stamina', delta: -5 },
        ],
        nextNodeId: 'ch3_fainted',
      },
    ],
  },

  ch3_fainted: {
    id: 'ch3_fainted',
    chapter: 3,
    narrative: [
      '突然，前面传来一阵骚动。',
      '有人晕倒了！一位老奶奶脸色苍白，旁边的人手忙脚乱。',
      '有人喊：\'有没有人会急救？！\'',
      '本马……好像在B站看过急救视频？',
    ],
    choices: [
      {
        id: 'help_fainted',
        text: '冲上去帮忙！',
        effects: [
          { resource: 'stamina', delta: -30, message: '见义勇为的好马' },
          { resource: 'mood', delta: 20, message: '见义勇为的好马' },
        ],
        nextNodeId: 'ch3_ex',
      },
      {
        id: 'ch3_fainted_call',
        text: '帮忙打120，但不敢上手',
        effects: [
          { resource: 'stamina', delta: -5 },
          { resource: 'mood', delta: 5 },
        ],
        nextNodeId: 'ch3_ex',
      },
      {
        id: 'ch3_fainted_ignore',
        text: '假装没看见……',
        effects: [{ resource: 'mood', delta: -20, message: '良心有点痛' }],
        nextNodeId: 'ch3_ex',
      },
    ],
  },

  ch3_ex: {
    id: 'ch3_ex',
    chapter: 3,
    narrative: [
      '你回到座位，抬头一看——',
      '对面坐着的那个人……怎么越看越眼熟？',
      '！！！是你的前任！！！',
      '这概率比中彩票还低吧？？？',
      '对方也认出了你，空气突然安静了。',
    ],
    choices: [
      {
        id: 'ch3_ex_greet',
        text: '大方打招呼：\'好久不见！\'',
        effects: [
          { resource: 'mood', delta: 10, message: '成熟的马儿' },
          { resource: 'stamina', delta: -10, message: '成熟的马儿' },
        ],
        nextNodeId: 'ch3_end',
      },
      {
        id: 'ch3_ex_run',
        text: '假装上厕所，溜了溜了',
        effects: [
          { resource: 'stamina', delta: -15, message: '三十六计走为上' },
          { resource: 'mood', delta: 5, message: '三十六计走为上' },
        ],
        nextNodeId: 'ch3_end',
      },
      {
        id: 'ch3_ex_phone',
        text: '低头玩手机，当没看见',
        effects: [{ resource: 'mood', delta: -10, message: '尴尬到脚趾抠地' }],
        nextNodeId: 'ch3_end',
      },
    ],
  },

  ch3_end: {
    id: 'ch3_end',
    chapter: 3,
    narrative: [
      '经历了这些奇遇，你感觉这趟旅途比预想的精彩多了。',
      '不过……目的地快到了！',
      '本马即将着陆！',
    ],
    choices: [
      {
        id: 'ch3_end_continue',
        text: '到站了！',
        effects: [],
        nextNodeId: 'ch4_start',
      },
    ],
  },
}

export default chapter3Nodes
