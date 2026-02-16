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
        condition: { type: 'has_item', itemId: 'instant_noodles' },
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
        id: 'ch3_train_noodle_beg',
        text: '厚着脸皮蹭一口',
        effects: [
          { resource: 'stamina', delta: 5, message: '蹭到了一口🍜' },
          { resource: 'mood', delta: 5, message: '有点不好意思' },
        ],
        nextNodeId: 'ch3_train_toilet',
        feedback: '本马可怜巴巴地看着大哥的泡面，大哥豪爽地递过来一根火腿肠和半碗面汤。虽然没带泡面，但春运的人情味，比泡面还香 🍜🙏',
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


  // ==================== 高铁线（隐藏分支） ====================

  ch3_hsr_station: {
    id: 'ch3_hsr_station',
    chapter: 3,
    title: '第三章：旅途奇遇',
    narrative: [
      '从机场打车赶到高铁站，一路上本马都在怀疑人生——今天到底换了几种交通工具？',
      '高铁站到了，好家伙，春运的高铁站也是人山人海，和机场不相上下。',
      '🐴 本马从飞机难民变成了高铁难民，这算不算无缝衔接？',
      '正排队过安检呢，后面有人拍了拍你的肩膀。',
      '一回头，是个跟你差不多大的小伙子，拖着个比他还大的行李箱，一脸苦笑。',
      '"兄弟，你也是退票改高铁的？我看你拖着行李从机场方向来的。"',
      '🐴 难友！这是难友啊！',
      '两个人对视一眼，瞬间产生了革命友谊。',
    ],
    choices: [
      {
        id: 'ch3_hsr_station_rant',
        text: '和难友一起吐槽航空公司',
        effects: [
          { resource: 'mood', delta: 10, message: '吐槽使人快乐😤' },
          { resource: 'stamina', delta: -5, message: '嘴巴停不下来' },
        ],
        nextNodeId: 'ch3_hsr_ride',
        feedback: '两个人从航班取消吐槽到机场服务，从退票流程吐槽到改签手续费，越说越激动，旁边排队的大姐都听入迷了。难友从包里掏出一个橘子递过来：吃个橘子消消气。本马觉得这个橘子格外甜 🍊😤',
        addItem: 'lucky_orange',
        tag: 'funny',
      },
      {
        id: 'ch3_hsr_station_quiet',
        text: '默默排队进站，保存体力',
        effects: [
          { resource: 'stamina', delta: -10, message: '沉默的消耗😶' },
          { resource: 'mood', delta: -5, message: '一个人扛着有点闷' },
        ],
        nextNodeId: 'ch3_hsr_ride',
        feedback: '本马礼貌地笑了笑，戴上耳机默默排队。难友识趣地没再说话，但两个人默契地站在一起，像两个被航空公司抛弃的孤儿。安检的时候难友帮本马扶了一下行李箱，嗯，还是有点温暖的 😶🧳',
      },
    ],
  },

  ch3_hsr_ride: {
    id: 'ch3_hsr_ride',
    chapter: 3,
    narrative: [
      '上了高铁，本马不得不承认——这座位比飞机经济舱宽敞多了。',
      '腿能伸直！能伸直！这是什么神仙体验！',
      '🐴 早知道一开始就买高铁票了，飞机经济舱简直是给沙丁鱼设计的。',
      '难友就坐在旁边，两个人相视一笑，有种同是天涯沦落马的默契。',
      '列车刚开动没多久，难友从包里掏出了一个保鲜盒——打开的瞬间，整个车厢都安静了。',
      '卤鸭脖、卤鸡爪、卤藕片……一股浓郁的卤味香气弥漫开来。',
      '乘务员小姐姐温柔地走过来：先生，车厢内请尽量不要食用气味较大的食品哦。',
      '难友尴尬地笑了笑，但手没停。',
    ],
    choices: [
      {
        id: 'ch3_hsr_ride_feast',
        text: '和难友分享卤味大餐！',
        effects: [
          { resource: 'stamina', delta: 10, message: '卤味补给，真香🍗' },
          { resource: 'mood', delta: 15, message: '快乐分享，双倍快乐' },
        ],
        nextNodeId: 'ch3_hsr_arrival',
        feedback: '本马毫不犹豫地加入了卤味盛宴。鸭脖辣得嘶嘶哈哈，鸡爪啃得满手油光，两个人吃得昏天黑地。乘务员小姐姐又来了两次，表情从温柔变成了无奈。对面的大爷默默咽了咽口水，难友大方地递过去一个鸡爪：大爷您也来一个！整排座位瞬间变成了流水席 🍗🦆',
        tag: 'helpful',
      },
      {
        id: 'ch3_hsr_ride_window',
        text: '戴上耳机，看窗外风景',
        effects: [
          { resource: 'mood', delta: 5, message: '窗外的世界很美🌄' },
          { resource: 'stamina', delta: 5, message: '安静地休息' },
        ],
        nextNodeId: 'ch3_hsr_arrival',
        feedback: '本马戴上耳机，把头靠在窗户上。窗外的风景飞速后退——城市的高楼变成了郊区的工厂，工厂变成了田野，田野变成了山丘。高铁时速350公里，窗外的世界像一部快进的电影。难友在旁边吃得正香，偶尔递过来一块鸭脖，本马摇摇头，继续看风景。这一刻，挺好的 🌄🎧',
      },
    ],
  },

  ch3_hsr_arrival: {
    id: 'ch3_hsr_arrival',
    chapter: 3,
    narrative: [
      '窗外的风景越来越熟悉了——那些连绵的小山丘，那些整齐的农田，那些冒着炊烟的村庄。',
      '高铁广播响起：前方到站——',
      '🐴 快到了！本马闻到家的味道了！',
      '难友也开始收拾东西，两个人对视一眼，都有点感慨。',
      '从机场到高铁站，从陌生人到难友，这一路折腾下来，居然还挺开心的。',
      '难友掏出手机：兄弟，加个微信呗？明年春运咱们约好一起吐槽。',
      '🐴 这大概就是春运的魔力吧——把两个被航空公司坑了的人，变成了朋友。',
    ],
    choices: [
      {
        id: 'ch3_hsr_arrival_exchange',
        text: '交换联系方式，约好明年一起吐槽',
        effects: [
          { resource: 'mood', delta: 10, message: '多了一个朋友😊' },
        ],
        nextNodeId: 'ch3_almost_there',
        feedback: '两个人互扫了微信，难友的头像是一只被延误航班气到变形的猫。本马笑出了声。难友说：明年春运前我提前建个群，叫航空公司受害者联盟。本马觉得这个群一定会火 😊📱',
        tag: 'helpful',
      },
      {
        id: 'ch3_hsr_arrival_bye',
        text: '礼貌告别，各奔东西',
        effects: [
          { resource: 'mood', delta: 5, message: '缘分到了自然散🤝' },
        ],
        nextNodeId: 'ch3_almost_there',
        feedback: '本马笑着摆摆手：后会有期！难友拎着他那个巨大的行李箱消失在人群中。虽然没留联系方式，但这段退票难友的经历，大概会成为本马每年春节饭桌上的保留节目 🤝👋',
      },
    ],
  },

  // ==================== 直升机线（隐藏分支） ====================

  ch3_heli_takeoff: {
    id: 'ch3_heli_takeoff',
    chapter: 3,
    title: '第三章：旅途奇遇',
    narrative: [
      '奶奶带你来到机场旁边一个小型停机坪，一架红白相间的直升机停在那里。',
      '驾驶座上坐着一个精神矍铄的老爷子，戴着飞行员墨镜，朝你竖了个大拇指。',
      '"上车吧小伙子！我老伴说你帮了大忙，今天顺路捎你回家！"',
      '🐴 本马……要坐直升机回家？？？这剧情是不是有点离谱？',
      '老爷子笑着说："我飞了四十年了，比你坐的那些航班靠谱多了。系好安全带！"',
      '螺旋桨开始转动，巨大的轰鸣声中，直升机缓缓升空。',
    ],
    choices: [
      {
        id: 'ch3_heli_takeoff_front',
        text: '坐副驾驶！要看最好的风景！',
        effects: [
          { resource: 'mood', delta: 25, message: '人生巅峰！🚁' },
          { resource: 'stamina', delta: -10, message: '紧张到手心出汗' },
        ],
        nextNodeId: 'ch3_heli_view',
        feedback: '本马坐在副驾驶的位置上，脚下就是透明的舷窗。起飞的瞬间胃都翻了一下，但当城市变成积木、公路变成丝带的时候，本马只剩下一个字：绝。老爷子得意地笑："怎么样，比你那个取消的航班强吧？" 🚁🌆',
        tag: 'funny',
      },
      {
        id: 'ch3_heli_takeoff_back',
        text: '坐后面吧，本马有点恐高……',
        effects: [
          { resource: 'mood', delta: 15, message: '虽然怕但还是很酷🚁' },
          { resource: 'stamina', delta: -5, message: '小紧张' },
        ],
        nextNodeId: 'ch3_heli_view',
        feedback: '本马缩在后座，双手紧紧抓着安全带。但透过窗户看到云层在脚下翻涌的时候，恐惧慢慢变成了震撼。奶奶在旁边淡定地继续织毛线，仿佛坐直升机跟坐公交一样平常 🚁😨→😮',
      },
    ],
  },

  ch3_heli_view: {
    id: 'ch3_heli_view',
    chapter: 3,
    narrative: [
      '直升机在低空飞行，窗外的风景美得不像话。',
      '城市的高楼渐渐消失，取而代之的是连绵的山丘和蜿蜒的河流。',
      '老爷子指着下面的高速公路："看，那些堵在路上的车，你本来也是其中之一。"',
      '🐴 本马从天上俯瞰春运大军，有一种说不出的感觉。',
      '奶奶递过来一个保温杯："喝口热茶，我自己泡的。"',
      '茶很香，风景很美，这大概是本马人生中最魔幻的一段旅程。',
    ],
    choices: [
      {
        id: 'ch3_heli_view_photo',
        text: '疯狂拍照！这辈子可能就这一次！',
        effects: [
          { resource: 'mood', delta: 15, message: '朋友圈炸了📸' },
          { resource: 'stamina', delta: -5, message: '兴奋消耗' },
        ],
        nextNodeId: 'ch3_almost_there',
        feedback: '本马掏出仅剩1%电量的手机，疯狂按快门。发了一条朋友圈："坐直升机回家过年，不接受反驳。"配图九宫格全是航拍。三秒后手机关机了，但照片已经发出去了。评论区已经炸了，虽然本马看不到 📸📱💀',
        tag: 'funny',
      },
      {
        id: 'ch3_heli_view_chat',
        text: '听老爷子讲飞行故事',
        effects: [
          { resource: 'mood', delta: 20, message: '传奇故事🎖️' },
          { resource: 'stamina', delta: 5, message: '精神充电' },
        ],
        nextNodeId: 'ch3_almost_there',
        feedback: '老爷子讲起了年轻时在部队飞运输机的故事，讲起了退役后买了这架小直升机圆梦的经历。"人这辈子啊，总得有点疯狂的事。"奶奶在旁边补了一句："他最疯狂的事就是娶了我。"三个人都笑了。本马觉得，这对老夫妻比任何电影都精彩 🎖️❤️',
        tag: 'helpful',
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
      {
        id: 'ch3_almost_there_hsr',
        text: '高铁到站了！',
        effects: [],
        nextNodeId: 'ch4_hsr_arrival',
        condition: { type: 'has_item', itemId: 'hsr_ticket' },
      },
      {
        id: 'ch3_almost_there_heli',
        text: '直升机开始降落了！',
        effects: [],
        nextNodeId: 'ch4_heli_landing',
        condition: { type: 'choice_made', choiceId: 'ch2_plane_morning_yes' },
      },
    ],
  },
}

export default chapter3Nodes
