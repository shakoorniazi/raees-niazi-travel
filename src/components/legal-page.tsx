import { useEffect, type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";

interface LegalPageProps {
  eyebrow: string;
  title: string;
  children: ReactNode;
}

export function LegalPage({ eyebrow, title, children }: LegalPageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col">
      <Header />

      <section className="pt-36 pb-12 px-4 bg-gradient-to-br from-[hsl(200,90%,97%)] via-background to-[hsl(35,90%,97%)] border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all mb-6"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
            {eyebrow}
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
            {title}
          </h1>
        </div>
      </section>

      <main className="flex-1 py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="prose prose-lg max-w-none text-foreground/85 leading-relaxed">
            {children}
          </div>
        </div>
      </main>

      <Footer />
      <CookieConsent />
    </div>
  );
}
