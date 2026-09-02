"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  Clock3,
  Facebook,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Sparkles,
  Star,
  Stethoscope,
  X,
} from "lucide-react";

const WA = "https://wa.me/919488133006?text=Hello%20L%27ELITE%20Dental%20Care%2C%20I%27d%20like%20to%20book%20a%20dental%20appointment.";
const IG = "https://www.instagram.com/elite_multispeciality_dental/?hl=en";
const FB = "https://www.facebook.com/lelitedental/";
const MAP = "https://www.google.com/maps/search/?api=1&query=242%20Mission%20St%2C%20MG%20Road%20Area%2C%20Puducherry%2C%20605001%2C%20India";
const PHONE = "tel:+919488133006";

const services = [
  { number: "01", title: "Teeth cleaning & hygiene", copy: "Gentle professional cleaning that leaves your smile feeling fresh, polished and looked after.", tag: "PREVENTIVE CARE", icon: Sparkles },
  { number: "02", title: "Orthodontics & aligners", copy: "Thoughtful smile alignment with orthodontic care and clear-aligner options tailored to you.", tag: "SMILE ALIGNMENT", icon: ArrowUpRight },
  { number: "03", title: "Root canal care", copy: "Calm, careful treatment focused on preserving your natural tooth and keeping you comfortable.", tag: "RESTORATIVE", icon: Stethoscope },
  { number: "04", title: "Smile & aesthetic care", copy: "A considered approach to whitening and smile enhancement, designed around your natural features.", tag: "AESTHETICS", icon: Star },
];

const promises = ["Clear explanations before treatment", "A calm, hygienic clinical environment", "Modern digital dental care", "Treatment planned around your comfort"];
const reviews = [
  "The doctors were friendly, caring and explained the treatment clearly. The whole experience felt reassuring.",
  "A comfortable clinic with attentive care. Everything was explained patiently and the treatment felt well planned.",
  "Professional, hygienic and welcoming. The team made an appointment that can feel stressful much easier.",
];

function BrandMark({ light = false }: { light?: boolean }) {
  return <span className={`brand-mark ${light ? "brand-mark--light" : ""}`} aria-hidden="true"><span className="brand-mark__a" /><span className="brand-mark__b" /><span className="brand-mark__c" /></span>;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function DentalOrbit() {
  return <div className="dental-orbit" aria-hidden="true">
    <motion.div className="dental-orbit__halo dental-orbit__halo--one" animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} />
    <motion.div className="dental-orbit__halo dental-orbit__halo--two" animate={{ rotate: -360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} />
    <motion.div className="tooth-hero" animate={{ y: [0, -13, 0], rotate: [-2, 1.5, -2] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>
      <div className="tooth-hero__crown"><span className="tooth-hero__shine" /></div><div className="tooth-hero__root tooth-hero__root--left" /><div className="tooth-hero__root tooth-hero__root--right" />
    </motion.div>
    <div className="orbit-chip orbit-chip--top">DIGITAL CARE</div><div className="orbit-chip orbit-chip--bottom"><Sparkles size={13} /> GENTLE BY DESIGN</div>
    <div className="orbit-dot orbit-dot--one" /><div className="orbit-dot orbit-dot--two" /><div className="orbit-dot orbit-dot--three" />
  </div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroActive, setHeroActive] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.45 });
  const heroScale = useTransform(smoothProgress, [0, 0.16], [1, 0.94]);
  const heroY = useTransform(smoothProgress, [0, 0.16], [0, -30]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.13, 0.2], [1, 1, 0]);

  useEffect(() => {
    const update = () => setHeroActive(window.scrollY < Math.max(460, window.innerHeight * 0.72));
    update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update);
  }, []);

  const heroProgress = useMemo(() => typeof window === "undefined" ? 0 : Math.min(1, Math.max(0, window.scrollY / Math.max(1, window.innerHeight * 0.72))), [heroActive]);
  const closeMenu = () => setMenuOpen(false);

  return <main className="site-shell">
    <header className={`site-nav ${heroActive ? "site-nav--hero" : ""}`}>
      <a className="brand" href="#top" aria-label="L'ELITE Dental Care home" onClick={closeMenu}><BrandMark light={heroActive} /><span><strong>L&apos;ELITE</strong><small>MULTISPECIALITY DIGITAL DENTAL CARE</small></span></a>
      <nav className={`desktop-nav ${menuOpen ? "desktop-nav--open" : ""}`} aria-label="Primary navigation">
        <a href="#care" onClick={closeMenu}>Care</a><a href="#approach" onClick={closeMenu}>Approach</a><a href="#reviews" onClick={closeMenu}>Reviews</a><a href="#visit" onClick={closeMenu}>Visit</a>
        <a className="nav-book" href={WA} target="_blank" rel="noreferrer" onClick={closeMenu}>Book appointment <ArrowUpRight size={15} /></a>
      </nav>
      <button className="mobile-menu" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
    </header>

    <section id="top" className="hero" ref={heroRef}>
      <motion.div className="hero-stage" style={{ scale: heroScale, y: heroY, opacity: heroOpacity }}>
        <div className="hero-grid" /><div className="hero-glow hero-glow--one" /><div className="hero-glow hero-glow--two" />
        <div className="hero-copy">
          <Reveal className="hero-kicker"><span className="eyebrow-dot" /> MODERN DENTISTRY · PUDUCHERRY</Reveal>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .08, ease: [0.22,1,0.36,1] }}>Your smile,<br /><em>considered.</em></motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .2, ease: [0.22,1,0.36,1] }}>L&apos;ELITE brings calm, contemporary dental care to the heart of Puducherry — with clarity at every step.</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .3 }}><a className="button button--gold" href={WA} target="_blank" rel="noreferrer">Book your visit <ArrowUpRight size={17} /></a><a className="text-link text-link--light" href="#care">Explore care <ArrowDownRight size={17} /></a></motion.div>
        </div>
        <DentalOrbit />
        <div className="hero-meta"><span><MapPin size={14} /> 242 Mission St · Puducherry</span><span>5.0 <Star size={12} fill="currentColor" /> · Patient rated</span></div>
        <div className="hero-scroll"><span>SCROLL TO EXPLORE</span><motion.div animate={{ y: [0,8,0] }} transition={{ duration:1.6, repeat:Infinity }}><ChevronDown size={17} /></motion.div></div>
        <div className="hero-progress" aria-hidden="true"><span style={{ transform: `scaleX(${heroProgress})` }} /></div>
      </motion.div>
    </section>

    <section className="intro section-pad" id="approach"><div className="section-grid intro-grid"><Reveal><span className="eyebrow">01 / THE L&apos;ELITE DIFFERENCE</span></Reveal><Reveal delay={.08} className="intro-statement"><h2>Dental care should feel <em>human.</em></h2><p>From a first consultation to ongoing care, we make the clinical side understandable — and the experience feel considered.</p><a className="text-link" href={WA} target="_blank" rel="noreferrer">Start a conversation <ArrowUpRight size={16} /></a></Reveal></div><div className="marquee" aria-hidden="true"><motion.div animate={{ x:[0,-820] }} transition={{ duration:24, repeat:Infinity, ease:"linear" }}><span>CALM CARE</span><i>✦</i><span>DIGITAL DENTISTRY</span><i>✦</i><span>YOUR COMFORT</span><i>✦</i><span>HEALTHY SMILES</span><i>✦</i><span>CALM CARE</span><i>✦</i></motion.div></div></section>

    <section className="services section-pad" id="care"><div className="section-heading"><Reveal><span className="eyebrow">02 / CARE, WITHOUT THE NOISE</span></Reveal><Reveal delay={.06}><h2>Specialist care.<br /><em>Clear direction.</em></h2></Reveal><Reveal delay={.1}><p>From prevention to restoration and smile alignment, every treatment starts with listening and a plan you understand.</p></Reveal></div><div className="service-list">{services.map((service,index)=>{const Icon=service.icon;return <motion.article className="service-row" key={service.number} initial={{opacity:0,y:35}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.25}} transition={{duration:.7,delay:index*.06,ease:[.22,1,.36,1]}} whileHover={{x:8}}><span className="service-number">{service.number}</span><div className="service-icon"><Icon size={22}/></div><div className="service-copy"><span>{service.tag}</span><h3>{service.title}</h3><p>{service.copy}</p></div><a href={WA} target="_blank" rel="noreferrer" aria-label={`Ask about ${service.title}`} className="service-arrow"><ArrowUpRight size={20}/></a></motion.article>})}</div></section>

    <section className="manifesto"><div className="manifesto-noise" aria-hidden="true"/><div className="section-grid manifesto-grid"><Reveal><span className="eyebrow eyebrow--light">03 / OUR PROMISE</span></Reveal><Reveal delay={.08} className="manifesto-main"><h2>Good dentistry is<br /><em>felt before it&apos;s seen.</em></h2><p>We combine clinical precision with the small things that make a patient feel looked after: time, explanation, hygiene and a calm room.</p></Reveal></div><div className="promise-grid">{promises.map((promise,index)=><Reveal key={promise} delay={index*.06} className="promise-item"><span className="promise-icon">✓</span><span>{promise}</span></Reveal>)}</div></section>

    <section className="experience section-pad"><div className="experience-visual" aria-hidden="true"><div className="experience-panel experience-panel--back"><span>L&apos;ELITE</span><strong>Digital<br />Dental<br />Care</strong></div><motion.div className="experience-panel experience-panel--front" whileInView={{rotate:-5,y:0}} initial={{rotate:-10,y:30}} transition={{duration:.9,ease:[.22,1,.36,1]}}><div className="experience-tooth"><div/><span/></div><span className="experience-caption">COMFORT / PRECISION / TRUST</span></motion.div><div className="experience-orb"/></div><div className="experience-copy"><Reveal><span className="eyebrow">04 / THE EXPERIENCE</span></Reveal><Reveal delay={.06}><h2>Modern tools.<br /><em>Gentle hands.</em></h2></Reveal><Reveal delay={.1}><p>Our digital-first approach is about more than equipment. It is about giving you a clearer picture of what is happening, what comes next and why.</p></Reveal><div className="experience-facts"><div><strong>5.0</strong><span>Patient rating shown on Google</span></div><div><strong>242</strong><span>Mission Street, Puducherry</span></div></div></div></section>

    <section className="reviews section-pad" id="reviews"><div className="section-heading section-heading--reviews"><Reveal><span className="eyebrow">05 / PATIENT NOTES</span></Reveal><Reveal delay={.06}><h2>Care that people<br /><em>remember.</em></h2></Reveal></div><div className="review-grid">{reviews.map((quote,index)=><Reveal key={quote} delay={index*.07} className="review-card"><div className="stars" aria-label="5 out of 5 stars">{[0,1,2,3,4].map((star)=><Star key={star} size={14} fill="currentColor"/>)}</div><blockquote>“{quote}”</blockquote><span>PATIENT EXPERIENCE</span></Reveal>)}</div><Reveal className="rating-strip"><span>GOOGLE RATING</span><strong>5.0</strong><span className="rating-stars">★★★★★</span><span>25 reviews shown</span></Reveal></section>

    <section className="visit section-pad" id="visit"><div className="visit-card"><div className="visit-map" aria-hidden="true"><div className="map-grid"/><div className="map-road map-road--one"/><div className="map-road map-road--two"/><div className="map-pin"><MapPin size={22}/></div><span className="map-label">L&apos;ELITE · MISSION ST</span></div><div className="visit-copy"><Reveal><span className="eyebrow eyebrow--light">06 / COME SEE US</span></Reveal><Reveal delay={.06}><h2>Right in the heart<br /><em>of Puducherry.</em></h2></Reveal><Reveal delay={.1}><p>242, Mission St, MG Road Area<br />Puducherry · 605001 · India</p></Reveal><div className="visit-actions"><a className="button button--gold" href={MAP} target="_blank" rel="noreferrer"><MapPin size={16}/> Open in Maps</a><a className="button button--ghost" href={PHONE}><Phone size={16}/> +91 94881 33006</a></div><div className="visit-hours"><Clock3 size={16}/><span>Call or WhatsApp to confirm appointment availability.</span></div></div></div></section>

    <section className="cta section-pad"><Reveal className="cta-inner"><span className="eyebrow">07 / YOUR NEXT VISIT</span><h2>Let&apos;s make your<br /><em>next smile simple.</em></h2><p>Questions about cleaning, orthodontics, root canal care or your smile? Start with a message.</p><div className="cta-actions"><a className="button button--dark" href={WA} target="_blank" rel="noreferrer"><MessageCircle size={17}/> WhatsApp L&apos;ELITE</a><a className="text-link" href={PHONE}>Call the clinic <ArrowUpRight size={16}/></a></div></Reveal></section>

    <footer className="footer"><div className="footer-brand"><BrandMark/><strong>L&apos;ELITE</strong><span>Multispeciality Digital Dental Care</span></div><div className="footer-links"><a href={IG} target="_blank" rel="noreferrer"><Instagram size={17}/> Instagram</a><a href={FB} target="_blank" rel="noreferrer"><Facebook size={17}/> Facebook</a><a href={WA} target="_blank" rel="noreferrer"><MessageCircle size={17}/> WhatsApp</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} L&apos;ELITE Dental Care</span><span>Puducherry, India</span></div></footer>
    <a className="floating-whatsapp" href={WA} target="_blank" rel="noreferrer" aria-label="Chat with L'ELITE Dental Care on WhatsApp"><MessageCircle size={21}/></a>
  </main>;
}
