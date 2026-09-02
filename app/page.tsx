"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDownRight, ArrowUpRight, ChevronLeft, ChevronRight, Clock3, Facebook, Instagram, MapPin, Menu, MessageCircle, Phone, Sparkles, Star, Stethoscope, X } from "lucide-react";

const WA = "https://wa.me/919488133006?text=Hello%20L%27ELITE%20Dental%20Care%2C%20I%27d%20like%20to%20book%20a%20dental%20appointment.";
const IG = "https://www.instagram.com/elite_multispeciality_dental/?hl=en";
const FB = "https://www.facebook.com/lelitedental/";
const MAP = "https://www.google.com/maps/search/?api=1&query=242%20Mission%20St%2C%20MG%20Road%20Area%2C%20Puducherry%2C%20605001%2C%20India";
const PHONE = "tel:+919488133006";
const PHOTO_CLINIC = "/images/clinic-interior.svg";
const PHOTO_CARE = "/images/patient-care.svg";

const services = [
  { n: "01", title: "Cleaning & hygiene", tag: "PREVENTIVE", text: "Gentle professional cleaning and hygiene care designed around comfort.", icon: Sparkles },
  { n: "02", title: "Orthodontics & aligners", tag: "ALIGNMENT", text: "Orthodontic care and clear-aligner options with a plan you can understand.", icon: ArrowUpRight },
  { n: "03", title: "Root canal care", tag: "RESTORATIVE", text: "Careful treatment focused on preserving your natural tooth and keeping you comfortable.", icon: Stethoscope },
  { n: "04", title: "Smile & aesthetic care", tag: "AESTHETICS", text: "Whitening and smile enhancement approached with a natural, considered result in mind.", icon: Star },
];

const experienceCards = [
  { title: "A calm clinical room", label: "01 / THE SPACE", image: PHOTO_CLINIC, copy: "A clean, familiar environment where the details are intentionally quiet." },
  { title: "Care that feels personal", label: "02 / THE PEOPLE", image: PHOTO_CARE, copy: "A patient-first experience built around explanation, attention and reassurance." },
  { title: "Digital-first dentistry", label: "03 / THE APPROACH", image: PHOTO_CLINIC, copy: "Modern dental thinking without making the technology feel intimidating." },
  { title: "A smile, thoughtfully planned", label: "04 / THE RESULT", image: PHOTO_CARE, copy: "From alignment to maintenance, the goal is clarity at every stage." },
];

const reviewThemes = [
  { name: "Friendly & caring", text: "Patients repeatedly highlight doctors who listen, explain treatment clearly and make the visit feel reassuring." },
  { name: "Comfortable environment", text: "Reviews describe a calm, hygienic clinic where appointments feel more comfortable than expected." },
  { name: "Orthodontic confidence", text: "Orthodontic and aligner care is a recurring strength in the feedback shared about the clinic." },
  { name: "Professional & patient", text: "Visitors appreciate the attentive approach, clear planning and willingness to answer questions." },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: .7, delay, ease: [0.22, 1, .36, 1] }}>{children}</motion.div>;
}

function Mark() {
  return <span className="brand-mark" aria-hidden="true"><i/><i/><i/></span>;
}

const jsonLd = { "@context": "https://schema.org", "@type": "Dentist", name: "L'ELITE Multispeciality Digital Dental Care", telephone: "+91 94881 33006", address: { "@type": "PostalAddress", streetAddress: "242, Mission St, MG Road Area", addressLocality: "Puducherry", postalCode: "605001", addressCountry: "IN" }, areaServed: "Puducherry", sameAs: [IG, FB] };

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: .45 });
  const heroScale = useTransform(smooth, [0, .2], [1, .86]);
  const heroY = useTransform(smooth, [0, .2], [0, -70]);
  const heroOpacity = useTransform(smooth, [0, .16, .25], [1, .98, 0]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActiveCard((v) => (v + 1) % experienceCards.length);
      if (e.key === "ArrowLeft") setActiveCard((v) => (v - 1 + experienceCards.length) % experienceCards.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const card = experienceCards[activeCard];

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
      <motion.div className="hero-sticky" style={{ scale: heroScale, y: heroY, opacity: heroOpacity }}>
        <div className="hero-photo"><img src={PHOTO_CLINIC} alt="L'ELITE dental clinic interior"/><div className="hero-photo-shade"/></div>
        <div className="hero-grid-lines"/>
        <div className="hero-copy"><Reveal className="hero-kicker"><span/> MODERN DENTISTRY · PUDUCHERRY</Reveal><h1>Your smile,<br/><em>considered.</em></h1><p>Contemporary dental care with a calmer experience — clear explanations, modern thinking and attention to the person in the chair.</p><div className="hero-actions"><a className="button button--gold" href={WA} target="_blank" rel="noreferrer">Book your visit <ArrowUpRight size={17}/></a><a className="hero-link" href="#care">Explore care <ArrowDownRight size={17}/></a></div></div>
        <motion.div className="hero-logo-card" initial={{opacity:0,y:25,rotate:4}} animate={{opacity:1,y:0,rotate:0}} transition={{duration:.9,delay:.35}}><img src={PHOTO_CLINIC} alt=""/><div><span>242 MISSION ST</span><strong>5.0 <Star size={13} fill="currentColor"/> <small>25 reviews</small></strong></div></motion.div>
        <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><motion.div animate={{x:[0,7,0]}} transition={{duration:1.5,repeat:Infinity}}><ChevronRight size={16}/></motion.div><span>PUDUCHERRY · 605001</span></div>
      </motion.div>
    </section>

    <section className="intro section-pad"><div className="intro-photo"><img src={PHOTO_CARE} alt="Patient care at L'ELITE"/><span>CARE / 01</span></div><div className="intro-copy"><Reveal><span className="eyebrow">01 / THE L&apos;ELITE DIFFERENCE</span></Reveal><Reveal delay={.05}><h2>Dental care should feel <em>human.</em></h2></Reveal><Reveal delay={.1}><p>We make the clinical side understandable and the experience feel considered — from the first conversation to the care that follows.</p></Reveal><Reveal delay={.15}><a className="text-link" href={WA} target="_blank" rel="noreferrer">Start a conversation <ArrowUpRight size={16}/></a></Reveal></div></section>

    <section className="services section-pad" id="care"><div className="section-heading"><Reveal><span className="eyebrow">02 / CARE, WITHOUT THE NOISE</span></Reveal><Reveal delay={.05}><h2>Specialist care.<br/><em>Clear direction.</em></h2></Reveal></div><div className="service-list">{services.map((s,i)=>{const Icon=s.icon;return <motion.article className="service-row" key={s.n} initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}} transition={{duration:.65,delay:i*.05}} whileHover={{x:8}}><span className="service-number">{s.n}</span><div className="service-icon"><Icon size={21}/></div><div className="service-copy"><span>{s.tag}</span><h3>{s.title}</h3><p>{s.text}</p></div><a href={WA} target="_blank" rel="noreferrer" className="service-arrow" aria-label={`Ask about ${s.title}`}><ArrowUpRight size={20}/></a></motion.article>})}</div></section>

    <section className="manifesto"><div className="manifesto-image"><img src={PHOTO_CLINIC} alt="Dental treatment room at L'ELITE"/><div className="manifesto-image-label">L&apos;ELITE / 242 MISSION ST</div></div><div className="manifesto-copy"><Reveal><span className="eyebrow eyebrow--light">03 / OUR PROMISE</span></Reveal><Reveal delay={.05}><h2>Good dentistry is<br/><em>felt before it&apos;s seen.</em></h2></Reveal><Reveal delay={.1}><p>Time. Explanation. Hygiene. Comfort. The details matter because a clinical appointment is still a human experience.</p></Reveal><div className="promise-list">{["Clear explanations before treatment","Calm, hygienic clinical environment","Modern digital dental care","Treatment planned around your comfort"].map((x,i)=><Reveal key={x} delay={.12+i*.04}><div><span>0{i+1}</span>{x}</div></Reveal>)}</div></div></section>

    <section className="experience section-pad" id="experience"><div className="experience-heading"><Reveal><span className="eyebrow">04 / THE EXPERIENCE</span></Reveal><Reveal delay={.05}><h2>Modern tools.<br/><em>Gentle hands.</em></h2></Reveal><Reveal delay={.1}><p>Tap through the story. Each card changes the visual and the message.</p></Reveal></div><div className="experience-stage"><div className="experience-card-wrap"><motion.div key={card.title} className="experience-card" initial={{opacity:0,x:40,scale:.97}} animate={{opacity:1,x:0,scale:1}} transition={{duration:.45}}><img src={card.image} alt={card.title}/><div className="experience-card-overlay"><span>{card.label}</span><h3>{card.title}</h3><p>{card.copy}</p></div></motion.div></div><div className="experience-controls"><button onClick={()=>setActiveCard(v=>(v-1+experienceCards.length)%experienceCards.length)} aria-label="Previous photo"><ChevronLeft/></button><div>{experienceCards.map((_,i)=><button key={i} className={i===activeCard?"dot dot--active":"dot"} onClick={()=>setActiveCard(i)} aria-label={`Show photo ${i+1}`}/>)}</div><button onClick={()=>setActiveCard(v=>(v+1)%experienceCards.length)} aria-label="Next photo"><ChevronRight/></button></div><div className="experience-index">0{activeCard+1}<span>/</span>0{experienceCards.length}</div></div></section>

    <section className="reviews section-pad" id="reviews"><div className="section-heading"><Reveal><span className="eyebrow">05 / PATIENT NOTES</span></Reveal><Reveal delay={.05}><h2>What patients<br/><em>remember.</em></h2></Reveal><Reveal delay={.1}><p>Google shows a 5.0/5 rating from 25 reviews. The themes below are paraphrased from feedback shared about the clinic.</p></Reveal></div><div className="review-grid">{reviewThemes.map((r,i)=><Reveal key={r.name} delay={i*.05} className="review-card"><div className="stars">{[0,1,2,3,4].map(x=><Star key={x} size={13} fill="currentColor"/>)}</div><span className="review-count">0{i+1}</span><h3>{r.name}</h3><p>{r.text}</p><span className="review-foot">PATIENT EXPERIENCE</span></Reveal>)}</div><div className="rating-strip"><strong>5.0</strong><span className="rating-stars">★★★★★</span><span>25 reviews shown on Google</span></div></section>

    <section className="visit section-pad" id="visit"><div className="visit-photo"><img src={PHOTO_CLINIC} alt="L'ELITE clinic"/><div className="visit-photo-badge"><MapPin size={16}/><span>242, MISSION ST<br/><small>PUDUCHERRY 605001</small></span></div></div><div className="visit-copy"><Reveal><span className="eyebrow eyebrow--light">06 / COME SEE US</span></Reveal><Reveal delay={.05}><h2>Right in the heart<br/><em>of Puducherry.</em></h2></Reveal><Reveal delay={.1}><p>242, Mission St, MG Road Area<br/>Puducherry · 605001 · India</p></Reveal><div className="visit-actions"><a className="button button--gold" href={MAP} target="_blank" rel="noreferrer"><MapPin size={16}/> Open in Maps</a><a className="button button--ghost" href={PHONE}><Phone size={16}/> Call clinic</a></div><div className="visit-hours"><Clock3 size={16}/><span>Mon–Sat 10:00 AM–9:00 PM · Sun 6:00–9:00 PM</span></div></div></section>

    <section className="cta section-pad"><Reveal className="cta-inner"><span className="eyebrow">07 / YOUR NEXT VISIT</span><h2>Let&apos;s make your<br/><em>next smile simple.</em></h2><p>Have a question about cleaning, orthodontics, aligners, root canal care or your smile? Start with a message.</p><a className="button button--dark" href={WA} target="_blank" rel="noreferrer"><MessageCircle size={17}/> WhatsApp L&apos;ELITE</a></Reveal></section>
    <footer className="footer"><div className="footer-brand"><Mark/><strong>L&apos;ELITE</strong><span>MULTISPECIALITY DIGITAL DENTAL CARE</span></div><div className="footer-links"><a href={IG} target="_blank" rel="noreferrer"><Instagram size={16}/> Instagram</a><a href={FB} target="_blank" rel="noreferrer"><Facebook size={16}/> Facebook</a><a href={WA} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} L&apos;ELITE Dental Care</span><span>Puducherry, India</span></div></footer>
    <a className="floating-whatsapp" href={WA} target="_blank" rel="noreferrer" aria-label="Chat with L'ELITE Dental Care on WhatsApp"><MessageCircle size={21}/></a>
  </main>;
}
