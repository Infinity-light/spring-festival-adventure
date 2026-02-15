import type { StoryNode } from '@/types/game'

const chapter1Nodes: Record<string, StoryNode> = {
  start: {
    id: 'start',
    chapter: 1,
    title: '第一章：出发准备',
    narrative: [
      '腊月二十八，老板终于大发慈悲放你走了。',
      '你看了看日历，距离除夕还有两天。距离老家，还有一千公里。',
      '本马今年一定要体面地回家！',
      '首先，得决定怎么回去……',
    ],
    choices: [
      {
        id: 'start_train',
        text: '坐火车！经典春运体验',
        effects: [{ resource: 'money', delta: -200, message: '经济实惠，本马精打细算' }],
        nextNodeId: 'ch1_train_prep',
      },
      {
        id: 'start_car',
        text: '自己开车！自由自在',
        effects: [
          { resource: 'money', delta: -500, message: '油费过路费，钱包微微一痛' },
          { resource: 'stamina', delta: -10, message: '光想想就累了' },
        ],
        nextNodeId: 'ch1_car_prep',
      },
      {
        id: 'start_plane',
        text: '坐飞机！有钱任性',
        effects: [{ resource: 'money', delta: -2000, message: '钱包在哭泣' }],
        nextNodeId: 'ch1_plane_prep',
      },
    ],
  },

  ch1_train_prep: {
    id: 'ch1_train_prep',
    chapter: 1,
    narrative: [
      '你打开12306，发现……全！部！没！票！',
      '不过本马早有准备，祭出了五个抢票软件同时开抢。',
      '经过三个小时的斗智斗勇，终于抢到一张……站票。',
      '站票就站票，本马四条腿，站着也稳！',
    ],
    choices: [
      {
        id: 'train_standing',
        text: '接受站票，省钱是王道',
        effects: [
          { resource: 'stamina', delta: -10, message: '四条腿也扛不住十几个小时啊' },
          { resource: 'mood', delta: -5, message: '心情有点down' },
        ],
        nextNodeId: 'ch1_pack',
      },
      {
        id: 'train_scalper',
        text: '加钱找黄牛换坐票',
        effects: [
          { resource: 'money', delta: -800, message: '黄牛笑得合不拢嘴' },
          { resource: 'mood', delta: 10, message: '至少屁股有着落了' },
        ],
        nextNodeId: 'ch1_pack',
      },
    ],
  },

  ch1_car_prep: {
    id: 'ch1_car_prep',
    chapter: 1,
    narrative: [
      '你检查了一下你的小破车，发现……',
      '轮胎有点秃，雨刮器吱吱响，后备箱的味道像是上次忘拿的外卖。',
      '没事，能跑就行！',
      '你在导航上输入老家地址：预计行驶12小时。',
      '……12小时？？？',
    ],
    choices: [
      {
        id: 'car_repair',
        text: '先去修车，安全第一',
        effects: [
          { resource: 'money', delta: -300, message: '修车师傅又赚了一笔' },
          { resource: 'stamina', delta: -5, message: '等修车等了俩小时' },
        ],
        nextNodeId: 'ch1_pack',
      },
      {
        id: 'car_yolo',
        text: '直接出发，车到山前必有路',
        effects: [
          { resource: 'mood', delta: 5, message: '无知者无畏，心情还不错' },
        ],
        nextNodeId: 'ch1_pack',
      },
    ],
  },

  ch1_plane_prep: {
    id: 'ch1_plane_prep',
    chapter: 1,
    narrative: [
      '你潇洒地打开航空公司APP，选了一张经济舱。',
      '-2000！你的钱包在哭泣。',
      '不过想到可以两小时到家，你觉得值了。',
      '有钱马的快乐，你们不懂。',
      '然后你看到了天气预报：目的地暴雪预警。',
      '……',
    ],
    choices: [
      {
        id: 'plane_pray',
        text: '祈祷航班不要取消',
        effects: [
          { resource: 'mood', delta: -15, message: '焦虑值拉满，刷航班动态刷到手抽筋' },
        ],
        nextNodeId: 'ch1_pack',
      },
      {
        id: 'plane_insurance',
        text: '买延误险，双重保障',
        effects: [
          { resource: 'money', delta: -100, message: '保险公司：谢谢惠顾' },
          { resource: 'mood', delta: 5, message: '买了个心安' },
        ],
        nextNodeId: 'ch1_pack',
      },
    ],
  },

  ch1_pack: {
    id: 'ch1_pack',
    chapter: 1,
    narrative: [
      '出发前，你需要决定带什么回家。',
      '问题是……你的行李箱就那么大，只能选两样。',
      '选择困难症犯了……',
    ],
    choices: [
      {
        id: 'pack1_gift',
        text: '年货大礼包（讨好亲戚必备）',
        effects: [
          { resource: 'money', delta: -500, message: '大出血，但亲戚会夸你懂事' },
          { resource: 'mood', delta: 10, message: '想到亲戚的笑脸，值了' },
        ],
        nextNodeId: 'ch1_pack_2',
      },
      {
        id: 'pack1_redpocket',
        text: '一沓红包（社交硬通货）',
        effects: [
          { resource: 'money', delta: -1000, message: '一沓红包，社交核武器' },
        ],
        nextNodeId: 'ch1_pack_2',
      },
      {
        id: 'pack1_survival',
        text: '充电宝+零食（生存必需品）',
        effects: [
          { resource: 'stamina', delta: 10, message: '续命装备到手！' },
        ],
        nextNodeId: 'ch1_pack_2',
      },
      {
        id: 'pack1_noodles',
        text: '一箱泡面（穷鬼套餐）',
        effects: [
          { resource: 'mood', delta: -5, message: '泡面虽香，但总觉得有点心酸' },
        ],
        nextNodeId: 'ch1_pack_2',
      },
    ],
  },

  ch1_pack_2: {
    id: 'ch1_pack_2',
    chapter: 1,
    narrative: [
      '好，第一件搞定了。还能再塞一样……',
    ],
    choices: [
      {
        id: 'pack2_gift',
        text: '年货大礼包',
        effects: [
          { resource: 'money', delta: -500, message: '又是大出血的一天' },
          { resource: 'mood', delta: 10, message: '双倍年货，双倍面子' },
        ],
        nextNodeId: 'ch1_depart',
      },
      {
        id: 'pack2_redpocket',
        text: '一沓红包',
        effects: [
          { resource: 'money', delta: -1000, message: '钱包已经没有眼泪了' },
        ],
        nextNodeId: 'ch1_depart',
      },
      {
        id: 'pack2_survival',
        text: '充电宝+零食',
        effects: [
          { resource: 'stamina', delta: 10, message: '双倍续命，稳如老马' },
        ],
        nextNodeId: 'ch1_depart',
      },
      {
        id: 'pack2_noodles',
        text: '一箱泡面',
        effects: [
          { resource: 'mood', delta: -5, message: '两箱泡面……你是要开泡面店吗' },
        ],
        nextNodeId: 'ch1_depart',
      },
    ],
  },

  ch1_depart: {
    id: 'ch1_depart',
    chapter: 1,
    narrative: [
      '行李收拾完毕！你深吸一口气，锁上出租屋的门。',
      '窗外的城市灯火通明，但你的心已经飞回了老家。',
      '老家，本马来了！',
      '春运大冒险，正式开始！',
    ],
    choices: [
      {
        id: 'depart_go',
        text: '出发！',
        effects: [],
        nextNodeId: 'ch2_start',
      },
    ],
  },
}

export default chapter1Nodes
