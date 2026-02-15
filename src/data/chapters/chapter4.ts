import type { StoryNode } from '@/types/game'

const chapter4Nodes: Record<string, StoryNode> = {
  ch4_luggage: {
    id: 'ch4_luggage',
    chapter: 4,
    title: '第四章：到站风波',
    narrative: [
      '终于到了！你拖着行李走出站台，深吸一口家乡的空气。',
      '嗯……空气里有一股烧秸秆的味道，熟悉的感觉。',
      '🐴 家的味道！',
      '但是，到站不等于到家。接下来还有一系列挑战……',
      '你在行李转盘前等了半天，终于看到一个和你的箱子很像的行李。',
      '你拿起来一看——咦，这个贴纸不是我的啊？',
      '你打开一看：里面全是女装。',
      '🐴 ？？？本马的行李呢？？？',
    ],
    choices: [
      {
        id: 'ch4_luggage_staff',
        text: '赶紧找工作人员处理',
        effects: [
          { resource: 'stamina', delta: -10, message: '折腾一番😵' },
          { resource: 'mood', delta: -10, message: '折腾一番😵' },
        ],
        nextNodeId: 'ch4_pickup',
        feedback: '工作人员淡定地说："每年春运都有几百件拿错的，您排队吧。"本马看了看前面的长队，感觉行李今天是回不来了 😵‍💫',
      },
      {
        id: 'ch4_luggage_shout',
        text: '在候车厅大喊：谁拿错行李了！',
        effects: [
          { resource: 'stamina', delta: -5, message: '社死现场😱' },
          { resource: 'mood', delta: -15, message: '社死现场😱' },
        ],
        nextNodeId: 'ch4_pickup',
        feedback: '"谁拿错行李了！！！里面全是女装！！！"整个候车厅的目光齐刷刷看过来。本马社死程度：史诗级。一个小哥红着脸跑过来换走了箱子 👗😱',
      },
      {
        id: 'ch4_luggage_ignore',
        text: '算了，先回家再说',
        effects: [{ resource: 'mood', delta: -5 }],
        nextNodeId: 'ch4_pickup',
        feedback: '本马决定带着这箱女装先回家。万一找不回自己的行李……过年穿JK制服拜年也不是不行？算了还是不行 👘😅',
      },
    ],
  },

  ch4_pickup: {
    id: 'ch4_pickup',
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
        id: 'ch4_pickup_photo',
        text: '拍照发家族群：找到了！',
        effects: [{ resource: 'mood', delta: 15, message: '温馨时刻📸' }],
        nextNodeId: 'ch4_taxi',
        feedback: '照片发出去三秒，家族群炸了。大姑：瘦了！二叔：黑了！奶奶：穿这么少不冷吗？本马后悔了，不该发的 📸💬💬💬',
      },
      {
        id: 'ch4_pickup_scare',
        text: '敲窗户吓他一跳',
        effects: [
          { resource: 'mood', delta: 10, message: '调皮的马儿😝' },
          { resource: 'stamina', delta: -5, message: '调皮的马儿😝' },
        ],
        nextNodeId: 'ch4_taxi',
        feedback: '"砰砰砰！"你爸被吓得一个激灵，差点把方向盘按出喇叭声。缓过神来之后追着你绕车跑了两圈。父子情深，物理表达 😝🏃‍♂️',
      },
    ],
  },

  ch4_taxi: {
    id: 'ch4_taxi',
    chapter: 4,
    narrative: [
      '坐上你爸的车，终于踏上了回家的最后一段路。',
      '你爸一边开车一边问：\'工作怎么样？涨工资了没？\'',
      '🐴 来了来了，灵魂拷问第一弹。',
      '你还没回答，你爸又说：\'你妈准备了一桌子菜等你呢。\'',
      '突然有点想哭。',
    ],
    choices: [
      {
        id: 'ch4_taxi_good',
        text: '一切都好，放心吧爸',
        effects: [{ resource: 'mood', delta: 20, message: '到家的感觉真好🏠' }],
        nextNodeId: 'ch4_end',
        feedback: '你爸听完沉默了两秒，然后说："好就行。"窗外的路灯一盏一盏掠过，本马鼻子突然有点酸。报喜不报忧，打工马的基本修养 🥲',
      },
      {
        id: 'ch4_taxi_ok',
        text: '还行吧，比上不足比下有余',
        effects: [{ resource: 'mood', delta: 15 }],
        nextNodeId: 'ch4_end',
        feedback: '你爸笑了笑："比上不足比下有余，那就是还行呗。"本马的中庸之道拿捏得死死的，既不让老爸担心，也没把牛吹破 ⚖️',
      },
      {
        id: 'ch4_taxi_later',
        text: '别问了，到家再说',
        effects: [{ resource: 'mood', delta: 10 }],
        nextNodeId: 'ch4_end',
        feedback: '你爸瞟了你一眼，没再追问，默默把车内暖风调高了两度。有些话不用说，老爸都懂。本马望着窗外，眼眶偷偷红了一圈 🚗💨',
      },
      {
        id: 'ch4_taxi_ai',
        text: '还行，就是AI来了压力挺大',
        effects: [
          { resource: 'mood', delta: 20, message: '爸爸的话暖到了🥲' },
        ],
        nextNodeId: 'ch4_end',
        feedback: '你爸沉默了一会儿，说："管它什么AI不AI的，能回来就好。你妈念叨你念叨了一个月了。"窗外路灯一盏盏掠过，本马鼻子一酸，赶紧扭头看窗外 🥲',
      },
    ],
  },

  ch4_end: {
    id: 'ch4_end',
    chapter: 4,
    narrative: [
      '车子拐进了熟悉的小巷，你看到了家门口的灯。',
      '妈妈已经站在门口等你了。',
      '到家了！！！',
      '但是……亲戚们也到了。',
      '……战斗才刚刚开始。',
    ],
    choices: [
      {
        id: 'ch4_end_continue',
        text: '进门！',
        effects: [],
        nextNodeId: 'ch5_relationship',
      },
    ],
  },
}

export default chapter4Nodes
