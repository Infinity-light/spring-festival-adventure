import type { StoryNode } from '@/types/game'

const chapter3Nodes: Record<string, StoryNode> = {
  ch3_talkative_uncle: {
    id: 'ch3_talkative_uncle',
    chapter: 3,
    title: '第三章：旅途奇遇',
    narrative: [
      '旅途过半，你以为最难的部分已经过去了。',
      '然而命运这东西，总喜欢在你放松警惕的时候给你来一下。',
      '旁边坐着一位大叔，看起来很想聊天。',
      '他热情地递过来一个橘子：\'小伙子，去哪儿啊？\'',
      '🐴 来了来了，春运社交名场面。',
      '大叔开始了他的人生故事：从下岗再就业到炒股亏了二十万再到儿子考上985……',
    ],
    choices: [
      {
        id: 'ch3_uncle_chat',
        text: '热情回应，陪他聊',
        effects: [
          { resource: 'mood', delta: 10, message: '社交达马🗣️' },
          { resource: 'stamina', delta: -10, message: '社交达马🗣️' },
        ],
        nextNodeId: 'ch3_fainted',
        feedback: '本马使出浑身解数配合大叔的节奏，从股市聊到房价再到养生。大叔感动得又塞了三个橘子过来，本马的社交电量已经见底了 🍊🔋',
      },
      {
        id: 'ch3_uncle_sleep',
        text: '假装睡着',
        effects: [
          { resource: 'stamina', delta: 5, message: '装睡技能MAX😴' },
          { resource: 'mood', delta: -5, message: '装睡技能MAX😴' },
        ],
        nextNodeId: 'ch3_fainted',
        feedback: '本马闭上眼睛，呼吸放缓，演技堪比影帝。但大叔的声音像穿墙术一样直接穿透了你的眼皮："小伙子你睡着了？那我小声点啊——"然后继续用同样的音量讲 😇',
      },
      {
        id: 'ch3_uncle_earphone',
        text: '戴上耳机，礼貌微笑',
        effects: [
          { resource: 'mood', delta: 5 },
          { resource: 'stamina', delta: -5 },
        ],
        nextNodeId: 'ch3_fainted',
        feedback: '耳机一戴，谁也不爱。大叔看了看你的耳机，识趣地转向了另一边的乘客。本马获得了短暂的和平 🎧✌️',
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
      '🐴 本马……好像在B站看过急救视频？',
    ],
    choices: [
      {
        id: 'help_fainted',
        text: '冲上去帮忙！',
        effects: [
          { resource: 'stamina', delta: -15, message: '见义勇为的好马🏥' },
          { resource: 'mood', delta: 25, message: '见义勇为的好马🏥' },
        ],
        nextNodeId: 'ch3_ex',
        feedback: '本马一个箭步冲上去，B站急救视频的记忆疯狂闪回。虽然手在抖，但好歹把老奶奶扶稳了，周围响起了掌声。本马今天是英雄马！🦸‍♂️',
      },
      {
        id: 'ch3_fainted_call',
        text: '帮忙打120，但不敢上手',
        effects: [
          { resource: 'stamina', delta: -5 },
          { resource: 'mood', delta: 5 },
        ],
        nextNodeId: 'ch3_ex',
        feedback: '本马掏出手机拨了120，冷静地描述了情况。虽然没敢亲自上手，但调度员说你做得对。间接救马也是救马！📞',
      },
      {
        id: 'ch3_fainted_ignore',
        text: '假装没看见……',
        effects: [{ resource: 'mood', delta: -20, message: '良心有点痛😶' }],
        nextNodeId: 'ch3_ex',
        feedback: '本马把头埋进手机里，假装在处理十万火急的工作消息。但余光一直在瞟那边的情况……良心这东西，真的会痛的 😶‍🌫️',
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
      '🐴 这概率比中彩票还低吧？？？',
      '对方也认出了你，空气突然安静了。',
    ],
    choices: [
      {
        id: 'ch3_ex_greet',
        text: '大方打招呼：\'好久不见！\'',
        effects: [
          { resource: 'mood', delta: 10, message: '成熟的马儿👋' },
          { resource: 'stamina', delta: -10, message: '成熟的马儿👋' },
        ],
        nextNodeId: 'ch3_end',
        feedback: '你挤出一个成熟的微笑，寒暄了几句。对方也礼貌地回应。空气中的尴尬浓度下降了50%，但你的心跳加速了200% 💓',
      },
      {
        id: 'ch3_ex_run',
        text: '假装上厕所，溜了溜了',
        effects: [
          { resource: 'stamina', delta: -15, message: '三十六计走为上🏃' },
          { resource: 'mood', delta: 5, message: '三十六计走为上🏃' },
        ],
        nextNodeId: 'ch3_end',
        feedback: '本马以迅雷不及掩耳之势弹射起步，直奔厕所方向。在厕所里蹲了二十分钟，腿都麻了，但至少保住了最后的体面 🚽💨',
      },
      {
        id: 'ch3_ex_phone',
        text: '低头玩手机，当没看见',
        effects: [{ resource: 'mood', delta: -10, message: '尴尬到脚趾抠地📱' }],
        nextNodeId: 'ch3_end',
        feedback: '两个人都在低头玩手机，但谁也没真的在看屏幕。空气凝固得可以切成块。本马的脚趾已经在鞋里抠出了三室一厅 📱😬',
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
        nextNodeId: 'ch4_luggage',
      },
    ],
  },
}

export default chapter3Nodes
