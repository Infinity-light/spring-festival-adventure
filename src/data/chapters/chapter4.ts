import type { StoryNode } from '@/types/game'

const chapter4Nodes: Record<string, StoryNode> = {
  // ==================== 火车线 ====================

  ch4_train_arrival: {
    id: 'ch4_train_arrival',
    chapter: 4,
    title: '第四章：到站风波',
    narrative: [
      '终于到站了！你拖着行李走出车厢，深吸一口家乡的空气。',
      '嗯……空气里有一股烧秸秆的味道，熟悉的感觉。',
      '🐴 家的味道！',
      '你在行李转盘前等了半天，终于看到一个和你的箱子很像的行李。',
      '你拿起来一看——咦，这个贴纸不是我的啊？',
      '你打开一看：里面全是女装。',
      '🐴 ？？？本马的行李呢？？？',
    ],
    choices: [
      {
        id: 'ch4_train_luggage_staff',
        text: '赶紧找工作人员处理',
        effects: [
          { resource: 'stamina', delta: -10, message: '折腾一番😵' },
          { resource: 'mood', delta: -10, message: '折腾一番😵' },
        ],
        nextNodeId: 'ch4_train_pickup',
        feedback: '工作人员淡定地说："每年春运都有几百件拿错的，您排队吧。"本马看了看前面的长队，感觉行李今天是回不来了 😵‍💫',
      },
      {
        id: 'ch4_train_luggage_shout',
        text: '在候车厅大喊：谁拿错行李了！',
        effects: [
          { resource: 'stamina', delta: -5, message: '社死现场😱' },
          { resource: 'mood', delta: -15, message: '社死现场😱' },
        ],
        nextNodeId: 'ch4_train_pickup',
        feedback: '"谁拿错行李了！！！里面全是女装！！！"整个候车厅的目光齐刷刷看过来。本马社死程度：史诗级。一个小哥红着脸跑过来换走了箱子 👗😱',
        tag: 'funny',
      },
      {
        id: 'ch4_train_luggage_ignore',
        text: '算了，先回家再说',
        effects: [
          { resource: 'mood', delta: -5, message: '随缘吧' },
        ],
        nextNodeId: 'ch4_train_pickup',
        feedback: '本马决定带着这箱女装先回家。万一找不回自己的行李……过年穿JK制服拜年也不是不行？算了还是不行 👘😅',
      },
    ],
  },

  ch4_train_pickup: {
    id: 'ch4_train_pickup',
    chapter: 4,
    narrative: [
      '你走出出站口，在人群中寻找来接你的人。',
      '你爸说他在出口等你，穿红色羽绒服。',
      '你环顾四周——穿红色羽绒服的人大概有……五十个？',
      '🐴 爸，你能不能穿个显眼点的？',
      '打了三个电话，终于在停车场找到了你爸。他正在车里睡觉。',
    ],
    choices: [
      {
        id: 'ch4_train_pickup_photo',
        text: '拍照发家族群：找到了！',
        effects: [
          { resource: 'mood', delta: 15, message: '温馨时刻📸' },
        ],
        nextNodeId: 'ch4_home_approach',
        feedback: '照片发出去三秒，家族群炸了。大姑：瘦了！二叔：黑了！奶奶：穿这么少不冷吗？本马后悔了，不该发的 📸💬💬💬',
      },
      {
        id: 'ch4_train_pickup_scare',
        text: '敲窗户吓他一跳',
        effects: [
          { resource: 'mood', delta: 10, message: '调皮的马儿😝' },
          { resource: 'stamina', delta: -5, message: '调皮的马儿😝' },
        ],
        nextNodeId: 'ch4_home_approach',
        feedback: '"砰砰砰！"你爸被吓得一个激灵，差点把方向盘按出喇叭声。缓过神来之后追着你绕车跑了两圈。父子情深，物理表达 😝🏃‍♂️',
        tag: 'funny',
      },
    ],
  },

  // ==================== 自驾线 ====================

  ch4_drive_village: {
    id: 'ch4_drive_village',
    chapter: 4,
    title: '第四章：到站风波',
    narrative: [
      '导航播报：\'您已到达目的地附近。\'',
      '你把车开进了村口的小路，熟悉的老槐树映入眼帘。',
      '🐴 到了！！！本马终于到了！！！',
      '你刚把车停在家门口，隔壁的王大爷就探出了头。',
      '然后是李婶、张叔、赵奶奶……',
      '三分钟之内，你的车被围了个水泄不通。',
      '\'哟，小X回来了！开的什么车？多少钱买的？\'',
    ],
    choices: [
      {
        id: 'ch4_drive_village_show',
        text: '大方介绍，满足乡亲们的好奇心',
        effects: [
          { resource: 'mood', delta: 10, message: '全村焦点🌟' },
          { resource: 'stamina', delta: -10, message: '被围观好累' },
        ],
        nextNodeId: 'ch4_drive_parking',
        feedback: '本马打开车门，像车展模特一样介绍起了自己的小破车。王大爷摸了摸车漆："不错不错，比我家拖拉机强。"谢谢大爷，这个比较很有参考价值 🚗🚜',
      },
      {
        id: 'ch4_drive_village_shy',
        text: '低调低调，赶紧进家门',
        effects: [
          { resource: 'mood', delta: 5, message: '低调的马🤫' },
          { resource: 'stamina', delta: -5, message: '突围消耗' },
        ],
        nextNodeId: 'ch4_drive_parking',
        feedback: '本马试图低调地溜进家门，但乡亲们的热情像潮水一样挡不住。李婶拉着你的手不放："瘦了瘦了，在外面没吃好吧？"本马的社恐在此刻达到了巅峰 🤫👋',
      },
    ],
  },

  ch4_drive_parking: {
    id: 'ch4_drive_parking',
    chapter: 4,
    narrative: [
      '好不容易摆脱了乡亲们的围观，你准备把车停好。',
      '问题是——家门口的空地上已经停了三辆车、两辆三轮车和一辆拖拉机。',
      '你爸从屋里出来，指挥你停车：\'往左打！再往左！停！过了过了！\'',
      '🐴 爸，你这指挥水平，交警看了都摇头。',
      '折腾了十分钟，车终于停好了。歪歪扭扭的，但至少没撞到拖拉机。',
      '你爸拍了拍你的肩膀：\'开了多久？累坏了吧。你妈做了你爱吃的红烧肉。\'',
    ],
    choices: [
      {
        id: 'ch4_drive_parking_hug',
        text: '给老爸一个拥抱',
        effects: [
          { resource: 'mood', delta: 20, message: '到家的感觉真好🏠' },
          { resource: 'stamina', delta: 10, message: '亲情充电' },
        ],
        nextNodeId: 'ch5_relationship',
        feedback: '本马一把抱住了老爸，老爸愣了一下，然后拍了拍你的背："行了行了，多大的人了。"嘴上这么说，但本马感觉到他抱得更紧了。鼻子一酸，赶紧松开 🤗🥲',
        tag: 'helpful',
      },
      {
        id: 'ch4_drive_parking_food',
        text: '红烧肉！！！冲！！！',
        effects: [
          { resource: 'mood', delta: 15, message: '红烧肉的召唤🍖' },
          { resource: 'stamina', delta: 5, message: '精神满血' },
        ],
        nextNodeId: 'ch5_relationship',
        feedback: '本马听到"红烧肉"三个字，四条腿像装了弹簧一样弹射进了家门。一千公里的疲惫，在闻到妈妈做的红烧肉的那一刻，全部烟消云散 🍖💨',
      },
    ],
  },

  // ==================== 飞机线 ====================

  ch4_fly_landing: {
    id: 'ch4_fly_landing',
    chapter: 4,
    title: '第四章：到站风波',
    narrative: [
      '飞机平稳降落，你长舒一口气。',
      '🐴 脚踏实地的感觉真好！',
      '你走到行李转盘前，等了二十分钟，看着别人的行李一个个出来。',
      '你的呢？',
      '又等了十分钟。转盘停了。',
      '你的行李……没出来。',
      '🐴 ？？？本马的行李呢？？？去哪了？？？',
    ],
    choices: [
      {
        id: 'ch4_fly_luggage_counter',
        text: '冲向行李查询柜台',
        effects: [
          { resource: 'stamina', delta: -10, message: '暴走模式🏃' },
          { resource: 'mood', delta: -15, message: '行李丢了心态崩了' },
        ],
        nextNodeId: 'ch4_fly_gohome',
        feedback: '柜台小姐姐查了半天，面带微笑地说："您的行李可能被送到了另一个城市，我们会尽快帮您找回。"本马的年货、衣服、红包……全在那个箱子里啊！😱✈️',
      },
      {
        id: 'ch4_fly_luggage_calm',
        text: '深呼吸，先填个行李延误单',
        effects: [
          { resource: 'mood', delta: -10, message: '冷静处理📋' },
          { resource: 'stamina', delta: -5, message: '填表也累' },
        ],
        nextNodeId: 'ch4_fly_gohome',
        feedback: '本马冷静地填完了延误申报单，工作人员承诺48小时内送到。本马看了看手里空空如也的双手——过年回家，两手空空，这画面太美不敢看 📋😶',
      },
    ],
  },

  ch4_fly_gohome: {
    id: 'ch4_fly_gohome',
    chapter: 4,
    narrative: [
      '不管行李的事了，先回家要紧。',
      '问题是——机场离老家还有八十公里。',
      '你看了看打车软件：预估费用280元，等待时间45分钟。',
      '旁边有个大巴售票点：机场大巴50元，但要绕三个站。',
      '🐴 花钱还是花时间，这是个问题。',
      '这时候你爸打来电话：\'到了没？我在机场出口等你呢！\'',
      '🐴 ！！！爸你来接我了？？？',
    ],
    choices: [
      {
        id: 'ch4_fly_gohome_dad',
        text: '冲出去找老爸！',
        effects: [
          { resource: 'mood', delta: 25, message: '老爸来接，感动哭了🥲' },
          { resource: 'stamina', delta: 5, message: '亲情buff' },
        ],
        nextNodeId: 'ch4_home_approach',
        feedback: '你冲出到达厅，一眼就看到了举着"接宝贝回家"纸牌的老爸。本马当场破防，眼泪差点掉下来。老爸开了两小时车来接你，嘴上说"顺路"，但这里离家八十公里哪来的顺路 🥲❤️',
        tag: 'helpful',
      },
      {
        id: 'ch4_fly_gohome_bus',
        text: '让老爸别等了，坐大巴省钱',
        effects: [
          { resource: 'money', delta: -50, message: '大巴经济实惠🚌' },
          { resource: 'stamina', delta: -15, message: '大巴绕路好累' },
          { resource: 'mood', delta: 5, message: '省钱的快乐' },
        ],
        nextNodeId: 'ch4_home_approach',
        feedback: '你让老爸回去等着，自己坐上了机场大巴。大巴绕了三个站，本马在车上又睡了一觉。到站时天都黑了，老爸还是在村口等着。"说了不用来接……""闲着也是闲着。"🚌🥲',
      },
    ],
  },


  // ==================== 高铁线（隐藏分支） ====================

  ch4_hsr_arrival: {
    id: 'ch4_hsr_arrival',
    chapter: 4,
    title: '第四章：到站风波',
    narrative: [
      '高铁缓缓停靠，本马拖着行李走出车厢，深吸一口家乡的空气。',
      '比起机场，高铁站离家近多了——只有二十公里！这大概是退票最大的福利。',
      '🐴 曲线回家，殊途同归，本马是战术大师。',
      '出了站，本马正准备打车，突然看到出口处有个熟悉的身影——',
      '老爸！举着一张手写纸牌站在那里，纸牌上歪歪扭扭地写着：接小马回家🐴',
      '旁边的人都在看，老爸浑然不觉，踮着脚尖在人群里找你。',
      '🐴 爸……你这纸牌也太显眼了吧。',
    ],
    choices: [
      {
        id: 'ch4_hsr_arrival_hug',
        text: '冲过去给老爸一个拥抱',
        effects: [
          { resource: 'mood', delta: 20, message: '到家的感觉真好🏠' },
          { resource: 'stamina', delta: 5, message: '亲情充电' },
        ],
        nextNodeId: 'ch4_home_approach',
        feedback: '本马三步并作两步冲过去，一把抱住了老爸。老爸被撞得往后退了两步，手里的纸牌掉在地上。愣了一秒，然后用力拍了拍你的背：行了行了，多大的马了还撒娇。但本马感觉到他的手在微微发抖。鼻子一酸，赶紧松开，假装看别处 🤗🥲',
        tag: 'helpful',
      },
      {
        id: 'ch4_hsr_arrival_photo',
        text: '先拍照发朋友圈曲线回家成功',
        effects: [
          { resource: 'mood', delta: 15, message: '朋友圈素材到手📸' },
          { resource: 'stamina', delta: -5, message: '摆拍也累' },
        ],
        nextNodeId: 'ch4_home_approach',
        feedback: '本马掏出手机，对着老爸和他的手写纸牌咔嚓一张。配文：飞机取消→退票→高铁→到家。曲线救国，本马是春运战术大师🐴🚄。发出去三秒，获赞47个，评论区全是哈哈哈哈哈和你爸的纸牌太可爱了。老爸凑过来看：发的啥？给我也看看。然后他也笑了 📸😂',
        tag: 'funny',
      },
    ],
  },

  // ==================== 直升机线（隐藏分支） ====================

  ch4_heli_landing: {
    id: 'ch4_heli_landing',
    chapter: 4,
    title: '第四章：到站风波',
    narrative: [
      '直升机开始降落，老爷子选了村口的打谷场作为着陆点。',
      '螺旋桨卷起漫天尘土，鸡飞狗跳，全村人都跑出来看热闹。',
      '🐴 本马……坐直升机回村了。这大概是本村有史以来最高调的回家方式。',
      '你爸站在人群最前面，嘴巴张得能塞进一个鸡蛋。',
      '你妈从厨房冲出来，围裙都没来得及解，手里还拿着锅铲。',
      '隔壁王大爷喊了一嗓子："小X家孩子坐直升飞机回来了！！！"',
      '三秒之内，消息传遍了整个村子。',
    ],
    choices: [
      {
        id: 'ch4_heli_landing_wave',
        text: '挥手致意，享受全村瞩目',
        effects: [
          { resource: 'mood', delta: 30, message: '全村最靓的马🚁' },
          { resource: 'stamina', delta: -5, message: '社交消耗' },
        ],
        nextNodeId: 'ch4_heli_home',
        feedback: '本马从直升机上跳下来，朝围观群众挥了挥手。那一刻，本马感觉自己是凯旋的将军。你爸缓过神来，第一句话是："这……这得多少钱？"本马："免费的。"全场哗然。老爷子在驾驶座上笑着摆摆手，螺旋桨重新转动，直升机腾空而去。奶奶从窗户探出头喊："小马新年快乐！"🚁👋✨',
        tag: 'funny',
      },
      {
        id: 'ch4_heli_landing_shy',
        text: '低头快跑，太社死了',
        effects: [
          { resource: 'mood', delta: 20, message: '社死但开心🙈' },
          { resource: 'stamina', delta: -10, message: '拼命跑' },
        ],
        nextNodeId: 'ch4_heli_home',
        feedback: '本马红着脸从直升机上跳下来，拎着包就往家里冲。身后是全村人的议论声和手机拍照的咔嚓声。你妈一把拽住你："站住！这到底怎么回事？"本马用了十分钟解释了织毛线小马换直升机票的离奇经历，你妈听完沉默了三秒："……所以你小时候跟姥姥学的手艺终于用上了？"🙈🏃',
      },
    ],
  },

  ch4_heli_home: {
    id: 'ch4_heli_home',
    chapter: 4,
    narrative: [
      '你爸你妈一左一右把你架回了家，一路上全村人都在围观。',
      '隔壁张婶追着问："小X，下次能不能带我飞一圈？"',
      '你妈紧紧拉着你的手，嘴上骂着"瞎折腾"，眼角却有点湿。',
      '🐴 突然有点想哭。',
      '推开家门，一桌子菜的香味扑面而来。',
      '到家了！！！',
      '但是……亲戚们也到了。',
      '……战斗才刚刚开始。',
    ],
    choices: [
      {
        id: 'ch4_heli_home_continue',
        text: '进门！',
        effects: [],
        nextNodeId: 'ch5_relationship',
      },
    ],
  },

  // ==================== UFO线（隐藏彩蛋） ====================

  ch4_ufo_landing: {
    id: 'ch4_ufo_landing',
    chapter: 4,
    title: '第四章：到站风波',
    narrative: [
      '飞碟开始降落，外星马选了村口的打谷场作为着陆点。',
      '一道光柱从天而降，把整个村子照得亮如白昼。鸡飞狗跳不说，隔壁王大爷的假牙都吓掉了。',
      '全村人冲出来，以为是外星人入侵。你爸举着扫帚冲在最前面，你妈在后面喊"别冲动！"',
      '🐴 本马……坐飞碟回村了。这大概是地球有史以来最离谱的回家方式。',
      '外星马从舱门探出头，用蹩脚的普通话喊了一句："新年好！打扰了！"',
      '全村石化。',
    ],
    choices: [
      {
        id: 'ch4_ufo_landing_introduce',
        text: '给大家介绍一下，这是我的外星朋友！',
        effects: [
          { resource: 'mood', delta: 30, message: '全宇宙最靓的马🛸' },
          { resource: 'stamina', delta: -5, message: '社交消耗' },
        ],
        nextNodeId: 'ch4_home_approach',
        feedback: '本马大手一挥开始介绍，全村人从恐惧变成好奇，三分钟后外星马就被围着合影了。王大爷捡起假牙问："这飞碟多少钱？能跑多少公里？"你爸放下扫帚，第一句话是："这……不用油钱吧？"你妈已经在问外星马吃不吃饺子了。本马站在人群中央，感觉自己是全村最有排面的马，不，全银河系最有排面的马🛸📸✨',
        tag: 'funny',
      },
      {
        id: 'ch4_ufo_landing_bye',
        text: '赶紧告别外星马，溜回家！',
        effects: [
          { resource: 'mood', delta: 20, message: '低调回家🏃' },
          { resource: 'stamina', delta: -10, message: '拼命跑' },
        ],
        nextNodeId: 'ch4_home_approach',
        feedback: '本马和外星马挥手告别，飞碟腾空而去，在夜空中留下一圈金色光环，比烟花还好看。全村人目瞪口呆地仰望天空，你趁机溜进家门。没跑两步就被你妈一把拽住："给我解释清楚！"本马用了半小时讲完这个离奇故事，从服务区偶遇到星际旅行。你爸全程沉默，听完只关心一个问题："所以你没花钱？"🏃🛸💫',
      },
    ],
  },

  // ==================== 三线汇合 ====================

  ch4_home_approach: {
    id: 'ch4_home_approach',
    chapter: 4,
    narrative: [
      '车子拐进了熟悉的小巷，你看到了家门口的灯。',
      '妈妈已经站在门口等你了。',
      '你爸一边开车一边说：\'你妈准备了一桌子菜等你呢。\'',
      '🐴 突然有点想哭。',
      '到家了！！！',
      '但是……亲戚们也到了。',
      '……战斗才刚刚开始。',
    ],
    choices: [
      {
        id: 'ch4_home_approach_continue',
        text: '进门！',
        effects: [],
        nextNodeId: 'ch5_relationship',
      },
    ],
  },
}

export default chapter4Nodes
