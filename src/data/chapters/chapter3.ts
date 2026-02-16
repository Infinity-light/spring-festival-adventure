import type { StoryNode } from '@/types/game'

const chapter3Nodes: Record<string, StoryNode> = {
  // ==================== 火车线 ====================

  ch3_train_noodle_war: {
    id: 'ch3_train_noodle_war',
    chapter: 3,
    title: '第三章：旅途奇遇',
    narrative: [
      '旅途过半，车厢里弥漫着一股混合了老坛酸菜、红烧牛肉和藤椒牛肉的复合香气。',
      '你对面的大哥掏出了第三桶泡面，旁边的大姐不甘示弱，亮出了自热火锅。',
      '左边的小伙子默默打开了螺蛳粉——整个车厢瞬间安静了。',
      '🐴 这不是车厢，这是美食擂台赛。',
      '你的肚子不争气地叫了一声。',
      '大哥热情地递过来一根火腿肠：\'兄弟，来一根？\'',
    ],
    choices: [
      {
        id: 'ch3_train_noodle_join',
        text: '加入泡面大战！拿出自己的存货',
        effects: [
          { resource: 'stamina', delta: 15, message: '泡面补给，满血复活🍜' },
          { resource: 'mood', delta: 10, message: '快乐分享' },
        ],
        nextNodeId: 'ch3_train_toilet',
        feedback: '本马掏出珍藏的泡面，和大哥交换了火腿肠。三个人围着小桌板吃得热火朝天，螺蛳粉小伙被孤立了。春运的快乐，就是这么朴实无华 🍜🌭',
        addItem: 'lucky_orange',
        tag: 'helpful',
      },
      {
        id: 'ch3_train_noodle_resist',
        text: '忍住！省着点吃',
        effects: [
          { resource: 'stamina', delta: -10, message: '饿着肚子闻泡面味，酷刑😩' },
          { resource: 'mood', delta: -5, message: '意志力的考验' },
        ],
        nextNodeId: 'ch3_train_toilet',
        feedback: '本马咽了咽口水，假装在看手机。但鼻子是诚实的，它一直在追踪那碗红烧牛肉面的香气轨迹。这是对意志力的终极考验 😩🍜',
      },
    ],
  },

  ch3_train_toilet: {
    id: 'ch3_train_toilet',
    chapter: 3,
    narrative: [
      '吃完（或者饿完），你感觉膀胱发出了预警信号。',
      '你站起来往厕所方向走——好家伙，门口已经排了七八个人。',
      '前面的大爷蹲在地上打盹，中间的小姐姐在刷短视频，最前面那位已经在原地跺脚了。',
      '🐴 春运厕所，比演唱会门票还难抢。',
      '这时候，厕所门开了，里面出来一个人，表情如释重负。',
      '但门还没关上，三个人同时冲了过去。',
    ],
    choices: [
      {
        id: 'ch3_train_toilet_rush',
        text: '四条腿的优势！冲！',
        effects: [
          { resource: 'stamina', delta: -10, message: '百米冲刺🏃' },
          { resource: 'mood', delta: 5, message: '抢到了！' },
        ],
        nextNodeId: 'ch3_train_conductor',
        feedback: '本马四蹄发力，以迅雷不及掩耳之势抢占了厕所。身后传来一片哀嚎。对不起各位，四条腿就是比两条腿快，这是生理优势 🏃💨',
        tag: 'funny',
      },
      {
        id: 'ch3_train_toilet_wait',
        text: '文明排队，做个体面马',
        effects: [
          { resource: 'stamina', delta: -15, message: '憋得脸都绿了😵' },
          { resource: 'mood', delta: -10, message: '快憋不住了' },
        ],
        nextNodeId: 'ch3_train_conductor',
        feedback: '本马老老实实排队，排了二十分钟。期间膀胱三次发出最后通牒，本马三次用意志力镇压。终于轮到的那一刻，本马觉得这是人生中最幸福的时刻 😵‍💫🚻',
      },
    ],
  },

  ch3_train_conductor: {
    id: 'ch3_train_conductor',
    chapter: 3,
    narrative: [
      '你刚回到座位，列车员来查票了。',
      '\'请出示您的车票和身份证。\'',
      '你翻遍了所有口袋——票呢？？？',
      '🐴 本马明明放在……放在……放在哪了？？？',
      '列车员面无表情地看着你，手里的补票单已经准备好了。',
      '就在这千钧一发之际，旁边的大哥拍了拍你的肩膀：\'兄弟，你票掉地上了。\'',
    ],
    choices: [
      {
        id: 'ch3_train_conductor_relief',
        text: '捡起票，感谢大哥救命之恩',
        effects: [
          { resource: 'mood', delta: 15, message: '虚惊一场，大哥是恩人🙏' },
        ],
        nextNodeId: 'ch3_train_ex',
        feedback: '本马颤抖着捡起地上的票，差点给大哥跪下。列车员面无表情地走了，大哥笑着说"出门在外互相照应"。本马决定，以后坐火车一定要把票缝在衣服上 🙏🎫',
      },
      {
        id: 'ch3_train_conductor_joke',
        text: '尴尬地笑：哈哈我就是测试一下反应速度',
        effects: [
          { resource: 'mood', delta: 5, message: '尴尬但过关了😅' },
          { resource: 'stamina', delta: -5, message: '社死边缘' },
        ],
        nextNodeId: 'ch3_train_ex',
        feedback: '列车员翻了个白眼，大哥憋笑憋得脸通红。本马的尴尬指数突破天际，但至少——票找到了，不用补票，省了一笔 😅🎫',
        tag: 'funny',
      },
    ],
  },

  ch3_train_ex: {
    id: 'ch3_train_ex',
    chapter: 3,
    narrative: [
      '查完票，你抬头一看——',
      '对面坐着的那个人……怎么越看越眼熟？',
      '！！！是你的前任！！！',
      '🐴 这概率比中彩票还低吧？？？',
      '对方也认出了你，空气突然安静了。',
      '然后对方先开了口："好久不见，新年快乐。"',
      '说着从包里掏出一个小东西递过来——是一个手工针织的毛线小马挂件，红色的身子，棕色的卷毛鬃毛，圆圆的眼睛。',
    ],
    choices: [
      {
        id: 'ch3_train_ex_greet',
        text: '收下挂件，大方聊几句',
        effects: [
          { resource: 'mood', delta: 15, message: '意外的温暖🐴' },
          { resource: 'stamina', delta: -10, message: '社交消耗' },
        ],
        nextNodeId: 'ch3_almost_there',
        feedback: '你接过那匹小毛线马，手心暖暖的。两个人聊了几句近况，没有尴尬，没有遗憾，像两个老朋友。下车时你把小马挂在了背包上，棕色卷毛在风里一晃一晃的 🐴💓',
        addItem: 'knit_horse',
      },
      {
        id: 'ch3_train_ex_run',
        text: '假装上厕所，溜了溜了',
        effects: [
          { resource: 'stamina', delta: -15, message: '三十六计走为上🏃' },
          { resource: 'mood', delta: 5, message: '逃避虽可耻但有用' },
        ],
        nextNodeId: 'ch3_almost_there',
        feedback: '本马以迅雷不及掩耳之势弹射起步，直奔厕所方向。在厕所里蹲了二十分钟，腿都麻了。回来时座位上放着那个小毛线马挂件，对方已经换了车厢 🚽🐴',
        addItem: 'knit_horse',
      },
      {
        id: 'ch3_train_ex_phone',
        text: '低头玩手机，当没看见',
        effects: [
          { resource: 'mood', delta: -10, message: '尴尬到脚趾抠地📱' },
        ],
        nextNodeId: 'ch3_almost_there',
        feedback: '两个人都在低头玩手机，但谁也没真的在看屏幕。对方悄悄把小毛线马放在了你们中间的扶手上，下车时你犹豫了一下，还是装进了口袋 📱🐴',
        addItem: 'knit_horse',
      },
    ],
  },

  // ==================== 自驾线 ====================

  ch3_drive_traffic: {
    id: 'ch3_drive_traffic',
    chapter: 3,
    title: '第三章：旅途奇遇',
    narrative: [
      '旅途过半，你以为最难的路段已经过去了。',
      '然而导航冷冰冰地播报：\'前方拥堵，预计通行时间两小时。\'',
      '你放眼望去，高速公路变成了停车场，一眼望不到头。',
      '🐴 又堵了？？？本马今天是跟高速公路有仇吗？',
      '旁边车道的大哥摇下车窗，掏出了一副扑克牌，朝你晃了晃。',
      '后面的大姐直接下车遛狗了。一条金毛在车流中间撒欢。',
    ],
    choices: [
      {
        id: 'ch3_drive_traffic_music',
        text: '打开音响，把堵车变成演唱会',
        effects: [
          { resource: 'mood', delta: 10, message: '一个人的演唱会🎤' },
          { resource: 'stamina', delta: -5, message: '嗓子有点哑' },
        ],
        nextNodeId: 'ch3_drive_service',
        feedback: '本马把音量拉到最大，车窗一开，对着高速公路飙了一首《常回家看看》。旁边车的大哥鼓起了掌，后面大姐的金毛跟着嚎了起来。春运堵车演唱会，门票免费 🎤🐕',
        tag: 'funny',
      },
      {
        id: 'ch3_drive_traffic_shortcut',
        text: '看看有没有小路可以绕',
        effects: [
          { resource: 'stamina', delta: -10, message: '冒险精神⚡' },
          { resource: 'mood', delta: -5, message: '心里没底' },
        ],
        nextNodeId: 'ch3_drive_service',
        feedback: '本马打开地图研究了半天，发现一条乡道。犹豫了三秒，一把方向盘杀了出去。乡道上空空荡荡，本马得意地笑了——直到看见前面的路牌写着"此路不通" 🗺️😱',
      },
    ],
  },

  ch3_drive_service: {
    id: 'ch3_drive_service',
    chapter: 3,
    narrative: [
      '好不容易挪到了服务区，你决定休息一下。',
      '服务区里人山人海，比春节庙会还热闹。',
      '你刚停好车，一个大叔凑过来：\'小伙子，顺路不？我去XX市，搭个顺风车呗。\'',
      '大叔手里拎着两大袋年货，看起来很着急。',
      '🐴 春运顺风车……这是什么剧情？',
      '大叔补了一句：\'油费我出一半，再请你吃顿饭！\'',
    ],
    choices: [
      {
        id: 'ch3_drive_service_yes',
        text: '上车吧大叔，顺路！',
        effects: [
          { resource: 'money', delta: 100, message: '油费有人分担了💰' },
          { resource: 'mood', delta: 15, message: '助人为乐，心情大好' },
        ],
        nextNodeId: 'ch3_drive_nav',
        feedback: '大叔乐开了花，把年货塞进后备箱，一路上给你讲他在外面打工的故事。到了分路口，大叔非要塞给你两百块油费和一袋自家种的橘子。本马感觉这趟顺风车，赚了 🍊💰',
        addItem: 'lucky_orange',
        tag: 'helpful',
      },
      {
        id: 'ch3_drive_service_no',
        text: '不好意思大叔，我车里东西多',
        effects: [
          { resource: 'mood', delta: -5, message: '有点过意不去😅' },
        ],
        nextNodeId: 'ch3_drive_nav',
        feedback: '大叔有点失望，但还是笑着说"没事没事"。本马看着他拎着两大袋年货继续找车，心里有点不是滋味。但安全第一嘛……吧？😅',
      },
    ],
  },

  ch3_drive_nav: {
    id: 'ch3_drive_nav',
    chapter: 3,
    narrative: [
      '重新上路，导航突然抽风了。',
      '\'前方500米右转——不对，掉头——等一下，直行——\'',
      '🐴 你到底要本马往哪走？？？',
      '你跟着导航七拐八拐，开进了一个完全陌生的村子。',
      '村口的大爷看着你的车牌，热情地招手：\'城里来的吧？迷路了？\'',
      '大爷指了指旁边的小卖部：\'先喝碗姜汤暖暖，路我给你指！\'',
    ],
    choices: [
      {
        id: 'ch3_drive_nav_stay',
        text: '喝碗姜汤，听大爷指路',
        effects: [
          { resource: 'stamina', delta: 10, message: '姜汤暖胃又暖心🫚' },
          { resource: 'mood', delta: 10, message: '人间自有温情在' },
        ],
        nextNodeId: 'ch3_almost_there',
        feedback: '大爷的姜汤又辣又甜，喝完浑身暖洋洋的。大爷还画了张手绘地图，比导航靠谱一万倍。临走时大爷塞了两个烤红薯："路上吃！"本马眼眶有点湿 🫚🍠',
      },
      {
        id: 'ch3_drive_nav_rush',
        text: '谢谢大爷，我看地图自己找',
        effects: [
          { resource: 'stamina', delta: -10, message: '又多绕了半小时😤' },
          { resource: 'mood', delta: -5, message: '倔强的马' },
        ],
        nextNodeId: 'ch3_almost_there',
        feedback: '本马倔强地打开手机地图，研究了十分钟，然后……还是按大爷说的路走了。大爷在后面喊"我说的对吧！"本马假装没听见，默默加速 🗺️😤',
      },
    ],
  },

  // ==================== 飞机线 ====================

  ch3_fly_delay: {
    id: 'ch3_fly_delay',
    chapter: 3,
    title: '第三章：旅途奇遇',
    narrative: [
      '旅途过半——如果航班不再出幺蛾子的话。',
      '你坐在候机厅里，盯着航班信息屏。',
      '你的航班状态从"准时"变成了"延误30分钟"，然后是"延误1小时"。',
      '🐴 本马就知道……就知道不会这么顺利。',
      '广播响了：\'由于流量管控，您乘坐的航班预计延误两小时，请耐心等候。\'',
      '候机厅里响起了一片哀嚎声。',
    ],
    choices: [
      {
        id: 'ch3_fly_delay_shop',
        text: '逛免税店打发时间',
        effects: [
          { resource: 'money', delta: -300, message: '免税店的诱惑💸' },
          { resource: 'mood', delta: 10, message: '购物疗法' },
        ],
        nextNodeId: 'ch3_fly_seatmate',
        feedback: '本马本来只想逛逛，结果出来时手里多了一袋巧克力、一瓶香水和一个不知道买来干嘛的保温杯。免税店，钱包的坟墓 💸🛍️',
      },
      {
        id: 'ch3_fly_delay_lounge',
        text: '找个角落躺平等着',
        effects: [
          { resource: 'stamina', delta: 5, message: '机场躺平术😴' },
          { resource: 'mood', delta: -10, message: '无聊到发霉' },
        ],
        nextNodeId: 'ch3_fly_seatmate',
        feedback: '本马找了一排空座椅，用外套盖住脸，摆出了标准的机场难民姿势。旁边的大哥已经打起了呼噜，本马自愧不如——人家才是真正的躺平高手 😴💤',
      },
    ],
  },

  ch3_fly_seatmate: {
    id: 'ch3_fly_seatmate',
    chapter: 3,
    narrative: [
      '终于登机了！你找到自己的座位坐下，松了口气。',
      '然后你的邻座来了——一位大姐，拎着三个大袋子，往头顶行李架塞了五分钟没塞进去。',
      '大姐转头看着你：\'小伙子，帮姐搬一下呗。\'',
      '你帮她塞好行李，大姐感激地拍了拍你的肩膀，然后——',
      '掏出了手机，开始外放短视频。',
      '🐴 ……本马的耳朵，今天注定不得安宁。',
    ],
    choices: [
      {
        id: 'ch3_fly_seatmate_endure',
        text: '戴上耳机，忍了',
        effects: [
          { resource: 'mood', delta: -5, message: '耳机救命🎧' },
          { resource: 'stamina', delta: -5, message: '精神污染' },
        ],
        nextNodeId: 'ch3_fly_upgrade',
        feedback: '本马默默戴上耳机，把音量调到最大。但大姐的外放功率堪比蓝牙音箱，穿透力极强。本马的降噪耳机，今天遇到了对手 🎧📢',
      },
      {
        id: 'ch3_fly_seatmate_chat',
        text: '跟大姐聊天，转移她注意力',
        effects: [
          { resource: 'stamina', delta: -10, message: '社交输出🗣️' },
          { resource: 'mood', delta: 10, message: '大姐人其实挺好' },
        ],
        nextNodeId: 'ch3_fly_upgrade',
        feedback: '本马主动搭话，大姐果然放下了手机。聊起来才知道，大姐是去看刚出生的孙子，兴奋得一晚上没睡。她从包里掏出一把糖："拿着拿着，过年甜甜蜜蜜！"🍬👵',
        addItem: 'lucky_orange',
        tag: 'helpful',
      },
    ],
  },

  ch3_fly_upgrade: {
    id: 'ch3_fly_upgrade',
    chapter: 3,
    narrative: [
      '飞机终于起飞了，你靠在椅背上闭目养神。',
      '这时候空姐走过来，弯腰小声说：',
      '\'先生，商务舱有一个空位，您是否愿意升舱？只需要补差价500元。\'',
      '🐴 ！！！升舱？？？',
      '你往前面瞟了一眼——商务舱宽敞的座椅、免费的红酒、安静的环境……',
      '再看看身边外放短视频的大姐……',
    ],
    choices: [
      {
        id: 'ch3_fly_upgrade_yes',
        text: '升！本马值得更好的！',
        effects: [
          { resource: 'money', delta: -500, message: '奢侈一把💸' },
          { resource: 'stamina', delta: 20, message: '商务舱真香' },
          { resource: 'mood', delta: 20, message: '人生巅峰' },
        ],
        nextNodeId: 'ch3_almost_there',
        feedback: '本马优雅地走进商务舱，坐下的瞬间感觉自己升华了。空姐递来热毛巾和红酒，本马端着酒杯望向窗外的云海——这就是有钱马的世界吗？虽然钱包在哭，但灵魂在笑 🍷✈️',
      },
      {
        id: 'ch3_fly_upgrade_no',
        text: '算了，省钱要紧',
        effects: [
          { resource: 'mood', delta: -10, message: '心在滴血但钱包感谢你💔' },
        ],
        nextNodeId: 'ch3_almost_there',
        feedback: '本马咬着牙说了"不用了谢谢"，然后看着空姐走向了别人。大姐的短视频声音仿佛更大了。本马闭上眼睛，在心里默念：省下的五百块够吃一个月泡面了 💔🍜',
      },
    ],
  },

  // ==================== 三线汇合 ====================

  ch3_almost_there: {
    id: 'ch3_almost_there',
    chapter: 3,
    narrative: [
      '经历了这些奇遇，你感觉这趟旅途比预想的精彩多了。',
      '窗外的风景越来越熟悉——那些田野、那些山丘、那些小村庄。',
      '🐴 快到了……本马闻到家的味道了！',
      '不管路上发生了什么，此刻心里只有一个念头：',
      '回家！',
    ],
    choices: [
      {
        id: 'ch3_almost_there_train',
        text: '准备下车！',
        effects: [],
        nextNodeId: 'ch4_train_arrival',
        condition: { type: 'has_item', itemId: 'train_ticket' },
      },
      {
        id: 'ch3_almost_there_car',
        text: '看到出口标志了！',
        effects: [],
        nextNodeId: 'ch4_drive_village',
        condition: { type: 'has_item', itemId: 'car_key' },
      },
      {
        id: 'ch3_almost_there_plane',
        text: '飞机开始降落了！',
        effects: [],
        nextNodeId: 'ch4_fly_landing',
        condition: { type: 'has_item', itemId: 'boarding_pass' },
      },
    ],
  },
}

export default chapter3Nodes
