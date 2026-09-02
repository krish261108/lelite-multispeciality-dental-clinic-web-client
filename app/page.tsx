"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDownRight, ArrowUpRight, ChevronLeft, ChevronRight, Clock3, Facebook, Instagram, MapPin, Menu, MessageCircle, Phone, ScanLine, Sparkles, Star, Stethoscope, X } from "lucide-react";

const WA = "https://wa.me/919488133006?text=Hello%20L%27ELITE%20Dental%20Care%2C%20I%27d%20like%20to%20book%20a%20dental%20appointment.";
const IG = "https://www.instagram.com/elite_multispeciality_dental/?hl=en";
const FB = "https://www.facebook.com/lelitedental/";
const MAP = "https://www.google.com/maps/search/?api=1&query=242%20Mission%20St%2C%20MG%20Road%20Area%2C%20Puducherry%2C%20605001%2C%20India";
const PHONE = "tel:+919488133006";

const visuals = {
  world: "/visuals/dental-world.svg",
  aligner: "/visuals/aligner-lab.svg",
  scan: "/visuals/digital-scan.svg",
  smile: "/visuals/smile-care.svg",
};

const services = [
  { n: "01", title: "Cleaning & hygiene", tag: "PREVENTIVE", text: "Professional cleaning and hygiene care designed around comfort.", icon: Sparkles, visual: visuals.smile },
  { n: "02", title: "Clear aligners", tag: "ALIGNMENT", text: "Modern clear-aligner planning for patients looking for a discreet route to straighter teeth.", icon: ScanLine, visual: visuals.aligner },
  { n: "03", title: "Orthodontics", tag: "ALIGNMENT", text: "Orthodontic assessment and treatment planning with the steps explained clearly.", icon: ArrowUpRight, visual: visuals.scan },
  { n: "04", title: "Root canal care", tag: "RESTORATIVE", text: "Careful restorative treatment focused on preserving your natural tooth and comfort.", icon: Stethoscope, visual: visuals.world },
  { n: "05", title: "Smile & aesthetic care", tag: "AESTHETICS", text: "Whitening and smile enhancement approached with a natural, considered result in mind.", icon: Star, visual: visuals.smile },
];

const experienceCards = [
  { title: "A digital-first clinic", label: "01 / THE WORLD", image: visuals.world, copy: "A technology-forward visual language for a modern dental experience." },
  { title: "Clear aligner planning", label: "02 / ALIGNERS", image: visuals.aligner, copy: "Explore clear-aligner care as part of L’ELITE's orthodontic offering." },
  { title: "Digital treatment thinking", label: "03 / PRECISION", image: visuals.scan, copy: "Visual planning and modern tools, translated into a clearer patient journey." },
  { title: "Comfort-led smile care", label: "04 / THE HUMAN SIDE", image: visuals.smile, copy: "The technology matters — but so do explanation, reassurance and comfort." },
];

const reviewThemes = [
  { name: "Friendly & caring", text: "Patients repeatedly highlight doctors who listen, explain treatment clearly and make visits feel reassuring." },
  { name: "Comfortable environment", text: "Feedback describes a calm, hygienic clinic where appointments feel more comfortable than expected." },
  { name: "Orthodontic confidence", text: "Orthodontic and alignment care is a recurring strength in the feedback shared about the clinic." },
  { name: "Professional & patient", text: "Visitors appreciate attentive care, clear planning and willingness to answer questions." },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: .8, delay, ease: [0.22, 1, .36, 1] }}>{children}</motion.div>;
}

function Mark() { return <span className="brand-mark" aria-hidden="true"><i/><i/><i/></span>; }

const jsonLd = { "@context": "https://schema.org", "@type": "Dentist", name: "L'ELITE Multispeciality Digital Dental Care", telephone: "+91 94881 33006", address: { "@type": "PostalAddress", streetAddress: "242, Mission St, MG Road Area", addressLocality: "Puducherry", postalCode: "605001", addressCountry: "IN" }, areaServed: "Puducherry", sameAs: [IG, FB] };

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 75, damping: 23, mass: .42 });
  const heroScale = useTransform(smooth, [0, .2], [1.04, .83]);
  const heroY = useTransform(smooth, [0, .2], [0, -90]);
  const heroRotate = useTransform(smooth, [0, .2], [0, -1.5]);
  const heroOpacity = useTransform(smooth, [0, .15, .25], [1, .98, 0]);
  const worldX = useTransform(smooth, [0, .3], [0, 170]);
  const worldRotate = useTransform(smooth, [0, .3], [0, 16]);
  const worldZ = useTransform(smooth, [0, .3], [0, -80]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActiveCard(v => (v + 1) % experienceCards.length);
      if (e.key === "ArrowLeft") setActiveCard(v => (v - 1 + experienceCards.length) % experienceCards.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const card = experienceCards[activeCard];
  const next = () => setActiveCard(v => (v + 1) % experienceCards.length);
  const prev = () => setActiveCard(v => (v - 1 + experienceCards.length) % experienceCards.length);

  return <main className="site-shell">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <header className="site-nav">
      <a className="brand" href="#top" onClick={() => setMenu(false)}><Mark/><span><strong>L&apos;ELITE</strong><small>MULTISPECIALITY DIGITAL DENTAL CARE</small></span></a>
      <nav className={menu ? "desktop-nav desktop-nav--open" : "desktop-nav"}>
        <a href="#care" onClick={() => setMenu(false)}>Care</a><a href="#experience" onClick={() => setMenu(false)}>Experience</a><a href="#reviews" onClick={() => setMenu(false)}>Reviews</a><a href="#visit" onClick={() => setMenu(false)}>Visit</a><a className="nav-book" href={WA} target="_blank" rel="noreferrer" onClick={() => setMenu(false)}>Book appointment <ArrowUpRight size={15}/></a>
      </nav>
      <button className="mobile-menu" onClick={() => setMenu(v => !v)} aria-label={menu ? "Close menu" : "Open menu"}>{menu ? <X/> : <Menu/>}</button>
    </header>

    <section id="top" className="hero-scroll-world">
      <motion.div className="hero-sticky hero-sticky--aaa" style={{ scale: heroScale, y: heroY, rotateZ: heroRotate, opacity: heroOpacity }}>
        <div className="hero-photo"><img src={visuals.world} alt="Abstract digital dental care scene"/><div className="hero-photo-shade"/></div>
        <motion.div className="hero-depth-orb" style={{ x: worldX, rotate: worldRotate, translateZ: worldZ }}><div className="depth-ring depth-ring--one"/><div className="depth-ring depth-ring--two"/><div className="depth-core"><span>01</span><strong>SMILE</strong></div></motion.div>
        <div className="hero-grid-lines"/>
        <div className="hero-copy"><Reveal className="hero-kicker"><span/> MODERN DENTISTRY · PUDUCHERRY</Reveal><h1>Where precision<br/><em>meets care.</em></h1><p>Contemporary dental care with digital thinking, clear explanations and a calmer patient experience — including orthodontics and clear aligners.</p><div className="hero-actions"><a className="button button--gold" href={WA} target="_blank" rel="noreferrer">Book your visit <ArrowUpRight size={17}/></a><a className="hero-link" href="#care">Explore care <ArrowDownRight size={17}/></a></div></div>
        <motion.div className="hero-floating-card" initial={{ opacity: 0, y: 30, rotate: 6 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 1, delay: .3 }}><span>01 / DIGITAL CARE</span><strong>ALIGN · RESTORE · SMILE</strong><small>242 Mission St · Puducherry</small></motion.div>
        <div className="hero-bottom"><span>SCROLL / SCRUB / EXPLORE</span><motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity }}><ChevronRight size={16}/></motion.div><span>05 CARE PATHS</span></div>
      </motion.div>
    </section>

    <section className="intro section-pad"><motion.div className="intro-visual" style={{ y: useTransform(smooth, [0, .45], [0, -65]) }}><img src={visuals.scan} alt="Digital dental planning visual"/><div className="visual-chip">DIGITAL / 3D / PRECISE</div></motion.div><div className="intro-copy"><Reveal><span className="eyebrow">01 / THE L&apos;ELITE DIFFERENCE</span></Reveal><Reveal delay={.05}><h2>Dental care should feel <em>human.</em></h2></Reveal><Reveal delay={.1}><p>We make the clinical side understandable and the experience feel considered — from the first conversation to the care that follows.</p></Reveal><Reveal delay={.15}><a className="text-link" href={WA} target="_blank" rel="noreferrer">Start a conversation <ArrowUpRight size={16}/></a></Reveal></div></section>

    <section className="services section-pad" id="care"><div className="section-heading"><Reveal><span className="eyebrow">02 / CARE, WITHOUT THE NOISE</span></Reveal><Reveal delay={.05}><h2>Specialist care.<br/><em>Clear direction.</em></h2></Reveal><Reveal delay={.1}><p>From preventive care to orthodontics and clear aligners, the treatment path is explained before the treatment begins.</p></Reveal></div><div className="service-list">{services.map((s,i)=>{const Icon=s.icon;return <motion.article className="service-row service-row--visual" key={s.n} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .65, delay: i * .04 }} whileHover={{ x: 10, rotateX: .5 }}><span className="service-number">{s.n}</span><div className="service-mini-visual"><img src={s.visual} alt=""/></div><div className="service-icon"><Icon size={20}/></div><div className="service-copy"><span>{s.tag}</span><h3>{s.title}</h3><p>{s.text}</p></div><a href={WA} target="_blank" rel="noreferrer" className="service-arrow" aria-label={`Ask about ${s.title}`}><ArrowUpRight size={20}/></a></motion.article>})}</div></section>

    <section className="manifesto manifesto--depth"><div className="manifesto-image"><img src={visuals.aligner} alt="Clear aligner planning visual"/><motion.div className="manifesto-depth-card" style={{ rotateX: useTransform(smooth, [0,1], [8,-8]), rotateY: useTransform(smooth, [0,1], [-12,12]) }}><span>ALIGNMENT</span><strong>CLEAR<br/>ALIGNER</strong></motion.div><div className="manifesto-image-label">L&apos;ELITE / DIGITAL ORTHODONTICS</div></div><div className="manifesto-copy"><Reveal><span className="eyebrow eyebrow--light">03 / OUR PROMISE</span></Reveal><Reveal delay={.05}><h2>Good dentistry is<br/><em>felt before it&apos;s seen.</em></h2></Reveal><Reveal delay={.1}><p>Time. Explanation. Hygiene. Comfort. Modern tools are there to make the patient journey clearer — not colder.</p></Reveal><div className="promise-list">{["Clear explanations before treatment","Calm, hygienic clinical environment","Orthodontics + clear aligner options","Treatment planned around your comfort"].map((x,i)=><Reveal key={x} delay={.12+i*.04}><div><span>0{i+1}</span>{x}</div></Reveal>)}</div></div></section>

    <section className="experience section-pad" id="experience"><div className="experience-heading"><Reveal><span className="eyebrow">04 / THE EXPERIENCE</span></Reveal><Reveal delay={.05}><h2>Modern tools.<br/><em>Gentle hands.</em></h2></Reveal><Reveal delay={.1}><p>Tap, click or use your keyboard arrows. This interactive visual card changes scene, depth and message.</p></Reveal><div className="experience-pill"><span>SCROLL-DRIVEN</span><i/> <span>3D DEPTH</span><i/> <span>PHOTO CARDS</span></div></div><div className="experience-stage"><div className="experience-card-wrap"><AnimatePresence mode="wait"><motion.div key={card.title} className="experience-card experience-card--3d" initial={{ opacity: 0, x: 80, rotateY: 12, rotateX: 3, scale: .92 }} animate={{ opacity: 1, x: 0, rotateY: 0, rotateX: 0, scale: 1 }} exit={{ opacity: 0, x: -70, rotateY: -10, scale: .94 }} transition={{ duration: .65, ease: [0.22, 1, .36, 1] }}><img src={card.image} alt={card.title}/><div className="experience-card-glow"/><div className="experience-card-overlay"><span>{card.label}</span><h3>{card.title}</h3><p>{card.copy}</p></div><div className="card-corner">L&apos;ELITE<span>↗</span></div></motion.div></AnimatePresence></div><div className="experience-controls"><button onClick={prev} aria-label="Previous visual"><ChevronLeft/></button><div>{experienceCards.map((item,i)=><button key={item.title} className={i===activeCard ? "dot dot--active" : "dot"} onClick={()=>setActiveCard(i)} aria-label={`Show ${item.title}`}/>)}</div><button onClick={next} aria-label="Next visual"><ChevronRight/></button></div><div className="experience-index">0{activeCard+1}<span>/</span>0{experienceCards.length}</div></div></section>

    <section className="reviews section-pad" id="reviews"><div className="section-heading"><Reveal><span className="eyebrow">05 / PATIENT NOTES</span></Reveal><Reveal delay={.05}><h2>What patients<br/><em>remember.</em></h2></Reveal><Reveal delay={.1}><p>Google shows a 5.0/5 rating from 25 reviews. The themes below are paraphrased from feedback shared about the clinic.</p></Reveal></div><div className="review-grid">{reviewThemes.map((r,i)=><Reveal key={r.name} delay={i*.05} className="review-card"><div className="stars">{[0,1,2,3,4].map(x=><Star key={x} size={13} fill="currentColor"/>)}</div><span className="review-count">0{i+1}</span><h3>{r.name}</h3><p>{r.text}</p><span className="review-foot">PATIENT EXPERIENCE</span></Reveal>)}</div><div className="rating-strip"><strong>5.0</strong><span className="rating-stars">★★★★★</span><span>25 reviews shown on Google</span></div></section>

    <section className="visit section-pad" id="visit"><div className="visit-photo"><img src={visuals.world} alt="L'ELITE digital dental care visual"/><div className="visit-map-orbit"><MapPin size={18}/><span>242 MISSION ST</span></div><div className="visit-photo-badge"><MapPin size={16}/><span>242, MISSION ST<br/><small>PUDUCHERRY 605001</small></span></div></div><div className="visit-copy"><Reveal><span className="eyebrow eyebrow--light">06 / COME SEE US</span></Reveal><Reveal delay={.05}><h2>Right in the heart<br/><em>of Puducherry.</em></h2></Reveal><Reveal delay={.1}><p>242, Mission St, MG Road Area<br/>Puducherry · 605001 · India</p></Reveal><div className="visit-actions"><a className="button button--gold" href={MAP} target="_blank" rel="noreferrer"><MapPin size={16}/> Open in Maps</a><a className="button button--ghost" href={PHONE}><Phone size={16}/> Call clinic</a></div><div className="visit-hours"><Clock3 size={16}/><span>Mon–Sat 10:00 AM–9:00 PM · Sun 6:00–9:00 PM</span></div></div></section>

    <section className="cta section-pad"><Reveal className="cta-inner"><span className="eyebrow">07 / YOUR NEXT VISIT</span><h2>Let&apos;s make your<br/><em>next smile simple.</em></h2><p>Have a question about cleaning, orthodontics, aligners, root canal care or your smile? Start with a message.</p><a className="button button--dark" href={WA} target="_blank" rel="noreferrer"><MessageCircle size={17}/> WhatsApp L&apos;ELITE</a></Reveal></section>
    <footer className="footer"><div className="footer-brand"><Mark/><strong>L&apos;ELITE</strong><span>MULTISPECIALITY DIGITAL DENTAL CARE</span></div><div className="footer-links"><a href={IG} target="_blank" rel="noreferrer"><Instagram size={16}/> Instagram</a><a href={FB} target="_blank" rel="noreferrer"><Facebook size={16}/> Facebook</a><a href={WA} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} L&apos;ELITE Dental Care</span><span>Puducherry, India</span></div></footer>
    <a className="floating-whatsapp" href={WA} target="_blank" rel="noreferrer" aria-label="Chat with L'ELITE Dental Care on WhatsApp"><MessageCircle size={21}/></a>
  </main>;
}
