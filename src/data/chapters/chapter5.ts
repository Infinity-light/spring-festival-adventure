import type { StoryNode } from '@/types/game'

const chapter5Nodes: Record<string, StoryNode> = {
  ch5_start: {
    id: 'ch5_start',
    chapter: 5,
    title: '第五章：亲戚围攻',
    narrative: [
      '你刚进门，还没来得及换鞋，亲戚们就围上来了。',
      '七大姑八大姨表哥表姐堂弟堂妹……客厅里坐满了人。',
      '本马感受到了来自四面八方的关爱（压力）。',
    ],
    choices: [
      {
        id: 'ch5_start_continue',
        text: '迎接挑战',
        effects: [],
        nextNodeId: 'ch5_relationship',
      },
    ],
  },

  ch5_relationship: {
    id: 'ch5_relationship',
    chapter: 5,
    narrative: [
      '七大姑第一个发难：\'小X啊，有对象了吗？\'',
      '全场安静，所有人的目光聚焦在你身上。',
      '每年必考题，从不缺席。',
    ],
    choices: [
      {
        id: 'relationship_lie',
        text: '有了有了！（其实没有）',
        effects: [
          { resource: 'mood', delta: 5, message: '善意的谎言' },
          { resource: 'stamina', delta: -5, message: '善意的谎言' },
        ],
        nextNodeId: 'ch5_salary',
      },
      {
        id: 'relationship_honest',
        text: '还没呢，缘分没到',
        effects: [
          { resource: 'mood', delta: -15, message: '被追问了十分钟' },
        ],
        nextNodeId: 'ch5_salary',
      },
      {
        id: 'relationship_reverse',
        text: '反问：姑，表哥的二胎生了没？',
        effects: [
          { resource: 'mood', delta: 10, message: '反杀成功' },
        ],
        nextNodeId: 'ch5_salary',
      },
      {
        id: 'relationship_flex',
        text: '谈了好几个，还在筛选',
        effects: [
          { resource: 'mood', delta: 5, message: '凡尔赛发言' },
        ],
        nextNodeId: 'ch5_salary',
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
          { resource: 'mood', delta: -20, message: '被比了个遍' },
        ],
        nextNodeId: 'ch5_kid',
      },
      {
        id: 'ch5_salary_exaggerate',
        text: '夸大一点（维护面子）',
        effects: [
          { resource: 'mood', delta: 5, message: '说多了得发大红包' },
          { resource: 'money', delta: -200, message: '说多了得发大红包' },
        ],
        nextNodeId: 'ch5_kid',
      },
      {
        id: 'ch5_salary_dodge',
        text: '转移话题：姨，这菜谁做的，真香！',
        effects: [
          { resource: 'mood', delta: 10, message: '话题转移术' },
        ],
        nextNodeId: 'ch5_kid',
      },
    ],
  },

  ch5_kid: {
    id: 'ch5_kid',
    chapter: 5,
    narrative: [
      '正聊着，一个小屁孩冲过来拉你的衣角。',
      '\'哥哥/姐姐，手机借我玩一下嘛！\'',
      '你低头一看，这不是表姐家的熊孩子吗？上次他把你手机摔碎了。',
      '本马的手机，本马的命。',
    ],
    choices: [
      {
        id: 'ch5_kid_give',
        text: '给他玩吧，大过年的',
        effects: [
          { resource: 'mood', delta: -15, message: '心在滴血' },
          { resource: 'stamina', delta: -5, message: '心在滴血' },
        ],
        nextNodeId: 'ch5_blind_date',
      },
      {
        id: 'ch5_kid_refuse',
        text: '不给！上次你摔了我手机',
        effects: [
          { resource: 'mood', delta: -10, message: '被说小气' },
        ],
        nextNodeId: 'ch5_blind_date',
      },
      {
        id: 'ch5_kid_oldphone',
        text: '掏出一个老年机：玩这个',
        effects: [
          { resource: 'mood', delta: 10, message: '早有准备' },
        ],
        nextNodeId: 'ch5_blind_date',
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
      '！！！妈你是认真的吗？？？',
    ],
    choices: [
      {
        id: 'ch5_blind_date_accept',
        text: '行吧，去看看',
        effects: [
          { resource: 'mood', delta: 5, message: '相亲基金' },
          { resource: 'money', delta: -300, message: '相亲基金' },
        ],
        nextNodeId: 'ch5_end',
      },
      {
        id: 'ch5_blind_date_refuse',
        text: '妈！我自己的事自己做主！',
        effects: [
          { resource: 'mood', delta: -10, message: '家庭矛盾' },
          { resource: 'stamina', delta: -10, message: '家庭矛盾' },
        ],
        nextNodeId: 'ch5_end',
      },
      {
        id: 'ch5_blind_date_wechat',
        text: '先加个微信，线上聊聊',
        effects: [
          { resource: 'mood', delta: 5, message: '折中方案' },
        ],
        nextNodeId: 'ch5_end',
      },
    ],
  },

  ch5_end: {
    id: 'ch5_end',
    chapter: 5,
    narrative: [
      '经历了亲戚们的轮番轰炸，你终于熬到了晚饭时间。',
      '虽然被问了一堆尴尬问题，但看着满桌子的家乡菜，心里还是暖暖的。',
      '本马虽然社交性命垂危，但胃很满足。',
      '接下来，就是年夜饭大作战了！',
    ],
    choices: [
      {
        id: 'ch5_end_continue',
        text: '开饭！',
        effects: [],
        nextNodeId: 'ch6_start',
      },
    ],
  },
}

export default chapter5Nodes
