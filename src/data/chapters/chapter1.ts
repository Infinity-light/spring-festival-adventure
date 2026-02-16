import type { StoryNode } from '@/types/game'

const chapter1Nodes: Record<string, StoryNode> = {
  start: {
    id: 'start',
    chapter: 1,
    title: '第一章：出发准备',
    narrative: [
      '腊月二十八，老板终于大发慈悲放你走了。',
      '你看了看日历，距离除夕还有两天。距离老家，还有一千公里。',
      '🐴 本马今年一定要体面地回家！',
      '首先，得决定怎么回去……',
    ],
    choices: [
      {
        id: 'start_train',
        text: '坐火车！经典春运体验',
        effects: [{ resource: 'money', delta: -200, message: '经济实惠，本马精打细算' }],
        nextNodeId: 'ch1_train_prep',
        feedback: '经济实惠是本马的座右铭。虽然要站十几个小时，但省下的钱够吃一个月泡面了 🐴',
        addItem: 'train_ticket',
      },
      {
        id: 'start_car',
        text: '自己开车！自由自在',
        effects: [
          { resource: 'money', delta: -500, message: '油费过路费，钱包微微一痛' },
          { resource: 'stamina', delta: -10, message: '光想想就累了' },
        ],
        nextNodeId: 'ch1_car_prep',
        feedback: '自由的代价就是——油费、过路费、以及十二小时独自面对方向盘的孤独。但本马就是喜欢这种掌控感！🚗',
        addItem: 'car_key',
      },
      {
        id: 'start_plane',
        text: '坐飞机！有钱任性',
        effects: [{ resource: 'money', delta: -2000, message: '钱包在哭泣💸' }],
        nextNodeId: 'ch1_plane_prep',
        feedback: '两千块没了，但本马两小时就能到家！这叫什么？这叫时间就是金钱。💸 虽然金钱也没了。',
        addItem: 'boarding_pass',
      },
      {
        id: 'start_ufo',
        text: '🛸 坐飞碟！？',
        effects: [{ resource: 'mood', delta: 15, message: '这是什么神仙选项？！' }],
        nextNodeId: 'ch2_ufo_1',
        condition: { type: 'has_item', itemId: 'ufo_pass' },
        feedback: '本马揉了揉眼睛——选项里居然有飞碟？？？这一定是玩了太多次产生的幻觉。但管它呢，上！🛸',
        addItem: 'ufo_ticket',
      },
      {
        id: 'start_unicorn',
        text: '🦄 不对，今天不是腊月二十八……',
        effects: [{ resource: 'mood', delta: 5, message: '记忆开始扭曲……' }],
        nextNodeId: 'ch_unicorn_overtime',
        condition: { type: 'has_item', itemId: 'unicorn_pass' },
        feedback: '你盯着日历看了很久。腊月二十八？不……你隐约记得，事情不是这样的。一股奇怪的力量在牵引着你，让你想起了另一个版本的故事。🦄',
      },
    ],
  },

  ch1_train_prep: {
    id: 'ch1_train_prep',
    chapter: 1,
    narrative: [
      '你打开12306，发现……全！部！没！票！',
      '不过本马早有准备，祭出了AI抢票助手，设好车次、时间、席别，让AI自动刷票。',
      'AI助手疯狂运转了三个小时，终于抢到一张……站票。',
      '🐴 AI都只能抢到站票，可见春运的含金量。',
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
        feedback: '本马四条腿，比两条腿的人类多两个支撑点，站票算什么！🦵🦵🦵🦵',
      },
      {
        id: 'train_scalper',
        text: '加钱找黄牛换坐票',
        effects: [
          { resource: 'money', delta: -800, message: '被黄牛坑了💸' },
          { resource: 'mood', delta: -10, message: '血亏！' },
        ],
        nextNodeId: 'ch1_pack',
        feedback: '黄牛拍着胸脯说"绝对有座"，本马信以为真掏了八百。上车一看——好家伙，票面写的"无座"。黄牛的电话已经打不通了。八百块，买了个教训 😤💸',
      },
    ],
  },

  ch1_car_prep: {
    id: 'ch1_car_prep',
    chapter: 1,
    narrative: [
      '你检查了一下你的小破车，发现……',
      '轮胎有点秃，雨刮器吱吱响，后备箱的味道像是上次忘拿的外卖。',
      '🐴 没事，能跑就行！',
      '你在导航上输入老家地址：预计行驶12小时。',
      '🐴 ……12小时？？？',
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
        feedback: '修车师傅看了一眼本马的车，倒吸一口凉气。"兄弟，你这车能开到现在是个奇迹。" 🔧',
      },
      {
        id: 'car_yolo',
        text: '直接出发，车到山前必有路',
        effects: [
          { resource: 'mood', delta: 5, message: '无知者无畏，心情还不错' },
        ],
        nextNodeId: 'ch1_pack',
        feedback: '本马一脚油门踩下去，车子发出了不情愿的嘶吼。管它呢，能跑就行！🏎️💨',
      },
    ],
  },

  ch1_plane_prep: {
    id: 'ch1_plane_prep',
    chapter: 1,
    narrative: [
      '你潇洒地打开航空公司APP，选了一张经济舱。',
      '💰 -2000！你的钱包在哭泣。',
      '不过想到可以两小时到家，你觉得值了。',
      '🐴 有钱马的快乐，你们不懂。',
      '然后你看到了天气预报：目的地暴雪预警。',
      '🐴 ……',
    ],
    choices: [
      {
        id: 'plane_pray',
        text: '祈祷航班不要取消',
        effects: [
          { resource: 'mood', delta: -15, message: '焦虑值拉满，刷航班动态刷到手抽筋' },
        ],
        nextNodeId: 'ch1_pack',
        feedback: '本马双蹄合十，虔诚祈祷。航班动态每刷新一次，心跳就加速一次。求求了，别取消啊 🙏',
      },
      {
        id: 'plane_insurance',
        text: '买延误险，双重保障',
        effects: [
          { resource: 'money', delta: -100, message: '保险公司：谢谢惠顾' },
          { resource: 'mood', delta: 5, message: '买了个心安' },
        ],
        nextNodeId: 'ch1_pack',
        feedback: '花一百块买个心理安慰，本马觉得这是今天最划算的一笔交易。万一真延误了，血赚！🛡️',
      },
    ],
  },

  ch1_pack: {
    id: 'ch1_pack',
    chapter: 1,
    narrative: [
      '出发前，你需要决定带什么回家。',
      '问题是……你的行李箱就那么大，只能选两样。',
      '🐴 选择困难症犯了……',
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
        feedback: '坚果礼盒、牛奶、饼干……本马拎着这堆东西，活像一个行走的年货超市 🎁',
        addItem: 'gift_pack',
      },
      {
        id: 'pack1_redpocket',
        text: '一沓红包（社交硬通货）',
        effects: [
          { resource: 'money', delta: -1000, message: '一沓红包，社交核武器💸' },
        ],
        nextNodeId: 'ch1_pack_2',
        feedback: '本马数了数红包，心在滴血。但一想到七大姑八大姨家的熊孩子们，这钱不花不行啊 🧧',
        addItem: 'red_envelopes',
      },
      {
        id: 'pack1_survival',
        text: '充电宝+零食（生存必需品）',
        effects: [
          { resource: 'stamina', delta: 10, message: '续命装备到手！' },
        ],
        nextNodeId: 'ch1_pack_2',
        feedback: '充电宝满电，零食塞满口袋。本马深谙一个道理：手机没电比没钱更可怕 🔋🍫',
        addItem: 'power_bank',
      },
      {
        id: 'pack1_noodles',
        text: '一箱泡面（穷鬼套餐）',
        effects: [
          { resource: 'mood', delta: -5, message: '泡面虽香，但总觉得有点心酸' },
        ],
        nextNodeId: 'ch1_pack_2',
        feedback: '一箱泡面，五种口味，够吃整个春节。本马就是这么朴实无华且节俭 🍜',
        addItem: 'instant_noodles',
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
        feedback: '双倍年货，双倍面子！本马拎着两大袋礼盒，走路都带风 💪🎁',
        addItem: 'gift_pack',
      },
      {
        id: 'pack2_redpocket',
        text: '一沓红包',
        effects: [
          { resource: 'money', delta: -1000, message: '钱包已经没有眼泪了' },
        ],
        nextNodeId: 'ch1_depart',
        feedback: '又是红包……本马的年终奖已经阵亡了一大半。过年就是花钱买热闹 🧧💸',
        addItem: 'red_envelopes',
      },
      {
        id: 'pack2_survival',
        text: '充电宝+零食',
        effects: [
          { resource: 'stamina', delta: 10, message: '双倍续命，稳如老马' },
        ],
        nextNodeId: 'ch1_depart',
        feedback: '两套续命装备在手，本马感觉自己可以撑过任何春运战场 ⚡🍪',
        addItem: 'power_bank',
      },
      {
        id: 'pack2_noodles',
        text: '一箱泡面',
        effects: [
          { resource: 'mood', delta: -5, message: '两箱泡面……你是要开泡面店吗' },
        ],
        nextNodeId: 'ch1_depart',
        feedback: '两箱泡面……本马认真考虑了一下，回家后是不是可以摆个泡面摊 🍜🍜',
        addItem: 'instant_noodles',
      },
    ],
  },

  ch1_depart: {
    id: 'ch1_depart',
    chapter: 1,
    narrative: [
      '行李收拾完毕！你深吸一口气，锁上出租屋的门。',
      '窗外的城市灯火通明，但你的心已经飞回了老家。',
      '🐴 老家，本马来了！',
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
