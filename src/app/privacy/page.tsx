import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'Privacy Policy | Eccentric Iron Fitness',
  description:
    'Privacy policy for Eccentric Iron Fitness. Learn how we collect, use, and protect your personal information.',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <h2 className="font-heading text-xl font-bold uppercase tracking-widest text-text-primary">
        {title}
      </h2>
      {children}
    </>
  );
}

export default function PrivacyPage() {
  return (
    <Container as="main" className="py-16">
      <h1 className="font-heading text-4xl font-extrabold uppercase tracking-tight text-text-primary md:text-5xl">
        PRIVACY POLICY
      </h1>
      <div className="mt-2 h-[3px] w-24 bg-cyan" />

      <div className="mt-8 max-w-3xl space-y-6 font-body text-base leading-relaxed text-text-secondary">
        <p>
          Eccentric Iron Fitness (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed
          to protecting your privacy. This policy explains how we collect, use, disclose, and
          safeguard your personal information when you visit our website, use our services, or
          communicate with us.
        </p>
        <p>
          We comply with the Personal Information Protection and Electronic Documents Act (PIPEDA),
          British Columbia&apos;s Personal Information Protection Act (PIPA), Canada&apos;s
          Anti-Spam Legislation (CASL), the California Consumer Privacy Act (CCPA/CPRA), the
          CAN-SPAM Act, the Telephone Consumer Protection Act (TCPA), and A2P 10DLC messaging
          regulations.
        </p>

        {/* ── 1. ACCOUNTABILITY ── */}
        <Section title="1. ACCOUNTABILITY &amp; PRIVACY OFFICER">
          <p>
            Our Privacy Officer is responsible for ensuring compliance with applicable privacy
            legislation. For questions, concerns, or to exercise your privacy rights, contact:
          </p>
          <p className="mt-2 font-mono text-sm text-text-primary">
            Carver Lloyd, Privacy Officer<br />
            Eccentric Iron Fitness<br />
            #2418-11280 Pazarena Place, Maple Ridge, BC V2X 9H8<br />
            Email:{' '}
            <a href="mailto:privacy@eccentriciron.ca" className="text-cyan hover:underline">
              privacy@eccentriciron.ca
            </a>
            <br />
            Phone:{' '}
            <a href="tel:+16042003390" className="text-cyan hover:underline">
              (604) 200-3390
            </a>
          </p>
        </Section>

        {/* ── 2. INFORMATION WE COLLECT ── */}
        <Section title="2. INFORMATION WE COLLECT">
          <p>We collect personal information that you provide directly to us, including:</p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>
              <strong>Contact information:</strong> name, email address, phone number, mailing
              address
            </li>
            <li>
              <strong>Fitness and health data:</strong> age, weight, height, gender, activity level,
              fitness goals, body measurements, training history, and nutritional information
              collected through our calculator and coaching services
            </li>
            <li>
              <strong>Communication data:</strong> messages you send through our contact form,
              booking forms, or directly to coaches
            </li>
            <li>
              <strong>Account and billing data:</strong> payment information processed through
              third-party payment processors
            </li>
          </ul>
          <p className="mt-3">
            We also automatically collect certain technical information when you visit our website,
            including IP address, browser type, referring URL, pages visited, and cookies. This data
            is collected through standard web analytics tools.
          </p>
        </Section>

        {/* ── 3. PURPOSES ── */}
        <Section title="3. WHY WE COLLECT YOUR INFORMATION">
          <p>
            We collect and use your personal information only for the following identified purposes:
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>To provide personal training, nutrition coaching, and fitness programming services</li>
            <li>To communicate with you about your training program, appointments, and account</li>
            <li>To process payments and manage billing</li>
            <li>
              To send promotional offers, newsletters, and fitness tips via email (with your express
              consent)
            </li>
            <li>
              To send SMS/text messages including appointment reminders, promotions, and fitness
              tips (with your separate express consent)
            </li>
            <li>To personalize your experience and improve our services</li>
            <li>To comply with legal obligations</li>
          </ul>
          <p className="mt-3">
            We will not use your information for purposes beyond those stated above without
            obtaining your additional consent.
          </p>
        </Section>

        {/* ── 4. CONSENT ── */}
        <Section title="4. CONSENT">
          <p>
            We obtain your consent before collecting, using, or disclosing your personal
            information. Consent may be express or implied depending on the sensitivity of the
            information:
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>
              <strong>Express consent</strong> is required for fitness and health data (which we
              treat as sensitive personal information), marketing email communications, and SMS/text
              messages. Express consent is obtained through clear opt-in mechanisms on our forms.
            </li>
            <li>
              <strong>Implied consent</strong> may be relied upon for basic contact information
              when you initiate a service inquiry or existing business relationship.
            </li>
          </ul>
          <p className="mt-3">
            You may withdraw your consent at any time by contacting our Privacy Officer, by
            unsubscribing from emails, or by replying STOP to any SMS message. Withdrawal of
            consent may affect our ability to provide certain services.
          </p>
        </Section>

        {/* ── 5. SMS/TEXT MESSAGING ── */}
        <Section title="5. SMS &amp; TEXT MESSAGING">
          <p>
            If you opt in to receive SMS/text messages from Eccentric Iron Fitness, the following
            applies:
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>Message frequency varies based on your coaching program and preferences</li>
            <li>Message and data rates may apply depending on your mobile carrier plan</li>
            <li>
              You may opt out at any time by replying <strong>STOP</strong> to any message
            </li>
            <li>
              For help, reply <strong>HELP</strong> to any message, or contact us at{' '}
              <a href="mailto:privacy@eccentriciron.ca" className="text-cyan hover:underline">
                privacy@eccentriciron.ca
              </a>
            </li>
            <li>Consent to receive text messages is not a condition of any purchase</li>
          </ul>
          <p className="mt-3 font-semibold">
            We will not sell, rent, or share your mobile phone number or SMS opt-in consent data
            with any third parties for marketing or promotional purposes. Mobile opt-in consent
            information will not be shared with or sold to third parties or affiliates for any
            purpose.
          </p>
        </Section>

        {/* ── 6. DISCLOSURE ── */}
        <Section title="6. DISCLOSURE TO THIRD PARTIES">
          <p>
            We do not sell your personal information. We may share your information with the
            following categories of third-party service providers who assist us in operating our
            business:
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>
              <strong>CRM and communications:</strong> GoHighLevel (for contact management, email,
              and SMS delivery)
            </li>
            <li>
              <strong>Database hosting:</strong> Supabase (PostgreSQL database with row-level
              security)
            </li>
            <li>
              <strong>Website hosting:</strong> Vercel (for website delivery and serverless
              functions)
            </li>
            <li>
              <strong>Payment processing:</strong> third-party payment processors as specified in
              coaching agreements
            </li>
            <li>
              <strong>Analytics:</strong> web analytics providers for aggregate usage statistics
            </li>
          </ul>
          <p className="mt-3">
            These providers are contractually bound to use your information only for the purposes
            we specify and to protect it with appropriate safeguards. We may also disclose
            information when required by law or to protect our legal rights.
          </p>
        </Section>

        {/* ── 7. CROSS-BORDER TRANSFERS ── */}
        <Section title="7. CROSS-BORDER DATA TRANSFERS">
          <p>
            Your personal information may be stored or processed outside of British Columbia,
            Canada, including in the United States, where it may be subject to the laws of those
            jurisdictions. Our third-party service providers (including GoHighLevel, Supabase, and
            Vercel) may process data in the United States.
          </p>
          <p className="mt-3">
            We take reasonable steps to ensure that any third-party service providers that process
            your information outside of Canada provide a comparable level of protection. By using
            our services, you acknowledge and consent to the transfer and processing of your
            information outside of Canada.
          </p>
        </Section>

        {/* ── 8. DATA RETENTION ── */}
        <Section title="8. DATA RETENTION">
          <p>We retain your personal information only as long as necessary to:</p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>Fulfill the purposes for which it was collected</li>
            <li>Maintain records required by law (including tax and business records)</li>
            <li>
              Retain consent records for a minimum of 3 years after the end of the business
              relationship (as required by CASL)
            </li>
          </ul>
          <p className="mt-3">
            When personal information is no longer needed, we securely dispose of it using
            appropriate methods.
          </p>
        </Section>

        {/* ── 9. SECURITY ── */}
        <Section title="9. SECURITY SAFEGUARDS">
          <p>
            We protect your personal information with reasonable administrative, technical, and
            physical safeguards, including:
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>Encrypted data transmission (HTTPS/TLS)</li>
            <li>Row-level security on database tables</li>
            <li>Access controls limiting who can view personal information</li>
            <li>Secure authentication for administrative access</li>
            <li>Regular review of security practices</li>
          </ul>
        </Section>

        {/* ── 10. YOUR RIGHTS ── */}
        <Section title="10. YOUR RIGHTS">
          <p>
            Under PIPEDA, BC PIPA, and applicable US privacy laws, you have the following rights:
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>
              <strong>Access:</strong> Request a copy of the personal information we hold about you
            </li>
            <li>
              <strong>Correction:</strong> Request that we correct inaccurate or incomplete
              information
            </li>
            <li>
              <strong>Deletion:</strong> Request deletion of your personal information (subject to
              legal retention requirements)
            </li>
            <li>
              <strong>Withdraw consent:</strong> Withdraw your consent to the collection, use, or
              disclosure of your information at any time
            </li>
            <li>
              <strong>Opt out of marketing:</strong> Unsubscribe from promotional emails or SMS at
              any time
            </li>
            <li>
              <strong>Non-discrimination:</strong> You will not be discriminated against for
              exercising your privacy rights
            </li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, contact our Privacy Officer at{' '}
            <a href="mailto:privacy@eccentriciron.ca" className="text-cyan hover:underline">
              privacy@eccentriciron.ca
            </a>{' '}
            or by phone at (604) 200-3390. We will respond within 30 business days.
          </p>
        </Section>

        {/* ── 11. CALIFORNIA RESIDENTS ── */}
        <Section title="11. ADDITIONAL RIGHTS FOR CALIFORNIA RESIDENTS">
          <p>
            If you are a California resident, you have the following additional rights under the
            California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA):
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>The right to know what personal information we collect, use, and disclose</li>
            <li>The right to request deletion of your personal information</li>
            <li>The right to correct inaccurate personal information</li>
            <li>The right to opt out of the sale or sharing of your personal information</li>
            <li>
              The right to limit use and disclosure of sensitive personal information
            </li>
            <li>The right to not be discriminated against for exercising your privacy rights</li>
          </ul>
          <p className="mt-3">
            We do not sell or share your personal information as defined by the CCPA/CPRA. To
            exercise your rights, contact us at{' '}
            <a href="mailto:privacy@eccentriciron.ca" className="text-cyan hover:underline">
              privacy@eccentriciron.ca
            </a>
            .
          </p>
        </Section>

        {/* ── 12. EMAIL COMMUNICATIONS ── */}
        <Section title="12. EMAIL COMMUNICATIONS">
          <p>
            All commercial emails from Eccentric Iron Fitness include our valid physical mailing
            address and a clear mechanism to unsubscribe from future communications. Unsubscribe
            requests are honored within 10 business days. We will not sell, transfer, or share
            your email address with third parties for their marketing purposes without your
            consent.
          </p>
        </Section>

        {/* ── 13. BREACH NOTIFICATION ── */}
        <Section title="13. PRIVACY BREACH NOTIFICATION">
          <p>
            In the event of a privacy breach that creates a real risk of significant harm to
            affected individuals, we will notify the affected individuals and the Office of the
            Information and Privacy Commissioner of British Columbia (OIPC) as required by BC PIPA,
            as well as the Office of the Privacy Commissioner of Canada as required by PIPEDA.
          </p>
        </Section>

        {/* ── 14. COOKIES ── */}
        <Section title="14. COOKIES &amp; TRACKING">
          <p>
            Our website uses essential cookies to ensure proper functionality. We may also use
            analytics cookies to understand how visitors use our site. You can control cookie
            settings through your browser preferences.
          </p>
        </Section>

        {/* ── 15. COMPLAINTS ── */}
        <Section title="15. COMPLAINTS">
          <p>
            If you have a complaint about our privacy practices, please contact our Privacy Officer
            first. If you are not satisfied with our response, you may file a complaint with:
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>
              <strong>Office of the Privacy Commissioner of Canada:</strong>{' '}
              <a
                href="https://www.priv.gc.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan hover:underline"
              >
                www.priv.gc.ca
              </a>
            </li>
            <li>
              <strong>
                Office of the Information and Privacy Commissioner for British Columbia:
              </strong>{' '}
              <a
                href="https://www.oipc.bc.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan hover:underline"
              >
                www.oipc.bc.ca
              </a>
            </li>
          </ul>
        </Section>

        {/* ── 16. CHANGES ── */}
        <Section title="16. CHANGES TO THIS POLICY">
          <p>
            We may update this Privacy Policy from time to time. We will notify you of material
            changes by posting the updated policy on our website with a revised &quot;Last
            Updated&quot; date. Your continued use of our services after changes are posted
            constitutes acceptance of the updated policy.
          </p>
        </Section>

        {/* ── 17. CONTACT ── */}
        <Section title="17. CONTACT US">
          <p>
            If you have questions about this Privacy Policy, contact our Privacy Officer:
          </p>
          <p className="mt-2 font-mono text-sm text-text-primary">
            Eccentric Iron Fitness<br />
            Attn: Privacy Officer<br />
            #2418-11280 Pazarena Place, Maple Ridge, BC V2X 9H8<br />
            Email:{' '}
            <a href="mailto:privacy@eccentriciron.ca" className="text-cyan hover:underline">
              privacy@eccentriciron.ca
            </a>
            <br />
            Phone:{' '}
            <a href="tel:+16042003390" className="text-cyan hover:underline">
              (604) 200-3390
            </a>
          </p>
        </Section>

        <p className="font-mono text-xs text-text-muted">Last updated: March 19, 2026</p>

        <p className="text-sm">
          <Link href="/terms" className="text-cyan hover:underline">
            View our Terms &amp; Conditions
          </Link>
        </p>
      </div>
    </Container>
  );
}
