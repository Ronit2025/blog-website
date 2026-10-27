export type Article = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  image: string
  accent: string
  source?: string
  content: string[]
}

const photos = {
  neural: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=85',
  robot: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=85',
  chip: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85',
  city: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=85',
  code: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=85',
  hands: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1200&q=85',
  lab: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85',
  abstract: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=85',
}

export const categories = ['All stories', 'Artificial intelligence', 'Technology', 'Machine learning', 'Robotics', 'Future of work', 'AI ethics']

export const sampleArticles: Article[] = [
  {
    id: '1', slug: 'the-next-interface-isnt-a-screen', title: 'The next interface isn’t a screen. It’s a conversation.',
    excerpt: 'As AI assistants move from novelty to infrastructure, a new generation of products is rethinking how we interact with technology.',
    category: 'Artificial intelligence', author: 'Maya Chen', date: 'Oct 24, 2025', readTime: '8 min read',
    image: photos.neural, accent: '#6f74eb',
    content: [
      'For decades, we’ve learned to speak the language of computers: menus, buttons, windows, and carefully constructed queries. Now, the most natural interface we have—conversation—is becoming the most powerful one.',
      'The shift is already visible. AI assistants are moving beyond chat boxes and into the tools we use every day. They can summarize a project, transform an idea into a prototype, and carry context from one task to the next. The interface fades into the background; intent takes its place.',
      'But conversation alone isn’t the answer. The most useful systems combine natural language with clear visual controls, predictable actions, and ways to review what the AI has done. Trust depends on more than a clever response—it depends on users staying in control.',
      'The next chapter of computing won’t be screenless. It will be more considered: less time navigating software, more time shaping the outcome. The best interface might be the one that knows when to listen, when to help, and when to get out of the way.',
    ],
  },
  {
    id: '2', slug: 'small-models-big-ideas', title: 'Small models, big ideas: the case for AI that runs anywhere',
    excerpt: 'A new wave of compact models is bringing useful intelligence closer to the people and devices that need it.',
    category: 'Machine learning', author: 'Theo Park', date: 'Oct 22, 2025', readTime: '6 min read',
    image: photos.chip, accent: '#e5a56b',
    content: [
      'The story of AI has often been told in terms of scale: more parameters, more compute, more data. Yet a quieter shift is challenging the assumption that bigger is always better.',
      'Compact models can run on personal devices, respond without a network connection, and keep sensitive data close to home. For developers, that creates room to build experiences that are faster, more private, and less dependent on a handful of cloud providers.',
      'There are trade-offs. Smaller models can be less capable on complex tasks and need thoughtful design to fit a particular use. But when the job is well-defined, efficiency can be a feature, not a compromise.',
      'As tooling improves, the question is changing from “How large can a model be?” to “What is the smallest, most dependable model for this job?” That is a more practical question—and potentially a more human one.',
    ],
  },
  {
    id: '3', slug: 'robots-are-learning-to-work-with-us', title: 'Robots are learning to work with us, not around us',
    excerpt: 'Collaborative robotics is finding its footing in the places where adaptability matters more than spectacle.',
    category: 'Robotics', author: 'Amara Okafor', date: 'Oct 20, 2025', readTime: '5 min read',
    image: photos.robot, accent: '#77a995',
    content: [
      'The most interesting robots are not the ones that look most like us. They are the ones that make a difficult, repetitive, or physically demanding task a little easier for the people doing it.',
      'Recent advances in perception and control have made collaborative machines more adaptable. They can respond to changing environments and work alongside people rather than operating behind barriers built for industrial arms.',
      'That promise only matters when it is matched by good design. Workers need to understand what a machine is doing, interrupt it when needed, and trust that safety is built into the system instead of bolted on at the end.',
      'The future of robotics may be less about replacing human work than expanding what a team can do. The measure of progress is not how autonomous a machine becomes, but how well it helps people do their best work.',
    ],
  },
  {
    id: '4', slug: 'designing-for-an-ai-shaped-workday', title: 'Designing for an AI-shaped workday',
    excerpt: 'The most meaningful workplace change may not be automation. It may be a better relationship with attention.',
    category: 'Future of work', author: 'Jordan Ellis', date: 'Oct 18, 2025', readTime: '7 min read',
    image: photos.code, accent: '#70a0d4',
    content: [
      'Work has always been shaped by its tools. What is different about AI is how quickly a tool can move from answering a question to participating in a workflow.',
      'That makes design choices consequential. An assistant that interrupts constantly can create more work than it saves. A tool that gathers the right context, explains its suggestions, and waits for direction can give time back.',
      'Teams are beginning to rethink the boundaries between deep work and coordination. The goal is not to automate every task, but to remove friction from the ones that keep people from focusing on the work that needs their judgment.',
      'An AI-shaped workday should be designed around human agency. The best productivity gains may come from fewer unnecessary handoffs, clearer decisions, and more space to think.',
    ],
  },
  {
    id: '5', slug: 'the-case-for-slower-ai', title: 'The case for slower AI: building trust one decision at a time',
    excerpt: 'Speed is easy to measure. Confidence, clarity, and accountability take a more deliberate kind of progress.',
    category: 'AI ethics', author: 'Leila Haddad', date: 'Oct 16, 2025', readTime: '9 min read',
    image: photos.hands, accent: '#d37890',
    content: [
      'When new AI systems arrive, the first question is often how quickly they can produce an answer. For many high-impact decisions, a better question is whether the answer can be understood and challenged.',
      'Trustworthy systems make their limits visible. They distinguish evidence from inference, give people ways to correct mistakes, and leave a record of how a decision was reached.',
      'These safeguards are sometimes described as friction. But friction can be useful when the stakes are high. A pause to verify information or involve a person with relevant expertise is not a failure of automation—it is part of responsible design.',
      'Progress does not always mean moving faster. Sometimes it means creating systems that earn trust through careful, transparent decisions.',
    ],
  },
  {
    id: '6', slug: 'inside-the-open-research-lab', title: 'Inside the open research lab making AI more accessible',
    excerpt: 'A growing community of researchers is sharing the tools, data, and questions behind their work.',
    category: 'Artificial intelligence', author: 'Nina Alvarez', date: 'Oct 14, 2025', readTime: '4 min read',
    image: photos.lab, accent: '#80a9ba',
    content: [
      'Research has always depended on sharing ideas. Today, open tools and collaborative communities are giving more people a chance to participate in the work of building AI.',
      'Accessible research is not just about publishing code. It means documenting decisions, making data practices clear, and creating pathways for people outside well-funded institutions to contribute.',
      'The result is a broader set of questions and perspectives. When more people can test an idea, they can uncover blind spots earlier and help make the technology useful in more contexts.',
      'Openness is not a guarantee of better outcomes, but it gives communities more ways to understand and shape the tools that affect them.',
    ],
  },
  {
    id: '7', slug: 'the-language-of-a-new-machine-age', title: 'The language of a new machine age',
    excerpt: 'What we choose to call artificial intelligence shapes how we build it—and who gets to shape the conversation.',
    category: 'AI ethics', author: 'Samira Ali', date: 'Oct 11, 2025', readTime: '6 min read',
    image: photos.city, accent: '#9e88d4',
    content: [
      'The words we use for technology do more than describe it. They set expectations, draw boundaries, and influence which questions seem important enough to ask.',
      'Calling a system intelligent can obscure the choices made by the people who built and deployed it. Talking about automation can make a social decision sound like an inevitable technical one.',
      'More precise language helps us see where responsibility belongs. It makes room to discuss whose knowledge is represented, who benefits, and who should have the power to say no.',
      'A more thoughtful vocabulary will not solve every challenge. But it can help us have more honest conversations about what these systems are, and what we want them to become.',
    ],
  },
  {
    id: '8', slug: 'compute-and-the-next-frontier', title: 'Compute and the next frontier of discovery',
    excerpt: 'Specialized chips are reshaping the infrastructure behind the AI tools we use every day.',
    category: 'Machine learning', author: 'Ethan Brooks', date: 'Oct 08, 2025', readTime: '5 min read',
    image: photos.abstract, accent: '#6e9dc4',
    content: [
      'Behind every AI interaction is a physical infrastructure: chips, cooling systems, networks, and the people who keep them running.',
      'As demand grows, researchers and engineers are exploring ways to get more useful work from every unit of compute. Specialized hardware, efficient software, and smaller models all play a part.',
      'Efficiency matters for more than cost. It influences where AI can run, how quickly it responds, and how much energy a service requires.',
      'The next frontier will be defined by balance: systems capable enough to be useful and efficient enough to be sustainable.',
    ],
  },
]

export function mapNewsApiArticle(item: {
  title?: string
  description?: string | null
  url?: string
  urlToImage?: string | null
  publishedAt?: string
  author?: string | null
  source?: { name?: string }
}, index: number): Article {
  const title = item.title?.replace(/\s+-\s+[^-]+$/, '') || 'Untitled technology story'
  const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60)}-${index}`
  return {
    id: `api-${index}`,
    slug,
    title,
    excerpt: item.description || 'Open the original report for more information.',
    category: 'Technology',
    author: item.author || item.source?.name || 'NewsAPI',
    date: item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently published',
    readTime: '3 min read',
    image: item.urlToImage || photos.neural,
    accent: '#7878ed',
    source: item.url,
    content: [item.description || 'This headline is provided by NewsAPI. Visit the original source for the full article.'],
  }
}
