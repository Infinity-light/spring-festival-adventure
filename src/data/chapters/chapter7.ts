import type { StoryNode } from '@/types/game'

const chapter7Nodes: Record<string, StoryNode> = {
  ch7_morning: {
    id: 'ch7_morning',
    chapter: 7,
    title: '第七章：大年初一',
    narrative: [
      '大年初一的阳光透过窗帘照进来，你被此起彼伏的鞭炮声吵醒。',
      '妈妈已经在厨房煮汤圆了，香甜的味道飘进房间。',
      '"起来啦！大年初一，给爸妈拜年！"',
      '🐴 新年第一天，本马精神焕发！',
    ],
    choices: [
      {
        id: 'ch7_morning_kowtow',
        text: '跳起来给爸妈磕头拜年',
        effects: [
          { resource: 'mood', delta: 15, message: '传统拜年，诚意满满🧎' },
          { resource: 'stamina', delta: -5, message: '磕头也是体力活' },
          { resource: 'money', delta: 800, message: '爸妈的压岁钱🧧' },
        ],
        nextNodeId: 'ch7_visit',
        feedback: '你一个标准的磕头拜年，爸妈笑得合不拢嘴。妈妈塞给你一个厚厚的红包："新的一年，健健康康的。"本马的膝盖虽然疼，但心里暖暖的。🧧😊',
      },
      {
        id: 'ch7_morning_lazy',
        text: '赖床五分钟再说',
        effects: [
          { resource: 'stamina', delta: 10, message: '多睡五分钟的幸福😴' },
          { resource: 'mood', delta: 5, message: '懒觉真香' },
          { resource: 'money', delta: 500, message: '压岁钱少了点🧧' },
        ],
        nextNodeId: 'ch7_visit',
        feedback: '五分钟变成了半小时，妈妈第三次来叫你才起。爸爸在客厅嘀咕"这孩子，大年初一还赖床"。红包倒是给了，但明显比往年薄了一点。本马：赖床一时爽，红包火葬场。😴💸',
      },
      {
        id: 'ch7_morning_redpacket',
        text: '发个家族群红包代替',
        effects: [
          { resource: 'mood', delta: 10, message: '数字化拜年📱' },
          { resource: 'money', delta: -200, message: '发红包支出' },
          { resource: 'money', delta: 500, message: '爸妈的压岁钱🧧' },
        ],
        nextNodeId: 'ch7_visit',
        feedback: '你在家族群里发了个红包，配文"新年快乐！给大家拜年啦！"群里瞬间炸开，七大姑八大姨抢得不亦乐乎。妈妈看了看手机，笑着摇头："这孩子，拜年都线上了。"本马：科技改变拜年。📱🧧',
      },
    ],
  },

  ch7_visit: {
    id: 'ch7_visit',
    chapter: 7,
    narrative: [
      '吃完汤圆，妈妈宣布今天的行程：',
      '先去爷爷奶奶家，再去外公外婆家，最后去二叔家。',
      '"都准备好了吧？走！"',
      '🐴 走亲戚马拉松，开始！',
    ],
    choices: [
      {
        id: 'ch7_visit_happy',
        text: '欣然前往，带上年货',
        effects: [
          { resource: 'stamina', delta: -15, message: '走亲戚体力消耗🏃' },
          { resource: 'mood', delta: 10, message: '亲情满满' },
        ],
        nextNodeId: 'ch7_grandpa',
        feedback: '你拎着大包小包跟在妈妈后面，活像一个移动的年货仓库。路上碰到邻居都夸"这孩子真孝顺"。本马虽然累，但被夸的感觉还不错。🏃🎁',
      },
      {
        id: 'ch7_visit_less',
        text: '能不能只去爷爷奶奶家？',
        effects: [
          { resource: 'mood', delta: -10, message: '妈妈不高兴了😤' },
        ],
        nextNodeId: 'ch7_grandpa',
        feedback: '妈妈的脸瞬间拉了下来："大年初一说这种话！你外公外婆不是长辈？"本马识趣地闭上了嘴，乖乖跟上。有些仗，注定打不赢。😤',
      },
      {
        id: 'ch7_visit_redpacket',
        text: '带上红包，社交无敌',
        condition: { type: 'has_item', itemId: 'red_envelopes' },
        effects: [
          { resource: 'stamina', delta: -10, message: '走亲戚体力消耗' },
          { resource: 'mood', delta: 15, message: '红包开路，所向披靡🧧' },
          { resource: 'money', delta: -500, message: '红包大军出动' },
        ],
        nextNodeId: 'ch7_grandpa',
        feedback: '你提前准备好了一沓红包，见到长辈就递，碰到小孩就发。一路上收获了无数"这孩子真懂事"的好评。本马的红包外交，从第五章一路用到了第七章，屡试不爽。🧧✨',
      },
    ],
  },

  ch7_grandpa: {
    id: 'ch7_grandpa',
    chapter: 7,
    narrative: [
      '到了爷爷奶奶家，爷爷拉着你的手，问你在外面吃得好不好、穿得暖不暖。',
      '奶奶从柜子深处掏出一个红包塞给你，压低声音说：',
      '"奶奶给的，别跟你妈说。"',
      '🐴 奶奶的红包，永远是最厚的。',
    ],
    choices: [
      {
        id: 'ch7_grandpa_chess',
        text: '陪爷爷下棋',
        effects: [
          { resource: 'stamina', delta: -10, message: '脑力消耗♟️' },
          { resource: 'mood', delta: 20, message: '爷孙时光，无价' },
        ],
        nextNodeId: 'ch7_reflection',
        feedback: '爷爷的棋艺还是那么厉害，三局你输了两局半。爷爷笑着说"你小时候就下不过我"。窗外的阳光照在棋盘上，时间好像慢了下来。本马觉得，这才是过年的意义。♟️😌',
      },
      {
        id: 'ch7_grandpa_kitchen',
        text: '帮奶奶收拾厨房',
        effects: [
          { resource: 'stamina', delta: -15, message: '厨房劳动🧹' },
          { resource: 'mood', delta: 15, message: '奶奶很开心' },
        ],
        nextNodeId: 'ch7_reflection',
        feedback: '你挽起袖子帮奶奶洗碗，奶奶心疼地说"放着放着，奶奶来"。但你坚持洗完了，奶奶偷偷又塞了一把零食给你。本马发现，奶奶的爱，总是藏在食物里。🧹🍬',
      },
      {
        id: 'ch7_grandpa_phone',
        text: '教爷爷用智能手机',
        effects: [
          { resource: 'stamina', delta: -10, message: '耐心教学📱' },
          { resource: 'mood', delta: 15, message: '科技助老' },
        ],
        nextNodeId: 'ch7_reflection',
        feedback: '爷爷学了半小时，终于学会了发语音消息。第一条语音发给了你："孙子，想你了。"本马的眼眶突然就红了。📱🥺',
      },
    ],
  },

  ch7_reflection: {
    id: 'ch7_reflection',
    chapter: 7,
    narrative: [
      '走完亲戚回到家，你一个人坐在院子里。',
      '冬天的阳光暖暖的，远处传来小孩放鞭炮的声音。',
      '你翻了翻手机相册，这一路的照片——',
      '火车站的人山人海、服务区的天价泡面、爸爸来接你时的笑脸、年夜饭的满桌菜……',
      '🐴 这一趟，值了。',
    ],
    choices: [
      {
        id: 'ch7_reflection_post',
        text: '发一条朋友圈：回家真好',
        effects: [
          { resource: 'mood', delta: 10, message: '朋友圈记录生活📸' },
        ],
        nextNodeId: 'ch7_wish',
        feedback: '你精心挑了九张图，配文"回家真好"。发出去不到一分钟，就收到了同事的点赞和老同学的评论"你也回来了？约！"。本马的朋友圈，年度最佳。📸❤️',
      },
      {
        id: 'ch7_reflection_call',
        text: '给远方的朋友打个电话',
        effects: [
          { resource: 'mood', delta: 15, message: '友情连线📞' },
          { resource: 'stamina', delta: -5, message: '煲电话粥' },
        ],
        nextNodeId: 'ch7_wish',
        feedback: '电话那头的老朋友也在家过年，你们聊了半小时，从工作吐槽到童年回忆。挂电话前他说"有空来我这边玩"。本马觉得，有些友情，不会被距离冲淡。📞😊',
      },
      {
        id: 'ch7_reflection_quiet',
        text: '就这样安静坐一会儿',
        effects: [
          { resource: 'mood', delta: 10, message: '片刻宁静🌅' },
          { resource: 'stamina', delta: 10, message: '充电时间' },
        ],
        nextNodeId: 'ch7_wish',
        feedback: '你什么都没做，就坐在那里晒太阳。风吹过来，带着鞭炮的火药味和厨房飘出的饭菜香。本马闭上眼睛，把这一刻存进了记忆里。🌅',
      },
      {
        id: 'ch7_reflection_horse',
        text: '看着毛线小马发呆',
        condition: { type: 'has_item', itemId: 'knit_horse' },
        effects: [
          { resource: 'mood', delta: 20, message: '温暖的回忆🐴💓' },
        ],
        nextNodeId: 'ch7_wish',
        feedback: '你把毛线小马挂件放在手心，阳光照在它红色的身子上。有些人走了就是走了，但留下的温度还在。本马把小马重新挂回背包上，嘴角微微上扬。🐴💓',
      },
    ],
  },

  ch7_wish: {
    id: 'ch7_wish',
    chapter: 7,
    narrative: [
      '妈妈端来一碗热汤圆："许个新年愿望吧。"',
      '你闭上眼睛，脑海里闪过这一路的画面。',
      '从挤火车到到家，从亲戚围攻到年夜饭，从鞭炮声到此刻的安静。',
      '🐴 新的一年，本马希望……',
    ],
    choices: [
      {
        id: 'wish_family',
        text: '希望家人都健康平安',
        emoji: '🏠',
        effects: [],
        nextNodeId: 'ch7_end',
        feedback: '你睁开眼，看到妈妈在旁边笑着看你。"许好了？""嗯。"有些愿望不用说出来，心里知道就好。🏠💕',
      },
      {
        id: 'wish_career',
        text: '希望升职加薪财务自由',
        emoji: '💰',
        effects: [],
        nextNodeId: 'ch7_end',
        feedback: '你睁开眼，妈妈问"许了什么？"你笑着说"秘密"。心里想的是，等明年回来，一定要给爸妈换个大房子。💰🔥',
      },
      {
        id: 'wish_love',
        text: '希望找到那个对的人',
        emoji: '❤️',
        effects: [],
        nextNodeId: 'ch7_end',
        feedback: '你睁开眼，妈妈仿佛看穿了你的心思："是不是许了找对象？"你赶紧否认，但耳朵已经红了。本马的愿望，被妈妈一秒看穿。❤️😳',
      },
      {
        id: 'wish_peace',
        text: '希望世界和平，AI别抢我饭碗',
        emoji: '🌍',
        effects: [],
        nextNodeId: 'ch7_end',
        feedback: '你睁开眼，忍不住笑了。妈妈问怎么了，你说"没事，许了个很大的愿望"。世界和平可能管不了，但AI的事……本马决定回去好好学习，打不过就加入。🌍🤖',
      },
    ],
  },

  ch7_end: {
    id: 'ch7_end',
    chapter: 7,
    narrative: [
      '汤圆甜甜的，和家人在一起的感觉更甜。',
      '不管这一路经历了什么——挤过的火车、吃过的泡面、扛过的亲戚盘问、放过的烟花——',
      '此刻你就在家里，这就够了。',
      '🐴 春节回家历险记，到此结束。',
      '让我们来看看你的旅途成绩单……',
    ],
    choices: [
      {
        id: 'ch7_end_view',
        text: '查看我的结局',
        effects: [],
        nextNodeId: 'game_end',
        addItem: 'dumpling',
      },
    ],
  },
}

export default chapter7Nodes
