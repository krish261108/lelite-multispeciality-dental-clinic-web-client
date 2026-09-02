"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Check, ChevronDown, Clock3, Facebook, Instagram, MapPin, Menu, MessageCircle, Phone, ShieldCheck, Sparkles, Star, X } from "lucide-react";

const WA = "https://wa.me/919488133006";
const IG = "https://www.instagram.com/elite_multispeciality_dental/?hl=en";
const FB = "https://www.facebook.com/lelitedental/";
const MAP = "https://www.google.com/maps/search/?api=1&query=242%20Mission%20St%2C%20MG%20Road%20Area%2C%20Puducherry%2C%20605001%2C%20India";

const services = [
  { n: "01", title: "Teeth Cleaning & Hygiene", text: "Gentle professional cleaning designed around comfort, sensitivity and long-term oral health.", tag: "PREVENTIVE CARE" },
  { n: "02", title: "Orthodontics", text: "Thoughtful alignment care for a healthier, more confident smile, including modern clear-aligner options.", tag: "SMILE ALIGNMENT" },
  { n: "03", title: "Root Canal Care", text: "Calm, carefully explained treatment with an emphasis on preserving your natural tooth.", tag: "RESTORATIVE" },
  { n: "04", title: "Smile & Aesthetic Care", text: "Personalized smile-focused care, from whitening to aesthetic improvements that still feel like you.", tag: "AESTHETICS" },
];

const testimonials = [
  ["A calm, comfortable experience", "Patients repeatedly highlight the friendly team, clear explanations and reassuring atmosphere."],
  ["Care that starts with listening", "Treatment is explained in understandable terms so you can make decisions with confidence."],
  ["Modern care, personal attention", "A clean, welcoming environment paired with careful treatment and genuine patient comfort."],
];

function Logo() {
  return <a href="#top" className="logo" aria-label="L'ELITE home"><span className="logo-mark">✦</span><span><b>L’ELITE</b><small>MULTISPECIALITY DIGITAL DENTAL CARE</small></span></a>;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: .7, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [progress, setProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 22 });
  const heroY = useTransform(smooth, [0, 1], [0, -120]);
  const heroScale = useTransform(smooth, [0, 1], [1, 1.08]);

  useEffect(() => {
    const fn = () => setProgress(window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
    window.addEventListener("scroll", fn, { passive: true }); fn(); return () => window.removeEventListener("scroll", fn);
  }, []);

  return <main id="top">
    <motion.div className="scroll-progress" style={{ scaleX: progress }} />
    <header className="nav"><Logo /><nav className={menu ? "nav-links open" : "nav-links"}><a href="#care" onClick={() => setMenu(false)}>Care</a><a href="#why" onClick={() => setMenu(false)}>Why L’Elite</a><a href="#reviews" onClick={() => setMenu(false)}>Reviews</a><a href="#visit" onClick={() => setMenu(false)}>Visit</a></nav><a className="nav-cta" href={WA} target="_blank" rel="noreferrer"><MessageCircle size={17}/> WhatsApp</a><button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? <X/> : <Menu/>}</button></header>

    <section ref={heroRef} className="hero">
      <motion.div className="hero-bg" style={{ y: heroY, scale: heroScale }}><div className="hero-glow"/><div className="tooth-watermark">✦</div></motion.div>
      <div className="hero-grid" />
      <motion.div className="hero-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .8 }}>
        <motion.div className="eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}><span/> DIGITAL DENTAL CARE · PUDUCHERRY</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .3, duration: .9 }}>A healthier smile.<br/><em>A calmer experience.</em></motion.h1>
        <motion.p initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45, duration: .7 }}>Modern multispeciality dentistry built around precision, comfort and the person in the chair.</motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .58 }}><a className="button primary" href={WA} target="_blank" rel="noreferrer">Book on WhatsApp <ArrowUpRight size={18}/></a><a className="button ghost" href="#care">Explore our care <ChevronDown size={17}/></a></motion.div>
        <div className="hero-trust"><span><Star size={14} fill="currentColor"/> 5.0 Google rating</span><span>25+ patient reviews</span><span><ShieldCheck size={14}/> Patient-first care</span></div>
      </motion.div>
      <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><div className="line"><i/></div><span>01 — 06</span></div>
    </section>

    <section className="intro section"><Reveal><div className="section-kicker">01 / THE L’ELITE APPROACH</div><h2>Dental care that feels <span>different.</span></h2></Reveal><Reveal delay={.08} className="intro-copy"><p>From a routine cleaning to more involved restorative or orthodontic care, every visit starts with the same idea: <strong>you should feel informed, comfortable and cared for.</strong></p><a className="text-link" href={WA} target="_blank" rel="noreferrer">Start a conversation <ArrowUpRight size={17}/></a></Reveal></section>

    <section id="care" className="care section"><div className="section-head"><Reveal><div className="section-kicker">02 / SPECIALIST CARE</div><h2>Care for every<br/><span>stage of your smile.</span></h2></Reveal><Reveal delay={.12}><p>Focused treatment, clearly explained. Explore the services patients come to L’Elite for.</p></Reveal></div><div className="service-grid">{services.map((s, i) => <Reveal key={s.n} delay={i * .07}><article className="service-card"><div className="service-top"><span>{s.n}</span><Sparkles size={18}/></div><div><small>{s.tag}</small><h3>{s.title}</h3><p>{s.text}</p></div><a href={WA} target="_blank" rel="noreferrer" aria-label={`Ask about ${s.title}`}><ArrowUpRight/></a></article></Reveal>)}</div></section>

    <section id="why" className="why section"><div className="why-panel"><div className="why-orb"/><Reveal><div className="section-kicker light">03 / WHY L’ELITE</div><h2>Precision without<br/><em>the clinical coldness.</em></h2><p>Patients describe L’Elite as friendly, hygienic and reassuring — a place where treatment is explained rather than rushed.</p></Reveal><div className="checks"><Reveal delay={.1}><span><Check/> Clear treatment explanations</span></Reveal><Reveal delay={.16}><span><Check/> Comfort-first approach</span></Reveal><Reveal delay={.22}><span><Check/> Modern digital dentistry</span></Reveal><Reveal delay={.28}><span><Check/> Personal attention</span></Reveal></div></div><div className="why-side"><div className="stat"><strong>5.0</strong><span>Google rating</span><div className="stars">★★★★★</div></div><div className="quote">“A dental visit should leave you with more confidence than when you arrived.”</div></div></section>

    <section className="experience section"><Reveal><div className="section-kicker">04 / THE EXPERIENCE</div><h2>Designed around<br/><span>your comfort.</span></h2></Reveal><div className="experience-grid"><Reveal delay={.08} className="visual-card"><div className="visual-shape">✦</div><div className="visual-label"><small>L’ELITE / DIGITAL</small><b>Modern care.<br/>Human touch.</b></div></Reveal><div className="experience-copy">{["Listen", "Explain", "Treat"].map((x, i) => <Reveal key={x} delay={.1 + i * .08}><div className="step"><span>0{i+1}</span><div><h3>{x}</h3><p>{["We start by understanding what brought you in and what matters to you.", "You get a clear picture of the options, priorities and next steps.", "Treatment is delivered with attention to detail and patient comfort."][i]}</p></div></div></Reveal>)}</div></div></section>

    <section id="reviews" className="reviews section"><Reveal><div className="section-kicker">05 / PATIENT VOICE</div><h2>Good dentistry is<br/><span>felt, not just seen.</span></h2></Reveal><div className="review-grid">{testimonials.map((t, i) => <Reveal key={t[0]} delay={i * .08}><article><div className="stars">★★★★★</div><h3>{t[0]}</h3><p>{t[1]}</p><small>Patient experience · L’Elite</small></article></Reveal>)}</div></section>

    <section id="visit" className="visit section"><div className="visit-card"><Reveal><div className="section-kicker light">06 / FIND US</div><h2>Your smile is<br/><em>worth the visit.</em></h2><p>242, Mission St, MG Road Area<br/>Puducherry — 605001, India</p><div className="visit-actions"><a className="button light-button" href={MAP} target="_blank" rel="noreferrer"><MapPin size={17}/> Open in Google Maps</a><a className="button outline-button" href={WA} target="_blank" rel="noreferrer"><MessageCircle size={17}/> WhatsApp us</a></div></Reveal></div><div className="map-card"><div className="map-lines"/><MapPin className="pin" size={38}/><div className="map-label"><b>L’ELITE</b><span>Mission Street · Puducherry</span></div></div></section>

    <footer><div><Logo/><p>Multispeciality digital dental care<br/>in Puducherry.</p></div><div className="footer-links"><a href={WA} target="_blank" rel="noreferrer"><MessageCircle/> WhatsApp</a><a href={IG} target="_blank" rel="noreferrer"><Instagram/> Instagram</a><a href={FB} target="_blank" rel="noreferrer"><Facebook/> Facebook</a><a href="tel:+919488133006"><Phone/> +91 94881 33006</a></div><div className="copyright">© {new Date().getFullYear()} L’ELITE Multispeciality Digital Dental Care</div></footer>
  </main>;
}
