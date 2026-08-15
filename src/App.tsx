import React, { useEffect, useState, createContext, useContext } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, ExternalLink, Globe, Smartphone, Database, Code2, Terminal, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const queryClient = new QueryClient();

type Lang = "fr" | "ar" | "en";

const translations = {
  fr: {
    dir: "ltr",
    nav: { about: "À propos", work: "Projets", contact: "Contact", hire: "Travaillons ensemble" },
    hero: {
      location: "Algérie",
      available: "Disponible pour de nouveaux projets",
      tagline: "Développeur Full Stack qui construit des produits web",
      taglineHighlight: "précis et fiables",
      taglineSuffix: "pour de vraies entreprises.",
      cta: "Voir les projets",
      ctaSecondary: "Me contacter",
    },
    about: {
      label: "À propos",
      p1Start: "Je suis développeur web spécialisé dans la création d'applications",
      p1Highlight: "hautement soignées et de qualité commerciale",
      p1End: ". Basé en Algérie, je collabore avec des entreprises locales et internationales pour transformer des besoins opérationnels complexes en expériences numériques fluides.",
      p2: "Mon approche est fondée sur la précision. Je crois qu'un bon design est évident, mais qu'une grande ingénierie est invisible. Chaque interface que je construis repose sur une architecture robuste et évolutive.",
    },
    projects: {
      label: "Travaux sélectionnés",
      title: "Projets phares",
      viewLive: "Voir le site",
      live: "En production",
      dev: "En développement",
    },
    skills: {
      label: "Compétences",
      title: "Stack technique",
      groups: ["Frontend", "Backend", "Outils"],
    },
    contact: {
      headline: "Construisons quelque chose d'exceptionnel.",
      sub: "Disponible pour de nouveaux projets et collaborations. Si vous souhaitez rehausser votre présence digitale, je serais ravi d'échanger.",
      cta: "Envoyer un message",
      or: "ou contactez-moi directement sur",
    },
    footer: "Construit avec précision en Algérie.",
  },
  ar: {
    dir: "rtl",
    nav: { about: "عني", work: "المشاريع", contact: "التواصل", hire: "لنعمل معاً" },
    hero: {
      location: "الجزائر",
      available: "متاح لمشاريع جديدة",
      tagline: "مطوّر Full Stack يبني منتجات ويب",
      taglineHighlight: "دقيقة وموثوقة",
      taglineSuffix: "للشركات الحقيقية.",
      cta: "استعرض المشاريع",
      ctaSecondary: "تواصل معي",
    },
    about: {
      label: "عني",
      p1Start: "أنا مطوّر ويب متخصص في بناء تطبيقات",
      p1Highlight: "متقنة على المستوى التجاري",
      p1End: ". أعمل من الجزائر مع شركات محلية ودولية لتحويل الاحتياجات التشغيلية المعقدة إلى تجارب رقمية سلسة.",
      p2: "أسلوبي مبني على الدقة. أؤمن بأن التصميم الجيد واضح، لكن الهندسة الرائعة تبقى غير مرئية. كل واجهة أبنيها مدعومة بهيكل برمجي متين وقابل للتوسع.",
    },
    projects: {
      label: "أعمال مختارة",
      title: "المشاريع البارزة",
      viewLive: "زيارة الموقع",
      live: "قيد التشغيل",
      dev: "قيد التطوير",
    },
    skills: {
      label: "الإمكانيات",
      title: "التقنيات المستخدمة",
      groups: ["الواجهة الأمامية", "الخادم", "الأدوات"],
    },
    contact: {
      headline: "لنبنِ شيئاً استثنائياً.",
      sub: "متاح لمشاريع ومقترحات جديدة. إن كنت تبحث عن الارتقاء بحضورك الرقمي، يسعدني التواصل معك.",
      cta: "أرسل رسالة",
      or: "أو تواصل مباشرة على",
    },
    footer: "صُنع بدقة في الجزائر.",
  },
  en: {
    dir: "ltr",
    nav: { about: "About", work: "Work", contact: "Contact", hire: "Hire Me" },
    hero: {
      location: "Algeria",
      available: "Available for new projects",
      tagline: "Full Stack Developer building",
      taglineHighlight: "sharp, reliable",
      taglineSuffix: "web products for real businesses.",
      cta: "View Work",
      ctaSecondary: "Get in Touch",
    },
    about: {
      label: "About Me",
      p1Start: "I am a web developer focused on crafting",
      p1Highlight: "highly polished, commercial-grade",
      p1End: " applications. Based in Algeria, I partner with local and international businesses to translate complex operational needs into seamless digital experiences.",
      p2: "My approach is rooted in precision. I believe that good design is obvious, but great engineering is invisible. Every interface I build is backed by a robust, scalable architecture.",
    },
    projects: {
      label: "Selected Work",
      title: "Featured Projects",
      viewLive: "View Live Site",
      live: "Production Live",
      dev: "In Development",
    },
    skills: {
      label: "Capabilities",
      title: "Tech Stack",
      groups: ["Frontend", "Backend", "Tools"],
    },
    contact: {
      headline: "Let's build something exceptional.",
      sub: "Currently available for new projects and collaborations. If you're looking to elevate your digital presence, I'd love to hear from you.",
      cta: "Send a Message",
      or: "or reach me directly on",
    },
    footer: "Built with precision in Algeria.",
  },
};

const projects = [
  {
    url: "https://boutique-hijab-api-server.vercel.app/",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    year: "2026",
    titles: { fr: "Boutique Hijab", ar: "بوتيك حجاب", en: "Boutique Hijab" },
    descs: {
      fr: "Boutique en ligne mobile-first pour la vente de voiles et accessoires modest wear, avec commande via WhatsApp.",
      ar: "متجر إلكتروني متوافق مع الجوال لبيع الحجاب وإكسسوارات اللباس المحتشم، مع الطلب عبر واتساب.",
      en: "A mobile-first e-commerce landing page for hijabs and modest-wear accessories, with ordering via WhatsApp.",
    },
  },
  {
    url: "https://el-bahdja-restaurant.vercel.app/",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    year: "2026",
    titles: { fr: "Restaurant El Bahdja", ar: "مطعم البهجة", en: "El Bahdja Restaurant" },
    descs: {
      fr: "Site de commande en ligne pour un restaurant algérien moderne, avec menu, livraison et paiement à la livraison.",
      ar: "موقع طلب عبر الإنترنت لمطعم جزائري عصري، مع قائمة طعام وتوصيل ودفع عند الاستلام.",
      en: "An online ordering site for a modern Algerian restaurant, with menu, delivery, and cash-on-delivery.",
    },
  },
  {
    url: "https://darkom-immobilier.vercel.app/",
    tags: ["Next.js", "Tailwind CSS", "PostgreSQL"],
    year: "2026",
    titles: { fr: "Location Immobilier Algérie", ar: "تأجير العقارات في الجزائر", en: "Real Estate Rent Algeria" },
    descs: {
      fr: "Plateforme complète de location de l'immobilier simplifiant les réservations.",
      ar: "منصة متكاملة لتأجير العقارات تُبسّط عمليات الحجز  .",
      en: "A comprehensive real estate rental and location service platform streamlining bookings.",
    },
  },
  {
    url: "https://enteg-voyage.vercel.app/",
    tags: ["TypeScript", "Node.js", "Redis"],
    year: "2026",
    titles: { fr: "Enteg Voyage", ar: "ُEnteg Voyage", en: "Enteg Voyage" },
    descs: {
      fr: "Application web spécialisée conçue pour résoudre des goulots d'étranglement opérationnels avec une interface très soignée.",
      ar: "تطبيق ويب متخصص مصمم لحل العقبات التشغيلية مع واجهة مستخدم عالية الجودة.",
      en: "A specialized web application engineered to solve specific operational bottlenecks with a highly polished user interface.",
    },
  },
  {
    url: "https://bijoux-fantaisie.vercel.app/",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    year: "2026",
    titles: { fr: "Bijoux Fantaisie", ar: "مجوهرات فنتازي", en: "Bijoux Fantaisie" },
    descs: {
      fr: "Landing page élégante pour une boutique de bijoux fantaisie, mettant en valeur le catalogue et la marque.",
      ar: "صفحة هبوط أنيقة لمتجر مجوهرات، تُبرز الكتالوج والعلامة التجارية.",
      en: "An elegant landing page for a costume jewelry store, showcasing the catalog and the brand.",
    },
  },
  {
    url: "https://tezribt.vercel.app/",
    tags: ["Next.js", "Tailwind CSS"],
    year: "2026",
    titles: { fr: "Tezribt", ar: "تزريبث", en: "Tezribt" },
    descs: {
      fr: "Application web moderne offrant une expérience utilisateur fluide et soignée.",
      ar: "تطبيق ويب حديث يوفّر تجربة مستخدم سلسة وعالية الجودة.",
      en: "A modern web application delivering a smooth and polished user experience.",
    },
  },
  {
    url: "https://microcenter-clone.vercel.app/",
    tags: ["React", "Tailwind CSS", "Vite"],
    year: "2026",
    dev: true,
    titles: { fr: "MicroCenter Clone", ar: "MicroCenter Clone", en: "MicroCenter Clone" },
    descs: {
      fr: "Storefront d'électronique à grande échelle avec catalogue de produits, catégories et panier.",
      ar: "متجر إلكترونيات واسع النطاق مع كتالوج منتجات وفئات وسلة تسوق.",
      en: "A large-scale electronics storefront with a product catalog, categories, and shopping cart.",
    },
  },
  {
    url: "https://locationvans-algeria.vercel.app/",
    tags: ["Next.js", "Tailwind CSS", "PostgreSQL"],
    year: "2026",
    titles: { fr: "Location Vans Algérie", ar: "تأجير الشاحنات في الجزائر", en: "Location Vans Algeria" },
    descs: {
      fr: "Plateforme complète de location de vans simplifiant les réservations et la gestion de flotte pour la logistique locale.",
      ar: "منصة متكاملة لتأجير الشاحنات تُبسّط عمليات الحجز وإدارة الأسطول في الجزائر.",
      en: "A comprehensive van rental and location service platform streamlining bookings and fleet management for local logistics.",
    },
  },
];

const skillGroups = [
  { items: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Framer Motion"] },
  { items: ["Node.js", "Express", "PostgreSQL", "REST APIs", "Prisma"] },
  { items: ["Git", "Docker", "Vercel", "Figma", "Linux"] },
];

const flags: Record<Lang, { emoji: string; label: string }> = {
  fr: { emoji: "🇫🇷", label: "Français" },
  ar: { emoji: "🇩🇿", label: "العربية" },
  en: { emoji: "🇬🇧", label: "English" },
};

const GITHUB = "https://github.com/yac2005";
const LINKEDIN = "https://www.linkedin.com/in/yacine-abanou-15315a241/";
const EMAIL = "yacineabanou88@gmail.com";
const NAME = "YADEV.DZ";

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "fr",
  setLang: () => {},
});

function useLang() {
  return useContext(LangContext);
}

function LangSwitcher() {
  const { lang, setLang } = useLang();
  const order: Lang[] = ["fr", "ar", "en"];
  return (
    <div className="flex items-center gap-1">
      {order.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          title={flags[l].label}
          className={`text-xl leading-none rounded-md px-1.5 py-1 transition-all duration-200 ${
            lang === l
              ? "ring-2 ring-primary scale-110 bg-primary/10"
              : "opacity-50 hover:opacity-100 hover:scale-105"
          }`}
          aria-label={flags[l].label}
        >
          {flags[l].emoji}
        </button>
      ))}
    </div>
  );
}

function Home() {
  const { lang } = useLang();
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-background/80 backdrop-blur-md border-b border-border/40">
        <span className="font-display font-bold text-xl tracking-tighter">YA.</span>
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden sm:flex gap-5 text-sm font-medium text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition-colors">{t.nav.about}</a>
            <a href="#projects" className="hover:text-foreground transition-colors">{t.nav.work}</a>
          </div>
          <LangSwitcher />
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 h-9 px-4 text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t.nav.hire}
          </a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-28 pb-24">
        {/* Hero Section */}
        <section className="min-h-[88vh] flex flex-col justify-center relative">
          <motion.div
            key={lang}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <span className="inline-flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {t.hero.available}
              </span>
            </motion.div>

            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-primary/40 p-1 flex-shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden bg-muted">
                  <img
                    src="/avatar.png"
                    alt={NAME}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=Yacine+Abanou&background=random`;
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{t.hero.location}</span>
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
                  {NAME}
                </h1>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground font-display font-medium leading-tight max-w-3xl">
              {t.hero.tagline}{" "}
              <span className="text-foreground">{t.hero.taglineHighlight}</span>{" "}
              {t.hero.taglineSuffix}
            </h2>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center justify-center h-13 px-8 py-3.5 text-base font-semibold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 gap-2 shadow-xl shadow-primary/30"
              >
                {t.hero.cta} <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center justify-center h-13 px-8 py-3.5 text-base font-semibold rounded-full border-2 border-foreground/20 text-foreground hover:border-primary hover:text-primary transition-all hover:scale-105 gap-2"
              >
                <Mail className="w-4 h-4" /> {t.hero.ctaSecondary}
              </a>
              <a
                href="https://wa.me/213540263850"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center h-13 px-8 py-3.5 text-base font-semibold rounded-full bg-[#25D366] text-white hover:bg-[#1ebe5b] transition-all hover:scale-105 gap-2 shadow-xl shadow-[#25D366]/30"
              >
                <FaWhatsapp className="w-4 h-4" /> WhatsApp
              </a>
              <div className="flex gap-1 ms-2">
                <a href={GITHUB} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-2.5 rounded-full hover:bg-muted">
                  <Github className="w-5 h-5" />
                </a>
                <a href={LINKEDIN} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-2.5 rounded-full hover:bg-muted">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 border-t border-border/50">
          <div className="mb-16">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-2">{t.projects.label}</h3>
            <h2 className="text-3xl sm:text-4xl font-bold">{t.projects.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.url}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-border/50 bg-muted/30 transition-colors duration-500 hover:border-primary/40"
              >
                <div className="relative h-44 sm:h-52 flex-shrink-0 overflow-hidden group/preview">
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <iframe
                      src={project.url}
                      title={project.titles[lang]}
                      loading="lazy"
                      scrolling="no"
                      className="w-[200%] h-[200%] border-0 pointer-events-none group-hover/preview:pointer-events-auto origin-top-left scale-[0.5] transition-all duration-500 brightness-[0.85] group-hover:brightness-100"
                      style={{ clipPath: 'inset(0 0 0 0)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-background/20 via-transparent to-background/40 pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
                  </div>
                  <div className="absolute bottom-3 right-3 z-20 pointer-events-none">
                    <div className="bg-background/90 backdrop-blur-md border border-border text-xs font-mono px-3 py-1.5 rounded-lg flex items-center gap-2 text-muted-foreground shadow-2xl">
                      <span className={`w-2 h-2 rounded-full ${project.dev ? "bg-amber-400 animate-pulse" : "bg-green-500 animate-pulse"}`} />
                      {project.dev ? t.projects.dev : t.projects.live}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col flex-grow gap-4 p-6">
                  <div className="space-y-2">
                    <span className="text-primary font-mono text-sm">{project.year}</span>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {project.titles[lang]}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                    {project.descs[lang]}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <li key={tag} className="text-xs font-mono px-2.5 py-1 bg-secondary text-secondary-foreground rounded-full">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-1">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 h-10 px-5 font-semibold text-sm rounded-full bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105"
                    >
                      {t.projects.viewLive} <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About Section - commented out
        <section id="about" className="py-24 border-t border-border/50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12"
          >
            <div className="md:col-span-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">{t.about.label}</h3>
            </div>
            <div className="md:col-span-8 text-xl sm:text-2xl leading-relaxed text-muted-foreground space-y-6">
              <p>
                {t.about.p1Start}{" "}
                <span className="text-foreground font-medium">{t.about.p1Highlight}</span>
                {t.about.p1End}
              </p>
              <p>{t.about.p2}</p>
            </div>
          </motion.div>
        </section>
        */}

        {/* Skills Section */}
        <section className="py-24 border-t border-border/50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12"
          >
            <div className="md:col-span-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">{t.skills.label}</h3>
              <h2 className="text-3xl font-bold">{t.skills.title}</h2>
            </div>
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {skillGroups.map((group, i) => (
                <div key={i} className="space-y-6">
                  <div className="flex items-center gap-3 text-primary font-medium">
                    {i === 0 && <Code2 className="w-5 h-5" />}
                    {i === 1 && <Database className="w-5 h-5" />}
                    {i === 2 && <Terminal className="w-5 h-5" />}
                    <h4 className="text-lg">{t.skills.groups[i]}</h4>
                  </div>
                  <ul className="space-y-3">
                    {group.items.map(item => (
                      <li key={item} className="text-muted-foreground hover:text-foreground transition-colors">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 border-t border-border/50">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden bg-foreground text-background px-8 sm:px-16 py-16 sm:py-20 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <span className="inline-flex items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-full bg-background/15 text-background/80 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {t.hero.available}
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                {t.contact.headline}
              </h2>
              <p className="text-lg text-background/70 max-w-lg mx-auto">
                {t.contact.sub}
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center justify-center h-14 px-10 text-lg font-bold rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105 gap-3 shadow-2xl shadow-primary/40"
                >
                  <Mail className="w-5 h-5" /> {t.contact.cta}
                </a>
                <a
                  href="https://wa.me/213540263850"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center h-14 px-10 text-lg font-bold rounded-full bg-[#25D366] text-white hover:bg-[#1ebe5b] transition-all hover:scale-105 gap-3 shadow-2xl shadow-[#25D366]/40"
                >
                  <FaWhatsapp className="w-5 h-5" /> WhatsApp
                </a>
                <div className="flex items-center gap-3 text-background/60 text-sm">
                  <a href={LINKEDIN} target="_blank" rel="noreferrer" className="hover:text-background transition-colors flex items-center gap-1.5 font-medium">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                  <span>·</span>
                  <a href={GITHUB} target="_blank" rel="noreferrer" className="hover:text-background transition-colors flex items-center gap-1.5 font-medium">
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                </div>
              </div>
              <p className="text-background/50 text-sm pt-2">
                {EMAIL}
              </p>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50">
        <p>© {new Date().getFullYear()} {NAME}. {t.footer}</p>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [lang, setLang] = useState<Lang>("fr");
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </LangContext.Provider>
  );
}

export default App;
