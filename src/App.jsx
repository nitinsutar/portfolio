import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Build-safe path helper (Vite/Vercel)
const asset = (p) => `${import.meta.env.BASE_URL || "/"}${p.replace(/^\//,"")}`;

const projects = [
  { title: "OutlookMS", description: "Corporate presence done right. Straightforward, fast, professional.", tags: ["Corporate","Web","B2B"], link: "https://www.outlookms.com/", preview: "previews/outlookms.png" },
  { title: "Raj Jewellers", description: "Luxury jewellery site—craftsmanship meets clean modern web.", tags: ["Branding","Web Design","Luxury"], link: "https://www.rajjewellersmumbai.com/", preview: "previews/rajjewellers.png" },
  { title: "Adtalk", description: "Creative ad agency site with punchy case visuals and motion.", tags: ["Agency","Marketing","Creative"], link: "https://theadtalk.com/", preview: "previews/adtalk.png" },
  { title: "Vibeharbour", description: "Urban streetwear brand + site. Bold visuals, crisp copy, zero fluff.", tags: ["Brand","eCom","Design"], link: "https://www.vibeharbour.com/", preview: "previews/vibeharbour.png" },
  { title: "IES MCRC", description: "Institutional site for programs, faculty, admissions—clear and accessible.", tags: ["Education","UI/UX","CMS"], link: "https://www.mcrc.ies.edu/", preview: "previews/iesmcrc.png" },
  { title: "Ace Beveragez", description: "Beverage brand presence—refreshing design with crisp brand storytelling.", tags: ["FMCG","Branding","Web"], link: "https://www.acebeveragez.com/", preview: "previews/acebeveragez.png" },
];

const navItems = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact Us" },
];

function useActiveSection(sectionIds){const [active,setActive]=useState(sectionIds[0]);useEffect(()=>{const obsrs=[];sectionIds.forEach(id=>{const el=document.getElementById(id);if(!el)return;const obs=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting)setActive(id);});},{rootMargin:"-40% 0px -55% 0px",threshold:[0,0.25,0.5,1]});obs.observe(el);obsrs.push(obs);});return()=>obsrs.forEach(o=>o.disconnect());},[sectionIds]);return active;}
function enableSmoothAnchors(){const handler=(e)=>{const a=e.target.closest("a[href^='#']");if(!a)return;const id=a.getAttribute("href").slice(1);const t=document.getElementById(id);if(t){e.preventDefault();t.scrollIntoView({behavior:"smooth",block:"start"});}};document.addEventListener("click",handler);return()=>document.removeEventListener("click",handler);}

export default function App(){
  const pageRef=useRef(null);
  const {scrollYProgress}=useScroll({container:pageRef});
  const progressWidth=useTransform(scrollYProgress,[0,1],["0%","100%"]);
  const yParallax=useTransform(scrollYProgress,[0,1],[0,-120]);
  const active=useActiveSection(["about","projects","contact"]);

  useEffect(()=>{const cleanup=enableSmoothAnchors();return cleanup;},[]);

  return (<div ref={pageRef} className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-white/20">
    <motion.div style={{width:progressWidth}} className="fixed left-0 top-0 z-50 h-1 bg-white/80"/>
    <div className="fixed inset-0 -z-10"><div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(120,120,255,0.12),transparent)]"/></div>

    <header className="sticky top-0 z-40 backdrop-blur-sm bg-neutral-950/60 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4"><div className="flex h-16 items-center justify-between">
        <a href="#about" className="font-semibold tracking-wide text-white hover:opacity-90">NS</a>
        <nav className="hidden gap-6 md:flex">{navItems.map(n=>(
          <a key={n.id} href={`#${n.id}`} className={`text-sm transition-colors ${active===n.id?"text-white":"text-white/60 hover:text-white"}`}>{n.label}</a>
        ))}</nav>
        <a href="#contact" className="md:hidden rounded-full border border-white/15 px-3 py-1.5 text-sm text-white hover:bg-white hover:text-black transition">Let’s talk</a>
      </div></div>
    </header>

    <section className="relative mx-auto max-w-6xl px-4 pt-16 md:pt-24">
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} style={{y:yParallax}}>
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/50">Portfolio — 2025</p>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl"><span className="text-white">Nitin Sutar</span><span className="block text-white/70">Designer • Builder • Problem Solver</span></h1>
        <p className="mt-6 max-w-2xl text-base text-neutral-300 md:text-lg">I design & ship products that feel slick and obvious. Zero hassle, max impact. If it’s not fast and clean, it’s not done.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className="group inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:opacity-90">See Projects<span className="ml-2 inline-block transition group-hover:translate-x-0.5">→</span></a>
          <a href="#contact" className="inline-flex items-center rounded-full border border-white/15 px-5 py-2 text-sm text-white hover:bg-white/10 transition">Let’s Collaborate</a>
        </div>
      </motion.div>
      <div className="mt-10 h-px w-full bg-gradient-to-r from-white/0 via-white/20 to-white/0"/>
    </section>

    <section id="about" className="mx-auto max-w-6xl px-4 py-14 md:py-20 scroll-mt-20">
      <div className="grid items-center gap-8 md:grid-cols-5">
        <div className="md:col-span-3">
          <h2 className="text-2xl font-semibold md:text-3xl">About</h2>
          <p className="mt-4 text-neutral-300">I team up with founders to go from idea → MVP → scale at speed. I obsess over micro-interactions, sharp copy, and performance. The vibe: minimal, bold, and a little bit playful.</p>
          <ul className="mt-6 grid gap-2 text-sm text-white/80 md:grid-cols-2"><li>⚡ Rapid prototyping (days, not months)</li><li>🎯 Conversion-focused UX that sells</li><li>🧩 Design systems that age well</li><li>🚀 SEO + Web perf baked in</li></ul>
        </div>
        <div className="md:col-span-2">
          <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6">
            <h3 className="text-sm uppercase tracking-widest text-white/60">Capabilities</h3>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><dt>Product</dt><dd className="text-white/70">Ideation, Scoping, Roadmaps</dd></div>
              <div className="flex justify-between"><dt>Design</dt><dd className="text-white/70">Wireframes → High-fidelity</dd></div>
              <div className="flex justify-between"><dt>Build</dt><dd className="text-white/70">React/Next.js, Tailwind</dd></div>
            </dl>
            <a href="#contact" className="mt-5 inline-block rounded-xl bg-white px-4 py-2 text-black hover:opacity-90">Start a project</a>
          </div>
        </div>
      </div>
    </section>

    <section id="projects" className="mx-auto max-w-6xl px-4 py-14 md:py-20 scroll-mt-20">
      <div className="mb-8 flex items-end justify-between"><h2 className="text-2xl font-semibold md:text-3xl">Projects</h2><a href="#contact" className="text-sm text-white/70 hover:text-white">Available for collabs →</a></div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p,idx)=>(
          <motion.a key={p.title} href={p.link} target="_blank" rel="noreferrer"
            initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.25}} transition={{duration:0.4,delay:idx*0.04}}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 shadow-lg hover:border-white/20">
            <div className="h-40 overflow-hidden">
              <img src={asset(p.preview)} alt={`${p.title} preview`} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"/>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-white">{p.title}</h3>
              <p className="mt-1 text-sm text-neutral-300">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">{p.tags.map(t=>(<span key={t} className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/70">{t}</span>))}</div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>

    <section id="contact" className="mx-auto max-w-6xl px-4 pb-24 scroll-mt-20">
      <div className="rounded-2xl border border-white/10 bg-neutral-900/60 p-6 md:p-8">
        <h2 className="text-2xl font-semibold md:text-3xl">Contact</h2>
        <p className="mt-2 text-neutral-300">Got an idea? A product to level up? Ping me and let's build something slick.</p>
        <form className="mt-6 grid gap-4 md:grid-cols-2">
          <input placeholder="Your name" className="rounded-xl border border-white/10 bg-neutral-950/60 px-4 py-3 outline-none placeholder:text-white/40 focus:border-white/30 md:col-span-1"/>
          <input placeholder="Email or phone" className="rounded-xl border border-white/10 bg-neutral-950/60 px-4 py-3 outline-none placeholder:text-white/40 focus:border-white/30 md:col-span-1"/>
          <input placeholder="Company / brand (optional)" className="rounded-xl border border-white/10 bg-neutral-950/60 px-4 py-3 outline-none placeholder:text-white/40 focus:border-white/30 md:col-span-2"/>
          <textarea rows={4} placeholder="Project brief (what, when, budget)" className="rounded-xl border border-white/10 bg-neutral-950/60 px-4 py-3 outline-none placeholder:text-white/40 focus:border-white/30 md:col-span-2"/>
          <button type="button" onClick={() => alert("Thanks! I'll be in touch.")} className="rounded-xl bg-white px-5 py-3 text-black hover:opacity-90 md:col-span-2">Send inquiry</button>
        </form>
        <div className="mt-6 text-sm text-white/70 space-y-2"><div>📞 Phone: <a href="tel:+919892223119" className="underline">+91 9892223119</a></div><div>✉️ Email: <a href="mailto:nitinnsutar22@gmail.com" className="underline">nitinnsutar22@gmail.com</a></div></div>
      </div>
    </section>

    <a href="#about" className="fixed bottom-5 right-5 z-40 rounded-full border border-white/20 bg-neutral-900/70 px-3 py-2 text-xs text-white/80 backdrop-blur hover:text-white">↑ Back to top</a>
    <footer className="border-t border-white/10 py-8 text-center text-sm text-white/60">© {new Date().getFullYear()} Nitin Sutar — Built with care.</footer>
  </div>);
}
