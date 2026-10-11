import type { Quiz } from '../types.ts'

export const careerQuiz: Quiz = {
  id: 'career',
  title: '职业气质',
  tagline: '你更适合哪一种干活方式',
  description:
    '不问薪资和行业风口。只看你做事情时靠什么获得能量：做成、说清、拆开、点燃、塑形，还是把一件事稳稳托住。结果是气质，不是岗位名称。',
  minutes: 4,
  premium: true,
  scope: 'CAREER',
  accent: '#6B5B95',
  cover: 'desk',
  questions: [
    {
      id: 'c1',
      title: '一周里最让你有成就感的时刻？',
      options: [
        { id: 'a', label: '一个含糊的需求，终于变成能用的东西', scores: { maker: 2, shaper: 1 } },
        { id: 'b', label: '把复杂的事讲到别人点头', scores: { teller: 2, decoder: 1 } },
        { id: 'c', label: '找到别人没看见的原因', scores: { decoder: 2 } },
        { id: 'd', label: '现场被你带动，事情开始转', scores: { igniter: 2 } },
      ],
    },
    {
      id: 'c2',
      title: '开会时你通常在？',
      options: [
        { id: 'a', label: '把下一步写成能执行的条目', scores: { maker: 2, ballast: 1 } },
        { id: 'b', label: '找故事和例子，让人听进去', scores: { teller: 2 } },
        { id: 'c', label: '挑出逻辑漏洞和数据缺口', scores: { decoder: 2 } },
        { id: 'd', label: '盯着人：谁没被说服、谁该被推一把', scores: { igniter: 2, shaper: 1 } },
      ],
    },
    {
      id: 'c3',
      title: '一个项目开始时，你最先做？',
      options: [
        { id: 'a', label: '框范围，定最小能交差的版本', scores: { maker: 2 } },
        { id: 'b', label: '想清楚这事要讲给谁听', scores: { teller: 2, shaper: 1 } },
        { id: 'c', label: '把已知未知列开，先补信息', scores: { decoder: 2 } },
        { id: 'd', label: '把流程、责任、截止点摆好', scores: { ballast: 2 } },
      ],
    },
    {
      id: 'c4',
      title: '你更受不了工作里的？',
      options: [
        { id: 'a', label: '永远在讨论，看不见成品', scores: { maker: 2, shaper: 1 } },
        { id: 'b', label: '做了很好的东西，却没人理解', scores: { teller: 2 } },
        { id: 'c', label: '拍脑袋，还不准追问', scores: { decoder: 2 } },
        { id: 'd', label: '承诺很多，落地没有人认领', scores: { ballast: 2, igniter: 1 } },
      ],
    },
    {
      id: 'c5',
      title: '单独加班两小时，你宁愿？',
      options: [
        { id: 'a', label: '把一个半成品推到能演示', scores: { maker: 2 } },
        { id: 'b', label: '把表达打磨到顺', scores: { teller: 2, shaper: 2 } },
        { id: 'c', label: '把一份材料里的矛盾找干净', scores: { decoder: 2 } },
        { id: 'd', label: '把积压的流程和清单清掉', scores: { ballast: 2 } },
      ],
    },
    {
      id: 'c6',
      title: '别人来找你，多半是为了？',
      options: [
        { id: 'a', label: '让你把事做成，或裁一刀范围', scores: { maker: 2 } },
        { id: 'b', label: '让你帮忙起标题、讲清楚、对外说', scores: { teller: 2 } },
        { id: 'c', label: '让你看一看「这到底是怎么回事」', scores: { decoder: 2 } },
        { id: 'd', label: '让你出面推动，或把人凑到一起', scores: { igniter: 2 } },
      ],
    },
    {
      id: 'c7',
      title: '对「美感 / 体验」这件事？',
      options: [
        { id: 'a', label: '重要，但不能压过能不能用', scores: { maker: 1, ballast: 1 } },
        { id: 'b', label: '体验就是内容，乱了等于没说清', scores: { teller: 1, shaper: 2 } },
        { id: 'c', label: '先对，再谈好看', scores: { decoder: 2 } },
        { id: 'd', label: '能帮人做决定的设计，我才有感觉', scores: { shaper: 2, igniter: 1 } },
      ],
    },
    {
      id: 'c8',
      title: '三年后更想被记住的是？',
      options: [
        { id: 'a', label: '做成过几个别人觉得难的东西', scores: { maker: 2 } },
        { id: 'b', label: '让一群人理解并站到同一边', scores: { teller: 2, igniter: 1 } },
        { id: 'c', label: '在关键判断上很少看走眼', scores: { decoder: 2 } },
        { id: 'd', label: '团队因为你而稳，该交的都交得出去', scores: { ballast: 2 } },
      ],
    },
  ],
  results: [
    {
      id: 'maker',
      title: '造物者',
      subtitle: '把含糊变成能用的东西',
      summary:
        '你从「做出来」获得能量。讨论可以，但必须通向一个版本。产品、项目、内容生产里那类要把东西推到可演示的人，常是这种气质。你怕空转，也容易为了做成而包太多。',
      traits: ['交付导向', '会裁范围', '受不了空会'],
      suggestion: '每周问一次：这件事如果只做 60 分，最小成品是什么？保护你的做成欲，也保护身体。',
    },
    {
      id: 'teller',
      title: '说书人',
      subtitle: '理解发生在被讲清之后',
      summary:
        '你对「别人有没有听进去」非常敏感。同样的事实，换一种说法，世界就不一样。品牌、内容、培训、对内对齐，都需要这种人。风险是说得漂亮，自己的边界被讲没了。',
      traits: ['叙事', '对外表达', '需要听众'],
      suggestion: '先写结论再写故事。别用表达掩盖还没想清楚的判断。',
    },
    {
      id: 'decoder',
      title: '破译者',
      subtitle: '先看见结构，再谈感觉',
      summary:
        '你无法忍受糊涂的前提。研究、策略、分析、风控，都吃这套。别人觉得你扫兴，其实你是在避免后续崩掉。代价是有时正确得太早，房间还没准备好听。',
      traits: ['求真', '拆解', '讨厌拍脑袋'],
      suggestion: '把发现分成「必须现在说」和「可以晚一点说」。正确也需要时机。',
    },
    {
      id: 'igniter',
      title: '点火者',
      subtitle: '人动了，事才开始',
      summary:
        '你盯着能量和意愿：谁被点燃、谁在旁观、哪里该推一把。销售、增长、组织推动里常见这种人。你能把停滞变成运动，也可能把运动变成焦躁。',
      traits: ['推动', '现场感', '对人敏感'],
      suggestion: '每次点火之后指定一个收口的人。你负责开始，别默认自己负责所有结尾。',
    },
    {
      id: 'shaper',
      title: '塑形者',
      subtitle: '体验乱了，事情就不成立',
      summary:
        '你通过形状理解世界：界面、空间、流程好不好走、一句话顺不顺。设计、体验、课程结构都靠近这里。你能让别人感到「这是被对待过的」，也会在还不完美时难以放手。',
      traits: ['体验', '结构美感', '细节执着'],
      suggestion: '给「够好可以发布」写一条客观标准。完美是方向，不是门禁。',
    },
    {
      id: 'ballast',
      title: '压舱石',
      subtitle: '承诺出去的，要回得来',
      summary:
        '你让系统可预期：截止点、责任、质量、下一次还能复制。运营中台、项目管理、专业职能里的稳定交付，都靠这种气质。你可能不够耀眼，但没有你，船会晃。',
      traits: ['可靠', '流程', '抗承诺膨胀'],
      suggestion: '把「我来兜底」改成「我们如何不再需要兜底」。稳，也可以被设计。',
    },
  ],
}
