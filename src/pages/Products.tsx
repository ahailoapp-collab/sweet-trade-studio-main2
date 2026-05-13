import { MessageCircle, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import detergent750ml from "@/assets/detergent-750ml.webp";
import detergent5l from "@/assets/detergent-5l.webp";
import detergent20l from "@/assets/detergent-20l.webp";
import bleach750ml from "@/assets/bleach-750ml.webp";
import bleach5l from "@/assets/bleach-5l.webp";
import bleach20l from "@/assets/bleach-20l.webp";
import detergentSmall from "@/assets/detergent-small.jpeg";
import bleachSmall from "@/assets/bleach-small.jpeg";
import zimFlag from "@/assets/zim-flag.png";

const WA_BASE = "https://wa.me/263784576365?text=";

interface Product {
  name: string;
  size: string;
  price: string;
  benefit: string;
  image: string;
  wa: string;
}

const dishwashing: Product[] = [
  { name: "Dishwashing Liquid", size: "750ml", price: "$1", benefit: "Everyday household sparkle.", image: detergent750ml, wa: WA_BASE + encodeURIComponent("Hi, I'd like to order Dishwashing Liquid 750ml") },
  { name: "Dishwashing Liquid", size: "2L", price: "$2", benefit: "Family-size value.", image: detergentSmall, wa: WA_BASE + encodeURIComponent("Hi, I'd like to order Dishwashing Liquid 2L") },
  { name: "Dishwashing Liquid", size: "5L", price: "$6", benefit: "Bulk for busy kitchens.", image: detergent5l, wa: WA_BASE + encodeURIComponent("Hi, I'd like to order Dishwashing Liquid 5L") },
  { name: "Dishwashing Liquid", size: "20L", price: "$24", benefit: "Industrial-grade supply.", image: detergent20l, wa: WA_BASE + encodeURIComponent("Hi, I'd like to order Dishwashing Liquid 20L") },
];

const bleach: Product[] = [
  { name: "Thick Bleach", size: "750ml", price: "$1.50", benefit: "Compact home disinfectant.", image: bleach750ml, wa: WA_BASE + encodeURIComponent("Hi, I'd like to order Thick Bleach 750ml") },
  { name: "Thick Bleach", size: "2L", price: "$3", benefit: "Family-size sanitisation.", image: bleachSmall, wa: WA_BASE + encodeURIComponent("Hi, I'd like to order Thick Bleach 2L") },
  { name: "Thick Bleach", size: "5L", price: "$8", benefit: "Heavy-duty for kitchens.", image: bleach5l, wa: WA_BASE + encodeURIComponent("Hi, I'd like to order Thick Bleach 5L") },
  { name: "Thick Bleach", size: "20L", price: "$30", benefit: "Maximum institutional supply.", image: bleach20l, wa: WA_BASE + encodeURIComponent("Hi, I'd like to order Thick Bleach 20L") },
];

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref} className={`transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const Card = ({ p, delay }: { p: Product; delay: number }) => (
  <Reveal delay={delay}>
    <div className="group relative h-full overflow-hidden rounded-2xl glass border border-border/50 shadow-card hover:shadow-elegant hover:border-primary/40 transition-all duration-700 hover:-translate-y-2">
      {/* Price pill */}
      <div className="absolute top-3 right-3 z-10 rounded-full gradient-primary px-3 py-1 shadow-lg shadow-primary/40 group-hover:scale-110 transition-transform duration-500">
        <span className="text-sm font-black text-primary-foreground tracking-tight">{p.price}</span>
      </div>
      {/* Size badge */}
      <div className="absolute top-3 left-3 z-10 rounded-full bg-foreground/90 backdrop-blur-md px-2.5 py-1 shadow-md">
        <span className="text-[10px] font-bold uppercase tracking-wider text-background">{p.size}</span>
      </div>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-card">
        <div className="absolute inset-0 gradient-aurora opacity-40" />
        <img
          src={p.image}
          alt={`${p.name} ${p.size}`}
          className="relative h-full w-full object-contain p-5 transition-all duration-700 ease-out group-hover:scale-110 drop-shadow-2xl"
          loading="lazy"
        />
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-heading text-sm font-bold text-foreground leading-tight">{p.name}</h3>
        <p className="mt-1 text-xs text-muted-foreground leading-snug min-h-[2.5rem]">{p.benefit}</p>
        <a
          href={p.wa}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-whatsapp px-3 py-2.5 text-xs font-bold text-whatsapp-foreground shadow-md shadow-whatsapp/30 hover:scale-[1.03] hover:shadow-whatsapp/50 transition-all duration-500"
        >
          <MessageCircle className="h-3.5 w-3.5" /> Order
        </a>
      </div>
    </div>
  </Reveal>
);

const Products = () => (
  <main className="relative pt-28 pb-20 md:pt-32 md:pb-28 overflow-x-hidden">
    <div className="absolute inset-0 gradient-aurora opacity-50 pointer-events-none" />
    <div className="absolute top-32 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
    <div className="absolute bottom-32 -right-24 h-72 w-72 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

    <div className="container relative">
      {/* Header */}
      <Reveal>
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-3 rounded-full glass border border-border/50 px-6 py-3 mb-6 shadow-elegant">
            <img src={zimFlag} alt="Zimbabwe" width={32} height={32} className="h-7 w-7 sm:h-8 sm:w-8 object-cover rounded-sm" />
            <span className="text-base sm:text-lg font-bold tracking-wide text-foreground">Made in Zimbabwe</span>
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-black text-foreground leading-[1.05]">
            Our <span className="gradient-text-primary">Collection</span>
          </h1>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            Premium cleaning solutions in eight refined sizes — for homes, businesses, and institutions.
          </p>
        </div>
      </Reveal>

      {/* Dishwashing */}
      <div className="mt-16 md:mt-20">
        <Reveal>
          <div className="flex items-end justify-between mb-6 md:mb-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] gradient-text-secondary">Series 01</span>
              <h2 className="mt-2 font-heading text-2xl md:text-4xl font-black text-foreground">Dishwashing Liquid</h2>
            </div>
            <div className="hidden sm:block text-xs text-muted-foreground font-semibold">4 sizes</div>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:grid-cols-4">
          {dishwashing.map((p, i) => <Card key={p.size} p={p} delay={i * 80} />)}
        </div>
      </div>

      {/* Thick Bleach */}
      <div className="mt-16 md:mt-24">
        <Reveal>
          <div className="flex items-end justify-between mb-6 md:mb-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] gradient-text-primary">Series 02</span>
              <h2 className="mt-2 font-heading text-2xl md:text-4xl font-black text-foreground">Thick Bleach</h2>
            </div>
            <div className="hidden sm:block text-xs text-muted-foreground font-semibold">4 sizes</div>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:grid-cols-4">
          {bleach.map((p, i) => <Card key={p.size} p={p} delay={i * 80} />)}
        </div>
      </div>

      {/* Wholesale CTA */}
      <Reveal delay={200}>
        <div className="relative mt-20 overflow-hidden rounded-3xl border border-border/50 p-8 md:p-14 text-center shadow-elegant">
          <div className="absolute inset-0 gradient-primary opacity-95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--primary-glow)/0.5),transparent_60%)]" />
          <div className="relative z-10">
            <h2 className="font-heading text-2xl md:text-4xl font-black text-primary-foreground">Need bulk supply?</h2>
            <p className="mt-3 text-primary-foreground/85 max-w-md mx-auto">Custom packaging and wholesale pricing for businesses, schools & institutions.</p>
            <a
              href={WA_BASE + encodeURIComponent("Hi, I need a bulk/wholesale quote")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-background px-7 py-4 text-sm font-bold text-foreground shadow-2xl hover:scale-105 transition-all duration-500"
            >
              <MessageCircle className="h-5 w-5 text-whatsapp" /> Get Wholesale Quote
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  </main>
);

export default Products;
