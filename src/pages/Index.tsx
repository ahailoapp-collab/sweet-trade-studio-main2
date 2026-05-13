import { CheckCircle2, Droplets, Shield, Sparkles, ArrowRight, MessageCircle, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";
import bleach5l from "@/assets/bleach-5l.webp";
import detergent5l from "@/assets/detergent-5l.webp";
import bleach750ml from "@/assets/bleach-750ml.webp";
import detergent750ml from "@/assets/detergent-750ml.webp";
import ceoImage from "@/assets/ceo-gamu.webp";
import zimFlag from "@/assets/zim-flag.png";
import logo from "@/assets/logo.webp";

const WA = "https://wa.me/263784576365?text=Hello%20Rabah%20Sparkle,%20I%20would%20like%20to%20order";

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} className={`transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const products = [
  { name: "Dishwashing Liquid", desc: "Cuts grease instantly, gentle on hands.", image: detergent5l, mini: detergent750ml },
  { name: "Thick Bleach", desc: "Heavy-duty disinfection for any surface.", image: bleach5l, mini: bleach750ml },
];

const heroSlides = [
  { video: "/videos/bleach.mp4", poster: bleach5l, image: bleach5l, name: "Thick Bleach 5L", label: "Heavy Duty", icon: Shield },
  { video: "/videos/detergent.mp4", poster: detergent5l, image: detergent5l, name: "Dishwashing 5L", label: "Sparkling Clean", icon: Sparkles },
];

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();
  const [videosReady, setVideosReady] = useState(false);
  const [allowHeroVideo, setAllowHeroVideo] = useState(false);
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
  const [layerSrc, setLayerSrc] = useState<[string | null, string | null]>([null, null]);
  const videoRefs = [useRef<HTMLVideoElement | null>(null), useRef<HTMLVideoElement | null>(null)] as const;

  useEffect(() => {
    if (isMobile) return;
    const id = setInterval(() => setCurrentSlide((s) => (s + 1) % heroSlides.length), 5500);
    return () => clearInterval(id);
  }, [isMobile]);

  // Defer video mount until after first paint; on mobile wait for idle to save data/CPU.
  useEffect(() => {
    if (videosReady) return;
    // JSDOM doesn't implement media playback well; keep tests deterministic and fast.
    if (import.meta.env.MODE === "test") {
      setAllowHeroVideo(false);
      return;
    }

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;
    // Connection-speed gate: skip/delay video on Data Saver or slow networks.
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const conn = nav.connection;
    const saveData = conn?.saveData === true;
    const effectiveType = conn?.effectiveType;
    const slow = effectiveType === "slow-2g" || effectiveType === "2g";
    const moderate = effectiveType === "3g";

    // Default: enable video on desktop. On mobile, enable only for non-slow connections (and not on reduced motion / data saver).
    const canUseVideo =
      !reducedMotion &&
      !saveData &&
      !slow &&
      (!isMobile || effectiveType === undefined || effectiveType === "4g");

    setAllowHeroVideo(canUseVideo);
    if (!canUseVideo) return;

    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
    const trigger = () => setVideosReady(true);

    // On mobile, be gentler: wait for idle or a longer timeout.
    if (isMobile) {
      const timeout = moderate ? 7000 : 3500;
      const id = w.requestIdleCallback
        ? w.requestIdleCallback(trigger, { timeout })
        : window.setTimeout(trigger, moderate ? 5500 : 2500);
      return () => {
        if (w.requestIdleCallback) (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id as number);
        else clearTimeout(id as number);
      };
    }

    const id = window.setTimeout(trigger, moderate ? 1500 : 200);
    return () => clearTimeout(id);
  }, [isMobile, videosReady]);

  const active = heroSlides[currentSlide];
  const nextIndex = (currentSlide + 1) % heroSlides.length;
  const next = heroSlides[nextIndex];

  const canUseVideo = videosReady && allowHeroVideo;

  // Smooth playback strategy:
  // - Keep two <video> layers and crossfade them.
  // - Only "arm" the next video's src shortly before switching to reduce concurrent downloading.
  useEffect(() => {
    if (!canUseVideo) {
      setLayerSrc([null, null]);
      return;
    }

    const currentLayer: 0 | 1 = activeLayer;
    const nextLayer: 0 | 1 = (activeLayer === 0 ? 1 : 0);

    // Ensure current layer has the active video src.
    setLayerSrc((prev) => {
      const nextState: [string | null, string | null] = [...prev] as [string | null, string | null];
      nextState[currentLayer] = active.video;
      return nextState;
    });

    // Try to play current layer (may be blocked; muted+playsInline usually works).
    queueMicrotask(() => {
      const el = videoRefs[currentLayer].current;
      if (!el) return;
      // If src changed, load it.
      if (el.src && !el.paused) return;
      try {
        el.load();
        void el.play();
      } catch {
        // Ignore autoplay errors; poster will still render.
      }
    });

    // Prewarm next video shortly before slide advances.
    const prewarmMs = isMobile ? 3800 : 3200;
    const prewarmId = window.setTimeout(() => {
      setLayerSrc((prev) => {
        const nextState: [string | null, string | null] = [...prev] as [string | null, string | null];
        nextState[nextLayer] = next.video;
        return nextState;
      });
      const el = videoRefs[nextLayer].current;
      if (!el) return;
      try {
        el.load();
      } catch {
        // ignore
      }
    }, prewarmMs);

    return () => clearTimeout(prewarmId);
  }, [active.video, activeLayer, canUseVideo, isMobile, next.video, videoRefs]);

  // When the slide index changes, crossfade to the other layer.
  useEffect(() => {
    if (!canUseVideo) return;
    setActiveLayer((l) => (l === 0 ? 1 : 0));
  }, [canUseVideo, currentSlide]);

  // Keep the newly active layer playing once it becomes active.
  useEffect(() => {
    if (!canUseVideo) return;
    const el = videoRefs[activeLayer].current;
    if (!el) return;
    try {
      void el.play();
    } catch {
      // ignore
    }
  }, [activeLayer, canUseVideo, videoRefs]);

  return (
    <main className="overflow-x-hidden">
      {/* HERO ─ premium minimal with Thick Bleach */}
      <section className="relative min-h-[100svh] flex items-center pt-24 pb-10 md:pt-28 md:pb-24 overflow-hidden">
        {/* Cycling video background */}
        <div className="absolute inset-0 pointer-events-none">
          {canUseVideo && (
            <>
              <video
                ref={videoRefs[0]}
                src={layerSrc[0] ?? undefined}
                autoPlay
                muted
                loop
                playsInline
                preload={isMobile ? "metadata" : "auto"}
                disablePictureInPicture
                disableRemotePlayback
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 will-change-[opacity] ${activeLayer === 0 ? "opacity-100" : "opacity-0"}`}
              />
              <video
                ref={videoRefs[1]}
                src={layerSrc[1] ?? undefined}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                disablePictureInPicture
                disableRemotePlayback
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 will-change-[opacity] ${activeLayer === 1 ? "opacity-100" : "opacity-0"}`}
              />
            </>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
        </div>
        {/* Aurora background on top of video */}
        <div className="absolute inset-0 gradient-aurora opacity-60 pointer-events-none" />
        <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-aurora pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl animate-aurora pointer-events-none" style={{ animationDelay: "3s" }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsl(var(--primary)/0.15),transparent_60%)] pointer-events-none" />

        {/* Faded background logo */}
        <img
          src={logo}
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[600px] opacity-[0.06] pointer-events-none select-none"
        />

        <div className="container relative z-10 flex flex-col justify-center w-full">
          <div className="grid gap-6 md:gap-12 md:grid-cols-2 items-center">
            {/* Copy */}
            <div className="text-center md:text-left">
              <Reveal>
                <div className="inline-flex items-center gap-3 rounded-full glass border border-border/60 px-5 py-2.5 mb-5 md:mb-7 shadow-elegant tile-shadow">
                  <img src={zimFlag} alt="Zimbabwe" width={28} height={28} className="h-6 w-6 sm:h-7 sm:w-7 object-cover rounded-sm" />
                  <span className="text-sm sm:text-base font-bold tracking-wide text-foreground text-shadow-soft">Proudly Made in Zimbabwe</span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="font-heading text-[2rem] leading-[1.05] sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground text-shadow-strong">
                  Power that Cleans,<br />
                  <span>Quality that Lasts.</span>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="mt-3 md:mt-6 max-w-md mx-auto md:mx-0 text-sm sm:text-base md:text-lg text-foreground/85 leading-relaxed text-shadow-soft">
                  Premium cleaning products engineered for homes, businesses, and institutions across Zimbabwe.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <div className="mt-4 md:mt-8 flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center md:justify-start">
                  <a href={WA} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 md:py-4 text-sm font-bold text-whatsapp-foreground shadow-lg shadow-whatsapp/30 hover:shadow-whatsapp/50 hover:scale-[1.03] transition-all duration-500">
                    <MessageCircle className="h-5 w-5" /> Order on WhatsApp
                  </a>
                  <Link to="/products" className="group inline-flex items-center justify-center gap-2 rounded-full glass border border-border/60 px-6 py-3 md:py-4 text-sm font-bold text-foreground hover:border-primary/50 transition-all duration-500">
                    View Products
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={400}>
                <div className="mt-4 md:mt-8 flex items-center justify-center md:justify-start gap-3 sm:gap-5 text-[10px] sm:text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-secondary text-secondary" />)}
                    </div>
                    <span className="font-semibold text-foreground/80">Trusted Brand</span>
                  </div>
                  <span className="hidden sm:block w-px h-4 bg-border" />
                  <span className="font-semibold text-foreground/80 hidden sm:block">8 SKUs Available</span>
                </div>
              </Reveal>
            </div>

            {/* Hero product visual ─ Thick Bleach */}
            <Reveal delay={200}>
              <div className="relative mx-auto w-full max-w-[200px] sm:max-w-sm md:max-w-md aspect-square">
                {/* Glow rings */}
                <div className="absolute inset-0 rounded-full gradient-primary opacity-20 blur-3xl animate-pulse-glow" />
                <div className="absolute inset-8 rounded-full gradient-secondary opacity-20 blur-2xl" />

                {/* Rotating ring decoration */}
                <div className="absolute inset-0 rounded-full border border-primary/20" />
                <div className="absolute inset-6 rounded-full border border-secondary/20" />

                {/* Product image */}
                <div className="relative h-full w-full flex items-center justify-center">
                  <img
                    key={currentSlide}
                    src={active.image}
                    alt={`Rabah Sparkle ${active.name}`}
                    loading="eager"
                    decoding="async"
                    width={900}
                    height={900}
                    {...({ fetchpriority: "high" } as Record<string, string>)}
                    className="relative z-10 h-[85%] w-[85%] object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.5)] animate-float-slow"
                  />
                </div>

                {/* Floating spec card */}
                <div className="absolute bottom-2 left-0 sm:left-0 z-20 glass border border-border/60 rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-elegant tile-shadow animate-fade-up hidden sm:flex">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full gradient-primary flex items-center justify-center glow-primary">
                      <active.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{active.label}</p>
                      <p className="text-xs sm:text-sm font-bold text-foreground">{active.name}</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-2 right-0 sm:right-0 z-20 glass border border-border/60 rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-elegant tile-shadow animate-fade-up hidden sm:flex" style={{ animationDelay: "0.3s" }}>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full gradient-secondary flex items-center justify-center glow-secondary">
                      <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">From</p>
                      <p className="text-xs sm:text-sm font-bold text-foreground">$1.00</p>
                    </div>
                  </div>
                </div>

                {/* Slide indicators */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                  {heroSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      aria-label={`Slide ${i + 1}`}
                      className="relative grid place-items-center min-h-6 min-w-6 -m-1 p-1 cursor-pointer"
                    >
                      <span
                        className={`block h-1.5 rounded-full transition-all duration-500 ${i === currentSlide ? "w-8 bg-primary" : "w-1.5 bg-foreground/30"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PRODUCTS preview */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 gradient-aurora opacity-30 pointer-events-none" />
        <div className="container relative">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-[0.3em] gradient-text-primary">Our Products</span>
              <h2 className="mt-3 font-heading text-3xl md:text-5xl font-black text-foreground">Engineered for Performance</h2>
              <p className="mt-4 text-muted-foreground">Two premium product lines, eight sizes, infinite use cases.</p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 md:gap-8 md:grid-cols-2">
            {products.map((p, i) => (
              <Reveal key={p.name} delay={i * 150}>
                <Link to="/products" className="group relative block overflow-hidden rounded-3xl glass border border-border/50 shadow-card hover:shadow-elegant transition-all duration-700 hover:-translate-y-2">
                  <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-muted to-card">
                    <div className="absolute inset-0 gradient-aurora opacity-50" />
                    <img
                      src={p.image}
                      alt={p.name}
                      className="absolute inset-0 h-full w-full object-contain p-8 transition-all duration-700 ease-out group-hover:scale-105 drop-shadow-2xl"
                      loading="lazy"
                    />
                    <img
                      src={p.mini}
                      alt=""
                      className="absolute bottom-4 right-4 h-20 w-20 object-contain opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 drop-shadow-xl"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex items-center justify-between">
                    <div>
                      <h3 className="font-heading text-xl font-bold text-foreground">{p.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-primary shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES strip */}
      <section className="relative py-20 md:py-28 bg-card/50">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Sparkles, title: "Premium Quality", desc: "Tough on dirt, gentle on surfaces." },
              { icon: Droplets, title: "Multiple Sizes", desc: "From 750ml to 20L bulk." },
              { icon: Shield, title: "Trusted Brand", desc: "Used by businesses across Zimbabwe." },
              { icon: CheckCircle2, title: "Made Local", desc: "Proudly Zimbabwean manufacturing." },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="group h-full rounded-2xl glass border border-border/60 p-6 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 shadow-card tile-shadow hover:shadow-elegant">
                  <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-500">
                    <f.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="mt-4 font-heading text-base font-bold text-foreground text-shadow-soft">{f.title}</h3>
                  <p className="mt-1 text-sm text-foreground/75 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CEO / FOUNDER section ─ editorial */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-aurora opacity-40 pointer-events-none" />
        <div className="container relative">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <Reveal>
              <div className="relative mx-auto w-full max-w-sm md:max-w-md">
                <div className="absolute -inset-4 gradient-primary rounded-[2rem] opacity-20 blur-2xl" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border/50 shadow-elegant">
                  <div className="absolute inset-0 gradient-aurora" />
                  <img
                    src={ceoImage}
                    alt="Mrs Gamu Sakupwanya - CEO of Rabah Sparkle Detergents"
                    className="relative h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                {/* Floating signature card */}
                <div className="absolute -bottom-5 -right-2 sm:-right-5 glass border border-border/50 rounded-2xl px-5 py-3 shadow-elegant max-w-[80%]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Founder & CEO</p>
                  <p className="text-base font-heading font-bold text-foreground mt-0.5">Mrs Gamu Sakupwanya</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] gradient-text-secondary">Meet the Founder</span>
                <h2 className="mt-3 font-heading text-3xl md:text-5xl font-black text-foreground leading-[1.1]">
                  Built on trust.<br />Driven by quality.
                </h2>
                <p className="mt-6 text-muted-foreground leading-relaxed text-base md:text-lg">
                  "We started Rabah Sparkle with a simple promise — to create cleaning products that families and businesses can rely on, without compromise. Every bottle reflects our commitment to quality, affordability, and the pride of being made in Zimbabwe."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <div className="flex items-center gap-2">
                    <img src={zimFlag} alt="Zimbabwe" width={24} height={24} className="h-6 w-6 object-cover rounded-sm" />
                    <span className="text-xs font-semibold text-foreground/80">Harare, Zimbabwe</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary-glow)/0.4),transparent_60%)]" />
        <img src={logo} alt="" width={288} height={288} loading="lazy" decoding="async" className="absolute -right-10 top-1/2 -translate-y-1/2 h-72 w-auto opacity-10 pointer-events-none" />

        <div className="container relative z-10 text-center max-w-2xl mx-auto">
          <Reveal>
            <h2 className="font-heading text-3xl md:text-5xl font-black text-primary-foreground leading-tight">
              Ready to experience<br />premium clean?
            </h2>
            <p className="mt-4 text-primary-foreground/85">Order directly via WhatsApp. Quick replies, fast delivery.</p>
            <div className="mt-8">
              <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-8 py-4 text-base font-bold text-foreground shadow-2xl hover:scale-105 transition-all duration-500">
                <MessageCircle className="h-5 w-5 text-whatsapp" /> Chat with us on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
};

export default Index;
