import { useEffect, useMemo, useRef, useState } from 'react'
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import logoImage from './assets/todayler-logo.jpg'
import heroPhoneImage from './assets/8988.png'
import miaPhoneImage from './assets/2302.PNG'
import {
  APP_STORE_URL,
  BEDTIME_STORY_PREVIEW,
  CONTACT_EMAIL,
  FINAL_CTA,
  HERO_CONTENT,
  HOME_META,
  LEGAL_META,
  MIA_CONTENT,
  POSITIONING_CONTENT,
  PRICING_CONTENT,
  PRIVACY_LAST_UPDATED,
  PRIVACY_SECTIONS,
  STORY_CONTENT,
  TERMS_LAST_UPDATED,
  TERMS_SECTIONS,
  TESTIMONIALS,
  THREE_PILLARS,
} from './content'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/privacy"
          element={
            <LegalPage
              title="Privacy Policy"
              lastUpdated={PRIVACY_LAST_UPDATED}
              sections={PRIVACY_SECTIONS}
            />
          }
        />
        <Route
          path="/terms"
          element={
            <LegalPage
              title="Terms of Service"
              lastUpdated={TERMS_LAST_UPDATED}
              sections={TERMS_SECTIONS}
            />
          }
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

function Meta({ title, description }) {
  const location = useLocation()

  useEffect(() => {
    document.title = title

    updateHeadTag('meta[name="description"]', {
      tag: 'meta',
      attributes: { name: 'description', content: description },
    })
    updateHeadTag('link[rel="canonical"]', {
      tag: 'link',
      attributes: {
        rel: 'canonical',
        href: `https://example.com${location.pathname}`,
      },
    })
    updateHeadTag('meta[property="og:title"]', {
      tag: 'meta',
      attributes: { property: 'og:title', content: title },
    })
    updateHeadTag('meta[property="og:description"]', {
      tag: 'meta',
      attributes: { property: 'og:description', content: description },
    })
    updateHeadTag('meta[property="og:type"]', {
      tag: 'meta',
      attributes: { property: 'og:type', content: 'website' },
    })
    updateHeadTag('meta[property="og:url"]', {
      tag: 'meta',
      attributes: {
        property: 'og:url',
        content: `https://example.com${location.pathname}`,
      },
    })
    updateHeadTag('meta[property="og:image"]', {
      tag: 'meta',
      attributes: { property: 'og:image', content: 'https://example.com/og-image.jpg' },
    })
    updateHeadTag('meta[name="twitter:card"]', {
      tag: 'meta',
      attributes: { name: 'twitter:card', content: 'summary_large_image' },
    })
    updateHeadTag('meta[name="twitter:title"]', {
      tag: 'meta',
      attributes: { name: 'twitter:title', content: title },
    })
    updateHeadTag('meta[name="twitter:description"]', {
      tag: 'meta',
      attributes: { name: 'twitter:description', content: description },
    })
    updateHeadTag('meta[name="twitter:image"]', {
      tag: 'meta',
      attributes: { name: 'twitter:image', content: 'https://example.com/og-image.jpg' },
    })
  }, [description, location.pathname, title])

  return null
}

function updateHeadTag(selector, config) {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement(config.tag)
    document.head.appendChild(element)
  }

  Object.entries(config.attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

function HomePage() {
  return (
    <>
      <Meta title={HOME_META.title} description={HOME_META.description} />
      <main>
        <HeroSection />
        <PositioningSection />
        <PillarsSection />
        <MiaSection />
        <StorySection />
        <TestimonialsSection />
        <PricingSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </>
  )
}

function HeroSection() {
  return (
    <section className="section hero-section">
      <PageShell className="hero-layout">
        <div className="hero-copy reveal reveal-visible reveal-fade-up">
          <BrandLockup />
          <p className="eyebrow">{HERO_CONTENT.eyebrow}</p>
          <h1 className="hero-title">
            <span className="hero-title-wipe">{HERO_CONTENT.title}</span>
          </h1>
          <p className="hero-description">{HERO_CONTENT.description}</p>
          <div className="button-row">
            <StoreButton>{HERO_CONTENT.primaryCta}</StoreButton>
            <a className="text-link" href="#how-it-works">
              {HERO_CONTENT.secondaryCta}
            </a>
          </div>
          <p className="fine-print">{HERO_CONTENT.finePrint}</p>
        </div>
        <Reveal as="div" className="hero-phone phone-frame--contain reveal reveal-rise" delay={180}>
          <PhoneFrame src={heroPhoneImage} alt="Todayler homepage shown on an iPhone" />
        </Reveal>
      </PageShell>
    </section>
  )
}

function PositioningSection() {
  return (
    <section className="section">
      <PageShell narrow>
        <div className="copy-block">
          <Reveal as="h2" className="reveal reveal-fade-up">
            {POSITIONING_CONTENT.title}
          </Reveal>
          {POSITIONING_CONTENT.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </PageShell>
    </section>
  )
}

function PillarsSection() {
  return (
    <section className="section" id="how-it-works">
      <PageShell>
        <Reveal as="h2" className="centered-title reveal reveal-fade-up">
          Think. Move. Bond.
        </Reveal>
        <div className="pillar-grid">
          {THREE_PILLARS.map((pillar, index) => (
            <PillarCard key={pillar.title} pillar={pillar} delay={140 + index * 90} />
          ))}
        </div>
      </PageShell>
    </section>
  )
}

function MiaSection() {
  return (
    <section className="section section-warm">
      <PageShell className="split-layout split-layout--reverse">
        <div className="section-copy">
          <p className="eyebrow">{MIA_CONTENT.eyebrow}</p>
          <AnimatedTitle text={MIA_CONTENT.title} className="mia-title" />
          <p>{MIA_CONTENT.body}</p>
        </div>
        <Reveal as="div" className="mia-phone phone-frame--contain reveal reveal-fade-up-soft" delay={140}>
          <PhoneFrame
            src={miaPhoneImage}
            alt="Todayler Mia AI parenting companion on an iPhone"
          />
        </Reveal>
      </PageShell>
    </section>
  )
}

function StorySection() {
  return (
    <section className="section section-night">
      <PageShell narrow>
        <div className="story-shell">
          <div className="story-copy">
            <div className="moon-mark" aria-hidden="true">
              {STORY_CONTENT.symbol}
            </div>
            <Reveal as="h2" className="reveal reveal-fade-up">
              {STORY_CONTENT.title}
            </Reveal>
            <p>{STORY_CONTENT.body}</p>
          </div>
          <article className="story-card">
            <p className="story-quote">{BEDTIME_STORY_PREVIEW}</p>
            <p className="story-caption">{STORY_CONTENT.caption}</p>
          </article>
        </div>
      </PageShell>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="section">
      <PageShell>
        <Reveal as="h2" className="centered-title reveal reveal-fade-up">
          From parents who were exactly where you are.
        </Reveal>
        <div className="testimonial-grid">
          {TESTIMONIALS.map((testimonial) => (
            <article className="testimonial-card" key={testimonial.name}>
              <div className="rating" aria-label="Five stars">
                {'★★★★★'}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <p className="testimonial-name">{testimonial.name}</p>
            </article>
          ))}
        </div>
      </PageShell>
    </section>
  )
}

function PricingSection() {
  return (
    <section className="section">
      <PageShell className="pricing-shell" narrow>
        <p className="eyebrow">{PRICING_CONTENT.eyebrow}</p>
        <Reveal as="h2" className="reveal reveal-fade-up">
          {PRICING_CONTENT.title}
        </Reveal>
        <article className="pricing-card">
          <p className="price-line">
            {PRICING_CONTENT.price}
            <span>{PRICING_CONTENT.priceSuffix}</span>
          </p>
          <p className="price-subtitle">{PRICING_CONTENT.subtitle}</p>
          <ul className="feature-list">
            {PRICING_CONTENT.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <StoreButton block>{PRICING_CONTENT.cta}</StoreButton>
          <p className="fine-print">{PRICING_CONTENT.finePrint}</p>
        </article>
      </PageShell>
    </section>
  )
}

function FinalCtaSection() {
  return (
    <section className="section final-cta">
      <PageShell narrow>
        <img className="final-logo" src={logoImage} alt="Todayler baby logo" />
        <Reveal as="h2" className="reveal reveal-fade-up">
          {FINAL_CTA.title}
        </Reveal>
        <p>{FINAL_CTA.body}</p>
        <StoreButton>{FINAL_CTA.cta}</StoreButton>
        <p className="fine-print">{FINAL_CTA.finePrint}</p>
      </PageShell>
    </section>
  )
}

function LegalPage({ title, lastUpdated, sections }) {
  return (
    <>
      <Meta title={LEGAL_META[title].title} description={LEGAL_META[title].description} />
      <div className="legal-page">
        <header className="legal-header">
          <PageShell narrow>
            <Link to="/" className="brand-link">
              <img src={logoImage} alt="Todayler" />
              <span>Todayler</span>
            </Link>
          </PageShell>
        </header>
        <main className="legal-main">
          <PageShell narrow>
            <h1 className="legal-title">{title}</h1>
            <p className="legal-updated">Todayler · Last updated: {lastUpdated}</p>
            <div className="legal-sections">
              {sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </div>
          </PageShell>
        </main>
      </div>
    </>
  )
}

function NotFoundPage() {
  return (
    <>
      <Meta title="Todayler — Page Not Found" description="The page you requested does not exist." />
      <main className="not-found-page">
        <PageShell narrow>
          <div className="not-found-card">
            <p className="not-found-code">404</p>
            <h1>Oops! Page not found</h1>
            <p>The page you tried to open does not exist.</p>
            <Link className="button button-primary" to="/">
              Return to Home
            </Link>
          </div>
        </PageShell>
      </main>
    </>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <PageShell className="footer-layout">
        <div>
          <div className="brand-link brand-link--footer">
            <img src={logoImage} alt="Todayler" />
            <span>Todayler</span>
          </div>
          <p className="footer-tagline">Every day counts.</p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <a href={`mailto:${CONTACT_EMAIL}`}>Contact</a>
        </nav>
        <div className="footer-meta">
          <p>{CONTACT_EMAIL}</p>
          <p>© 2026 Todayler.</p>
        </div>
      </PageShell>
    </footer>
  )
}

function StoreButton({ children, block = false }) {
  return (
    <a
      className={`button button-primary${block ? ' button-block' : ''}`}
      href={APP_STORE_URL}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  )
}

function PageShell({ children, narrow = false, className = '' }) {
  const shellClassName = ['page-shell', narrow ? 'page-shell--narrow' : '', className]
    .filter(Boolean)
    .join(' ')

  return <div className={shellClassName}>{children}</div>
}

function BrandLockup() {
  return (
    <div className="brand-lockup">
      <img src={logoImage} alt="Todayler" />
      <span>Todayler</span>
    </div>
  )
}

function PhoneFrame({ src, alt, className = '' }) {
  return (
    <div className={`phone-frame ${className}`.trim()}>
      <img src={src} alt={alt} loading="lazy" />
    </div>
  )
}

function AnimatedTitle({ text, className = '' }) {
  const { isVisible, setNode } = useReveal({ threshold: 0.32 })
  const words = useMemo(
    () =>
      text.split(' ').map((word, index) => ({
        word,
        key: `${word}-${index}`,
        delay: `${index * 70}ms`,
      })),
    [text],
  )

  return (
    <h2 ref={setNode} className={getRevealClassName(`animated-title ${className}`, isVisible)}>
      {words.map(({ word, key, delay }, index) => (
        <span
          key={key}
          className={`animated-title-word${isVisible ? ' is-visible' : ''}`}
          style={{ transitionDelay: delay }}
          aria-hidden="true"
        >
          {word}
          {index < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </h2>
  )
}

function PillarCard({ pillar, delay }) {
  return (
    <Reveal
      as="article"
      className={`pillar-card pillar-card--${pillar.tone} reveal reveal-slide-right`}
      delay={delay}
    >
      <div className="pillar-symbol" aria-hidden="true">
        {pillar.symbol}
      </div>
      <h3>{pillar.title}</h3>
      <p>{pillar.body}</p>
    </Reveal>
  )
}

function Reveal({
  as = 'div',
  children,
  className = '',
  threshold,
  rootMargin,
  delay = 0,
}) {
  const { isVisible, setNode } = useReveal({ threshold, rootMargin })
  const Tag = as

  return (
    <Tag
      ref={setNode}
      className={getRevealClassName(className, isVisible)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}

function useReveal({ threshold = 0.24, rootMargin = '0px 0px -10% 0px' } = {}) {
  const nodeRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)

    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    const element = nodeRef.current
    if (!element || isVisible || prefersReducedMotion) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [isVisible, prefersReducedMotion, rootMargin, threshold])

  return {
    isVisible: isVisible || prefersReducedMotion,
    setNode: (node) => {
      nodeRef.current = node
    },
  }
}

function getRevealClassName(baseClassName, isVisible) {
  return [baseClassName, isVisible ? 'reveal-visible' : '']
    .filter(Boolean)
    .join(' ')
}

export default App
