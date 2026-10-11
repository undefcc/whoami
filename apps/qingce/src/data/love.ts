import type { Quiz } from '../types.ts'

export const loveQuiz: Quiz = {
  id: 'love',
  title: '恋爱沟通',
  tagline: '吵架前后，你是哪一种',
  description:
    '不问星座合不合。只看你在亲密关系里怎么处理误会、冷场和需要。四种风格没有高下，错的是用自己的方式要求对方也必须这样。',
  minutes: 3,
  premium: true,
  scope: 'LOVE',
  accent: '#B85C70',
  cover: 'letter',
  questions: [
    {
      id: 'l1',
      title: '对方突然少回消息，你更常？',
      options: [
        { id: 'a', label: '直接问：你是忙，还是有事', scores: { direct: 2 } },
        { id: 'b', label: '反复看聊天记录，猜测语气', scores: { tender: 2 } },
        { id: 'c', label: '先把自己的事做完，过一阵再看', scores: { space: 2 } },
        { id: 'd', label: '发一张日常照片，或把晚饭带回去', scores: { action: 2 } },
      ],
    },
    {
      id: 'l2',
      title: '发生误会时，你觉得有效的是？',
      options: [
        { id: 'a', label: '当时说开，不要隔夜', scores: { direct: 2 } },
        { id: 'b', label: '先承认对方的情绪，再谈事实', scores: { tender: 2 } },
        { id: 'c', label: '各自冷静，写下来再谈', scores: { space: 2 } },
        { id: 'd', label: '先做一件能修复现场的事', scores: { action: 2 } },
      ],
    },
    {
      id: 'l3',
      title: '你更希望被对方怎样对待？',
      options: [
        { id: 'a', label: '有话直说，别让我猜', scores: { direct: 2 } },
        { id: 'b', label: '先接住我的感受，再给建议', scores: { tender: 2 } },
        { id: 'c', label: '给我空间，不要用关心把我围住', scores: { space: 2 } },
        { id: 'd', label: '出现在现场，比说很多话重要', scores: { action: 2 } },
      ],
    },
    {
      id: 'l4',
      title: '约会迟到了，对方有点不高兴。你？',
      options: [
        { id: 'a', label: '先讲清楚原因，问还生不生气', scores: { direct: 2 } },
        { id: 'b', label: '先看对方脸色，把语气放软', scores: { tender: 2 } },
        { id: 'c', label: '道歉，但不想立刻展开长谈', scores: { space: 1, action: 1 } },
        { id: 'd', label: '把接下来的安排做好，用行动补', scores: { action: 2 } },
      ],
    },
    {
      id: 'l5',
      title: '关系变淡的早期信号，你通常？',
      options: [
        { id: 'a', label: '约一次认真谈，问还要不要继续', scores: { direct: 2 } },
        { id: 'b', label: '更频繁地确认「我们还好吗」', scores: { tender: 2 } },
        { id: 'c', label: '减少主动，看对方会不会靠近', scores: { space: 2 } },
        { id: 'd', label: '安排一次具体的见面或旅行', scores: { action: 2 } },
      ],
    },
    {
      id: 'l6',
      title: '你表达在乎时，更像？',
      options: [
        { id: 'a', label: '把担心和界限说明白', scores: { direct: 2 } },
        { id: 'b', label: '记住对方随口说的小事', scores: { tender: 2 } },
        { id: 'c', label: '不打扰，但需要时一定在', scores: { space: 2 } },
        { id: 'd', label: '修东西、带路、把麻烦先挡掉', scores: { action: 2 } },
      ],
    },
    {
      id: 'l7',
      title: '大吵之后的第二天早上，你要？',
      options: [
        { id: 'a', label: '把昨晚没说完的结论补上', scores: { direct: 2 } },
        { id: 'b', label: '先问睡得好不好，再碰那个话题', scores: { tender: 2 } },
        { id: 'c', label: '和平地各做各的，等气消', scores: { space: 2 } },
        { id: 'd', label: '做早餐或把家务做了，先让日子转起来', scores: { action: 2 } },
      ],
    },
  ],
  results: [
    {
      id: 'direct',
      title: '直球确认型',
      subtitle: '不清楚的关系，比冲突更难受',
      summary:
        '你用问句降低焦虑：现在怎样、还好不好、到哪一步了。你不是要吵架，是要一张新的地图。对方如果习惯绕弯，会觉得你压得紧；你如果收不住，确认会变成审讯。',
      traits: ['要明确', '不爱猜', '冲突耐受高'],
      suggestion: '问之前先说一句目的：「我想靠近，不是来对质。」给对方 10 分钟组织语言。',
    },
    {
      id: 'tender',
      title: '细腻感受型',
      subtitle: '语气对了，事情才听得进去',
      summary:
        '你先接收温度，再接收内容。一句硬的话，会在你这里放大。你能把关系照顾得很细，也可能过度解释沉默。你需要的不是更多分析，是被看见。',
      traits: ['情绪雷达', '记忆细节', '怕冷处理'],
      suggestion: '把猜测写成「我的想象」，再请对方证实。别把脑内剧本直接当成事实。',
    },
    {
      id: 'space',
      title: '空间缓冲型',
      subtitle: '先退一步，才说得准',
      summary:
        '你在被围住时无法好好说话。冷静不是冷淡，是你恢复语言的方式。对方若把空间读成抛弃，误会会叠加。你需要提前声明：我离开是为了回来。',
      traits: ['要缓冲', '怕被围', '事后更清楚'],
      suggestion: '离开时给一个具体回来的点：「一小时后我主动找你。」空白里要有约定。',
    },
    {
      id: 'action',
      title: '行动陪伴型',
      subtitle: '在场，比把道理说完重要',
      summary:
        '你用出现、办事、把生活托住来表达爱。话可能不多，但冰箱和行程会说话。对方如果要的是长谈，会觉得你在逃；你如果只做事不解释，善意到不了。',
      traits: ['在场', '做事', '不擅长长谈'],
      suggestion: '行动之后补一句短的：「我在，我在乎。」不必变成演说，只要出口。',
    },
  ],
}
