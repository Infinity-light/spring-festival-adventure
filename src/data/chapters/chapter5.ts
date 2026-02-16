import type { StoryNode } from '@/types/game'

const chapter5Nodes: Record<string, StoryNode> = {
  // ==================== 直升机线专属：全村名马 ====================

  ch5_heli_fame: {
    id: 'ch5_heli_fame',
    chapter: 5,
    title: '第五章：亲戚围攻',
    narrative: [
      '你刚进门，还没来得及换鞋，亲戚们就围上来了——但今天的画风不太一样。',
      '没有人问你有没有对象。',
      '因为所有人都在问：那个直升机是怎么回事？？？',
      '七大姑："你是不是发财了？"',
      '八大姨："直升机多少钱一架？"',
      '表弟举着手机在拍你："哥/姐你现在是我们村的顶流！"',
      '🐴 本马从社恐变成了社牛，全靠一架不属于自己的直升机。',
    ],
    choices: [
      {
        id: 'ch5_heli_fame_honest',
        text: '如实说：免费搭的，帮了个奶奶的忙',
        effects: [
          { resource: 'mood', delta: 10, message: '诚实的马🐴' },
        ],
        nextNodeId: 'ch5_salary',
        feedback: '你把织毛线奶奶和老爷子的故事讲了一遍，亲戚们听得一愣一愣的。七大姑感慨："好人有好报啊！"八大姨已经在盘算让你下次帮她也搭一趟了。本马的诚实人设，意外地加了不少分 🐴✨',
        tag: 'helpful',
      },
      {
        id: 'ch5_heli_fame_vague',
        text: '故意含糊其辞，享受被崇拜的感觉',
        effects: [
          { resource: 'mood', delta: 15, message: '全村最靓的马🌟' },
        ],
        nextNodeId: 'ch5_salary',
        feedback: '本马微微一笑，既不承认也不否认："嗯……认识一些朋友嘛。"亲戚们的眼神瞬间变了，看你的目光像在看一匹成功马士。表弟的短视频已经发出去了，标题是"我哥坐直升机回村过年"，播放量正在起飞 🌟📱',
        tag: 'funny',
      },
      {
        id: 'ch5_heli_fame_deflect',
        text: '赶紧转移话题，太社死了',
        effects: [
          { resource: 'stamina', delta: -5, message: '突围消耗' },
          { resource: 'mood', delta: 5, message: '低调的马' },
        ],
        nextNodeId: 'ch5_salary',
        feedback: '本马拼命转移话题："别说直升机了，妈你做的什么菜这么香？"但没人接茬，所有人还在追问直升机的事。本马的社恐在全村的热情面前，不堪一击 🙈',
      },
    ],
  },

  ch5_relationship: {
    id: 'ch5_relationship',
    chapter: 5,
    title: '第五章：亲戚围攻',
    narrative: [
      '你刚进门，还没来得及换鞋，亲戚们就围上来了。',
      '七大姑八大姨表哥表姐堂弟堂妹……客厅里坐满了人。',
      '🐴 本马感受到了来自四面八方的关爱（压力）。',
      '七大姑第一个发难：\'有对象了吗？\'',
      '全场安静，所有人的目光聚焦在你身上。',
      '🐴 每年必考题，从不缺席。',
    ],
    choices: [
      {
        id: 'relationship_lie',
        text: '有了有了！（其实没有）',
        effects: [
          { resource: 'mood', delta: 5, message: '善意的谎言🤥' },
          { resource: 'stamina', delta: -5, message: '善意的谎言🤥' },
        ],
        nextNodeId: 'ch5_salary',
        feedback: '七大姑眼睛一亮，追问"哪里人？做什么的？"——本马编的速度跟不上她问的速度了。🤥',
      },
      {
        id: 'relationship_honest',
        text: '还没呢，缘分没到',
        effects: [
          { resource: 'mood', delta: -15, message: '被追问了十分钟😰' },
        ],
        nextNodeId: 'ch5_salary',
        feedback: '七大姑叹了口气，开始给你介绍她同事的儿子。本马感觉自己掉进了一个没有尽头的相亲数据库。😰',
      },
      {
        id: 'relationship_reverse',
        text: '反问：姑，表哥的二胎生了没？',
        effects: [
          { resource: 'mood', delta: 10, message: '反杀成功🔥' },
        ],
        nextNodeId: 'ch5_salary',
        feedback: '七大姑脸色一变，话题瞬间转向了表哥。本马在心里给自己竖了个大拇指——反杀成功，这马不是好惹的。🔥',
        tag: 'funny',
      },
      {
        id: 'relationship_flex',
        text: '谈了好几个，还在筛选',
        effects: [
          { resource: 'mood', delta: 5, message: '凡尔赛发言💅' },
        ],
        nextNodeId: 'ch5_salary',
        feedback: '亲戚们面面相觑，七大姑小声嘀咕"这孩子行啊"。本马凡尔赛技能拉满，全场震慑。💅',
      },
      {
        id: 'relationship_horse',
        text: '掏出毛线小马：这算不算？',
        condition: { type: 'has_item', itemId: 'knit_horse' },
        effects: [
          { resource: 'mood', delta: 15, message: '全场爆笑🐴' },
        ],
        nextNodeId: 'ch5_salary',
        feedback: '你掏出那个毛线小马挂件，七大姑愣了三秒，然后全场爆笑。"这孩子，谈了个马对象！"本马的社交危机，被一匹小马化解了。🐴😂',
        tag: 'funny',
      },
    ],
  },

  ch5_salary: {
    id: 'ch5_salary',
    chapter: 5,
    narrative: [
      '八大姨紧随其后：\'在大城市一个月挣多少钱啊？\'',
      '你还没回答，她补了一句：\'你表弟在老家公务员，一个月八千呢。\'',
      '……谢谢分享。',
    ],
    choices: [
      {
        id: 'ch5_salary_honest',
        text: '如实说（可能被比较）',
        effects: [
          { resource: 'mood', delta: -20, message: '被比了个遍😤' },
        ],
        nextNodeId: 'ch5_kid',
        feedback: '八大姨开始掰着手指头算你的工资够不够买房。本马的自尊心碎了一地，像饺子馅一样被反复剁。😤',
      },
      {
        id: 'ch5_salary_exaggerate',
        text: '夸大一点（维护面子）',
        effects: [
          { resource: 'mood', delta: 5, message: '说多了得发大红包' },
          { resource: 'money', delta: -200, message: '说多了得发大红包' },
        ],
        nextNodeId: 'ch5_kid',
        feedback: '八大姨满意地点点头，然后转头跟你妈说"你家孩子出息了"。本马笑容逐渐僵硬——等等，过年红包是不是得按这个数发？💸',
      },
      {
        id: 'ch5_salary_dodge',
        text: '转移话题：姨，这菜谁做的，真香！',
        effects: [
          { resource: 'mood', delta: 10, message: '话题转移术' },
        ],
        nextNodeId: 'ch5_kid',
        feedback: '八大姨果然上钩，开始滔滔不绝地讲这道菜的做法。本马松了口气——论转移话题，职场老马还是有两把刷子的。🎣',
        tag: 'funny',
      },
      {
        id: 'ch5_salary_gift',
        text: '话题转移：姨，先看看我带的年货！',
        condition: { type: 'has_item', itemId: 'gift_pack' },
        effects: [
          { resource: 'mood', delta: 15, message: '年货外交成功🎁' },
        ],
        nextNodeId: 'ch5_kid',
        feedback: '你从行李里掏出年货大礼包，八大姨眼睛一亮，工资的事瞬间被抛到脑后。"哎呀这孩子真懂事！"本马的年货外交，大获成功。🎁✨',
      },
    ],
  },

  ch5_kid: {
    id: 'ch5_kid',
    chapter: 5,
    narrative: [
      '正聊着，一个小屁孩冲过来拉你的衣角。',
      '\'哥哥/姐姐，手机借我用一下嘛！我要用AI查寒假作业答案！\'',
      '你低头一看，这不是表姐家的熊孩子吗？上次他把你手机摔碎了。',
      '🐴 现在的小孩都会用AI查作业了？本马当年可是一笔一划抄答案的。',
    ],
    choices: [
      {
        id: 'ch5_kid_give',
        text: '给他用吧，大过年的',
        effects: [
          { resource: 'mood', delta: -15, message: '心在滴血' },
          { resource: 'stamina', delta: -5, message: '心在滴血' },
        ],
        nextNodeId: 'ch5_blind_date',
        feedback: '熊孩子一把抢过手机，熟练地打开AI对话框开始问数学题。本马震惊于他的操作流畅度——这孩子比本马还会用AI。🫠',
      },
      {
        id: 'ch5_kid_refuse',
        text: '不给！自己动脑子写',
        effects: [
          { resource: 'mood', delta: -10, message: '被说小气' },
        ],
        nextNodeId: 'ch5_blind_date',
        feedback: '熊孩子当场哇哇大哭，表姐投来了"你怎么跟小孩计较"的眼神。本马虽然守住了手机和教育理念，但社会性死亡了。😅',
      },
      {
        id: 'ch5_kid_teach',
        text: '来，哥哥教你怎么自己想',
        effects: [
          { resource: 'mood', delta: 10, message: '好为人师的马🎓' },
          { resource: 'stamina', delta: -10, message: '好为人师的马🎓' },
        ],
        nextNodeId: 'ch5_blind_date',
        feedback: '本马耐心地教了半小时，熊孩子似懂非懂地点头。等你一转身，他就用平板偷偷问AI了。本马的教育事业，任重道远。🎓📱',
        tag: 'helpful',
      },
      {
        id: 'ch5_kid_powerbank',
        text: '给他充电宝玩，手机免谈',
        condition: { type: 'has_item', itemId: 'power_bank' },
        effects: [
          { resource: 'mood', delta: 10, message: '充电宝当诱饵🔋' },
        ],
        nextNodeId: 'ch5_blind_date',
        feedback: '你掏出充电宝递过去："这个给你玩，手机哥哥要用。"熊孩子研究了一下充电宝上的LED灯，居然玩得很开心。本马的充电宝，一物多用。🔋😎',
        removeItem: 'power_bank',
      },
      {
        id: 'ch5_kid_noodles',
        text: '用泡面贿赂他',
        condition: { type: 'has_item', itemId: 'instant_noodles' },
        effects: [
          { resource: 'mood', delta: 5, message: '泡面外交🍜' },
        ],
        nextNodeId: 'ch5_blind_date',
        feedback: '"想吃泡面不？哥哥给你泡一碗！"熊孩子的注意力瞬间从手机转移到了泡面上。本马深谙一个道理：没有什么问题是一碗泡面解决不了的。🍜',
      },
    ],
  },

  ch5_blind_date: {
    id: 'ch5_blind_date',
    chapter: 5,
    narrative: [
      '你妈突然把你拉到一边，神秘兮兮地说：',
      '\'隔壁王阿姨的女儿/儿子也回来了，人家可是研究生毕业的……\'',
      '\'我约了明天一起吃饭，你好好表现。\'',
      '🐴 ！！！妈你是认真的吗？？？',
    ],
    choices: [
      {
        id: 'ch5_blind_date_dodge_lie',
        text: '妈！我都说有对象了！',
        condition: { type: 'choice_made', choiceId: 'relationship_lie' },
        effects: [
          { resource: 'mood', delta: 5, message: '圆谎成功🤥' },
        ],
        nextNodeId: 'ch5_end',
        feedback: '你妈狐疑地看了你一眼："真的假的？那让人家来家里吃顿饭呗。"本马赶紧编：人家在外地过年呢！你妈半信半疑地放弃了，但眼神写满了"年后必须带来给我看看" 🤥😅',
      },
      {
        id: 'ch5_blind_date_dodge_flex',
        text: '妈，我正在筛选呢，不急！',
        condition: { type: 'choice_made', choiceId: 'relationship_flex' },
        effects: [
          { resource: 'mood', delta: 10, message: '凡尔赛再次生效💅' },
        ],
        nextNodeId: 'ch5_end',
        feedback: '你妈愣了一下："筛选？你还挑上了？"本马淡定地说"宁缺毋滥嘛"。你妈虽然嘴上嘀咕"眼光别太高"，但明显被凡尔赛到了，相亲的事暂时搁置 💅✨',
        tag: 'funny',
      },
      {
        id: 'ch5_blind_date_accept',
        text: '行吧，去看看',
        effects: [
          { resource: 'mood', delta: 5, message: '相亲基金' },
          { resource: 'money', delta: -300, message: '相亲基金' },
        ],
        nextNodeId: 'ch5_end',
        feedback: '你妈乐开了花，当晚就给你熨了件新衬衫。本马看着镜子里的自己，感觉像被推上了一个不属于自己的舞台。🎭',
      },
      {
        id: 'ch5_blind_date_refuse',
        text: '妈！我自己的事自己做主！',
        effects: [
          { resource: 'mood', delta: -10, message: '家庭矛盾' },
          { resource: 'stamina', delta: -10, message: '家庭矛盾' },
        ],
        nextNodeId: 'ch5_end',
        feedback: '你妈沉默了三秒，然后甩出一句"我还不是为了你好"。空气瞬间凝固，本马感觉自己在家庭伦理剧里当了主角。🥶',
      },
      {
        id: 'ch5_blind_date_wechat_callback',
        text: '先加个微信——等等，这头像怎么有点眼熟……',
        condition: { type: 'choice_made', choiceId: 'ch3_hsr_arrival_exchange' },
        effects: [
          { resource: 'mood', delta: 20, message: '命运的安排😲' },
        ],
        nextNodeId: 'ch5_end',
        feedback: '你妈把对方微信推过来，本马随手一扫——头像是一只被延误航班气到变形的猫。等等。这个头像……本马猛地翻出高铁上加的那个难友的微信。同一只猫。同一个人。本马瞪大了眼睛：所以妈你给我介绍的相亲对象，就是我在高铁上一起吐槽航空公司的那个人？？？你妈一脸无辜：啊？你们认识？那不是更好嘛！本马和难友在微信上大眼瞪小眼了三秒，然后同时发了一条消息：「原来是你啊哈哈哈哈哈」🚄💕😂',
        tag: 'funny',
      },
      {
        id: 'ch5_blind_date_wechat',
        text: '先加个微信，线上聊聊',
        effects: [
          { resource: 'mood', delta: 5, message: '折中方案' },
        ],
        nextNodeId: 'ch5_end',
        feedback: '你妈勉强接受了这个方案，立刻把对方微信推给你。本马打开一看——头像是一只猫，嗯，品味不错。🐱',
      },
      {
        id: 'ch5_blind_date_redpacket',
        text: '先给妈发个红包消消气',
        condition: { type: 'has_item', itemId: 'red_envelopes' },
        effects: [
          { resource: 'mood', delta: 10, message: '红包和事佬🧧' },
          { resource: 'money', delta: -200, message: '红包和事佬🧧' },
        ],
        nextNodeId: 'ch5_end',
        feedback: '你悄悄给妈妈转了个红包，附言"辛苦了妈，相亲的事我自己看着办"。妈妈看了看手机，嘴角忍不住上扬。红包果然是万能的润滑剂。🧧',
      },
    ],
  },

  ch5_end: {
    id: 'ch5_end',
    chapter: 5,
    narrative: [
      '经历了亲戚们的轮番轰炸，你终于熬到了晚饭时间。',
      '虽然被问了一堆尴尬问题，但看着满桌子的家乡菜，心里还是暖暖的。',
      '🐴 本马虽然社交性命垂危，但胃很满足。',
      '接下来，就是年夜饭大作战了！',
    ],
    choices: [
      {
        id: 'ch5_end_continue',
        text: '开饭！',
        effects: [],
        nextNodeId: 'ch6_cook',
      },
    ],
  },
}

export default chapter5Nodes
