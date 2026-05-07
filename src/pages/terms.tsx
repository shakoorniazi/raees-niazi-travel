import { LegalPage } from "@/components/legal-page";

export default function Terms() {
  return (
    <LegalPage eyebrow="Legal" title="Terms & Conditions">
      <p className="text-lg">
        We do not sell tickets directly. All bookings are handled by
        third-party partners.
      </p>

      <h2 className="text-2xl font-display font-bold mt-10 mb-3 text-foreground">
        Our role
      </h2>
      <p>
        Raees Niazi Travel is a price-comparison and discovery service. We
        help you find flights, hotels and travel deals from a wide network of
        trusted partners, and then redirect you to those partners to complete
        your booking.
      </p>

      <h2 className="text-2xl font-display font-bold mt-10 mb-3 text-foreground">
        Bookings & payments
      </h2>
      <p>
        All payments, ticketing, cancellations, refunds and any changes to
        your itinerary are handled directly by the partner you book with.
        Their terms apply to your purchase.
      </p>

      <h2 className="text-2xl font-display font-bold mt-10 mb-3 text-foreground">
        Pricing
      </h2>
      <p>
        Prices shown on this site are pulled in real time from our partners
        and can change at any moment. The final price is always the price
        confirmed by the partner at the moment you book.
      </p>
    </LegalPage>
  );
}
