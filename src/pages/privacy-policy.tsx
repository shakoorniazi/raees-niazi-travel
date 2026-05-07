import { LegalPage } from "@/components/legal-page";

export default function PrivacyPolicy() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy">
      <p className="text-lg">
        At Raees Niazi Travel, we value your privacy and are committed to
        protecting your personal information.
      </p>

      <p>
        We do not directly collect or store sensitive personal data. However,
        our website may use cookies and third-party services from our trusted
        travel partners to provide search results and improve user experience.
      </p>

      <p>
        These third-party services may collect information such as IP address,
        browser type, and usage behavior in accordance with their own privacy
        policies.
      </p>

      <p>
        By using our website, you consent to the use of cookies and
        third-party services.
      </p>

      <p>
        If you have any questions, contact us at:{" "}
        <a
          href="mailto:info.raeesniazi@gmail.com"
          className="text-primary font-semibold hover:underline"
        >
          info.raeesniazi@gmail.com
        </a>
      </p>
    </LegalPage>
  );
}
