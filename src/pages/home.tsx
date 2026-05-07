import { useEffect, useRef, useState } from "react";
import {
  BadgeCheck,
  Headphones,
  ShieldCheck,
  Tag,
  Plane,
  ArrowRight,
  Globe2,
  Sparkles,
  TrendingUp,
  Search as SearchIcon,
  Scale,
  CreditCard,
  Lock,
  Zap,
  Check,
} from "lucide-react";
import { Header } from "@/components/header";
import { SearchPanel } from "@/components/search-panel";
import { FaqSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n";
import heroImg from "@/assets/hero.png";
import parisImg from "@/assets/paris.png";
import istanbulImg from "@/assets/istanbul.png";
import dubaiImg from "@/assets/dubai.png";
import frankfurtImg from "@/assets/frankfurt.png";

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}

const featuresMeta = [
  { icon: Tag, key: "price" },
  { icon: BadgeCheck, key: "partners" },
  { icon: Headphones, key: "support" },
  { icon: ShieldCheck, key: "secure" },
] as const;

const destinationsMeta = [
  {
    from: "Kabul",
    to: "Paris",
    fromCode: "KBL",
    toCode: "CDG",
    duration: "10h 25m",
    price: 489,
    image: parisImg,
    blurbKey: "dest.blurb.paris",
  },
  {
    from: "Kabul",
    to: "Istanbul",
    fromCode: "KBL",
    toCode: "IST",
    duration: "5h 40m",
    price: 312,
    image: istanbulImg,
    blurbKey: "dest.blurb.istanbul",
  },
  {
    from: "Kabul",
    to: "Dubai",
    fromCode: "KBL",
    toCode: "DXB",
    duration: "3h 15m",
    price: 198,
    image: dubaiImg,
    blurbKey: "dest.blurb.dubai",
  },
  {
    from: "Kabul",
    to: "Frankfurt",
    fromCode: "KBL",
    toCode: "FRA",
    duration: "9h 50m",
    price: 524,
    image: frankfurtImg,
    blurbKey: "dest.blurb.frankfurt",
  },
] as const;

const stepsMeta = [
  { icon: SearchIcon, key: "search" },
  { icon: Scale, key: "compare" },
  { icon: CreditCard, key: "book" },
] as const;

const trustBoostMeta = [
  { icon: BadgeCheck, key: "trust.item1" },
  { icon: Lock, key: "trust.item2" },
  { icon: ShieldCheck, key: "trust.item3" },
  { icon: Zap, key: "trust.item4" },
] as const;

function openFlightSearchForRoute(fromCode: string, toCode: string) {
  const today = new Date();
  const ddate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
  const rdate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);
  const from = fromCode.toLowerCase();
  const to = toCode.toLowerCase();
  const params = new URLSearchParams({
    dcity: from,
    acity: to,
    ddate,
    rdate,
    triptype: "rt",
    class: "y",
    quantity: "1",
    lowpricesource: "searchform",
    searchboxarg: "t",
    nonstoponly: "off",
    locale: "en-US",
    curr: "USD",
    Allianceid: "8119252",
    SID: "307403300",
    trip_sub1: "popular_routes",
  });
  const url = `https://www.trip.com/flights/showfarefirst?${params.toString()}`;
  // IMPORTANT: do NOT use "noreferrer" — Trip.com's affiliate program uses
  // the Referer header to attribute the click to our Allianceid/SID. Keeping
  // "noopener" preserves security without breaking attribution.
  window.open(url, "_blank", "noopener");
}

const partners = [
  "Emirates",
  "Turkish Airlines",
  "Qatar Airways",
  "Lufthansa",
  "Air France",
  "Etihad",
];

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />

      {/* HERO — theme-aware. Light mode shows a soft sky-blue palette; dark
          mode keeps the original deep-navy B.Trip-style layout. The hero
          inherits the user's theme so toggling dark/light mode is reflected
          immediately at the top of the page (no need to scroll). */}
      <section className="relative isolate min-h-screen pt-28 pb-20 px-4 overflow-hidden bg-[hsl(200,90%,96%)] dark:bg-[hsl(205,60%,10%)]">
        {/* Layer 1 — diagonal gradient base */}
        <div className="absolute inset-0 -z-40 bg-gradient-to-br from-[hsl(200,95%,93%)] via-[hsl(210,90%,97%)] to-[hsl(220,80%,90%)] dark:from-[hsl(210,65%,8%)] dark:via-[hsl(205,55%,14%)] dark:to-[hsl(220,55%,6%)]" />

        {/* Layer 2 — three soft radial color glows for depth (orange, blue, violet) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-30 pointer-events-none dark:hidden"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 60% 50% at 80% 20%, hsla(35, 95%, 55%, 0.14), transparent 60%),
              radial-gradient(ellipse 50% 45% at 15% 80%, hsla(200, 95%, 50%, 0.16), transparent 60%),
              radial-gradient(ellipse 40% 40% at 50% 50%, hsla(260, 70%, 60%, 0.06), transparent 70%)
            `,
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-30 pointer-events-none hidden dark:block"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 60% 50% at 80% 20%, hsla(35, 95%, 55%, 0.18), transparent 60%),
              radial-gradient(ellipse 50% 45% at 15% 80%, hsla(200, 95%, 50%, 0.22), transparent 60%),
              radial-gradient(ellipse 40% 40% at 50% 50%, hsla(260, 70%, 50%, 0.10), transparent 70%)
            `,
          }}
        />

        {/* Layer 3 — subtle dot grid pattern for premium texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 opacity-[0.22] pointer-events-none dark:hidden"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(15,30,55,0.38) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 opacity-[0.18] pointer-events-none hidden dark:block"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.45) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Layer 4 — faded airplane silhouette behind everything */}
        <img
          src={heroImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 w-full h-full object-cover opacity-[0.18] mix-blend-multiply dark:opacity-[0.12] dark:mix-blend-luminosity"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[hsl(200,90%,96%)]/85 via-transparent to-[hsl(200,90%,96%)]/85 dark:from-[hsl(205,60%,10%)]/90 dark:to-[hsl(205,60%,10%)]/90 pointer-events-none" />

        {/* Decorative curved shapes (top-left & bottom-right) */}
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-foreground/[0.04] to-transparent dark:from-white/[0.06] blur-2xl pointer-events-none" />
        <div className="absolute top-0 left-0 w-64 h-64 rounded-br-[100%] bg-foreground/[0.02] dark:bg-white/[0.03] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full bg-gradient-to-tl from-secondary/20 to-transparent dark:from-secondary/15 blur-3xl pointer-events-none" />

        {/* Sparkle dots — only in dark mode (white sparkles wouldn't work on light bg) */}
        <div className="hidden dark:block">
          <div className="absolute top-[18%] left-[42%] w-1 h-1 rounded-full bg-white/70 shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none" />
          <div className="absolute top-[35%] left-[8%] w-1.5 h-1.5 rounded-full bg-secondary/80 shadow-[0_0_12px_hsl(35,95%,55%)] pointer-events-none" />
          <div className="absolute top-[62%] left-[38%] w-1 h-1 rounded-full bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.7)] pointer-events-none" />
          <div className="absolute top-[12%] right-[14%] w-1 h-1 rounded-full bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.7)] pointer-events-none" />
        </div>
        {/* Sparkle dot — orange glow visible in both modes */}
        <div className="absolute top-[35%] left-[8%] w-1.5 h-1.5 rounded-full bg-secondary/90 shadow-[0_0_12px_hsl(35,95%,55%)] pointer-events-none dark:hidden" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-[5fr_6fr] gap-10 lg:gap-14 items-center min-h-[78vh]">
            {/* LEFT — big headline + subtitle + social proof */}
            <div className="text-slate-900 dark:text-white">
              <Reveal>
                {/* Small eyebrow above the big headline */}
                <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white/70 dark:bg-white/[0.08] backdrop-blur-sm border border-slate-300/60 dark:border-white/15 text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-700 dark:text-white/90 shadow-sm dark:shadow-none">
                  <Sparkles size={13} className="text-secondary" />
                  {t("hero.badge")}
                </span>
              </Reveal>
              <Reveal delay={80}>
                {/* BIG headline: "Where you meet the world." */}
                <h1 className="text-[2.5rem] sm:text-5xl lg:text-7xl xl:text-[5.5rem] font-display font-bold leading-[1.02] tracking-tight mb-6">
                  <span className="block">{t("hero.title1")}</span>
                  <span className="block bg-gradient-to-r from-secondary via-amber-500 to-secondary dark:via-amber-300 bg-clip-text text-transparent">
                    {t("hero.title2")}
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={120}>
                <p className="text-base lg:text-lg text-slate-700 dark:text-white/70 max-w-md leading-relaxed mb-10">
                  {t("hero.subtitle")}
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="flex items-center gap-4">
                  {/* Avatar group */}
                  <div className="flex -space-x-3">
                    {[
                      { initials: "JD", from: "from-rose-400", to: "to-orange-500" },
                      { initials: "AM", from: "from-emerald-400", to: "to-teal-500" },
                      { initials: "RK", from: "from-violet-400", to: "to-fuchsia-500" },
                      { initials: "SL", from: "from-sky-400", to: "to-blue-600" },
                    ].map((a) => (
                      <div
                        key={a.initials}
                        className={`w-11 h-11 rounded-full ring-2 ring-[hsl(200,90%,96%)] dark:ring-[hsl(205,60%,10%)] flex items-center justify-center text-white text-xs font-bold bg-gradient-to-br ${a.from} ${a.to} shadow`}
                      >
                        {a.initials}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 dark:text-white/80 max-w-xs leading-snug">
                    <span className="font-bold text-slate-900 dark:text-white">12,000+ </span>
                    {t("hero.b.social")}
                  </p>
                </div>
              </Reveal>
            </div>

            {/* RIGHT — compact SearchPanel on dark glass card */}
            <div id="search-panel" className="relative scroll-mt-24">
              <Reveal delay={360}>
                <SearchPanel compact />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 md:py-28 px-4 bg-gradient-to-b from-background to-[hsl(200,90%,98%)] scroll-mt-20">
        <div className="container mx-auto max-w-6xl">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
                {t("how.eyebrow")}
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
                {t("how.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("how.subtitle")}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
            {/* connecting line on desktop */}
            <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            {stepsMeta.map((step, i) => (
              <Reveal key={step.key} delay={i * 120}>
                <div className="relative h-full p-8 bg-card rounded-2xl border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="relative inline-flex">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-[hsl(200,90%,30%)] text-primary-foreground flex items-center justify-center mb-5 shadow-lg shadow-primary/30">
                      <step.icon size={32} strokeWidth={2} />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-display font-bold shadow-md">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-2">
                    {t("how.stepLabel")} {i + 1}: {t(`how.step.${step.key}.title`)}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {t(`how.step.${step.key}.desc`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={240}>
            <div className="mt-12 md:mt-14 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("search-panel");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                data-testid="button-how-it-works-cta"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-primary to-[hsl(200,90%,30%)] text-primary-foreground font-semibold text-base shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                {t("how.cta.button")}
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="why" className="py-24 md:py-32 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
                {t("why.eyebrow")}
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                {t("why.title")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("why.subtitle")}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuresMeta.map((feature, i) => (
              <Reveal key={feature.key} delay={i * 80}>
                <div className="group relative h-full p-7 bg-card rounded-2xl border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <feature.icon size={22} strokeWidth={2.2} />
                  </div>
                  <h3 className="text-lg font-display font-bold mb-2">
                    {t(`why.f.${feature.key}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`why.f.${feature.key}.desc`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CHEAP FLIGHTS WORLDWIDE */}
      <section
        id="flights"
        className="py-24 md:py-32 px-4 bg-gradient-to-br from-[hsl(200,90%,97%)] via-background to-[hsl(35,90%,97%)]"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
                  {t("cheap.eyebrow")}
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
                  {t("cheap.title")}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {t("cheap.body")}
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    t("cheap.point1"),
                    t("cheap.point2"),
                    t("cheap.point3"),
                    t("cheap.point4"),
                  ].map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-base text-foreground/85"
                    >
                      <BadgeCheck
                        size={20}
                        className="text-primary shrink-0 mt-0.5"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <Button
                  size="lg"
                  className="rounded-xl text-base font-semibold h-12 px-6"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  {t("cheap.cta")}
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 shadow-2xl relative">
                  <img
                    src={heroImg}
                    alt="Airplane window view"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe2 size={18} />
                      <span className="text-xs font-bold uppercase tracking-widest">
                        {t("cheap.liveDeal")}
                      </span>
                    </div>
                    <p className="text-2xl font-display font-bold leading-tight">
                      Kabul → Tokyo from $612
                    </p>
                    <p className="text-sm text-white/80 mt-1">
                      {t("cheap.dealMeta")}
                    </p>
                  </div>
                </div>

                {/* Floating stat card */}
                <div className="absolute -top-6 -left-6 bg-card border border-border rounded-2xl p-4 shadow-xl hidden md:flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                    <TrendingUp size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold">$148M+</p>
                    <p className="text-xs text-muted-foreground">
                      {t("cheap.savedLabel")}
                    </p>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-2xl p-4 shadow-xl hidden md:flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Plane size={20} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold">1,200+</p>
                    <p className="text-xs text-muted-foreground">
                      {t("cheap.airlinesLabel")}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Partners */}
          <Reveal>
            <div className="mt-20 pt-10 border-t border-border">
              <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
                {t("cheap.partnersTitle")}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
                {partners.map((p) => (
                  <span
                    key={p}
                    className="text-lg md:text-xl font-display font-semibold text-foreground/40 hover:text-foreground transition-colors"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section id="hotels" className="py-24 md:py-32 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
                  {t("dest.eyebrow")}
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-3 leading-tight">
                  {t("dest.title")}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t("dest.subtitle")}
                </p>
              </div>
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl font-semibold self-start md:self-auto"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                {t("dest.custom")}
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinationsMeta.map((r, i) => (
              <Reveal key={r.to} delay={i * 90}>
                <button
                  type="button"
                  onClick={() => openFlightSearchForRoute(r.fromCode, r.toCode)}
                  className="group text-left w-full h-full bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/40 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={`${t("dest.searchFlights")} ${r.from} → ${r.to}`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={r.image}
                      alt={`${r.to} cityscape`}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur text-xs font-bold text-slate-900">
                        {r.duration}
                      </span>
                    </div>
                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase mb-1 text-white/85">
                        <span>{r.fromCode}</span>
                        <Plane size={12} className="rotate-45" />
                        <span>{r.toCode}</span>
                      </div>
                      <h3 className="text-2xl md:text-[1.7rem] font-display font-bold leading-none">
                        {r.from} → {r.to}
                      </h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                      {t(r.blurbKey)}
                    </p>
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                          {t("dest.from")}
                        </p>
                        <p className="text-2xl font-display font-bold text-foreground">
                          ${r.price}
                          <span className="text-xs font-medium text-muted-foreground ml-1">
                            {t("dest.perPerson")}
                          </span>
                        </p>
                      </div>
                    </div>
                    <span className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground rounded-xl py-2.5 text-sm font-bold group-hover:bg-[hsl(200,90%,35%)] transition-colors">
                      <SearchIcon size={15} />
                      {t("dest.searchFlights")}
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST BOOST */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-background to-[hsl(200,90%,97%)]">
        <div className="container mx-auto max-w-5xl">
          <Reveal>
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
                {t("trust.eyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
                {t("trust.title")}
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trustBoostMeta.map((item, i) => (
              <Reveal key={item.key} delay={i * 70}>
                <div className="h-full flex items-start gap-3 p-5 bg-card rounded-2xl border border-border hover:border-primary/40 hover:shadow-md transition-all">
                  <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Check size={20} strokeWidth={3} />
                  </span>
                  <div className="flex-1 pt-0.5">
                    <p className="text-sm md:text-[15px] font-semibold text-foreground leading-snug">
                      {t(item.key)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="px-4 pb-24">
        <div className="container mx-auto max-w-6xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[hsl(200,90%,30%)] via-[hsl(200,90%,40%)] to-[hsl(220,70%,25%)] p-10 md:p-16 text-white">
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-secondary/30 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-primary/40 blur-3xl" />
              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-4">
                    {t("cta.title")}
                  </h2>
                  <p className="text-white/85 text-lg max-w-md">
                    {t("cta.subtitle")}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 md:justify-end">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 rounded-xl text-base font-bold h-14 px-7 shadow-xl"
                    onClick={() =>
                      window.open("https://wa.me/33759134247", "_blank")
                    }
                  >
                    {t("cta.whatsapp")}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white/40 text-white hover:bg-white/10 hover:text-white rounded-xl text-base font-bold h-14 px-7"
                  >
                    {t("cta.browse")}
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ + Premium Disclaimer */}
      <Reveal>
        <FaqSection />
      </Reveal>

      <Footer />
      <CookieConsent />
    </div>
  );
}
