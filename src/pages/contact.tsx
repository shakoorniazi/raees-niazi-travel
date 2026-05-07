import { Mail, Phone, MapPin, QrCode } from "lucide-react";
import { FaWhatsapp, FaTiktok, FaInstagram } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { LegalPage } from "@/components/legal-page";

export default function Contact() {
  return (
    <LegalPage eyebrow="Get in touch" title="Contact">
      <p className="text-lg">
        Have a question about a deal, your booking or anything else? Reach out
        and a real person will get back to you.
      </p>

      <div className="not-prose grid sm:grid-cols-2 gap-4 mt-10">
        <a
          href="mailto:info.raeesniazi@gmail.com"
          className="group flex items-start gap-4 p-6 bg-card border border-border rounded-2xl hover:border-primary/40 hover:shadow-lg transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
            <Mail size={22} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
              Email
            </p>
            <p className="text-base font-semibold text-foreground break-all">
              info.raeesniazi@gmail.com
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              We reply within one business day.
            </p>
          </div>
        </a>

        <a
          href="https://wa.me/33759134247"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start gap-4 p-6 bg-card border border-border rounded-2xl hover:border-[#25D366]/50 hover:shadow-lg transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-colors shrink-0">
            <FaWhatsapp size={22} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
              WhatsApp
            </p>
            <p className="text-base font-semibold text-foreground">
              Chat with us
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Fastest way to reach a travel advisor.
            </p>
          </div>
        </a>

        <a
          href="tel:+33759134247"
          className="group flex items-start gap-4 p-6 bg-card border border-border rounded-2xl hover:border-primary/40 hover:shadow-lg transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
            <Phone size={22} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
              France
            </p>
            <p className="text-base font-semibold text-foreground">
              +33 7 59 13 42 47
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Tap to call our France line.
            </p>
          </div>
        </a>

        <a
          href="tel:+93731512000"
          className="group flex items-start gap-4 p-6 bg-card border border-border rounded-2xl hover:border-primary/40 hover:shadow-lg transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
            <Phone size={22} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
              Afghanistan
            </p>
            <p className="text-base font-semibold text-foreground">
              +93 73 151 2000
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Tap to call our Afghanistan line.
            </p>
          </div>
        </a>
      </div>

      <p className="not-prose mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin size={16} className="text-primary" />
        Business location: France
      </p>

      <div className="not-prose mt-12">
        <div className="flex items-center gap-2 mb-2">
          <QrCode size={18} className="text-primary" />
          <h2 className="text-xl font-display font-bold">Follow us on social</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Scan a code with your phone camera, or tap a card to open the profile.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href="https://www.tiktok.com/@raees.niazi.travel"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center p-6 bg-card border border-border rounded-2xl hover:border-foreground/40 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-2 mb-4">
              <FaTiktok size={18} className="text-foreground" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                TikTok
              </span>
            </div>
            <div className="w-full aspect-square max-w-[260px] rounded-xl overflow-hidden bg-white border border-border/60 flex items-center justify-center">
              <img
                src="/social/tiktok-qr.jpg"
                alt="Scan to follow Raees Niazi Travel on TikTok"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <p className="mt-4 text-base font-semibold text-foreground group-hover:text-primary transition-colors">
              @raees.niazi.travel
            </p>
          </a>

          <a
            href="https://www.instagram.com/travelwith_raeesniazi"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center p-6 bg-card border border-border rounded-2xl hover:border-[#E1306C]/50 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-2 mb-4">
              <FaInstagram size={18} className="text-[#E1306C]" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Instagram
              </span>
            </div>
            <div className="w-full aspect-square max-w-[260px] rounded-xl overflow-hidden bg-white border border-border/60 flex items-center justify-center">
              <img
                src="/social/instagram-qr.jpg"
                alt="Scan to follow @travelwith_raeesniazi on Instagram"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <p className="mt-4 text-base font-semibold text-foreground group-hover:text-[#E1306C] transition-colors">
              @travelwith_raeesniazi
            </p>
          </a>
        </div>
      </div>

      <div className="not-prose mt-10 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[hsl(200,90%,30%)] via-[hsl(200,90%,40%)] to-[hsl(220,70%,25%)] text-white">
        <h2 className="text-2xl font-display font-bold mb-2">
          Prefer WhatsApp?
        </h2>
        <p className="text-white/85 mb-5 max-w-md">
          Tap below to start a conversation with our team — no waiting on hold,
          no forms to fill out.
        </p>
        <Button
          size="lg"
          className="bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl gap-2 font-bold border-none h-12 px-6"
          onClick={() => window.open("https://wa.me/33759134247", "_blank")}
        >
          <FaWhatsapp size={18} />
          Open WhatsApp
        </Button>
      </div>
    </LegalPage>
  );
}
