import type { Quiz } from '../types.ts'

export const weekendQuiz: Quiz = {
  id: 'weekend',
  title: '周末去哪儿',
  tagline: '两天假期，适合哪座城',
  description:
    '不谈签证和机票。只问你这两天想吃什么、走多快、要不要人多。结果会落到一座国内城市，当作下个周末的备选。',
  minutes: 2,
  premium: false,
  scope: null,
  accent: '#3F7CAC',
  cover: 'train',
  questions: [
    {
      id: 'w1',
      title: '这两天你最想被什么填满？',
      options: [
        { id: 'a', label: '湖、山、慢走，少说话', scores: { hangzhou: 2, dali: 1 } },
        { id: 'b', label: '火锅、麻将、不用赶点', scores: { chengdu: 2 } },
        { id: 'c', label: '海风、小路、随便拍几张', scores: { xiamen: 2, qingdao: 1 } },
        { id: 'd', label: '古城、博物馆、晚上再去吃摊', scores: { xian: 2 } },
      ],
    },
    {
      id: 'w2',
      title: '对「人多」的容忍度？',
      options: [
        { id: 'a', label: '景点可以挤，只要晚上能静', scores: { hangzhou: 1, xian: 2 } },
        { id: 'b', label: '热闹才像出门了', scores: { chengdu: 2, xian: 1 } },
        { id: 'c', label: '能避开高峰就避开', scores: { xiamen: 1, qingdao: 2, dali: 2 } },
        { id: 'd', label: '完全不想跟人潮赛跑', scores: { dali: 2, hangzhou: 1 } },
      ],
    },
    {
      id: 'w3',
      title: '晚饭更想吃？',
      options: [
        { id: 'a', label: '清淡一点，茶和时令菜就好', scores: { hangzhou: 2 } },
        { id: 'b', label: '重口、辣、要烫', scores: { chengdu: 2 } },
        { id: 'c', label: '海鲜、汤、配一点甜', scores: { xiamen: 2, qingdao: 2 } },
        { id: 'd', label: '肉、面、能垫肚子的硬菜', scores: { xian: 2 } },
      ],
    },
    {
      id: 'w4',
      title: '白天的步调？',
      options: [
        { id: 'a', label: '两三个点就够，留白给发呆', scores: { dali: 2, hangzhou: 1 } },
        { id: 'b', label: '睡到自然醒，下午再出门', scores: { chengdu: 2, dali: 1 } },
        { id: 'c', label: '沿路走，走到哪算哪', scores: { xiamen: 2, qingdao: 1 } },
        { id: 'd', label: '有一条主线，把想看的看完', scores: { xian: 2, hangzhou: 1 } },
      ],
    },
    {
      id: 'w5',
      title: '你更想带走的感觉是？',
      options: [
        { id: 'a', label: '被绿意洗过一遍', scores: { hangzhou: 2, dali: 1 } },
        { id: 'b', label: '被好好喂过，人也变松', scores: { chengdu: 2 } },
        { id: 'c', label: '衣服上还留着盐和风', scores: { xiamen: 2, qingdao: 2 } },
        { id: 'd', label: '觉得自己多活了一截历史', scores: { xian: 2 } },
      ],
    },
    {
      id: 'w6',
      title: '如果只能带一件东西？',
      options: [
        { id: 'a', label: '一本薄书，或一副耳机', scores: { hangzhou: 2, dali: 1 } },
        { id: 'b', label: '一个胃口好的朋友', scores: { chengdu: 2, xian: 1 } },
        { id: 'c', label: '一双能走很久的鞋', scores: { xiamen: 1, qingdao: 2, xian: 1 } },
        { id: 'd', label: '一件不怕晒的外套', scores: { dali: 2, qingdao: 1 } },
      ],
    },
  ],
  results: [
    {
      id: 'hangzhou',
      title: '杭州',
      subtitle: '湖是主菜，城是配菜',
      summary:
        '你这两天需要被水汽和绿意托住，而不是被行程填满。西湖周边可以很挤，但你要的是拐进一条安静的堤、坐下来把茶喝完。杭州适合「看起来像出门，实际在恢复」。',
      traits: ['山水', '慢', '清淡'],
      suggestion: '避开周末正中的断桥。去九溪或满觉陇更侧的路，把人声留在身后。',
    },
    {
      id: 'chengdu',
      title: '成都',
      subtitle: '把效率先放门口',
      summary:
        '你要的不是打卡，是被一座城允许你晚起、多吃、少解释。成都的松弛不是摆拍，是真的不用跟时间比赛。火锅只是借口，真正的收获是肩膀落下来。',
      traits: ['松弛', '市井', '重口'],
      suggestion: '上午只定一个馆子。其余时间交给巷子，别把两天过成美食榜。',
    },
    {
      id: 'xiamen',
      title: '厦门',
      subtitle: '海风比计划可靠',
      summary:
        '你喜欢有边的城市：一边是海，一边是可以随便拐的路。厦门适合边走边拍，不必每张都发。鼓浪屿可以去，但你可能更舒服的是岛外一条被风推着走的岸。',
      traits: ['海风', '小路', '轻盈'],
      suggestion: '把一半时间留给非核心区。沙坡尾或海边的长椅，往往比景点记得更久。',
    },
    {
      id: 'xian',
      title: '西安',
      subtitle: '厚的城，热的夜',
      summary:
        '你想在短假期里吃到「有来历」的东西：城墙、馆子、晚上还亮着的摊。西安不会假装精致，它把历史和烟火叠在同一条街上。走完你会饿，这也是它的一部分。',
      traits: ['厚重', '烟火', '主线清晰'],
      suggestion: '白天一条历史线，晚上交给胃。不要两个都排满，会又累又后悔没吃。',
    },
    {
      id: 'qingdao',
      title: '青岛',
      subtitle: '海岸线是现成的日程',
      summary:
        '你想要风、啤酒、以及不用解释的走路。青岛的坡和海让人身体先回答「要不要再走一段」。它比南方海边更硬朗，也因此更清醒。',
      traits: ['海岸', '硬朗', '好走'],
      suggestion: '把栈桥当路过，把时间给一条你愿意来回走两遍的岸。',
    },
    {
      id: 'dali',
      title: '大理',
      subtitle: '风比闹钟先到',
      summary:
        '你需要离开日常的频率，而不是换一座更大的城。大理适合把事情放下来：看光、喝茶、让计划短一点。人可以多，但你要找的是风大的那一侧。',
      traits: ['留白', '风', '低日程'],
      suggestion: '只订住处和一顿晚饭。其余空着，才是大理该有的用法。',
    },
  ],
}
