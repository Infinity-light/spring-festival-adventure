import type { Ending } from '@/types/game'

const ENDINGS: Record<string, Ending> = {
  perfect: {
    type: 'perfect',
    title: '完美团圆',
    emoji: '🏆',
    description: '三项资源全部充裕，你不仅顺利到家，还成了全家的骄傲！',
    greeting:
      '🐴 马到成功，万事如意！新的一年，愿你像本马一样，体力充沛、钱包鼓鼓、心情美美！',
    cardStyle: 'bg-gradient-to-br from-yellow-600 via-red-600 to-yellow-700',
  },
  normal: {
    type: 'normal',
    title: '平安到家',
    emoji: '🏠',
    description:
      '一路磕磕绊绊，但你还是平安到了家。没有大富大贵，也没有狼狈不堪，这就是普通人的春运。',
    greeting:
      '🐴 平平安安就是福！新年快乐，愿你来年的每一段旅途都顺顺利利！',
    cardStyle: 'bg-gradient-to-br from-sky-700 via-blue-800 to-sky-700',
  },
  barely: {
    type: 'barely',
    title: '勉强到家',
    emoji: '😅',
    description:
      '虽然一路坎坷，但你还是撑到了家门口。虽然有点狼狈，但至少到了！',
    greeting:
      '🐴 回家的路再难，也挡不住本马！新年快乐，愿来年的路少一点坎坷，多一点顺遂！',
    cardStyle: 'bg-gradient-to-br from-orange-600 via-red-600 to-orange-700',
  },
  exhausted: {
    type: 'exhausted',
    title: '累瘫路上',
    emoji: '😴',
    description:
      '体力耗尽，你倒在了半路上。好心的大妈收留了你，在她家过了个别样的年。',
    greeting:
      '🐴 虽然没到家，但遇到了好心人。新年快乐，愿你来年体力充沛，一路畅通！',
    cardStyle: 'bg-gradient-to-br from-green-800 via-emerald-900 to-green-800',
  },
  broke: {
    type: 'broke',
    title: '破产过年',
    emoji: '💸',
    description:
      '钱花光了，你只能在火车站吃泡面过年。但泡面配春晚，也别有一番风味。',
    greeting:
      '🐴 钱没了可以再赚，团圆的心不能丢！新年快乐，愿你来年财源滚滚！',
    cardStyle: 'bg-gradient-to-br from-amber-700 via-yellow-800 to-amber-700',
  },
  breakdown: {
    type: 'breakdown',
    title: '精神崩溃',
    emoji: '😤',
    description:
      '心情降到了冰点，你决定原地躺平，在出租屋里一个人过年。外卖小哥成了你除夕唯一见到的人。',
    greeting:
      '🐴 有时候不回家也是一种勇气。新年快乐，愿你来年心情美丽，天天开心！',
    cardStyle: 'bg-gradient-to-br from-purple-800 via-pink-900 to-purple-800',
  },
  hidden_lucky: {
    type: 'hidden_lucky',
    title: '马上有福',
    emoji: '🐴',
    description:
      '你触发了所有好事件！一路助人为乐、广结善缘，福气满满。到家时，全村人都来迎接你！',
    greeting:
      '🐴✨ 恭喜你解锁隐藏结局！马上有福，福上加福！2026，愿你好运连连，福气冲天！',
    cardStyle:
      'bg-gradient-to-br from-yellow-500 via-red-500 to-yellow-600 animate-gold-glow',
  },
}

export default ENDINGS
