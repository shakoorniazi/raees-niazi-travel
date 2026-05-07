import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md animate-in slide-in-from-bottom-8 fade-in duration-500">
      <div className="bg-card border border-border rounded-xl shadow-2xl p-5 md:p-6">
        <p className="text-base text-foreground mb-4">
          We use cookies to improve your experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={handleAccept} className="w-full sm:w-auto">
            Accept
          </Button>
          <Button
            onClick={handleReject}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
}
