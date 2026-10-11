import type { Quiz } from '../types.ts'

export const travelQuiz: Quiz = {
  id: 'travel',
  title: '旅行目的地',
  tagline: '下一次远门，去哪更对',
  description:
    '比周末测评更远一点：问你要不要荒、要不要古、要不要被陌生的气味包围。结果会落到一座国外目的地，当作下一次请假的方向，不是攻略本身。',
  minutes: 4,
  premium: true,
  scope: 'TRAVEL',
  accent: '#C46B4A',
  cover: 'map',
  questions: [
    {
      id: 't1',
      title: '下飞机后，你最想先看到？',
      options: [
        { id: 'a', label: '被打理过的古意：木、石、门', scores: { kyoto: 2, lisbon: 1 } },
        { id: 'b', label: '几乎没人的地平线', scores: { iceland: 2, queenstown: 1 } },
        { id: 'c', label: '温度刚好的街道和摊', scores: { chiangmai: 2, marrakech: 1 } },
        { id: 'd', label: '有坡、有光、有人生活的老城', scores: { lisbon: 2, marrakech: 1 } },
      ],
    },
    {
      id: 't2',
      title: '对「计划」的态度？',
      options: [
        { id: 'a', label: '每天有主线，其余可偏', scores: { kyoto: 2, queenstown: 1 } },
        { id: 'b', label: '天气说了算，人跟着走', scores: { iceland: 2 } },
        { id: 'c', label: '睡醒再决定，别把自己排满', scores: { chiangmai: 2, lisbon: 1 } },
        { id: 'd', label: '跟着气味和路口走，迷路也行', scores: { marrakech: 2, lisbon: 1 } },
      ],
    },
    {
      id: 't3',
      title: '你更怕旅途里的哪一种空？',
      options: [
        { id: 'a', label: '没有仪式感，每天都像路过', scores: { kyoto: 2 } },
        { id: 'b', label: '太安全、太熟，没有心跳', scores: { iceland: 2, queenstown: 2 } },
        { id: 'c', label: '一直赶，没有坐下来的下午', scores: { chiangmai: 2, lisbon: 1 } },
        { id: 'd', label: '太干净，缺少生活的毛边', scores: { marrakech: 2 } },
      ],
    },
    {
      id: 't4',
      title: '白天更想把身体交给？',
      options: [
        { id: 'a', label: '走路、看细节、少说话', scores: { kyoto: 2, lisbon: 1 } },
        { id: 'b', label: '风、路、可能被天气教训', scores: { iceland: 2, queenstown: 1 } },
        { id: 'c', label: '骑车或散步，出一点汗刚刚好', scores: { chiangmai: 2, lisbon: 1 } },
        { id: 'd', label: '心跳上来的那种活动', scores: { queenstown: 2 } },
      ],
    },
    {
      id: 't5',
      title: '晚饭你要的是？',
      options: [
        { id: 'a', label: '克制、准时、每一口都干净', scores: { kyoto: 2 } },
        { id: 'b', label: '能垫肚子就行，白天才是正餐', scores: { iceland: 2, queenstown: 1 } },
        { id: 'c', label: '酸、香、可以慢慢吃很久', scores: { chiangmai: 2 } },
        { id: 'd', label: '香料、烤、桌子上要热闹', scores: { marrakech: 2, lisbon: 1 } },
      ],
    },
    {
      id: 't6',
      title: '和同行人（或自己）的理想距离？',
      options: [
        { id: 'a', label: '各自看，晚上再汇合说今天', scores: { kyoto: 1, iceland: 2 } },
        { id: 'b', label: '大部分时间在一起，但不赶话', scores: { chiangmai: 2, lisbon: 2 } },
        { id: 'c', label: '一起完成一件有点挑战的事', scores: { queenstown: 2, iceland: 1 } },
        { id: 'd', label: '挤在热闹里，反而更亲密', scores: { marrakech: 2 } },
      ],
    },
    {
      id: 't7',
      title: '旅行结束时，你更想留下？',
      options: [
        { id: 'a', label: '一种被整理过的安静', scores: { kyoto: 2 } },
        { id: 'b', label: '自己原来比想象中能走', scores: { iceland: 2, queenstown: 2 } },
        { id: 'c', label: '肩松了，睡眠变好了', scores: { chiangmai: 2 } },
        { id: 'd', label: '几条记不住名字的街，和一种光', scores: { lisbon: 2, marrakech: 1 } },
      ],
    },
    {
      id: 't8',
      title: '预算更愿意砸在？',
      options: [
        { id: 'a', label: '一顿值得记住的饭，或一间好住的房子', scores: { kyoto: 2, lisbon: 1 } },
        { id: 'b', label: '交通和能走到别人不去的地方', scores: { iceland: 2 } },
        { id: 'c', label: '把天数拉长，住得久一点', scores: { chiangmai: 2 } },
        { id: 'd', label: '一次会害怕但会讲很久的体验', scores: { queenstown: 2, marrakech: 1 } },
      ],
    },
  ],
  results: [
    {
      id: 'kyoto',
      title: '京都',
      subtitle: '把日子过成有形状的东西',
      summary:
        '你要的旅行不是逃离，是被一种更讲究的节奏接住。京都适合愿意走路、愿意早起、愿意把细节当正事的人。人会多，但你要的是门缝里的安静，不是网红角度。',
      traits: ['仪式感', '古意', '克制'],
      suggestion: '少排名园，多给一条街两遍。第二遍才开始像京都。',
    },
    {
      id: 'iceland',
      title: '冰岛',
      subtitle: '天气是旅伴，也是考官',
      summary:
        '你需要被空旷纠正一下。冰岛不问你精不精致，只问你能不能跟着风走、能不能接受计划作废。回来之后，城市的噪音会显得没那么重要。',
      traits: ['荒原', '天气', '独自也能成立'],
      suggestion: '把一半日程写成「看天再定」。硬排景点的人，在这里会生气。',
    },
    {
      id: 'chiangmai',
      title: '清迈',
      subtitle: '温度刚好的逃逸',
      summary:
        '你不是要征服一座城，是要让神经先降温。清迈适合把天数拉长：早市、午觉、傍晚再出门。它不够「一生一次」，所以更适合真的去休息。',
      traits: ['慢热', '好待', '性价比'],
      suggestion: '别把所有咖啡馆列进清单。选一个街区住下来，重复走同一条路。',
    },
    {
      id: 'lisbon',
      title: '里斯本',
      subtitle: '坡道把黄昏送到脚边',
      summary:
        '你喜欢有生活毛边、又不必太辛苦的老城。里斯本的坡、电车、瓷砖和光，刚好够走、刚好够拍、刚好够坐下来看人。它热闹，但不催你。',
      traits: ['老城', '光', '可走可坐'],
      suggestion: '下午四点之后的时间比上午珍贵。把正餐留给黄昏之后。',
    },
    {
      id: 'marrakech',
      title: '马拉喀什',
      subtitle: '先被气味包围，再谈攻略',
      summary:
        '你想要陌生感是具体的：香料、巷子、讨价还价、突然出现的院子。马拉喀什会吵，也会在一扇门后突然变静。它适合愿意把控制权交出一点的人。',
      traits: ['感官', '迷宫', '生活密度'],
      suggestion: '白天进麦地那，傍晚把屋顶留给自己。别全程跟着队伍走。',
    },
    {
      id: 'queenstown',
      title: '皇后镇',
      subtitle: '心跳和湖光可以同一天',
      summary:
        '你需要身体先回答「我还活着」。皇后镇把运动和风景叠在一起：可以很猛，也可以只是坐在湖边看山。适合想把一次旅行讲成故事的人。',
      traits: ['户外', '刺激', '风景硬'],
      suggestion: '只选一件真正怕的事。其余时间走路，让肾上腺素退回去。',
    },
  ],
}
