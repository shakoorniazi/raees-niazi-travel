import { HelpCircle, ShieldCheck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/i18n";

export function FaqSection() {
  const { t } = useLanguage();

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
  ];

  return (
    <section id="faq" className="py-24 md:py-32 px-4 bg-gradient-to-b from-background to-[hsl(200,90%,97%)]">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
            {t("faq.eyebrow")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
            {t("faq.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("faq.subtitle")}
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="space-y-3"
          defaultValue="item-0"
        >
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.q}
              value={`item-${i}`}
              className="bg-card border border-border rounded-2xl shadow-sm hover:shadow-md hover:border-primary/30 transition-all px-5 md:px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline py-5 group">
                <span className="flex items-start gap-3 pr-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <HelpCircle size={18} strokeWidth={2.2} />
                  </span>
                  <span className="text-base md:text-lg font-display font-semibold text-foreground leading-snug pt-1">
                    {faq.q}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed pl-11 pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Premium Disclaimer Card */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/20 rounded-3xl blur-2xl opacity-40" />
          <div className="relative max-w-2xl mx-auto bg-gradient-to-br from-[hsl(220,40%,12%)] via-[hsl(220,45%,15%)] to-[hsl(220,40%,10%)] backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 md:p-10 text-white">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur border border-white/15 flex items-center justify-center text-secondary">
                <ShieldCheck size={22} strokeWidth={2.2} />
              </span>
              <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
                {t("faq.disclaimer.title")}
              </h3>
            </div>
            <div className="space-y-4 text-sm md:text-base text-white/80 leading-relaxed">
              <p>{t("disclaimer.body")}</p>
              <p className="text-white/70">
                {t("disclaimer.inquiries")}{" "}
                <a
                  href="mailto:info.raeesniazi@gmail.com"
                  className="text-white font-medium hover:underline break-all"
                >
                  info.raeesniazi@gmail.com
                </a>{" "}
                {t("disclaimer.or")}{" "}
                <a
                  href="tel:+33759134247"
                  className="text-white font-medium hover:underline whitespace-nowrap"
                >
                  +33 7 59 13 42 47
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
