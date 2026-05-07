import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "@/i18n";
import logoImg from "@/assets/logo_1777347032904.jpeg";

export function Footer() {
  const { t } = useLanguage();

  const linkColumns = [
    {
      title: t("footer.col.company"),
      links: [
        { label: t("footer.link.about"), href: "/about" },
        { label: t("footer.link.contact"), href: "/contact" },
      ],
    },
    {
      title: t("footer.col.legal"),
      links: [
        { label: t("footer.link.privacy"), href: "/privacy-policy" },
        { label: t("footer.link.terms"), href: "/terms" },
      ],
    },
    {
      title: t("footer.col.explore"),
      links: [
        { label: t("footer.link.flights"), href: "/#flights" },
        { label: t("footer.link.hotels"), href: "/#hotels" },
        { label: t("footer.link.routes"), href: "/#hotels" },
      ],
    },
  ];

  return (
    <footer className="bg-[hsl(220,40%,8%)] text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2 max-w-sm">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="bg-white rounded-lg p-1 flex items-center justify-center">
                <img
                  src={logoImg}
                  alt="Raees Niazi Travel Logo"
                  className="h-9 w-auto block"
                />
              </div>
              <span className="text-xl font-display font-bold tracking-tight">
                Raees Niazi <span className="text-primary">Travel</span>
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              {t("footer.tagline")}
            </p>

            {/* Contact block */}
            <div className="mb-6">
              <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-white mb-3">
                {t("footer.contact")}
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="mailto:info.raeesniazi@gmail.com"
                    className="inline-flex items-center gap-2.5 text-white/70 hover:text-white transition-colors break-all"
                  >
                    <Mail size={15} className="text-primary shrink-0" />
                    info.raeesniazi@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+33759134247"
                    className="inline-flex items-center gap-2.5 text-white/70 hover:text-white transition-colors"
                  >
                    <Phone size={15} className="text-primary shrink-0" />
                    +33 7 59 13 42 47
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+93731512000"
                    className="inline-flex items-center gap-2.5 text-white/70 hover:text-white transition-colors"
                  >
                    <Phone size={15} className="text-primary shrink-0" />
                    +93 73 151 2000
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/33759134247"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-white/70 hover:text-white transition-colors"
                  >
                    <FaWhatsapp size={15} className="text-[#25D366] shrink-0" />
                    {t("footer.whatsapp")}
                  </a>
                </li>
                <li>
                  <span className="inline-flex items-center gap-2.5 text-white/60">
                    <MapPin size={15} className="text-primary shrink-0" />
                    {t("footer.location")}
                  </span>
                </li>
              </ul>
              <p className="text-xs text-white/50 mt-3 leading-relaxed">
                {t("footer.alsoWa")}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {linkColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-white mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/#") ? (
                      <a
                        href={link.href}
                        className="text-sm text-white/60 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-white/60 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <p className="text-xs text-white/60 leading-relaxed max-w-4xl">
            <span className="font-semibold text-white/90">
              {t("disclaimer.label")}
            </span>{" "}
            {t("disclaimer.body")}
          </p>
          <p className="text-xs text-white/60 leading-relaxed max-w-4xl mt-2">
            {t("disclaimer.inquiries")}{" "}
            <a
              href="mailto:info.raeesniazi@gmail.com"
              className="text-white hover:underline"
            >
              info.raeesniazi@gmail.com
            </a>{" "}
            {t("disclaimer.or")}{" "}
            <a
              href="tel:+33759134247"
              className="text-white hover:underline"
            >
              +33 7 59 13 42 47
            </a>
            .
          </p>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Raees Niazi Travel.{" "}
            {t("footer.copyright")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/50">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              {t("footer.link.privacy")}
            </Link>
            <span className="opacity-40">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              {t("footer.link.terms")}
            </Link>
            <span className="opacity-40">|</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              {t("footer.link.contact")}
            </Link>
            <span className="opacity-40">|</span>
            <Link href="/about" className="hover:text-white transition-colors">
              {t("footer.link.about")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
