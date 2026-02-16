import type { Ending } from '@/types/game'

const ENDINGS: Record<string, Ending> = {
  hidden_lucky: {
    type: 'hidden_lucky',
    title: '马上有福',
    emoji: '🐴',
    description:
      '你一路助人为乐、广结善缘，还收集了满满一背包的宝贝。到家时，全村人都来迎接你！',
    greeting:
      '恭喜你解锁隐藏结局！这一路上你帮了大叔、陪了家人、逗笑了所有人，还把能拿的宝贝全拿了。AI正在改变世界，但你用行动证明了——人与人之间的温度，是任何算法都学不会的。马上有福，福上加福！2026，愿你好运连连！',
    cardStyle:
      'bg-gradient-to-br from-yellow-400 via-red-500 to-yellow-500 animate-gold-glow',
  },
  perfect: {
    type: 'perfect',
    title: '完美团圆',
    emoji: '🏆',
    description: '三项资源全部充裕，道具收集过半，你不仅顺利到家，还成了全家的骄傲！',
    greeting:
      '马到成功，万事如意！AI可以帮你抢票、做PPT、写年终总结，但它替不了你推开家门时妈妈的那个拥抱。新的一年，愿你体力充沛、钱包鼓鼓、心情美美，更愿你珍惜每一次团圆。',
    cardStyle: 'bg-gradient-to-br from-red-600 via-amber-500 to-red-600',
  },
  helpful_hero: {
    type: 'helpful_hero',
    title: '活马雷锋',
    emoji: '🤝',
    description:
      '你在旅途中帮了无数人，大叔夸你、大姐谢你、熊孩子都服你。本马就是行走的正能量！',
    greeting:
      '你是春运路上最温暖的那匹马！帮大叔搬行李、教熊孩子写作业、给妈妈发红包……AI能优化效率，但优化不了你骨子里的善良。新年快乐，愿你的善意都被世界温柔以待。',
    cardStyle: 'bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-600',
  },
  funny_king: {
    type: 'funny_king',
    title: '快乐马戏团',
    emoji: '🤣',
    description:
      '一路上笑料不断，你把春运变成了脱口秀专场。连列车员都忍不住笑了。',
    greeting:
      '你是春运路上的快乐源泉！吐槽春晚、反杀亲戚、社死现场一个不落。AI能写段子，但写不出你这种天然的搞笑天赋。新年快乐，愿你的快乐感染身边每一个人！',
    cardStyle: 'bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600',
  },
  frugal_master: {
    type: 'frugal_master',
    title: '省钱达马',
    emoji: '💰',
    description:
      '精打细算一路到家，钱包鼓鼓的。亲戚问你工资多少，你微微一笑——本马的理财能力，不需要解释。',
    greeting:
      '你是春运路上最会过日子的马！能省则省、能蹭则蹭，到家时钱包还是满的。AI能帮你记账，但帮不了你这种与生俱来的省钱直觉。新年快乐，愿你来年财源滚滚！',
    cardStyle: 'bg-gradient-to-br from-amber-500 via-yellow-600 to-amber-500',
  },
  normal: {
    type: 'normal',
    title: '平安到家',
    emoji: '🏠',
    description:
      '一路磕磕绊绊，但你还是平安到了家。没有大富大贵，也没有狼狈不堪，这就是普通人的春运。',
    greeting:
      '平平安安就是福！世界变得再快，回家的路不会变。新年快乐，愿你来年的每一段旅途都有人等、有人盼。',
    cardStyle: 'bg-gradient-to-br from-sky-500 via-blue-600 to-sky-500',
  },
  barely: {
    type: 'barely',
    title: '勉强到家',
    emoji: '😅',
    description:
      '虽然一路坎坷，但你还是撑到了家门口。虽然有点狼狈，但至少到了！',
    greeting:
      '回家的路再难，也挡不住本马！AI能优化路线，但优化不了你想回家的心。新年快乐，愿来年的路少一点坎坷，身边的人多一点陪伴。',
    cardStyle: 'bg-gradient-to-br from-orange-500 via-red-500 to-orange-500',
  },
  exhausted: {
    type: 'exhausted',
    title: '累瘫路上',
    emoji: '😴',
    description:
      '体力耗尽，你倒在了半路上。好心的大妈收留了你，在她家过了个别样的年。',
    greeting:
      '虽然没到家，但遇到了好心人。再智能的算法，也算不出陌生人递过来的那碗热汤。新年快乐，愿你来年体力充沛，也愿世间善意不被替代。',
    cardStyle: 'bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-600',
  },
  broke: {
    type: 'broke',
    title: '破产过年',
    emoji: '💸',
    description:
      '钱花光了，你只能在火车站吃泡面过年。但泡面配春晚，也别有一番风味。',
    greeting:
      '钱没了可以再赚，团圆的心不能丢！AI能帮你理财，但帮不了你感受除夕夜泡面的热气和远方家人的牵挂。新年快乐，愿你来年财源滚滚，更愿你常回家看看。',
    cardStyle: 'bg-gradient-to-br from-amber-500 via-yellow-600 to-amber-500',
  },
  fate_reunion: {
    type: 'fate_reunion',
    title: '命中注马',
    emoji: '💕',
    description:
      '飞机取消、高铁转签、难友变知己——最后发现，命运早就安排好了一切。烟花下的重逢，是这个春节最好的礼物。',
    greeting:
      '缘分这种事，AI算不出来。一张被取消的机票，一趟临时改签的高铁，一个在车上吐槽航空公司的陌生人——谁能想到，这一切都是命运的铺垫？新年快乐，愿你的每一次意外，都是惊喜的伏笔。',
    cardStyle:
      'bg-gradient-to-br from-pink-400 via-rose-500 to-pink-600',
  },
  sky_rider: {
    type: 'sky_rider',
    title: '天降奇马',
    emoji: '🚁',
    description:
      '你用一匹毛线小马换了一张直升机票，从天而降回到村里。全村人都记住了这个除夕——那匹从天上飞回来的马。',
    greeting:
      '人生就是这么魔幻——航班取消、机场过夜、织毛线的奶奶、直升机回村。AI能规划最优路线，但规划不出这种离谱又温暖的奇遇。新年快乐，愿你的人生永远充满意想不到的精彩！',
    cardStyle:
      'bg-gradient-to-br from-sky-400 via-blue-500 to-amber-400',
  },
  sky_rider_broke: {
    type: 'sky_rider_broke',
    title: '倾家荡马',
    emoji: '🚁💸',
    description:
      '钱花光了，但你从天而降回到了村里。全村人都记住了这个除夕——那匹散尽家财、从天上飞回来的马。',
    greeting:
      '为了回家，你押上了最后一分钱。航班取消、机场过夜、织毛线的奶奶、直升机回村——兜比脸干净，但排面拉满。AI能帮你理财，但算不出一颗不惜一切也要回家的心值多少钱。新年快乐，愿你永远有不顾一切的勇气！',
    cardStyle:
      'bg-gradient-to-br from-sky-400 via-amber-500 to-red-500',
  },
  unicorn_night: {
    type: 'unicorn_night',
    title: '独角兽之夜',
    emoji: '🦄',
    description:
      '除夕夜加班到最后一刻，却遇到了十二生肖的守护者。你终于想起来——你本来就是一匹马，不需要任何交通工具。展翅飞过星空，与旧日的牵挂并肩掠过烟花，各自回家。',
    greeting:
      '你集齐了所有成就，解锁了这个世界的终极秘密——你不是在扮演一匹马，你就是那匹马。AI能帮你抢票、规划路线、写年终总结，但它算不出一个真相：回家的路，从来不在脚下，而在心里。当你想起自己是谁，翅膀自然就长出来了。新年快乐，愿你永远记得自己的翅膀。🦄✨',
    cardStyle:
      'bg-gradient-to-br from-violet-500 via-fuchsia-500 to-indigo-600 animate-gold-glow',
  },
}

export default ENDINGS
