import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/263784576365?text=Hello%20Rabah%20Sparkle,%20I%20would%20like%20to%20order";

const WhatsAppFloat = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-2xl shadow-whatsapp/40 hover:scale-110 transition-transform duration-300 animate-pulse-glow"
    style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
    aria-label="Order on WhatsApp"
  >
    <MessageCircle className="h-6 w-6" />
  </a>
);

export default WhatsAppFloat;
