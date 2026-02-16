import type { StoryNode } from '@/types/game'

const chapter6Nodes: Record<string, StoryNode> = {
  ch6_cook: {
    id: 'ch6_cook',
    chapter: 6,
    title: '第六章：年夜饭大作战',
    narrative: [
      '除夕夜，厨房里热气腾腾，客厅里春晚已经开始了。',
      '你妈在厨房忙得团团转，你爸在沙发上嗑瓜子看电视。',
      '🐴 本马作为新时代好青年，当然要帮忙！',
      '你妈递给你一把菜刀：\'来，把这条鱼处理一下。\'',
      '你看着这条活蹦乱跳的鱼，陷入了沉思。',
      '🐴 本马……在大城市都是点外卖的啊。',
    ],
    choices: [
      {
        id: 'help_cook_success',
        text: '硬着头皮上！',
        effects: [
          { resource: 'stamina', delta: -15, message: '居然成功了！' },
          { resource: 'mood', delta: 20, message: '居然成功了！' },
        ],
        nextNodeId: 'ch6_redpacket',
        feedback: '本马闭着眼一刀下去——鱼没事，砧板裂了。但最后居然把菜端上了桌，你妈投来了难以置信的目光。🔪✨',
        tag: 'helpful',
      },
      {
        id: 'ch6_cook_learn',
        text: '求助老妈手把手教',
        effects: [
          { resource: 'stamina', delta: -10, message: '学到了新技能' },
          { resource: 'mood', delta: 10, message: '学到了新技能' },
        ],
        nextNodeId: 'ch6_redpacket',
        feedback: '老妈手把手教你刮鳞切花，本马学得有模有样。"下次回来你做给我吃啊"——老妈笑得眼睛都眯起来了。👩‍🍳',
        tag: 'helpful',
      },
      {
        id: 'ch6_cook_escape',
        text: '溜去客厅看春晚',
        effects: [
          { resource: 'mood', delta: 5, message: '成功摸鱼' },
          { resource: 'stamina', delta: 5, message: '成功摸鱼' },
        ],
        nextNodeId: 'ch6_redpacket',
        feedback: '本马悄悄溜到沙发上，跟老爸一起嗑瓜子看电视。厨房传来老妈的怒吼："都给我滚进来帮忙！"——假装没听见。🛋️',
      },
      {
        id: 'ch6_cook_orange',
        text: '用橘子做一道创意菜！',
        condition: { type: 'has_item', itemId: 'lucky_orange' },
        effects: [
          { resource: 'mood', delta: 10, message: '创意大厨🍊' },
          { resource: 'stamina', delta: -5, message: '折腾半天' },
        ],
        nextNodeId: 'ch6_redpacket',
        feedback: '本马灵机一动，把大叔给的橘子切片摆盘，淋上蜂蜜，撒上枸杞——"橘运当头"！你妈看了三秒，从嫌弃变成了惊喜："哟，还挺像回事的。"这道菜成了今晚饭桌上被拍照最多的一道 🍊✨',
        tag: 'funny',
        removeItem: 'lucky_orange',
      },
    ],
  },

  ch6_redpacket: {
    id: 'ch6_redpacket',
    chapter: 6,
    narrative: [
      '叮！家族群炸了——有人发红包了！',
      '你以迅雷不及掩耳之势掏出手机。',
      '🐴 抢红包，本马从不手软！',
      '结果……你抢到了0.01元。',
      '发红包的是你二叔，他发了个100块的红包，被20个人抢。',
    ],
    choices: [
      {
        id: 'ch6_redpacket_send',
        text: '也发一个红包，礼尚往来',
        effects: [
          { resource: 'money', delta: -200, message: '大方的马🧧' },
          { resource: 'mood', delta: 15, message: '大方的马🧧' },
        ],
        nextNodeId: 'ch6_cctv',
        feedback: '本马豪气地发了个200的红包，群里瞬间炸了一片"谢谢老板"。二叔回了句"这孩子大方"，你妈在旁边偷偷笑。🧧',
        tag: 'helpful',
        addItem: 'red_packet_rain',
      },
      {
        id: 'ch6_redpacket_emoji',
        text: '发个表情包：谢谢老板',
        effects: [
          { resource: 'mood', delta: 5 },
        ],
        nextNodeId: 'ch6_cctv',
        feedback: '你发了个"谢谢老板"的表情包，二叔秒回一个竖大拇指。本马：0.01也是爱，重在参与。🤡',
      },
      {
        id: 'ch6_redpacket_wait',
        text: '继续蹲守，等下一个红包',
        effects: [
          { resource: 'mood', delta: 10, message: '红包猎手' },
        ],
        nextNodeId: 'ch6_cctv',
        feedback: '本马开启红包雷达模式，眼睛死死盯着屏幕。三分钟后又抢到一个——0.03元。积少成多，本马是理财高手。🎯',
      },
    ],
  },

  ch6_cctv: {
    id: 'ch6_cctv',
    chapter: 6,
    narrative: [
      '春晚进行到了小品环节。',
      '你爸笑得前仰后合，你妈说\'这都什么啊\'，你表弟在发弹幕。',
      '广告时间，屏幕上轮番播放各种AI软件的广告——AI写作、AI绘画、AI做PPT、AI帮你聊天……',
      '你妈看了一眼：\'这AI啥都能干，以后还要人干啥？\'',
      '🐴 妈，这个问题本马每天都在想。',
    ],
    choices: [
      {
        id: 'ch6_cctv_watch',
        text: '认真看，其实还挺有意思',
        effects: [
          { resource: 'mood', delta: 10 },
          { resource: 'stamina', delta: 5 },
        ],
        nextNodeId: 'ch6_fireworks',
        feedback: '本马竟然被小品逗笑了好几次，虽然嘴上说"一般般"，身体还是很诚实的。果然春晚得配一家人一起看才有味道。😌',
      },
      {
        id: 'ch6_cctv_roast',
        text: '边看边发朋友圈吐槽',
        effects: [
          { resource: 'mood', delta: 15, message: '吐槽大师🎤' },
        ],
        nextNodeId: 'ch6_fireworks',
        feedback: '朋友圈文案："这个小品的编剧是AI写的吧"——三分钟收获58个赞。本马的吐槽事业在除夕夜达到了巅峰。🎤',
        tag: 'funny',
      },
      {
        id: 'ch6_cctv_ai_talk',
        text: '跟家人聊起AI的事',
        effects: [
          { resource: 'mood', delta: 20, message: '难得的家庭对话💬' },
          { resource: 'stamina', delta: -5, message: '难得的家庭对话💬' },
        ],
        nextNodeId: 'ch6_fireworks',
        feedback: '你爸说"AI再厉害也不会包饺子"，你妈说"它能帮我种菜不"，奶奶说"能打电话就行了"。一家人七嘴八舌，说的都不在点上，但本马笑得肚子疼。这种对话，AI真给不了。💬😂',
      },
      {
        id: 'ch6_cctv_sleep',
        text: '看着看着睡着了',
        effects: [
          { resource: 'stamina', delta: 20, message: '春晚催眠曲💤' },
          { resource: 'mood', delta: -5, message: '春晚催眠曲💤' },
        ],
        nextNodeId: 'ch6_fireworks',
        feedback: '本马靠在沙发上，不知不觉就睡着了。醒来发现脸上被表弟画了个乌龟，全家都在笑。春晚果然是最强安眠药。💤',
        tag: 'funny',
      },
      {
        id: 'ch6_cctv_horse',
        text: '把毛线小马摆在电视旁边当吉祥物',
        condition: { type: 'has_item', itemId: 'knit_horse' },
        effects: [
          { resource: 'mood', delta: 5, message: '小马看春晚🐴' },
        ],
        nextNodeId: 'ch6_fireworks',
        feedback: '你把那匹红色毛线小马摆在电视机旁边，棕色卷毛鬃毛对着屏幕，像在认真看春晚。表弟拍了张照发朋友圈："我哥的对象在看春晚。"全家笑疯了，你妈笑着擦眼泪："这孩子，什么时候找个真的回来。" 🐴📺',
      },
    ],
  },

  ch6_fireworks: {
    id: 'ch6_fireworks',
    chapter: 6,
    narrative: [
      '十一点半，你爸拿出了一箱烟花：\'走，放烟花去！\'',
      '村口已经噼里啪啦响成一片，空气中弥漫着火药味。',
      '🐴 这才是过年的味道！',
    ],
    choices: [
      {
        id: 'ch6_fireworks_light',
        text: '亲自点燃最大的那个！',
        effects: [
          { resource: 'stamina', delta: -10, message: '烟花太美了🎆' },
          { resource: 'mood', delta: 25, message: '烟花太美了🎆' },
        ],
        nextNodeId: 'ch6_end',
        feedback: '本马颤抖着手点燃引线，然后撒腿就跑。轰——夜空炸开一朵巨大的金色花，全村最靓的烟花是本马放的！🎆',
        addItem: 'firework',
      },
      {
        id: 'ch6_fireworks_photo',
        text: '负责拍照录像',
        effects: [
          { resource: 'mood', delta: 15, message: '记录美好瞬间📷' },
        ],
        nextNodeId: 'ch6_end',
        feedback: '本马举着手机拍了三十多条视频，发了九宫格朋友圈。配文："回村过年的含金量还在上升。"点赞破百。📷',
        addItem: 'firework',
      },
      {
        id: 'ch6_fireworks_indoor',
        text: '在屋里看，外面太冷了',
        effects: [
          { resource: 'stamina', delta: 5 },
          { resource: 'mood', delta: 10 },
        ],
        nextNodeId: 'ch6_end',
        feedback: '本马裹着棉被趴在窗台上看烟花，暖气片烤着后背，窗外火树银花。这大概就是幸福的形状吧。🪟✨',
      },
      {
        id: 'ch6_fireworks_reunion',
        text: '发现 ta 也在村口看烟花，走过去一起看',
        condition: { type: 'choice_made', choiceId: 'ch5_blind_date_wechat_callback' },
        effects: [
          { resource: 'mood', delta: 20, message: '烟花下的重逢🎆💕' },
        ],
        nextNodeId: 'ch6_end',
        feedback: '你走过去，ta 正好转头看到你。两个人在烟花下站了一会儿，没说什么话，但都笑了。天上的烟花一朵接一朵，照亮了两张有点傻的脸。你妈和王阿姨在远处交换了一个"成了成了"的眼神。这个除夕夜，烟花不是最亮的，但一定是最暖的 🎆💕',
        tag: 'helpful',
        addItem: 'firework',
      },
    ],
  },

  ch6_end: {
    id: 'ch6_end',
    chapter: 6,
    narrative: [
      '十二点的钟声敲响了！',
      '烟花在夜空中绽放，照亮了整个村庄。',
      '你妈从厨房端出一个大盘子，笑眯眯地问：',
      '\'今年想吃饺子还是汤圆？\'',
      '🐴 这是一道关乎南北立场的终极选择题。',
    ],
    choices: [
      {
        id: 'ch6_end_dumpling',
        text: '饺子！北方人的年夜饭灵魂！',
        effects: [
          { resource: 'mood', delta: 10, message: '饺子就酒，越吃越有🥟' },
        ],
        nextNodeId: 'ch6_finale',
        feedback: '热腾腾的饺子端上桌，你妈包的褶子整整齐齐，每一个都像艺术品。咬一口，鲜汁四溢——这是任何米其林餐厅都复刻不了的味道。你爸夹起一个："来，吃到硬币的有福气！"本马咬到了……一颗花生。"花生也算！花生是花好月圆！"你妈赶紧圆场 🥟😂',
        addItem: 'dumpling',
      },
      {
        id: 'ch6_end_tangyuan',
        text: '汤圆！团团圆圆才是年味！',
        effects: [
          { resource: 'mood', delta: 10, message: '甜甜蜜蜜，团团圆圆🍡' },
        ],
        nextNodeId: 'ch6_finale',
        feedback: '一碗热气腾腾的汤圆端上来，白白胖胖地浮在甜汤里，像一群泡温泉的小雪人。咬开一个，黑芝麻馅流了一下巴。你妈笑着递纸巾："多大的马了还吃成这样。"本马不管了，团圆的味道就是这么甜 🍡🥰',
        addItem: 'tangyuan',
      },
    ],
  },

  ch6_finale: {
    id: 'ch6_finale',
    chapter: 6,
    narrative: [
      '🐴 新年快乐！本马……到家了。',
      '这一路的奔波、折腾、欢笑、崩溃，都值了。',
      '你的春节回家历险记，到此结束。',
      '让我们来看看你的旅途成绩单……',
    ],
    choices: [
      {
        id: 'ch6_finale_view',
        text: '查看我的结局',
        effects: [],
        nextNodeId: 'game_end',
      },
    ],
  },
}

export default chapter6Nodes
