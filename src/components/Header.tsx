import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle, Sun, Moon } from "lucide-react";
import logo from "@/assets/logo.webp";

const WHATSAPP_URL = "https://wa.me/263784576365?text=Hello%20Rabah%20Sparkle,%20I%20would%20like%20to%20order";
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  const onHero = pathname === "/" && !scrolled;

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "glass border-b border-border/50 shadow-card backdrop-blur-xl" : "bg-transparent"}`}>
      <div className={`container flex items-center justify-between transition-all duration-500 ${onHero ? "h-24 md:h-32" : "h-16 md:h-20"}`}>
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={logo}
            alt="Rabah Sparkle"
            width={112}
            height={112}
            decoding="async"
            className={`w-auto transition-all duration-500 group-hover:scale-105 drop-shadow-2xl ${onHero ? "h-20 md:h-28" : "h-10 md:h-12"}`}
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`relative text-sm font-semibold transition-colors duration-300 ${pathname === l.to ? "text-foreground" : "text-foreground/70 hover:text-foreground"}`}
            >
              {l.label}
              {pathname === l.to && <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full gradient-primary" />}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full p-2 hover:bg-foreground/5 transition-colors text-foreground/80 hover:text-foreground"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full gradient-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300">
            <MessageCircle className="h-4 w-4" /> Order Now
          </a>
        </nav>

        <div className="md:hidden flex items-center gap-1">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-foreground/5 transition-colors text-foreground/80"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            aria-label="Menu"
            aria-expanded={open}
            className="rounded-full p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-foreground/5 transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="glass border-t border-border/50 px-4 pb-5 md:hidden animate-fade-up">
          <nav className="flex flex-col gap-1 pt-3">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${pathname === l.to ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-foreground/5"}`}
              >
                {l.label}
              </Link>
            ))}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full gradient-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30">
              <MessageCircle className="h-4 w-4" /> Order on WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
