import type { StoryNode } from '@/types/game'

const chapter2Nodes: Record<string, StoryNode> = {
  ch2_start: {
    id: 'ch2_start',
    chapter: 2,
    title: '第二章：春运大作战',
    narrative: [
      '出发了！一千公里的回家路，正式开始。',
      '你深吸一口气，融入了浩浩荡荡的春运大军。',
      '🐴 据说今年春运预计发送旅客40亿人次……本马就是四十亿分之一。',
    ],
    choices: [
      {
        id: 'ch2_start_train',
        text: '冲向火车站！',
        emoji: '🚂',
        effects: [],
        nextNodeId: 'ch2_train_1',
        condition: { type: 'choice_made', choiceId: 'start_train' },
      },
      {
        id: 'ch2_start_car',
        text: '发动小破车！',
        emoji: '🚗',
        effects: [],
        nextNodeId: 'ch2_car_1',
        condition: { type: 'choice_made', choiceId: 'start_car' },
      },
      {
        id: 'ch2_start_plane',
        text: '奔向机场！',
        emoji: '✈️',
        effects: [],
        nextNodeId: 'ch2_plane_1',
        condition: { type: 'choice_made', choiceId: 'start_plane' },
      },
    ],
  },

  // ==================== 火车线 ====================

  ch2_train_1: {
    id: 'ch2_train_1',
    chapter: 2,
    narrative: [
      '火车站人山人海，你拖着行李箱在人群中艰难前行。',
      '广播响起：\'开往XX的K1234次列车即将检票……\'',
      '你看了看检票口排的队，大概有……三百米？',
      '🐴 本马四条腿，冲！！！',
    ],
    choices: [
      {
        id: 'ch2_train1_rush',
        text: '拼命挤！用行李箱开路',
        emoji: '🏃',
        effects: [
          { resource: 'stamina', delta: -20, message: '体力大量消耗😵' },
          { resource: 'mood', delta: -10 },
        ],
        nextNodeId: 'ch2_train_2',
      },
      {
        id: 'ch2_train1_sneak',
        text: '找个侧门绕过去',
        emoji: '🧠',
        effects: [
          { resource: 'stamina', delta: -5, message: '聪明的马儿🧠' },
          { resource: 'mood', delta: 5 },
        ],
        nextNodeId: 'ch2_train_2',
      },
    ],
  },

  ch2_train_2: {
    id: 'ch2_train_2',
    chapter: 2,
    narrative: [
      '你终于挤上了车，发现车厢里已经塞满了人。',
      '过道里站满了人，行李架上塞满了蛇皮袋，空气中弥漫着泡面和橘子的味道。',
      '你的站票意味着……接下来12个小时，你得找个地方站着。',
      '🐴 本马的四条腿，终于派上用场了。',
    ],
    choices: [
      {
        id: 'ch2_train2_upgrade',
        text: '找列车员商量补卧铺',
        emoji: '🪑',
        effects: [
          { resource: 'money', delta: -400, message: '花钱买舒适💸' },
          { resource: 'stamina', delta: 20 },
          { resource: 'mood', delta: 15 },
        ],
        nextNodeId: 'ch2_train_3',
      },
      {
        id: 'ch2_train2_squat',
        text: '在行李架旁边找个角落蹲着',
        emoji: '📦',
        effects: [
          { resource: 'stamina', delta: -15 },
          { resource: 'mood', delta: -10 },
        ],
        nextNodeId: 'ch2_train_3',
      },
      {
        id: 'ch2_train2_noodle',
        text: '先吃碗泡面冷静一下',
        emoji: '🍜',
        effects: [
          { resource: 'stamina', delta: 5, message: '泡面真香🍜' },
          { resource: 'mood', delta: 5 },
        ],
        nextNodeId: 'ch2_train_3',
      },
    ],
  },

  ch2_train_3: {
    id: 'ch2_train_3',
    chapter: 2,
    narrative: [
      '列车开了三个小时后，突然停了。',
      '广播：\'各位旅客，由于前方线路故障，列车临时停车，请耐心等待。\'',
      '一个小时过去了……两个小时过去了……',
      '车厢里开始躁动，有人打电话抱怨，有人开始打牌。',
      '🐴 本马的耐心正在以肉眼可见的速度消失。',
    ],
    choices: [
      {
        id: 'ch2_train3_cards',
        text: '加入打牌大军，打发时间',
        emoji: '🃏',
        effects: [
          { resource: 'mood', delta: 10, message: '输了点小钱🃏' },
          { resource: 'money', delta: -50 },
        ],
        nextNodeId: 'ch2_end',
      },
      {
        id: 'ch2_train3_sleep',
        text: '闭眼休息，养精蓄锐',
        emoji: '😴',
        effects: [
          { resource: 'stamina', delta: 15 },
          { resource: 'mood', delta: -5 },
        ],
        nextNodeId: 'ch2_end',
      },
      {
        id: 'ch2_train3_phone',
        text: '刷手机吐槽，发朋友圈',
        emoji: '📱',
        effects: [
          { resource: 'mood', delta: 5, message: '获得32个赞👍' },
        ],
        nextNodeId: 'ch2_end',
      },
    ],
  },

  // ==================== 自驾线 ====================

  ch2_car_1: {
    id: 'ch2_car_1',
    chapter: 2,
    narrative: [
      '你信心满满地开上了高速公路。',
      '前方一片红色尾灯，一眼望不到头。',
      '导航显示：前方拥堵15公里，预计通过时间……3小时。',
      '🐴 三小时？？？本马在城里堵车都没这么久过！',
    ],
    choices: [
      {
        id: 'ch2_car1_wait',
        text: '老实排队，听歌等着',
        emoji: '😤',
        effects: [
          { resource: 'stamina', delta: -15, message: '无聊到怀疑人生😤' },
          { resource: 'mood', delta: -15 },
        ],
        nextNodeId: 'ch2_car_2',
      },
      {
        id: 'ch2_car1_detour',
        text: '走国道绕行！',
        emoji: '🗺️',
        effects: [
          { resource: 'stamina', delta: -10, message: '多烧了不少油⛽' },
          { resource: 'money', delta: -30 },
        ],
        nextNodeId: 'ch2_car_2',
      },
    ],
  },

  ch2_car_2: {
    id: 'ch2_car_2',
    chapter: 2,
    narrative: [
      '终于到了服务区！你的膀胱已经发出了最后通牒。',
      '然而……厕所门口排了一条长龙。',
      '旁边的小卖部，一碗泡面卖15块，一瓶水卖8块。',
      '🐴 这是服务区还是抢劫？',
    ],
    choices: [
      {
        id: 'ch2_car2_toilet',
        text: '老实排队上厕所',
        emoji: '🚻',
        effects: [
          { resource: 'stamina', delta: -10 },
          { resource: 'mood', delta: -5 },
        ],
        nextNodeId: 'ch2_car_3',
      },
      {
        id: 'ch2_car2_noodle',
        text: '买高价泡面充饥',
        emoji: '💸',
        effects: [
          { resource: 'money', delta: -50, message: '天价泡面💸' },
          { resource: 'stamina', delta: 10 },
          { resource: 'mood', delta: -5 },
        ],
        nextNodeId: 'ch2_car_3',
      },
      {
        id: 'ch2_car2_both',
        text: '两个都要！排队+买泡面',
        emoji: '🏃',
        effects: [
          { resource: 'stamina', delta: -15 },
          { resource: 'money', delta: -50 },
          { resource: 'mood', delta: -10 },
        ],
        nextNodeId: 'ch2_car_3',
      },
    ],
  },

  ch2_car_3: {
    id: 'ch2_car_3',
    chapter: 2,
    narrative: [
      '重新上路后，导航突然说：\'前方道路封闭，正在为您重新规划路线。\'',
      '你跟着导航七拐八拐，开进了一个……村子。',
      '路越来越窄，两边是玉米地，前面是一条土路。',
      '🐴 导航你是认真的吗？？？',
      '这时候油表亮了黄灯。',
    ],
    choices: [
      {
        id: 'ch2_car3_back',
        text: '掉头回高速，别冒险',
        emoji: '🔙',
        effects: [
          { resource: 'stamina', delta: -10, message: '白跑一趟😩' },
          { resource: 'money', delta: -100 },
          { resource: 'mood', delta: -10 },
        ],
        nextNodeId: 'ch2_end',
      },
      {
        id: 'ch2_car3_gamble',
        text: '继续走，说不定是捷径',
        emoji: '🤞',
        effects: [
          { resource: 'stamina', delta: -5, message: '赌一把🎲' },
          { resource: 'mood', delta: -20 },
        ],
        nextNodeId: 'ch2_end',
      },
      {
        id: 'ch2_car3_village',
        text: '进村问路，顺便加油',
        emoji: '🏘️',
        effects: [
          { resource: 'money', delta: -80, message: '村民很热情🏘️' },
          { resource: 'mood', delta: 5 },
          { resource: 'stamina', delta: 5 },
        ],
        nextNodeId: 'ch2_end',
      },
    ],
  },

  // ==================== 飞机线 ====================

  ch2_plane_1: {
    id: 'ch2_plane_1',
    chapter: 2,
    narrative: [
      '你提前三小时到了机场，安检、候机，一切顺利。',
      '然后……大屏幕上你的航班状态变成了红色：\'延误\'。',
      '半小时后，变成了：\'取消\'。',
      '🐴 ？？？？？',
      '原因：目的地暴雪，机场关闭。',
    ],
    choices: [
      {
        id: 'ch2_plane1_rebook',
        text: '改签明天的航班',
        emoji: '🔄',
        effects: [
          { resource: 'mood', delta: -20, message: '心态崩了😤' },
          { resource: 'stamina', delta: -10 },
        ],
        nextNodeId: 'ch2_plane_2',
      },
      {
        id: 'ch2_plane1_refund',
        text: '退票，改坐高铁！',
        emoji: '💰',
        effects: [
          { resource: 'money', delta: 1500 },
          { resource: 'money', delta: -800, message: '折腾一圈💫' },
          { resource: 'stamina', delta: -15 },
        ],
        nextNodeId: 'ch2_plane_2',
      },
      {
        id: 'ch2_plane1_argue',
        text: '找航空公司理论要赔偿',
        emoji: '😡',
        effects: [
          { resource: 'mood', delta: -10, message: '据理力争💪' },
          { resource: 'stamina', delta: -20 },
          { resource: 'money', delta: 200 },
        ],
        nextNodeId: 'ch2_plane_2',
      },
    ],
  },

  ch2_plane_2: {
    id: 'ch2_plane_2',
    chapter: 2,
    narrative: [
      '不管怎样，今晚是走不了了。',
      '机场里到处都是滞留旅客，座椅上躺满了人。',
      '你找了个角落，用外套当枕头，准备凑合一晚。',
      '🐴 本马从来没想过，有一天会睡在机场地板上。',
    ],
    choices: [
      {
        id: 'ch2_plane2_hotel',
        text: '咬牙订个机场酒店',
        emoji: '🏨',
        effects: [
          { resource: 'money', delta: -400, message: '花钱买安心🏨' },
          { resource: 'stamina', delta: 25 },
          { resource: 'mood', delta: 10 },
        ],
        nextNodeId: 'ch2_end',
      },
      {
        id: 'ch2_plane2_floor',
        text: '就地躺平，省钱要紧',
        emoji: '😴',
        effects: [
          { resource: 'stamina', delta: -20, message: '腰酸背痛😴' },
          { resource: 'mood', delta: -15 },
        ],
        nextNodeId: 'ch2_end',
      },
      {
        id: 'ch2_plane2_allnight',
        text: '通宵刷手机，反正睡不着',
        emoji: '☕',
        effects: [
          { resource: 'stamina', delta: -25, message: '熬夜冠军🏆' },
          { resource: 'mood', delta: 5 },
        ],
        nextNodeId: 'ch2_end',
      },
    ],
  },

  // ==================== 汇合点 ====================

  ch2_end: {
    id: 'ch2_end',
    chapter: 2,
    narrative: [
      '不管经历了什么，你终于熬过了旅途中最艰难的一段。',
      '距离老家，越来越近了。',
      '🐴 本马……还活着！',
      '但接下来的旅途，还有更多惊喜等着你……',
    ],
    choices: [
      {
        id: 'ch2_end_continue',
        text: '继续前进！',
        emoji: '➡️',
        effects: [],
        nextNodeId: 'ch3_start',
      },
    ],
  },
}

export default chapter2Nodes
