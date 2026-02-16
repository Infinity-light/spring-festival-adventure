import type { Achievement } from '@/types/game'

const ACHIEVEMENTS: Achievement[] = [
  // ---- 剧情成就 ----
  {
    id: 'reverse_attack',
    name: '反杀亲戚',
    emoji: '🔥',
    description: '用灵魂反问让七大姑哑口无言',
    category: 'story',
  },
  {
    id: 'horse_boyfriend',
    name: '马对象',
    emoji: '🐴',
    description: '掏出毛线小马当对象，全场爆笑',
    category: 'story',
  },
  {
    id: 'noodle_party',
    name: '泡面大战',
    emoji: '🍜',
    description: '加入火车泡面大战，与陌生人分享美味',
    category: 'story',
  },
  {
    id: 'good_samaritan',
    name: '顺路大叔',
    emoji: '🚗',
    description: '自驾路上捎了大叔一程',
    category: 'story',
  },
  {
    id: 'ex_encounter',
    name: '前任重逢',
    emoji: '💔',
    description: '在火车上遇到了前任',
    category: 'story',
    hidden: true,
  },
  {
    id: 'gift_diplomacy',
    name: '年货外交',
    emoji: '🎁',
    description: '用年货大礼包化解工资追问',
    category: 'story',
  },
  {
    id: 'red_envelope_peace',
    name: '红包和事佬',
    emoji: '🧧',
    description: '用红包化解相亲危机',
    category: 'story',
  },
  {
    id: 'gala_roast',
    name: '春晚吐槽王',
    emoji: '📺',
    description: '边看春晚边发朋友圈吐槽',
    category: 'story',
  },
  {
    id: 'firework_master',
    name: '烟花大师',
    emoji: '🎆',
    description: '亲手点燃最大的烟花',
    category: 'story',
  },
  {
    id: 'hug_dad',
    name: '拥抱老爸',
    emoji: '🤗',
    description: '到家时给老爸一个拥抱',
    category: 'story',
  },

  // ---- 结局成就 ----
  {
    id: 'ending_hidden_lucky',
    name: '马上有福',
    emoji: '🐴',
    description: '解锁隐藏结局',
    category: 'ending',
    hidden: true,
  },
  {
    id: 'ending_perfect',
    name: '完美团圆',
    emoji: '🏆',
    description: '三项资源全部充裕，道具过半',
    category: 'ending',
  },
  {
    id: 'ending_helpful_hero',
    name: '活马雷锋',
    emoji: '🤝',
    description: '一路助人为乐的温暖结局',
    category: 'ending',
  },
  {
    id: 'ending_funny_king',
    name: '快乐马戏团',
    emoji: '🤣',
    description: '笑料不断的欢乐结局',
    category: 'ending',
  },
  {
    id: 'ending_frugal_master',
    name: '省钱达马',
    emoji: '💰',
    description: '精打细算的理财结局',
    category: 'ending',
  },
  {
    id: 'ending_exhausted',
    name: '累瘫路上',
    emoji: '😴',
    description: '体力耗尽倒在半路',
    category: 'ending',
  },
  {
    id: 'ending_broke',
    name: '破产过年',
    emoji: '💸',
    description: '钱花光了在车站吃泡面',
    category: 'ending',
  },
  {
    id: 'ending_breakdown',
    name: '精神崩溃',
    emoji: '😤',
    description: '心情降到冰点，原地躺平',
    category: 'ending',
  },

  {
    id: 'detour_master',
    name: '曲线救国',
    emoji: '🚄',
    description: '从飞机退票改坐高铁，殊途同归',
    category: 'story',
    hidden: true,
  },
  {
    id: 'fate_reunion',
    name: '命运的安排',
    emoji: '🔄',
    description: '高铁难友竟然就是相亲对象，世界真小',
    category: 'story',
    hidden: true,
  },
  {
    id: 'heli_rider',
    name: '天降奇兵',
    emoji: '🚁',
    description: '用毛线小马换了一张直升机票回家',
    category: 'story',
    hidden: true,
  },

  {
    id: 'ufo_rider',
    name: '飞碟搭便车',
    emoji: '🛸',
    description: '搭乘外星马的飞碟回家过年',
    category: 'story',
    hidden: true,
  },

  // ---- 里程碑成就 ----
  {
    id: 'big_spender',
    name: '豪气冲天',
    emoji: '💎',
    description: '累计花费超过30000元，真·散财马',
    category: 'milestone',
  },
  {
    id: 'iron_horse',
    name: '铁马精神',
    emoji: '💪',
    description: '累计体力消耗超过300点，百折不挠',
    category: 'milestone',
  },

  // ---- 新增成就 ----
  {
    id: 'ending_fate_reunion',
    name: '命中注马',
    emoji: '💕',
    description: '高铁难友竟是相亲对象，烟花下重逢',
    category: 'ending',
    hidden: true,
  },
  {
    id: 'ending_sky_rider',
    name: '天降奇马',
    emoji: '🚁',
    description: '坐直升机回村，成为全村传说',
    category: 'ending',
  },
  {
    id: 'car_breakdown',
    name: '半路抛锚',
    emoji: '🔧',
    description: '自驾路上车子罢工，好在有惊无险',
    category: 'story',
  },
  {
    id: 'heli_fame',
    name: '全村名马',
    emoji: '🌟',
    description: '坐直升机回来后被全村围观追问',
    category: 'story',
  },
  {
    id: 'firework_reunion',
    name: '烟花下的重逢',
    emoji: '🎆',
    description: '除夕夜烟花下，和命中注定的人并肩而立',
    category: 'story',
    hidden: true,
  },
]

export default ACHIEVEMENTS

/** 快速查找用的 Map */
export const ACHIEVEMENTS_MAP = new Map(ACHIEVEMENTS.map((a) => [a.id, a]))
