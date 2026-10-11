import type { Quiz } from '../types.ts'

export const personalityQuiz: Quiz = {
  id: 'personality',
  title: '性格色彩',
  tagline: '先看清自己怎么做事',
  description:
    '八个生活场景，不谈对错。选完后会落到四种节奏：先冲、先聊、先想、先稳住。适合拿来认识自己，也适合发给朋友对答案。',
  minutes: 3,
  premium: false,
  scope: null,
  accent: '#2F6D58',
  cover: 'leaf',
  questions: [
    {
      id: 'p1',
      title: '周五下班，突然多出一整个晚上，你更想？',
      options: [
        { id: 'a', label: '马上约人出门，别让晚上空着', scores: { blaze: 2, sky: 1 } },
        { id: 'b', label: '找熟悉的人吃饭聊天，轻松就好', scores: { sky: 2, stone: 1 } },
        { id: 'c', label: '回家把想看的东西看完，或把一件事想清楚', scores: { deep: 2 } },
        { id: 'd', label: '按原计划休息，不额外加安排', scores: { stone: 2, deep: 1 } },
      ],
    },
    {
      id: 'p2',
      title: '朋友拉你参加一个你不太熟的局，你会？',
      options: [
        { id: 'a', label: '去，现场再看，大不了提前撤', scores: { blaze: 2 } },
        { id: 'b', label: '去，而且会主动把气氛热起来', scores: { sky: 2, blaze: 1 } },
        { id: 'c', label: '先问清楚都有谁、要待多久', scores: { deep: 2 } },
        { id: 'd', label: '能推就推，熟人才自在', scores: { stone: 2 } },
      ],
    },
    {
      id: 'p3',
      title: '做一个新决定时，你最受不了？',
      options: [
        { id: 'a', label: '讨论太久、迟迟不动', scores: { blaze: 2 } },
        { id: 'b', label: '没人和你交换感觉，自己闷着选', scores: { sky: 2 } },
        { id: 'c', label: '信息不全就拍板', scores: { deep: 2 } },
        { id: 'd', label: '被催着改已经习惯的安排', scores: { stone: 2 } },
      ],
    },
    {
      id: 'p4',
      title: '有人当众夸你，你通常？',
      options: [
        { id: 'a', label: '接住，顺便把下一句也接上', scores: { blaze: 2, sky: 1 } },
        { id: 'b', label: '很开心，会把气氛变得更热', scores: { sky: 2 } },
        { id: 'c', label: '礼貌道谢，心里开始核对是不是过誉', scores: { deep: 2 } },
        { id: 'd', label: '有点不好意思，想快点把话题转走', scores: { stone: 2 } },
      ],
    },
    {
      id: 'p5',
      title: '一件事卡住了，你的第一反应是？',
      options: [
        { id: 'a', label: '换条路先推进，别停在原地', scores: { blaze: 2 } },
        { id: 'b', label: '找人聊聊，借别人的眼睛看一眼', scores: { sky: 2 } },
        { id: 'c', label: '拆开问题，找到卡点再继续', scores: { deep: 2 } },
        { id: 'd', label: '先做能确定的部分，稳着来', scores: { stone: 2 } },
      ],
    },
    {
      id: 'p6',
      title: '旅行前一天晚上，你更可能？',
      options: [
        { id: 'a', label: '东西差不多就行，到了再买', scores: { blaze: 2 } },
        { id: 'b', label: '拉群里问一句「你们带什么」', scores: { sky: 2 } },
        { id: 'c', label: '把路线、天气、备用方案再看一遍', scores: { deep: 2 } },
        { id: 'd', label: '清单早就写好了，按单收就行', scores: { stone: 2, deep: 1 } },
      ],
    },
    {
      id: 'p7',
      title: '别人眼中的你，更接近？',
      options: [
        { id: 'a', label: '行动快，带着大家往前走', scores: { blaze: 2 } },
        { id: 'b', label: '好相处，房间里有你就不冷', scores: { sky: 2 } },
        { id: 'c', label: '想得细，关键时候能点破', scores: { deep: 2 } },
        { id: 'd', label: '稳，托付一件事会落地', scores: { stone: 2 } },
      ],
    },
    {
      id: 'p8',
      title: '一段关系变淡时，你更常？',
      options: [
        { id: 'a', label: '直接问一句，或把下一次见面约上', scores: { blaze: 2 } },
        { id: 'b', label: '先发些日常，试探对方还在不在', scores: { sky: 2 } },
        { id: 'c', label: '自己先把原因想清楚，再决定要不要说', scores: { deep: 2 } },
        { id: 'd', label: '保持礼貌距离，不主动掀开', scores: { stone: 2 } },
      ],
    },
  ],
  results: [
    {
      id: 'blaze',
      title: '赤焰型',
      subtitle: '先动起来，路是走出来的',
      summary:
        '你做决定不喜欢停太久。与其把每个分支都推演完，你更信任现场反馈：先迈一步，再根据真实情况调整。身边人会觉得你带劲，偶尔也会觉得你有点急。',
      traits: ['行动快', '耐讨论短', '现场应变强'],
      suggestion: '把「先冲」留给方向大致正确的事。真正不可逆的选择，给自己多留一晚。',
    },
    {
      id: 'sky',
      title: '晴空型',
      subtitle: '人在，事情就活了',
      summary:
        '你从交流里获得判断。一个人闷着选，你会不安；和人对上感觉之后，选择会突然变清楚。你擅长把气氛托住，也容易为了照顾场子而忽略自己的节奏。',
      traits: ['社交充电', '气氛敏感', '需要被回应'],
      suggestion: '重要决定先单独写三分钟，再去问别人。别把「大家觉得」误认成「我想要」。',
    },
    {
      id: 'deep',
      title: '深海型',
      subtitle: '想清楚，比想得快更重要',
      summary:
        '你习惯先看见结构：信息够不够、风险在哪、这句话准不准。别人觉得你慢，其实你是在避免返工。代价是有时想太久，窗口已经关了。',
      traits: ['求准', '独立判断', '受不了糊涂拍板'],
      suggestion: '给思考设一个截止点。信息到 70% 也可以出门，剩下的用第一天去校准。',
    },
    {
      id: 'stone',
      title: '青石型',
      subtitle: '稳，比热闹更让人安心',
      summary:
        '你珍惜已经形成的节奏。计划、习惯、可信的人，比新鲜刺激更让你放松。你不一定慢热到冷淡，只是不喜欢被突然改道。别人托付给你的事，通常会回来。',
      traits: ['节奏稳定', '靠谱', '不爱被催'],
      suggestion: '每周给自己留一个「可以改变」的小窗口，免得稳变成僵。',
    },
  ],
}
