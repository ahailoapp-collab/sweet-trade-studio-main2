import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ScrollToTop from "@/components/ScrollToTop";
import logo from "@/assets/logo.webp";
import Index from "./pages/Index";
import Products from "./pages/Products";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col">
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden"
          >
            <img
              src={logo}
              alt=""
              width={900}
              height={900}
              decoding="async"
              {...({ fetchpriority: "high" } as Record<string, string>)}
              className="w-[80vw] max-w-[900px] opacity-[0.10] dark:opacity-[0.12] blur-[1px] select-none"
            />
          </div>
          <Header />
          <div className="flex-1 relative z-10">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
          <WhatsAppFloat />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
