import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Eccentric Iron Fitness',
  description:
    'Terms and conditions for using the Eccentric Iron Fitness website and services.',
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

export default function TermsPage() {
  return (
    <Container as="main" className="py-16">
      <h1 className="font-heading text-4xl font-extrabold uppercase tracking-tight text-text-primary md:text-5xl">
        TERMS &amp; CONDITIONS
      </h1>
      <div className="mt-2 h-[3px] w-24 bg-cyan" />

      <div className="mt-8 max-w-3xl space-y-6 font-body text-base leading-relaxed text-text-secondary">
        <p>
          These Terms &amp; Conditions (&quot;Terms&quot;) govern your use of the Eccentric Iron
          Fitness website (eccentriciron.ca) and related services. By accessing or using our
          website, you agree to be bound by these Terms. If you do not agree, please do not use
          our website or services.
        </p>
        <p>
          Eccentric Iron Fitness is operated by Carver Lloyd, located at #2418-11280 Pazarena
          Place, Maple Ridge, British Columbia, V2X 9H8, Canada.
        </p>

        {/* ── 1. SERVICES ── */}
        <Section title="1. SERVICES">
          <p>
            Eccentric Iron Fitness provides personal training, nutrition coaching, fitness
            programming, and related wellness services through certified coaches. Services are
            available online (province-wide and internationally) and, where specified, in-person
            in select areas of British Columbia.
          </p>
          <p className="mt-3">
            Service availability, pricing, and specific terms are outlined in individual coaching
            agreements between you and your assigned coach. These Terms apply in addition to any
            coaching agreement.
          </p>
        </Section>

        {/* ── 2. ELIGIBILITY ── */}
        <Section title="2. ELIGIBILITY">
          <p>
            You must be at least 13 years old to use our website. If you are under 18, you must
            have parental or guardian consent to use our services. By using our services, you
            represent that you meet these age requirements.
          </p>
        </Section>

        {/* ── 3. HEALTH DISCLAIMER ── */}
        <Section title="3. HEALTH &amp; FITNESS DISCLAIMER">
          <p>
            <strong>
              All fitness, nutrition, and wellness information provided by Eccentric Iron Fitness
              is for informational and educational purposes only. It is not a substitute for
              professional medical advice, diagnosis, or treatment.
            </strong>
          </p>
          <p className="mt-3">
            You should consult your physician, healthcare provider, or other qualified medical
            professional before starting any new exercise program, dietary regimen, or wellness
            plan, particularly if you have any pre-existing medical conditions, injuries, or health
            concerns.
          </p>
          <p className="mt-3">
            By using our services, you acknowledge that:
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>
              Physical exercise carries inherent risks including but not limited to injury,
              disability, or death
            </li>
            <li>
              You voluntarily assume all risks associated with any fitness or nutrition program
            </li>
            <li>
              Eccentric Iron Fitness and its coaches are not liable for any injuries, health
              complications, or adverse effects resulting from following our advice, programs, or
              services
            </li>
            <li>
              Results vary from person to person and are not guaranteed
            </li>
          </ul>
        </Section>

        {/* ── 4. NUTRITION CALCULATOR ── */}
        <Section title="4. NUTRITION CALCULATOR">
          <p>
            Our TDEE and macro calculator provides estimated nutritional targets based on the
            Mifflin-St Jeor equation and standard activity multipliers. These are general
            estimates for informational purposes only and should not be considered medical or
            dietary advice. Individual needs vary based on metabolic factors, health conditions,
            and other variables not captured by the calculator.
          </p>
        </Section>

        {/* ── 5. USER CONTENT ── */}
        <Section title="5. USER SUBMISSIONS &amp; COMMUNICATIONS">
          <p>
            When you submit information through our forms (contact form, booking form, calculator,
            or other submissions), you grant Eccentric Iron Fitness the right to use that
            information for the purposes described in our{' '}
            <Link href="/privacy" className="text-cyan hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
          <p className="mt-3">
            You agree not to submit any content that is unlawful, threatening, abusive, defamatory,
            or otherwise objectionable.
          </p>
        </Section>

        {/* ── 6. PAYMENTS ── */}
        <Section title="6. PAYMENTS &amp; REFUNDS">
          <p>
            Payment terms, billing schedules, and refund policies are specified in individual
            coaching agreements between you and your assigned coach. All prices are listed in
            Canadian dollars (CAD) unless otherwise stated.
          </p>
          <p className="mt-3">
            We reserve the right to modify pricing at any time. Price changes will not affect
            existing coaching agreements already in effect unless otherwise specified in the
            agreement.
          </p>
        </Section>

        {/* ── 7. ELECTRONIC COMMUNICATIONS ── */}
        <Section title="7. ELECTRONIC COMMUNICATIONS CONSENT">
          <p>
            By providing your contact information and opting in through our forms, you consent to
            receive electronic communications from us as follows:
          </p>

          <h3 className="mt-4 font-heading text-lg font-bold uppercase tracking-widest text-text-primary">
            EMAIL
          </h3>
          <p>
            By providing your email address and opting in, you consent to receive commercial
            electronic messages from Eccentric Iron Fitness including newsletters, promotions, and
            fitness tips. You can unsubscribe at any time using the unsubscribe link in any email.
            Unsubscribe requests are processed within 10 business days. Our emails include our
            business name, mailing address, and a functioning unsubscribe mechanism as required by
            CASL and the CAN-SPAM Act.
          </p>

          <h3 className="mt-4 font-heading text-lg font-bold uppercase tracking-widest text-text-primary">
            SMS / TEXT MESSAGES
          </h3>
          <p>
            By providing your phone number and checking the SMS consent box on our forms, you agree
            to receive SMS/text messages from Eccentric Iron Fitness including appointment
            reminders, promotions, and fitness tips.
          </p>
          <ul className="ml-6 mt-2 list-disc space-y-1">
            <li>Message frequency varies</li>
            <li>Message and data rates may apply</li>
            <li>
              Reply <strong>STOP</strong> to opt out at any time
            </li>
            <li>
              Reply <strong>HELP</strong> for help
            </li>
            <li>
              <strong>
                Consent to receive text messages is not a condition of purchasing any goods or
                services
              </strong>
            </li>
            <li>
              Carriers are not liable for delayed or undelivered messages
            </li>
            <li>
              You must be <strong>18 years or older</strong> to opt in to SMS communications
            </li>
          </ul>
          <p className="mt-3">
            We will not sell, rent, or share your mobile phone number or SMS opt-in consent data
            with any third parties for marketing or promotional purposes.
          </p>
        </Section>

        {/* ── 8. INTELLECTUAL PROPERTY ── */}
        <Section title="8. INTELLECTUAL PROPERTY">
          <p>
            All content on this website — including text, graphics, logos, images, videos, training
            programs, and software — is the property of Eccentric Iron Fitness and is protected by
            Canadian and international copyright, trademark, and intellectual property laws.
          </p>
          <p className="mt-3">
            You may not reproduce, distribute, modify, display, or create derivative works from
            any content on this website without our prior written consent. Personal, non-commercial
            use of training programs provided through our coaching services is permitted as part of
            your coaching agreement.
          </p>
        </Section>

        {/* ── 9. LIMITATION OF LIABILITY ── */}
        <Section title="9. LIMITATION OF LIABILITY">
          <p>
            To the maximum extent permitted by law, Eccentric Iron Fitness, its owners, coaches,
            employees, and affiliates shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages arising from your use of our website or services,
            including but not limited to personal injury, property damage, lost profits, or data
            loss.
          </p>
          <p className="mt-3">
            Our total liability for any claim arising from or related to these Terms or our
            services shall not exceed the amount you paid to us in the twelve (12) months
            preceding the claim.
          </p>
        </Section>

        {/* ── 10. INDEMNIFICATION ── */}
        <Section title="10. INDEMNIFICATION">
          <p>
            You agree to indemnify and hold harmless Eccentric Iron Fitness, its owners, coaches,
            employees, and affiliates from any claims, damages, losses, or expenses (including
            legal fees) arising from your use of our services, your violation of these Terms, or
            your infringement of any third-party rights.
          </p>
        </Section>

        {/* ── 11. TERMINATION ── */}
        <Section title="11. TERMINATION">
          <p>
            We may terminate or suspend your access to our website or services at any time, with
            or without cause and without prior notice. Upon termination, your right to use our
            services ceases immediately. Provisions that by their nature should survive termination
            (including disclaimers, limitation of liability, and indemnification) shall remain in
            effect.
          </p>
        </Section>

        {/* ── 12. THIRD-PARTY LINKS ── */}
        <Section title="12. THIRD-PARTY LINKS &amp; SERVICES">
          <p>
            Our website may contain links to third-party websites or services not operated by us.
            We are not responsible for the content, privacy practices, or terms of any third-party
            sites. We encourage you to review the policies of any third-party site you visit.
          </p>
        </Section>

        {/* ── 13. GOVERNING LAW ── */}
        <Section title="13. GOVERNING LAW &amp; JURISDICTION">
          <p>
            These Terms are governed by and construed in accordance with the laws of the Province
            of British Columbia and the federal laws of Canada applicable therein. Any disputes
            arising from these Terms or your use of our services shall be subject to the exclusive
            jurisdiction of the courts of British Columbia.
          </p>
        </Section>

        {/* ── 14. CHANGES ── */}
        <Section title="14. CHANGES TO THESE TERMS">
          <p>
            We reserve the right to modify these Terms at any time. Material changes will be posted
            on this page with an updated &quot;Last Updated&quot; date. Your continued use of our
            website or services after changes are posted constitutes your acceptance of the
            modified Terms.
          </p>
        </Section>

        {/* ── 15. SEVERABILITY ── */}
        <Section title="15. SEVERABILITY">
          <p>
            If any provision of these Terms is found to be invalid or unenforceable, the remaining
            provisions shall continue in full force and effect.
          </p>
        </Section>

        {/* ── 16. CONTACT ── */}
        <Section title="16. CONTACT US">
          <p>
            If you have questions about these Terms &amp; Conditions, contact us:
          </p>
          <p className="mt-2 font-mono text-sm text-text-primary">
            Eccentric Iron Fitness<br />
            #2418-11280 Pazarena Place, Maple Ridge, BC V2X 9H8<br />
            Email:{' '}
            <a href="mailto:carver@eccentriciron.ca" className="text-cyan hover:underline">
              carver@eccentriciron.ca
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
          <Link href="/privacy" className="text-cyan hover:underline">
            View our Privacy Policy
          </Link>
        </p>
      </div>
    </Container>
  );
}
