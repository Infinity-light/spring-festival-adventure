import type { Item } from '@/types/game'

const ITEMS: Item[] = [
  {
    id: 'gift_pack',
    name: '年货大礼包',
    emoji: '🎁',
    description: '讨好亲戚必备，内含坚果礼盒、牛奶、水果',
    effect: { resource: 'money', delta: -500, message: '年货大采购💸' },
  },
  {
    id: 'red_envelopes',
    name: '一沓红包',
    emoji: '🧧',
    description: '社交硬通货，见面就发，人人夸你大方',
    effect: { resource: 'money', delta: -1000, message: '红包预算拉满🧧' },
  },
  {
    id: 'power_bank',
    name: '充电宝+零食',
    emoji: '🔋',
    description: '生存必需品，手机有电心不慌',
    effect: { resource: 'stamina', delta: 10, message: '续航满格🔋' },
  },
  {
    id: 'instant_noodles',
    name: '一箱泡面',
    emoji: '🍜',
    description: '穷鬼套餐，但真的很香',
    effect: { resource: 'mood', delta: -5, message: '泡面虽好，但有点心酸🍜' },
  },
]

export default ITEMS
