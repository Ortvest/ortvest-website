import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';

import { ReduxProvider } from '@global/store/ReduxProvider';
import { Footer } from '@modules/Footer';
import { Header } from '@modules/Header';
import { LegalPageLayout } from '@shared/components/LegalPageLayout';
import { LegalList, LegalParagraph, LegalSection, LegalSubheading } from '@shared/components/LegalSection';

export const metadata: Metadata = {
  title: 'Privacy Policy | Ortvest',
  description: 'How Ortvest collects, uses and protects your personal data.',
  robots: { index: false, follow: false },
};

export default function PrivacyPolicyPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  return (
    <ReduxProvider>
      <Header />
      <LegalPageLayout title="PRIVACY POLICY">
        <LegalSection number="1" title="General Information">
          <LegalParagraph>
            This Privacy Policy describes how Ortvest (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;) collects,
            uses, stores, and protects personal data of users (&quot;you&quot;) who visit or interact with ortvest.com
            (&quot;Website&quot;).
          </LegalParagraph>
          <LegalParagraph>We process personal data in accordance with:</LegalParagraph>
          <LegalList
            items={[
              'Regulation (EU) 2016/679 (General Data Protection Regulation – GDPR)',
              'Polish Act of 10 May 2018 on the Protection of Personal Data',
              'Polish Telecommunications Law',
            ]}
          />
        </LegalSection>

        <LegalSection number="2" title="Data Controller">
          <LegalParagraph>The controller of your personal data is:</LegalParagraph>
          <LegalParagraph>
            Ortvest
            <br />
            Website: ortvest.com
            <br />
            Contact email: contact@ortvest.com
          </LegalParagraph>
          <LegalParagraph>
            For all matters related to personal data protection, you may contact us at the email address above.
          </LegalParagraph>
        </LegalSection>

        <LegalSection number="3" title="What Data We Collect">
          <LegalParagraph>When you submit the contact form on our Website, we collect the following data:</LegalParagraph>
          <LegalSubheading>3.1 Data you provide directly (contact form)</LegalSubheading>
          <LegalList
            items={[
              'Name – your first and/or last name',
              'Email address – used to reply to your inquiry',
              'Project type (optional) – one of the following categories you select: P2P, Community, Hospitality, Conversion Site, Sporttech, Logistics, Agritech, Other',
              'Budget (optional) – selected budget range: Small task / consult, €1k–5k, €5k–15k, €15k+',
              'Consultation type – type of session requested: Discovery Call (Free) or Strategy Session (€199)',
              'Message (optional) – a free-text description of your project and timeline',
            ]}
          />
          <LegalSubheading>3.2 Data collected automatically</LegalSubheading>
          <LegalList
            items={[
              'IP address',
              'Browser type and version',
              'Pages visited and time of visit',
              'Referral source (how you found the Website)',
            ]}
          />
          <LegalParagraph>
            This data is collected via analytics tools (e.g., Google Analytics) to improve Website performance and user
            experience.
          </LegalParagraph>
          <LegalParagraph>
            We do NOT collect sensitive personal data (health, political views, religious beliefs, financial details,
            etc.).
          </LegalParagraph>
        </LegalSection>

        <LegalSection number="4" title="Purposes and Legal Bases for Processing">
          <LegalParagraph>We process your data for the following purposes:</LegalParagraph>
          <LegalSubheading>4.1 Responding to inquiries (contact form)</LegalSubheading>
          <LegalParagraph>
            Legal basis: Art. 6(1)(b) GDPR – processing is necessary for taking steps at the request of the data subject
            prior to entering into a contract.
          </LegalParagraph>
          <LegalSubheading>4.2 Direct marketing of our services (B2B)</LegalSubheading>
          <LegalParagraph>
            Legal basis: Art. 6(1)(f) GDPR – legitimate interest of the Company (marketing own services to business
            clients).
          </LegalParagraph>
          <LegalSubheading>4.3 Analytics and Website improvement</LegalSubheading>
          <LegalParagraph>
            Legal basis: Art. 6(1)(f) GDPR – legitimate interest in understanding how the Website is used and improving
            user experience.
          </LegalParagraph>
          <LegalSubheading>4.4 Legal obligations</LegalSubheading>
          <LegalParagraph>
            Legal basis: Art. 6(1)(c) GDPR – compliance with applicable legal obligations (e.g., accounting, tax
            records).
          </LegalParagraph>
        </LegalSection>

        <LegalSection number="5" title="Cookies and Tracking Technologies">
          <LegalParagraph>
            Our Website uses cookies and similar technologies. Cookies are small text files stored on your device.
          </LegalParagraph>
          <LegalParagraph>We use:</LegalParagraph>
          <LegalList
            items={[
              'Necessary cookies – required for the proper functioning of the Website',
              'Analytics cookies – e.g., Google Analytics (to analyse traffic and usage patterns)',
              'Marketing cookies – only if you have given explicit consent',
            ]}
          />
          <LegalParagraph>
            You can manage cookie preferences through your browser settings or via our cookie consent banner. Refusing
            analytics or marketing cookies will not affect access to the Website.
          </LegalParagraph>
        </LegalSection>

        <LegalSection number="6" title="Data Sharing">
          <LegalParagraph>
            We do not sell your personal data. We may share data with trusted third parties only to the extent necessary:
          </LegalParagraph>
          <LegalList
            items={[
              'IT service providers and hosting companies (data processors under GDPR)',
              'Email and CRM platforms (e.g., for managing inquiries)',
              'Analytics providers (e.g., Google Analytics)',
              'Legal, tax, or financial advisors, where required',
            ]}
          />
          <LegalParagraph>
            All third-party processors are bound by data processing agreements in compliance with GDPR Art. 28.
          </LegalParagraph>
        </LegalSection>

        <LegalSection number="7" title="International Data Transfers">
          <LegalParagraph>
            Due to the international nature of our business, personal data may be transferred to and processed in
            countries outside the European Economic Area (EEA), including the United States and Ukraine. We ensure that
            all such transfers are carried out with appropriate safeguards as required by Chapter V of GDPR:
          </LegalParagraph>
          <LegalSubheading>7.1 Transfers to the United States</LegalSubheading>
          <LegalParagraph>
            Transfers to the US may occur via service providers (e.g., Google, cloud platforms). These transfers are
            carried out under Standard Contractual Clauses (SCCs) approved by the European Commission (Commission
            Decision 2021/914), and where applicable, supplementary technical and organisational measures to ensure an
            equivalent level of data protection.
          </LegalParagraph>
          <LegalSubheading>7.2 Transfers to Ukraine</LegalSubheading>
          <LegalParagraph>
            Ukraine is not listed among countries recognised by the European Commission as providing an adequate level
            of data protection. Where personal data is transferred to Ukraine (e.g., for development or operational
            purposes), we rely on Standard Contractual Clauses (Art. 46(2)(c) GDPR) and implement additional safeguards
            including data minimisation, encryption in transit and at rest, and access controls. Where required, we will
            seek your explicit consent for such transfers (Art. 49(1)(a) GDPR).
          </LegalParagraph>
          <LegalParagraph>
            You may request a copy of the safeguards applied to international transfers by contacting us at
            contact@ortvest.com.
          </LegalParagraph>
        </LegalSection>

        <LegalSection number="8" title="Data Retention">
          <LegalParagraph>We retain your personal data for as long as necessary:</LegalParagraph>
          <LegalList
            items={[
              'Inquiry data: up to 3 years from the last contact, or until you request deletion',
              'Client data (if a contract is concluded): 5 years from the end of the business relationship (tax and accounting requirements)',
              'Analytics data: as per the settings of the analytics provider (typically up to 26 months)',
            ]}
          />
        </LegalSection>

        <LegalSection number="9" title="Your Rights">
          <LegalParagraph>Under GDPR, you have the following rights regarding your personal data:</LegalParagraph>
          <LegalList
            items={[
              'Right of access (Art. 15 GDPR) – obtain a copy of your data',
              'Right to rectification (Art. 16 GDPR) – correct inaccurate data',
              'Right to erasure / "right to be forgotten" (Art. 17 GDPR)',
              'Right to restriction of processing (Art. 18 GDPR)',
              'Right to data portability (Art. 20 GDPR)',
              'Right to object to processing (Art. 21 GDPR) – including direct marketing',
              'Right to withdraw consent at any time (where processing is based on consent)',
            ]}
          />
          <LegalParagraph>
            To exercise any of these rights, contact us at: contact@ortvest.com
            <br />
            We will respond within 30 days as required by GDPR Art. 12.
          </LegalParagraph>
        </LegalSection>

        <LegalSection number="10" title="Right to Lodge a Complaint">
          <LegalParagraph>
            If you believe we are processing your data unlawfully, you have the right to lodge a complaint with the
            Polish supervisory authority:
          </LegalParagraph>
          <LegalParagraph>
            Urzad Ochrony Danych Osobowych (UODO)
            <br />
            ul. Stawki 2, 00-193 Warsaw, Poland
            <br />
            Website: uodo.gov.pl
            <br />
            Phone: +48 22 531 03 00
          </LegalParagraph>
        </LegalSection>

        <LegalSection number="11" title="Data Security">
          <LegalParagraph>
            We implement appropriate technical and organisational measures to protect your personal data against
            unauthorised access, loss, disclosure, or destruction. These include:
          </LegalParagraph>
          <LegalList
            items={[
              'Encrypted data transmission (SSL/TLS)',
              'Access controls and authentication',
              'Regular security reviews',
            ]}
          />
        </LegalSection>

        <LegalSection number="12" title="Links to Third-Party Websites">
          <LegalParagraph>
            Our Website may contain links to external websites. We are not responsible for the privacy practices of
            third-party websites and encourage you to review their privacy policies separately.
          </LegalParagraph>
        </LegalSection>

        <LegalSection number="13" title="Changes to This Privacy Policy">
          <LegalParagraph>
            We reserve the right to update this Privacy Policy at any time. The current version will always be available
            on this page with the &quot;Last updated&quot; date. Continued use of the Website after changes constitutes
            acceptance of the updated Policy.
          </LegalParagraph>
        </LegalSection>

        <LegalSection number="14" title="Contact">
          <LegalParagraph>
            For any questions about this Privacy Policy or personal data processing, please contact us:
            <br />
            Email: contact@ortvest.com
            <br />
            Website: ortvest.com
          </LegalParagraph>
        </LegalSection>
      </LegalPageLayout>
      <Footer />
    </ReduxProvider>
  );
}
