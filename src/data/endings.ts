import type { Ending } from '@/types/game'

const ENDINGS: Record<string, Ending> = {
  perfect: {
    type: 'perfect',
    title: '完美团圆',
    emoji: '🏆',
    description: '三项资源全部充裕，你不仅顺利到家，还成了全家的骄傲！',
    greeting:
      '马到成功，万事如意！AI可以帮你抢票、做PPT、写年终总结，但它替不了你推开家门时妈妈的那个拥抱。新的一年，愿你体力充沛、钱包鼓鼓、心情美美，更愿你珍惜每一次团圆。',
    cardStyle: 'bg-gradient-to-br from-red-600 via-amber-500 to-red-600',
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
  breakdown: {
    type: 'breakdown',
    title: '精神崩溃',
    emoji: '😤',
    description:
      '心情降到了冰点，你决定原地躺平，在出租屋里一个人过年。外卖小哥成了你除夕唯一见到的人。',
    greeting:
      '有时候不回家也是一种勇气。但记住，再厉害的AI也没法替你给爸妈打那通电话。新年快乐，愿你来年心情美丽，也愿你在想家的时候，别忍着。',
    cardStyle: 'bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600',
  },
  hidden_lucky: {
    type: 'hidden_lucky',
    title: '马上有福',
    emoji: '🐴',
    description:
      '你触发了所有好事件！一路助人为乐、广结善缘，福气满满。到家时，全村人都来迎接你！',
    greeting:
      '恭喜你解锁隐藏结局！这一路上，你帮了大叔、救了奶奶、陪了家人。AI正在改变世界，但你用行动证明了——人与人之间的温度，是任何算法都学不会的。马上有福，福上加福！2026，愿你好运连连，更愿你身边的人都被你温暖过。',
    cardStyle:
      'bg-gradient-to-br from-yellow-400 via-red-500 to-yellow-500 animate-gold-glow',
  },
}

export default ENDINGS
