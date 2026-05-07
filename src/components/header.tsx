import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Sun, Moon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useLanguage, type Lang } from "@/i18n";
import { useTheme } from "@/hooks/use-theme";
import logoImg from "@/assets/logo_1777347032904.jpeg";

function useIsDark(): boolean {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

function ThemeToggle({ solid }: { solid: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-full border transition-colors ${
        solid
          ? "bg-secondary/15 border-border/60 text-foreground hover:bg-secondary/25"
          : "bg-white/15 border-white/25 text-white hover:bg-white/25 backdrop-blur-sm"
      }`}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

function LangToggle({
  lang,
  setLang,
  solid,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  solid: boolean;
}) {
  const options: Lang[] = ["EN", "FR"];
  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center rounded-full p-0.5 transition-colors ${
        solid
          ? "bg-secondary/15 border border-border/60"
          : "bg-white/15 border border-white/25 backdrop-blur-sm"
      }`}
    >
      {options.map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={active}
            onClick={() => setLang(code)}
            className={`relative px-3 py-1 rounded-full text-xs font-bold tracking-wide transition-all duration-200 ${
              active
                ? "bg-white text-slate-900 shadow-sm"
                : solid
                ? "text-muted-foreground hover:text-foreground"
                : "text-white/75 hover:text-white"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const [location] = useLocation();
  const isDark = useIsDark();
  const isHome = location === "/" || location === "";
  // The hero is dark only when dark mode is on. In light mode the hero is a
  // soft sky-blue, so the header must use solid (dark text) styling there too
  // to remain readable. Otherwise we keep the transparent white-text variant
  // for the dark hero, switching to solid once the user scrolls past it.
  const solid = isScrolled || !isHome || !isDark;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/#flights", label: t("nav.flights") },
    { href: "/#hotels", label: t("nav.hotels") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        solid
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className={`flex items-center justify-center rounded-lg p-1 transition-colors ${solid ? "bg-white" : "bg-white/95 backdrop-blur-sm"}`}>
            <img
              src={logoImg}
              alt="Raees Niazi Travel Logo"
              className="h-8 w-auto block"
            />
          </div>
          <span className={`text-xl font-display font-bold tracking-tight transition-colors ${solid ? "text-foreground" : "text-white"}`}>
            Raees Niazi <span className={solid ? "text-primary" : "text-white/80 font-medium"}>Travel</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    solid ? "text-foreground/80" : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle solid={solid} />
          <LangToggle lang={lang} setLang={setLang} solid={solid} />

          <Button
            className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full gap-2 font-medium border-none shadow-none"
            onClick={() => window.open("https://wa.me/33759134247", "_blank")}
          >
            <FaWhatsapp size={18} />
            <span>WhatsApp</span>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden p-2 rounded-md ${solid ? "text-foreground" : "text-white"}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-background border-b border-border shadow-lg py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-2 md:hidden">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="block px-4 py-2 text-base font-medium text-foreground rounded-md hover:bg-muted"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between px-4 pt-4 border-t border-border">
            <div className="flex items-center gap-3">
              <ThemeToggle solid />
              <LangToggle lang={lang} setLang={setLang} solid />
            </div>
            <Button
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full gap-2 border-none"
              onClick={() => window.open("https://wa.me/33759134247", "_blank")}
            >
              <FaWhatsapp size={18} />
              <span>{t("nav.message")}</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}