import type { StoryNode } from '@/types/game'

const chapter4Nodes: Record<string, StoryNode> = {
  ch4_start: {
    id: 'ch4_start',
    chapter: 4,
    title: '第四章：到站风波',
    narrative: [
      '终于到了！你拖着行李走出站台，深吸一口家乡的空气。',
      '嗯……空气里有一股烧秸秆的味道，熟悉的感觉。',
      '家的味道！',
      '但是，到站不等于到家。接下来还有一系列挑战……',
    ],
    choices: [
      {
        id: 'ch4_start_continue',
        text: '继续',
        effects: [],
        nextNodeId: 'ch4_luggage',
      },
    ],
  },

  ch4_luggage: {
    id: 'ch4_luggage',
    chapter: 4,
    narrative: [
      '你在行李转盘前等了半天，终于看到一个和你的箱子很像的行李。',
      '你拿起来一看——咦，这个贴纸不是我的啊？',
      '你打开一看：里面全是女装。',
      '？？？本马的行李呢？？？',
    ],
    choices: [
      {
        id: 'ch4_luggage_staff',
        text: '赶紧找工作人员处理',
        effects: [
          { resource: 'stamina', delta: -10, message: '折腾一番' },
          { resource: 'mood', delta: -10, message: '折腾一番' },
        ],
        nextNodeId: 'ch4_pickup',
      },
      {
        id: 'ch4_luggage_shout',
        text: '在候车厅大喊：谁拿错行李了！',
        effects: [
          { resource: 'stamina', delta: -5, message: '社死现场' },
          { resource: 'mood', delta: -15, message: '社死现场' },
        ],
        nextNodeId: 'ch4_pickup',
      },
      {
        id: 'ch4_luggage_ignore',
        text: '算了，先回家再说',
        effects: [{ resource: 'mood', delta: -5 }],
        nextNodeId: 'ch4_pickup',
      },
    ],
  },

  ch4_pickup: {
    id: 'ch4_pickup',
    chapter: 4,
    narrative: [
      '你走出出站口，在人群中寻找来接你的人。',
      '你爸说他在出口等你，穿红色羽绒服。',
      '你环顾四周——穿红色羽绒服的人大概有……五十个？',
      '爸，你能不能穿个显眼点的？',
      '打了三个电话，终于在停车场找到了你爸。他正在车里睡觉。',
    ],
    choices: [
      {
        id: 'ch4_pickup_photo',
        text: '拍照发家族群：找到了！',
        effects: [{ resource: 'mood', delta: 15, message: '温馨时刻' }],
        nextNodeId: 'ch4_taxi',
      },
      {
        id: 'ch4_pickup_scare',
        text: '敲窗户吓他一跳',
        effects: [
          { resource: 'mood', delta: 10, message: '调皮的马儿' },
          { resource: 'stamina', delta: -5, message: '调皮的马儿' },
        ],
        nextNodeId: 'ch4_taxi',
      },
    ],
  },

  ch4_taxi: {
    id: 'ch4_taxi',
    chapter: 4,
    narrative: [
      '坐上你爸的车，终于踏上了回家的最后一段路。',
      '你爸一边开车一边问：\'工作怎么样？涨工资了没？\'',
      '来了来了，灵魂拷问第一弹。',
      '你还没回答，你爸又说：\'你妈准备了一桌子菜等你呢。\'',
      '突然有点想哭。',
    ],
    choices: [
      {
        id: 'ch4_taxi_good',
        text: '一切都好，放心吧爸',
        effects: [{ resource: 'mood', delta: 20, message: '到家的感觉真好' }],
        nextNodeId: 'ch4_end',
      },
      {
        id: 'ch4_taxi_ok',
        text: '还行吧，比上不足比下有余',
        effects: [{ resource: 'mood', delta: 15 }],
        nextNodeId: 'ch4_end',
      },
      {
        id: 'ch4_taxi_later',
        text: '别问了，到家再说',
        effects: [{ resource: 'mood', delta: 10 }],
        nextNodeId: 'ch4_end',
      },
    ],
  },

  ch4_end: {
    id: 'ch4_end',
    chapter: 4,
    narrative: [
      '车子拐进了熟悉的小巷，你看到了家门口的灯。',
      '妈妈已经站在门口等你了。',
      '到家了！！！',
      '但是……亲戚们也到了。',
      '……战斗才刚刚开始。',
    ],
    choices: [
      {
        id: 'ch4_end_continue',
        text: '进门！',
        effects: [],
        nextNodeId: 'ch5_start',
      },
    ],
  },
}

export default chapter4Nodes
