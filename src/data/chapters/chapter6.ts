import type { StoryNode } from '@/types/game'

const chapter6Nodes: Record<string, StoryNode> = {
  ch6_start: {
    id: 'ch6_start',
    chapter: 6,
    title: '第六章：年夜饭大作战',
    narrative: [
      '除夕夜，厨房里热气腾腾，客厅里春晚已经开始了。',
      '你妈在厨房忙得团团转，你爸在沙发上嗑瓜子看电视。',
      '本马作为新时代好青年，当然要帮忙！',
    ],
    choices: [
      {
        id: 'ch6_start_continue',
        text: '进厨房帮忙',
        effects: [],
        nextNodeId: 'ch6_cook',
      },
    ],
  },

  ch6_cook: {
    id: 'ch6_cook',
    chapter: 6,
    narrative: [
      '你妈递给你一把菜刀：\'来，把这条鱼处理一下。\'',
      '你看着这条活蹦乱跳的鱼，陷入了沉思。',
      '本马……在大城市都是点外卖的啊。',
    ],
    choices: [
      {
        id: 'help_cook_success',
        text: '硬着头皮上！',
        effects: [
          { resource: 'stamina', delta: -15, message: '居然成功了！' },
          { resource: 'mood', delta: 20, message: '居然成功了！' },
        ],
        nextNodeId: 'ch6_redpacket',
      },
      {
        id: 'ch6_cook_learn',
        text: '求助老妈手把手教',
        effects: [
          { resource: 'stamina', delta: -10, message: '学到了新技能' },
          { resource: 'mood', delta: 10, message: '学到了新技能' },
        ],
        nextNodeId: 'ch6_redpacket',
      },
      {
        id: 'ch6_cook_escape',
        text: '溜去客厅看春晚',
        effects: [
          { resource: 'mood', delta: 5, message: '成功摸鱼' },
          { resource: 'stamina', delta: 5, message: '成功摸鱼' },
        ],
        nextNodeId: 'ch6_redpacket',
      },
    ],
  },

  ch6_redpacket: {
    id: 'ch6_redpacket',
    chapter: 6,
    narrative: [
      '叮！家族群炸了——有人发红包了！',
      '你以迅雷不及掩耳之势掏出手机。',
      '抢红包，本马从不手软！',
      '结果……你抢到了0.01元。',
      '发红包的是你二叔，他发了个100块的红包，被20个人抢。',
    ],
    choices: [
      {
        id: 'ch6_redpacket_send',
        text: '也发一个红包，礼尚往来',
        effects: [
          { resource: 'money', delta: -200, message: '大方的马' },
          { resource: 'mood', delta: 15, message: '大方的马' },
        ],
        nextNodeId: 'ch6_cctv',
      },
      {
        id: 'ch6_redpacket_emoji',
        text: '发个表情包：谢谢老板',
        effects: [
          { resource: 'mood', delta: 5 },
        ],
        nextNodeId: 'ch6_cctv',
      },
      {
        id: 'ch6_redpacket_wait',
        text: '继续蹲守，等下一个红包',
        effects: [
          { resource: 'mood', delta: 10, message: '红包猎手' },
        ],
        nextNodeId: 'ch6_cctv',
      },
    ],
  },

  ch6_cctv: {
    id: 'ch6_cctv',
    chapter: 6,
    narrative: [
      '春晚进行到了小品环节。',
      '你爸笑得前仰后合，你妈说\'这都什么啊\'，你表弟在发弹幕。',
      '一家人最重要的就是整整齐齐地吐槽春晚。',
    ],
    choices: [
      {
        id: 'ch6_cctv_watch',
        text: '认真看，其实还挺有意思',
        effects: [
          { resource: 'mood', delta: 10 },
          { resource: 'stamina', delta: 5 },
        ],
        nextNodeId: 'ch6_fireworks',
      },
      {
        id: 'ch6_cctv_roast',
        text: '边看边发朋友圈吐槽',
        effects: [
          { resource: 'mood', delta: 15, message: '吐槽大师' },
        ],
        nextNodeId: 'ch6_fireworks',
      },
      {
        id: 'ch6_cctv_sleep',
        text: '看着看着睡着了',
        effects: [
          { resource: 'stamina', delta: 20, message: '春晚催眠曲' },
          { resource: 'mood', delta: -5, message: '春晚催眠曲' },
        ],
        nextNodeId: 'ch6_fireworks',
      },
    ],
  },

  ch6_fireworks: {
    id: 'ch6_fireworks',
    chapter: 6,
    narrative: [
      '十一点半，你爸拿出了一箱烟花：\'走，放烟花去！\'',
      '村口已经噼里啪啦响成一片，空气中弥漫着火药味。',
      '这才是过年的味道！',
    ],
    choices: [
      {
        id: 'ch6_fireworks_light',
        text: '亲自点燃最大的那个！',
        effects: [
          { resource: 'stamina', delta: -10, message: '烟花太美了' },
          { resource: 'mood', delta: 25, message: '烟花太美了' },
        ],
        nextNodeId: 'ch6_end',
      },
      {
        id: 'ch6_fireworks_photo',
        text: '负责拍照录像',
        effects: [
          { resource: 'mood', delta: 15, message: '记录美好瞬间' },
        ],
        nextNodeId: 'ch6_end',
      },
      {
        id: 'ch6_fireworks_indoor',
        text: '在屋里看，外面太冷了',
        effects: [
          { resource: 'stamina', delta: 5 },
          { resource: 'mood', delta: 10 },
        ],
        nextNodeId: 'ch6_end',
      },
    ],
  },

  ch6_end: {
    id: 'ch6_end',
    chapter: 6,
    narrative: [
      '十二点的钟声敲响了！',
      '烟花在夜空中绽放，照亮了整个村庄。',
      '你妈端来了热腾腾的饺子：\'来，吃饺子，新年快乐！\'',
      '新年快乐！本马……到家了。',
      '这一路的奔波、折腾、欢笑、崩溃，都值了。',
      '你的春节回家历险记，到此结束。',
    ],
    choices: [
      {
        id: 'ch6_end_continue',
        text: '查看结局',
        effects: [],
        nextNodeId: 'ch7_ending',
      },
    ],
  },
}

export default chapter6Nodes
