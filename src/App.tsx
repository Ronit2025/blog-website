import { FormEvent, ReactNode, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Bookmark, Check, ChevronDown, Clock3,
  ExternalLink, Feather, Flame, Menu, Moon, Search, Share2, Sparkles, Sun, X,
} from 'lucide-react'
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Article, categories, mapNewsApiArticle, sampleArticles } from './data'

const transition = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }

function usePageTitle(title: string) {
  useEffect(() => {
    document.title = `${title} — Signal`
    document.querySelector('meta[name="description"]')?.setAttribute('content', `${title}. Thoughtful perspectives on AI and the technology shaping tomorrow.`)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', `${title} — Signal`)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [title])
}

function Header({ dark, onTheme, bookmarks }: { dark: boolean; onTheme: () => void; bookmarks: string[] }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => { setMenuOpen(false); setSearchOpen(false) }, [location.pathname, location.search])

  function submitSearch(event: FormEvent) {
    event.preventDefault()
    const term = query.trim()
    if (term) navigate(`/search?q=${encodeURIComponent(term)}`)
  }

  return (
    <header className="site-header">
      <div className="topline"><span><span className="pulse-dot" /> Independent perspectives on what’s next</span><span className="topline-right">Curious by nature. Clear by design.</span></div>
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="Signal home"><span className="brand-mark"><span /></span><span>SIGNAL<span className="brand-dot">.</span></span></Link>
        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          <NavLink to="/latest">Latest</NavLink>
          <NavLink to="/trending">Trending <span className="nav-live-dot" /></NavLink>
          <NavLink to="/categories">Topics <ChevronDown size={13} /></NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
        <div className="header-actions">
          <button className="icon-button search-trigger" aria-label="Open search" onClick={() => setSearchOpen(!searchOpen)}><Search size={18} /></button>
          <NavLink className="bookmark-nav" to="/bookmarks" aria-label={`Bookmarks, ${bookmarks.length} saved`}><Bookmark size={17} /> <span className="bookmark-count">{bookmarks.length}</span></NavLink>
          <button className="icon-button theme-toggle" aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`} onClick={onTheme}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
          <button className="icon-button mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
          <Link className="header-cta" to="/latest">Explore stories <ArrowUpRight size={14} /></Link>
        </div>
      </div>
      <AnimatePresence>
        {searchOpen && <motion.form className="search-popover" onSubmit={submitSearch} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          <Search size={18} /><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search AI, ideas, people..." aria-label="Search stories" /><kbd>↵</kbd><button className="sr-only" type="submit">Search</button>
        </motion.form>}
      </AnimatePresence>
    </header>
  )
}

function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  function subscribe(event: FormEvent) {
    event.preventDefault()
    if (email.includes('@')) setSubscribed(true)
  }
  return <footer className="site-footer">
    <div className="footer-main">
      <div className="footer-brand"><Link className="brand" to="/"><span className="brand-mark"><span /></span><span>SIGNAL<span className="brand-dot">.</span></span></Link><p>Thoughtful perspectives on AI and the technology shaping tomorrow.</p><div className="footer-socials"><a href="https://www.linkedin.com" aria-label="LinkedIn">in</a><a href="https://www.instagram.com" aria-label="Instagram">ig</a><a href="https://www.x.com" aria-label="X">x</a></div></div>
      <div className="footer-links"><div><h3>Explore</h3><Link to="/latest">Latest stories</Link><Link to="/trending">Trending</Link><Link to="/categories">All topics</Link><Link to="/bookmarks">Bookmarks</Link></div><div><h3>Signal</h3><Link to="/about">About us</Link><Link to="/contact">Contact</Link><a href="mailto:hello@signal.example">Work with us</a></div></div>
      <div className="newsletter">
        <span className="eyebrow"><span className="eyebrow-line" /> THE SIGNAL LETTER</span>
        <h2>A little clarity<br />for your inbox.</h2><p>Our favorite ideas, once a week. No noise.</p>
        {subscribed ? <div className="subscribed-message"><Check size={17} /> You’re on the list. See you soon.</div> : <form className="newsletter-form" onSubmit={subscribe}><label className="sr-only" htmlFor="newsletter-email">Your email address</label><input id="newsletter-email" type="email" required placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} /><button type="submit" aria-label="Subscribe"><ArrowRight size={18} /></button></form>}
        <small>By subscribing, you agree to our <Link to="/contact">privacy policy</Link>.</small>
      </div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Signal Journal. Independent by design.</span><span>Made for the endlessly curious <Sparkles size={13} /></span></div>
  </footer>
}

function Eyebrow({ children, icon }: { children: string; icon?: ReactNode }) {
  return <div className="eyebrow"><span className="eyebrow-line" />{icon}{children}</div>
}

function BookmarkButton({ article, saved, toggle }: { article: Article; saved: boolean; toggle: (id: string) => void }) {
  return <button className={`bookmark-button ${saved ? 'is-saved' : ''}`} aria-label={saved ? `Remove ${article.title} from bookmarks` : `Bookmark ${article.title}`} aria-pressed={saved} onClick={(event) => { event.preventDefault(); event.stopPropagation(); toggle(article.id) }}><Bookmark size={16} fill={saved ? 'currentColor' : 'none'} /></button>
}

function ArticleCard({ article, saved, toggle, index = 0 }: { article: Article; saved: boolean; toggle: (id: string) => void; index?: number }) {
  const reduceMotion = useReducedMotion()
  return <motion.article className="article-card" initial={reduceMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ ...transition, delay: Math.min(index * 0.05, 0.25) }}>
    <Link to={`/article/${article.slug}`} className="card-image-wrap"><img className="card-image" src={article.image} alt="" loading="lazy" /><span className="image-shade" /><span className="card-category">{article.category}</span><BookmarkButton article={article} saved={saved} toggle={toggle} /></Link>
    <div className="card-content"><div className="card-meta"><span>{article.date}</span><span className="meta-separator">·</span><span>{article.readTime}</span></div><Link to={`/article/${article.slug}`} className="card-title-link"><h3>{article.title}</h3></Link><p>{article.excerpt}</p><div className="card-byline"><span className="avatar" style={{ background: article.accent }}>{article.author.split(' ').map((part) => part[0]).join('')}</span><span>By <strong>{article.author}</strong></span><Link to={`/article/${article.slug}`} className="arrow-link" aria-label={`Read ${article.title}`}><ArrowUpRight size={17} /></Link></div></div>
  </motion.article>
}

function ArticleGrid({ articles, bookmarks, toggle, emptyTitle = 'Nothing here just yet', emptyText = 'Try another topic or come back soon.' }: { articles: Article[]; bookmarks: string[]; toggle: (id: string) => void; emptyTitle?: string; emptyText?: string }) {
  if (!articles.length) return <div className="empty-state"><span className="empty-icon"><Feather size={22} /></span><h3>{emptyTitle}</h3><p>{emptyText}</p></div>
  return <div className="article-grid">{articles.map((article, index) => <ArticleCard key={article.id} article={article} saved={bookmarks.includes(article.id)} toggle={toggle} index={index} />)}</div>
}

function LoadingGrid({ count = 3 }: { count?: number }) {
  return <div className="article-grid loading-grid" role="status" aria-label="Loading stories" aria-busy="true">{Array.from({ length: count }, (_, index) => <div className="skeleton-card" key={index}><div className="skeleton-image" /><div className="skeleton-copy"><span /><span /><span /><span /></div></div>)}</div>
}

function Home({ articles, bookmarks, toggle, loading }: { articles: Article[]; bookmarks: string[]; toggle: (id: string) => void; loading: boolean }) {
  usePageTitle('A clearer view of what’s next')
  const feature = articles[0] || sampleArticles[0]
  return <>
    <section className="hero-section">
      <div className="hero-copy"><Eyebrow>THE FUTURE, IN FOCUS</Eyebrow><h1>A clearer view<br />of <span>what’s next.</span></h1><p>Thoughtful perspectives on AI and the technology shaping tomorrow. Less noise. More signal.</p><div className="hero-actions"><Link className="button-primary" to="/latest">Explore the latest <ArrowRight size={16} /></Link><Link className="button-text" to="/about">What is Signal? <ArrowUpRight size={15} /></Link></div>      <div className="hero-note"><span className="tiny-spark">✳</span> {feature.source ? 'Headline supplied by NewsAPI' : 'Sample editorial · not live news'}</div></div>
      <Link to={`/article/${feature.slug}`} className="hero-feature"><img src={feature.image} alt="" /><span className="hero-feature-wash" /><span className="feature-corner">01 <span> / 08</span></span><div className="hero-feature-text"><span className="feature-tag"><span />{feature.source ? 'HEADLINE VIA NEWSAPI' : 'SAMPLE · NOT LIVE NEWS'}</span><span className="feature-title">{feature.title}</span><span className="feature-read">Read the story <ArrowUpRight size={14} /></span></div><span className="feature-orbit orbit-one" /><span className="feature-orbit orbit-two" /></Link>
    </section>
    <div className="ticker"><div className="ticker-track"><span>ARTIFICIAL INTELLIGENCE</span><span>✳</span><span>IDEAS THAT MATTER</span><span>✳</span><span>TECHNOLOGY &amp; TOMORROW</span><span>✳</span><span>ARTIFICIAL INTELLIGENCE</span><span>✳</span><span>IDEAS THAT MATTER</span><span>✳</span><span>TECHNOLOGY &amp; TOMORROW</span></div></div>
    <section className="section-wrap latest-section">
      <div className="section-heading"><div><Eyebrow icon={<Sparkles size={13} />}>THE LATEST</Eyebrow><h2>Ideas worth <span>your time.</span></h2><span className="demo-badge home-source-label"><span /> {articles.some((item) => item.source) ? 'NewsAPI headlines' : 'Sample stories · not live news'}</span></div><Link className="button-text" to="/latest">All stories <ArrowRight size={15} /></Link></div>
      {loading ? <LoadingGrid /> : <ArticleGrid articles={articles.slice(0, 3)} bookmarks={bookmarks} toggle={toggle} />}
    </section>
    <section className="manifesto"><div className="manifesto-glow" /><div className="manifesto-content"><Eyebrow>OUR POINT OF VIEW</Eyebrow><h2>Technology moves fast.<br /><span>Understanding takes time.</span></h2><p>We make space for the ideas, people, and questions behind the headlines. Context over clicks. Curiosity over certainty.</p><Link className="button-dark" to="/about">A little about us <ArrowUpRight size={15} /></Link></div><div className="manifesto-visual"><div className="visual-ring ring-a" /><div className="visual-ring ring-b" /><div className="visual-core"><span>Si</span></div><span className="visual-label label-top">HUMAN-CENTERED</span><span className="visual-label label-bottom">FUTURE-FOCUSED</span></div></section>
    <section className="section-wrap topic-section"><div className="section-heading"><div><Eyebrow>FOLLOW YOUR CURIOSITY</Eyebrow><h2>Find your <span>frequency.</span></h2></div><Link className="button-text" to="/categories">All topics <ArrowRight size={15} /></Link></div><div className="topic-list">{categories.slice(1).map((category, index) => <Link className="topic-item" to={`/categories?topic=${encodeURIComponent(category)}`} key={category}><span className="topic-number">0{index + 1}</span><span>{category}</span><ArrowUpRight size={18} /></Link>)}</div></section>
  </>
}

function ListingPage({ articles, bookmarks, toggle, heading, kicker, description, mode, loading }: { articles: Article[]; bookmarks: string[]; toggle: (id: string) => void; heading: string; kicker: string; description: string; mode: 'latest' | 'trending' | 'bookmarks'; loading: boolean }) {
  const [page, setPage] = useState(1)
  const pageSize = 6
  const visible = mode === 'bookmarks' ? articles.filter((article) => bookmarks.includes(article.id)) : mode === 'trending' ? [...articles].reverse() : articles
  const pages = Math.max(1, Math.ceil(visible.length / pageSize))
  const current = Math.min(page, pages)
  const data = visible.slice((current - 1) * pageSize, current * pageSize)
  useEffect(() => setPage(1), [mode])
  usePageTitle(heading)
  return <main className="listing-page page-container">
    <div className="page-intro"><Eyebrow icon={mode === 'trending' ? <Flame size={13} /> : <Sparkles size={13} />}>{kicker}</Eyebrow><h1>{heading.split(' ').slice(0, -1).join(' ')} <span>{heading.split(' ').slice(-1)}</span></h1><p>{description}</p></div>
    {mode !== 'bookmarks' && <div className="list-toolbar"><span>{visible.length} stories <span className="toolbar-divider">/</span> Updated weekly</span><span className="demo-badge"><span /> {articles.some((item) => item.source) ? 'NewsAPI headlines' : 'Sample stories · not live news'}</span></div>}
    {loading ? <LoadingGrid count={pageSize} /> : <ArticleGrid articles={data} bookmarks={bookmarks} toggle={toggle} emptyTitle={mode === 'bookmarks' ? 'Your reading list is a blank page' : undefined} emptyText={mode === 'bookmarks' ? 'Save stories as you explore and they’ll be waiting here.' : undefined} />}
    {visible.length > pageSize && <div className="pagination"><button onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }} disabled={current === 1}><ArrowLeft size={15} /> Previous</button><span>Page <strong>{current}</strong> of {pages}</span><button onClick={() => { setPage((p) => Math.min(pages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }} disabled={current === pages}>Next <ArrowRight size={15} /></button></div>}
    {mode === 'bookmarks' && visible.length > 0 && <div className="pagination"><span>{visible.length} saved {visible.length === 1 ? 'story' : 'stories'}</span><Link to="/latest">Discover more <ArrowRight size={15} /></Link></div>}
  </main>
}

function CategoriesPage({ articles, bookmarks, toggle, loading }: { articles: Article[]; bookmarks: string[]; toggle: (id: string) => void; loading: boolean }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const selected = searchParams.get('topic') || 'All stories'
  const filtered = selected === 'All stories' ? articles : articles.filter((article) => article.category === selected)
  usePageTitle('Explore topics')
  return <main className="listing-page page-container"><div className="page-intro"><Eyebrow>THE SIGNAL INDEX</Eyebrow><h1>Follow the <span>thread.</span></h1><p>Big questions, emerging ideas, and the people shaping what comes next.</p></div><div className="category-pills" aria-label="Filter by topic">{categories.map((category) => <button key={category} className={selected === category ? 'active' : ''} onClick={() => setSearchParams(category === 'All stories' ? {} : { topic: category })}>{category}</button>)}</div><div className="list-toolbar"><span>{filtered.length} {filtered.length === 1 ? 'story' : 'stories'} in <strong>{selected}</strong></span><span className="demo-badge"><span /> {articles.some((item) => item.source) ? 'NewsAPI headlines' : 'Sample stories · not live news'}</span></div>{loading ? <LoadingGrid count={6} /> : <ArticleGrid articles={filtered} bookmarks={bookmarks} toggle={toggle} emptyTitle="No stories in this topic yet" emptyText="Choose another topic or check back later." />}</main>
}

function SearchPage({ articles, bookmarks, toggle, loading }: { articles: Article[]; bookmarks: string[]; toggle: (id: string) => void; loading: boolean }) {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') || ''
  const [value, setValue] = useState(query)
  useEffect(() => setValue(query), [query])
  const results = useMemo(() => query.trim() ? articles.filter((article) => `${article.title} ${article.excerpt} ${article.category} ${article.author}`.toLowerCase().includes(query.toLowerCase())) : [], [articles, query])
  usePageTitle(query ? `Search: ${query}` : 'Search')
  return <main className="listing-page page-container"><div className="page-intro"><Eyebrow>THE SIGNAL ARCHIVE</Eyebrow><h1>Find your <span>signal.</span></h1><p>Search stories, ideas, and perspectives from across the journal.</p></div><form className="large-search" onSubmit={(event) => { event.preventDefault(); setParams(value.trim() ? { q: value.trim() } : {}) }}><Search size={20} /><input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Try “machine learning” or “the future of work”" aria-label="Search articles" /><button type="submit">Search <ArrowRight size={16} /></button></form>{query && <div className="list-toolbar"><span>{results.length} {results.length === 1 ? 'result' : 'results'} for <strong>“{query}”</strong></span><span className="demo-badge"><span /> {articles.some((item) => item.source) ? 'NewsAPI headlines' : 'Sample stories · not live news'}</span></div>}{query ? (loading ? <LoadingGrid /> : <ArticleGrid articles={results} bookmarks={bookmarks} toggle={toggle} emptyTitle="No matching stories" emptyText="Try a different search term or browse all topics." />) : <div className="search-suggestions"><span>TRY EXPLORING</span>{['artificial intelligence', 'robotics', 'AI ethics', 'future of work'].map((term) => <button key={term} onClick={() => { setValue(term); setParams({ q: term }) }}>{term} <ArrowUpRight size={13} /></button>)}</div>}</main>
}

function ArticlePage({ articles, bookmarks, toggle }: { articles: Article[]; bookmarks: string[]; toggle: (id: string) => void }) {
  const { slug = '' } = useParams()
  const article = articles.find((item) => item.slug === slug) || sampleArticles.find((item) => item.slug === slug)
  const [shareMessage, setShareMessage] = useState('')
  usePageTitle(article?.title || 'Story not found')
  if (!article) return <main className="page-container not-found"><Eyebrow>404 — LOST IN THE FEED</Eyebrow><h1>This story seems to have <span>moved on.</span></h1><Link className="button-primary" to="/latest">Back to the latest <ArrowRight size={16} /></Link></main>
  const related = articles.filter((item) => item.id !== article.id && item.category === article.category).slice(0, 3)
  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title: article.title, url })
      else { await navigator.clipboard.writeText(url); setShareMessage('Link copied to clipboard') }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') setShareMessage('Could not share this story. Please copy the page URL.')
    }
  }
  return <main className="article-page">
    <div className="article-hero page-container"><Link className="back-link" to="/latest"><ArrowLeft size={15} /> All stories</Link><div className="article-heading"><Eyebrow>{article.category}</Eyebrow><h1>{article.title}</h1><p>{article.excerpt}</p><div className="article-author-row"><span className="avatar avatar-large" style={{ background: article.accent }}>{article.author.split(' ').map((part) => part[0]).join('')}</span><span><strong>{article.author}</strong><small>Contributor · {article.date}</small></span><span className="author-divider" /><span className="read-time"><Clock3 size={15} /> {article.readTime}</span><div className="article-actions"><BookmarkButton article={article} saved={bookmarks.includes(article.id)} toggle={toggle} /><button className="icon-button share-button" onClick={share} aria-label="Share article"><Share2 size={17} /></button></div></div></div><div className="article-cover"><img src={article.image} alt="" /><div className="cover-caption"><span><span className="cover-dot" /> SIGNAL JOURNAL</span><span>{article.category}</span></div></div>{article.source && <div className="source-note"><ExternalLink size={14} /> Headline supplied by NewsAPI. <a href={article.source} target="_blank" rel="noreferrer">Read the original report <ArrowUpRight size={13} /></a></div>}</div>
    {shareMessage && <div className="share-feedback" role="status">{shareMessage}<button onClick={() => setShareMessage('')} aria-label="Dismiss"><X size={14} /></button></div>}
    <div className="article-body-layout"><aside className="article-sidebar"><span>IN THIS STORY</span><a href="#the-story">The story</a><a href="#keep-reading">Keep reading</a><div className="sidebar-rule" /><span>SHARE THIS STORY</span><button onClick={share}><Share2 size={14} /> Share article</button></aside><article id="the-story" className="article-body"><div className="article-dropcap">{article.content[0]?.[0]}</div><div>{article.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div><div className="article-endmark">✳</div><div className="article-tags"><span>FILED UNDER</span><Link to={`/categories?topic=${encodeURIComponent(article.category)}`}>{article.category}</Link></div></article></div>
    {related.length > 0 && <section id="keep-reading" className="section-wrap related-section"><div className="section-heading"><div><Eyebrow>KEEP THE CURIOSITY GOING</Eyebrow><h2>More in <span>{article.category}.</span></h2></div><Link className="button-text" to="/latest">All stories <ArrowRight size={15} /></Link></div><ArticleGrid articles={related} bookmarks={bookmarks} toggle={toggle} /></section>}
  </main>
}

function AboutPage() {
  usePageTitle('About Signal')
  return <main className="editorial-page page-container"><div className="editorial-hero"><Eyebrow>WHY WE’RE HERE</Eyebrow><h1>For a future worth <span>understanding.</span></h1><p className="editorial-lede">Signal is an independent journal exploring artificial intelligence and the ideas shaping our shared future.</p></div><div className="editorial-image"><img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=85" alt="Planet Earth seen from space" /><span>THE BIG PICTURE, ALWAYS.</span></div><div className="editorial-columns"><Eyebrow>OUR APPROACH</Eyebrow><div><h2>Less noise.<br /><span>More nuance.</span></h2><div className="editorial-copy"><p>Technology can feel like a constant rush of launches, predictions, and hot takes. We believe understanding asks for something different: time, context, and an open mind.</p><p>Signal brings together writers, researchers, and curious thinkers to make complex ideas feel clear without making them feel simple. We look beyond the demo to ask how things work, who they serve, and what they might mean.</p><p>We’re optimistic about what people can build together—and thoughtful about the choices that shape that future. That’s the signal we’re listening for.</p></div></div></div><div className="principle-row"><div><span>01</span><h3>Curiosity first</h3><p>Better questions make for better conversations.</p></div><div><span>02</span><h3>Clarity, always</h3><p>Make the complex understandable, not simplistic.</p></div><div><span>03</span><h3>People at the center</h3><p>Technology matters because people do.</p></div></div></main>
}

function ContactPage() {
  usePageTitle('Contact Signal')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) { setError('Please complete each field with a valid email address.'); return }
    setError('')
    setSent(true)
  }
  return <main className="contact-page page-container"><div className="contact-intro"><Eyebrow>WE’RE ALL EARS</Eyebrow><h1>Good ideas start<br />with <span>a hello.</span></h1><p>Have a story idea, a question, or just want to say hi? We’d love to hear from you.</p><a className="contact-email" href="mailto:hello@signal.example">hello@signal.example <ArrowUpRight size={15} /></a><div className="contact-response"><span className="pulse-dot" /> Usually responding within two business days</div></div><div className="contact-form-wrap">{sent ? <div className="form-success"><span><Check size={23} /></span><h2>Message received.</h2><p>Thanks for reaching out. We’ll be in touch soon.</p><button className="button-text" onClick={() => setSent(false)}>Send another message <ArrowRight size={15} /></button></div> : <form className="contact-form" onSubmit={submit} noValidate><span className="form-heading">DROP US A NOTE</span><label htmlFor="name">Your name</label><input id="name" name="name" required placeholder="The name your friends use" /><label htmlFor="email">Email address</label><input id="email" name="email" type="email" required placeholder="you@somewhere.com" /><label htmlFor="subject">What’s this about?</label><select id="subject" name="subject" defaultValue=""><option value="" disabled>Choose a topic</option><option>Story idea</option><option>Press &amp; partnerships</option><option>A general hello</option><option>Something else</option></select><label htmlFor="message">Your message</label><textarea id="message" name="message" required rows={4} placeholder="Tell us what’s on your mind..." />{error && <p className="form-error" role="alert">{error}</p>}<button className="button-primary" type="submit">Send your note <ArrowRight size={16} /></button><small>This demo form does not send data to a server. For now, email us directly at <a href="mailto:hello@signal.example">hello@signal.example</a>.</small></form>}</div></main>
}

function NotFound() {
  usePageTitle('Page not found')
  return <main className="page-container not-found"><Eyebrow>404 — OFF THE MAP</Eyebrow><h1>This page is out of <span>orbit.</span></h1><p>It might have moved, or it may never have existed.</p><Link className="button-primary" to="/">Find your way home <ArrowRight size={16} /></Link></main>
}

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('signal-theme') === 'dark')
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('signal-bookmarks') || '[]') as string[] }
    catch { return [] }
  })
  const [articles, setArticles] = useState(sampleArticles)
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(Boolean(import.meta.env.VITE_NEWS_API_KEY))
  const location = useLocation()
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    localStorage.setItem('signal-theme', dark ? 'dark' : 'light')
  }, [dark])
  useEffect(() => { localStorage.setItem('signal-bookmarks', JSON.stringify(bookmarks)) }, [bookmarks])
  useEffect(() => {
    const key = import.meta.env.VITE_NEWS_API_KEY as string | undefined
    if (!key) return
    const controller = new AbortController()
    setLoading(true)
    fetch(`https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=8&apiKey=${encodeURIComponent(key)}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`NewsAPI request failed (${response.status}).`)
        const data = await response.json() as { status?: string; articles?: Parameters<typeof mapNewsApiArticle>[0][]; message?: string }
        if (data.status !== 'ok' || !Array.isArray(data.articles)) throw new Error(data.message || 'NewsAPI returned an unexpected response.')
        const usable = data.articles.filter((item) => item.title && item.title !== '[Removed]')
        if (!usable.length) throw new Error('NewsAPI did not return any usable headlines.')
        setArticles(usable.map(mapNewsApiArticle))
        setApiError('')
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name !== 'AbortError') setApiError(error.message)
      })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])
  const toggleBookmark = (id: string) => setBookmarks((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])

  return <div className="app-shell"><a className="skip-link" href="#main-content">Skip to content</a><Header dark={dark} onTheme={() => setDark((value) => !value)} bookmarks={bookmarks} />
    <AnimatePresence mode="wait"><motion.div id="main-content" key={location.pathname} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={transition} className="route-content">
      {apiError && <div className="api-notice" role="status"><span>Couldn’t load live headlines — showing clearly labeled sample stories instead.</span><button aria-label="Dismiss notice" onClick={() => setApiError('')}><X size={14} /></button></div>}
      {loading && <div className="loading-line"><span /> Connecting to NewsAPI…</div>}
      <Routes>
        <Route path="/" element={<Home articles={articles} bookmarks={bookmarks} toggle={toggleBookmark} loading={loading} />} />
        <Route path="/latest" element={<ListingPage articles={articles} bookmarks={bookmarks} toggle={toggleBookmark} heading="The latest" kicker="FRESH PERSPECTIVES" description="New ideas and considered takes on the technology shaping our world." mode="latest" loading={loading} />} />
        <Route path="/trending" element={<ListingPage articles={articles} bookmarks={bookmarks} toggle={toggleBookmark} heading="Trending now" kicker="IN THE CONVERSATION" description="Stories catching curious minds and opening up new questions." mode="trending" loading={loading} />} />
        <Route path="/categories" element={<CategoriesPage articles={articles} bookmarks={bookmarks} toggle={toggleBookmark} loading={loading} />} />
        <Route path="/category/:category" element={<CategoryRedirect />} />
        <Route path="/article/:slug" element={<ArticlePage articles={articles} bookmarks={bookmarks} toggle={toggleBookmark} />} />
        <Route path="/search" element={<SearchPage articles={articles} bookmarks={bookmarks} toggle={toggleBookmark} loading={loading} />} />
        <Route path="/bookmarks" element={<ListingPage articles={articles} bookmarks={bookmarks} toggle={toggleBookmark} heading="Your reading list" kicker="SAVED FOR LATER" description="A thoughtful collection, one story at a time." mode="bookmarks" loading={false} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </motion.div></AnimatePresence><Footer />
  </div>
}

function CategoryRedirect() {
  const { category = '' } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    const slug = category.replace(/-/g, ' ').toLowerCase()
    const topic = categories.find((item) => item !== 'All stories' && item.toLowerCase() === slug) || category.replace(/-/g, ' ')
    navigate(`/categories?topic=${encodeURIComponent(topic)}`, { replace: true })
  }, [category, navigate])
  return null
}
