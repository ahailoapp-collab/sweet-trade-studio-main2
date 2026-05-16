import { Home, School, Building2, UtensilsCrossed, Landmark, Store, Truck, Globe, Building, MessageCircle, Phone, Mail, CheckCircle2, Droplets, Shield, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ceoImage from "@/assets/ceo-gamu.webp";
import zimFlag from "@/assets/zim-flag.png";
import logo from "@/assets/logo.webp";
import serveHouseholds from "@/assets/serve-households.jpg";
import serveSchools from "@/assets/serve-schools.jpg";
import serveClinics from "@/assets/serve-clinics.jpg";
import serveRestaurants from "@/assets/serve-restaurants.jpg";
import serveInstitutions from "@/assets/serve-institutions.jpg";
import whyAffordable from "@/assets/why-affordable.jpg";
import whyFlexible from "@/assets/why-flexible.jpg";
import whyCustom from "@/assets/why-custom.jpg";
import whyReliable from "@/assets/why-reliable.jpg";

const WA = "https://wa.me/263784576365?text=Hello%20Rabah%20Sparkle,%20I%20would%20like%20to%20order";

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      data-visible={visible}
      className={`group/reveal transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const About = () => (
  <main className="overflow-x-hidden">
    {/* HERO */}
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="absolute inset-0 gradient-aurora opacity-50 pointer-events-none" />
      <div className="container relative max-w-3xl text-center">
        <Reveal>
          <div className="inline-flex items-center gap-3 rounded-full glass border border-border/50 px-6 py-3 mb-7 shadow-elegant">
            <img src={zimFlag} alt="Zimbabwe" width={32} height={32} className="h-7 w-7 sm:h-8 sm:w-8 object-cover rounded-sm" />
            <span className="text-base sm:text-lg font-bold tracking-wide text-foreground">Proudly Zimbabwean</span>
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-black text-foreground leading-[1.05]">
            About <span className="gradient-text-primary">Rabah Sparkle</span>
          </h1>
          <p className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed">
            A proudly Zimbabwean manufacturing & supply business specialising in high-quality household and industrial cleaning products — built for homes, businesses, and institutions.
          </p>
        </Reveal>
      </div>
    </section>

    {/* CEO editorial */}
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 gradient-aurora opacity-30 pointer-events-none" />
      <div className="container relative grid gap-12 md:grid-cols-2 items-center">
        <Reveal>
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-6 gradient-primary rounded-[2rem] opacity-20 blur-3xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border/50 shadow-elegant">
              <img src={ceoImage} alt="Mrs Gamu Sakupwanya - CEO" width={1000} height={890} className="h-full w-full object-cover" loading="lazy" decoding="async" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/70 to-transparent" />
            </div>
            <div className="absolute -bottom-5 -right-2 sm:-right-5 glass border border-border/50 rounded-2xl px-5 py-3 shadow-elegant max-w-[80%]">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Founder & CEO</p>
              <p className="text-base font-heading font-bold text-foreground mt-0.5">Mrs Gamu Sakupwanya</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] gradient-text-secondary">Our Story</span>
            <h2 className="mt-3 font-heading text-3xl md:text-5xl font-black text-foreground leading-[1.1]">A founder's vision.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed text-base md:text-lg">
              Mrs Gamu Sakupwanya founded Rabah Sparkle Detergents with a clear mission: deliver dependable, premium-quality cleaning products that Zimbabwean households and businesses can afford and trust. Today, every bottle reflects that founding promise — power, quality, and pride of origin.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <div className="flex items-center gap-2">
                <img src={zimFlag} alt="Zimbabwe" width={20} height={20} loading="lazy" decoding="async" className="h-5 w-5 object-cover rounded-sm" />
                <span className="text-xs font-semibold text-foreground/80">Harare, Zimbabwe</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* WHY */}
    <section className="relative py-20 md:py-28 bg-card/50">
      <div className="container">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.3em] gradient-text-primary">Why Choose Us</span>
            <h2 className="mt-3 font-heading text-3xl md:text-5xl font-black text-foreground">Quality you can trust</h2>
          </div>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CheckCircle2, text: "Affordable pricing without compromise", image: whyAffordable, width: 1200, height: 800 },
            { icon: Droplets, text: "Flexible packaging for every need", image: whyFlexible, width: 1200, height: 800 },
            { icon: Shield, text: "Custom supply for businesses", image: whyCustom, width: 1200, height: 800 },
            { icon: Sparkles, text: "Reliable, powerful performance", image: whyReliable, width: 799, height: 1200 },
          ].map(({ icon: Icon, text, image, width, height }, i) => (
            <Reveal key={text} delay={i * 100}>
              <div className="group relative h-full overflow-hidden rounded-2xl glass border border-border/50 p-6 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 shadow-card hover:shadow-elegant">
                <img
                  src={image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  width={width}
                  height={height}
                  className="absolute inset-0 h-full w-full object-cover opacity-0 group-data-[visible=true]/reveal:opacity-90 group-hover:opacity-100 transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ transitionDelay: `${i * 100}ms` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/60 to-background/30 group-hover:from-background/80 group-hover:via-background/40 group-hover:to-background/10 transition-all duration-700" />
                <div className="relative z-10 h-12 w-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-500">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <p className="relative z-10 mt-4 text-sm font-semibold text-foreground leading-relaxed drop-shadow-md">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* SERVE */}
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 gradient-aurora opacity-30 pointer-events-none" />
      <div className="container relative">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.3em] gradient-text-secondary">Who We Serve</span>
            <h2 className="mt-3 font-heading text-3xl md:text-5xl font-black text-foreground">For every space</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { icon: Home, label: "Households", image: serveHouseholds, width: 800, height: 1200 },
            { icon: School, label: "Schools", image: serveSchools, width: 1200, height: 900 },
            { icon: Building2, label: "Clinics", image: serveClinics, width: 800, height: 1200 },
            { icon: UtensilsCrossed, label: "Restaurants", image: serveRestaurants, width: 1200, height: 906 },
            { icon: Landmark, label: "Institutions", image: serveInstitutions, width: 1189, height: 1200 },
          ].map(({ icon: Icon, label, image, width, height }, i) => (
            <Reveal key={label} delay={i * 80}>
              <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/50 shadow-card hover:shadow-elegant hover:-translate-y-1 hover:border-secondary/40 transition-all duration-500">
                <img
                  src={image}
                  alt={label}
                  loading="lazy"
                  width={width}
                  height={height}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-background/10" />
                <div className="relative z-10 flex h-full flex-col items-center justify-end gap-2 p-4">
                  <div className="h-10 w-10 rounded-xl gradient-secondary flex items-center justify-center shadow-md shadow-secondary/40 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <span className="text-center text-sm font-bold text-foreground drop-shadow-md">{label}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* DISTRIBUTION */}
    <section className="relative py-20 md:py-24 bg-card/50">
      <div className="container max-w-4xl">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.3em] gradient-text-primary">Distribution</span>
            <h2 className="mt-3 font-heading text-3xl md:text-4xl font-black text-foreground">Expanding across Zimbabwe</h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { icon: Store, label: "Supermarkets" },
            { icon: Truck, label: "Wholesalers" },
            { icon: Globe, label: "NGOs" },
            { icon: Building, label: "Government" },
          ].map(({ icon: Icon, label }, i) => (
            <Reveal key={label} delay={i * 80}>
              <div className="flex flex-col items-center gap-2 rounded-xl glass border border-border/50 p-5 text-center shadow-card hover:shadow-elegant hover:scale-105 transition-all duration-500">
                <Icon className="h-7 w-7 text-primary" />
                <span className="text-xs font-bold text-foreground">{label}</span>
              </div>
            </Reveal>
          ))}
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
          <h2 className="font-heading text-3xl md:text-5xl font-black text-primary-foreground leading-tight">Ready to order?</h2>
          <p className="mt-3 text-primary-foreground/85">Get in touch and place your order today.</p>
          <div className="mt-8">
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 rounded-full bg-background px-8 py-4 text-base font-black text-foreground shadow-2xl shadow-background/20 hover:scale-[1.06] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              <span aria-hidden="true" className="pointer-events-none absolute -inset-1 rounded-full bg-background/40 blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
              <MessageCircle className="h-5 w-5 text-whatsapp" /> Chat on WhatsApp
            </a>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-primary-foreground/85">
            <a href="tel:+263784576365" className="flex items-center gap-2 hover:text-primary-foreground"><Phone className="h-4 w-4" /> 0784 576 365</a>
            <a href="mailto:rabahsparkledetergents@gmail.com" className="flex items-center gap-2 hover:text-primary-foreground text-xs sm:text-sm break-all"><Mail className="h-4 w-4 shrink-0" /> rabahsparkledetergents@gmail.com</a>
          </div>
        </Reveal>
      </div>
    </section>
  </main>
);

export default About;
