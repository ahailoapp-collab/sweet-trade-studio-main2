import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.webp";
import zimFlag from "@/assets/zim-flag.png";
import footerBg from "@/assets/footer-bg.jpg";

const WHATSAPP_URL = "https://wa.me/263784576365?text=Hello%20Rabah%20Sparkle,%20I%20would%20like%20to%20order";

const Footer = () => (
  <footer className="relative border-t border-border/50 bg-card overflow-hidden">
    <img
      src={footerBg}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover opacity-15 pointer-events-none"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-card/80 via-card/70 to-card pointer-events-none" />
    <div className="absolute inset-0 gradient-aurora opacity-40 pointer-events-none" />
    <div className="container relative py-14 md:py-16">
      <div className="grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logo} alt="Rabah Sparkle" width={56} height={56} loading="lazy" decoding="async" className="h-14 w-auto mb-4 drop-shadow-lg" />
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            Power that Cleans, Quality that Lasts. Premium cleaning products engineered for homes, businesses & institutions.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full glass border border-border/50 px-3 py-1.5">
            <img src={zimFlag} alt="Zimbabwe" width={20} height={20} loading="lazy" decoding="async" className="h-5 w-5 object-cover rounded-sm" />
            <span className="text-xs font-semibold text-foreground/80">Proudly Made in Zimbabwe</span>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-xs font-bold uppercase tracking-[0.2em] text-foreground">Explore</h3>
          <nav className="flex flex-col gap-2.5 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">Products</Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
          </nav>
        </div>

        <div>
          <h3 className="mb-4 font-heading text-xs font-bold uppercase tracking-[0.2em] text-foreground">Contact</h3>
          <div className="space-y-2.5 text-sm">
            <a href="tel:+263784576365" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="h-4 w-4" /> 0784 576 365
            </a>
            <a href="mailto:rabahsparkledetergents@gmail.com" className="flex items-start gap-2 text-muted-foreground hover:text-foreground transition-colors break-all">
              <Mail className="h-4 w-4 mt-0.5 shrink-0" /> <span className="text-xs">rabahsparkledetergents@gmail.com</span>
            </a>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" /> Harare, Zimbabwe
            </div>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-xs font-bold text-whatsapp-foreground shadow-lg shadow-whatsapp/30 hover:scale-105 transition-all"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp Us
          </a>
        </div>
      </div>

      <div className="mt-12 border-t border-border/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Rabah Sparkle Detergents. All rights reserved.</span>
        <span className="opacity-70">Crafted with care in 🇿🇼</span>
      </div>
    </div>
  </footer>
);

export default Footer;
