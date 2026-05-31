import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';

import { LegalPageLayout } from '@shared/components/LegalPageLayout';
import { LegalList, LegalParagraph, LegalSection, LegalSubheading } from '@shared/components/LegalSection';

import { ReduxProvider } from '@global/store/ReduxProvider';
import { Footer } from '@modules/Footer';
import { Header } from '@modules/Header';

export const metadata: Metadata = {
  title: 'Terms of Use | Ortvest',
  description: 'Terms and conditions for using the ortvest.com website.',
  robots: { index: false, follow: false },
};

export default function TermsOfUsePage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  return (
    <ReduxProvider>
      <Header />
      <LegalPageLayout title="TERMS OF USE">
        <LegalSection number="1" title="General Provisions">
          <LegalParagraph>
            These Terms of Use (&quot;Terms&quot;) govern the conditions of use of the website ortvest.com
            (&quot;Website&quot;) operated by Ortvest (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;).
          </LegalParagraph>
          <LegalParagraph>
            By accessing or using the Website, you confirm that you have read, understood, and agreed to be bound by
            these Terms. If you do not agree, please discontinue use of the Website immediately.
          </LegalParagraph>
          <LegalParagraph>
            These Terms are addressed to business entities (B2B). The Website is not intended for consumers (natural
            persons acting outside the scope of business or professional activity).
          </LegalParagraph>
        </LegalSection>

        <LegalSection number="2" title="Services Described on the Website">
          <LegalParagraph>
            The Website presents information about services provided by Ortvest, including:
          </LegalParagraph>
          <LegalList items={['Web and mobile application development', 'UI/UX design', 'Digital marketing services']} />
          <LegalParagraph>
            The content of the Website is for informational purposes only and does not constitute a binding offer within
            the meaning of the Polish Civil Code, unless explicitly stated otherwise in a separate written agreement.
          </LegalParagraph>
        </LegalSection>

        <LegalSection number="3" title="Inquiry and Contact Forms">
          <LegalParagraph>
            The Website may include contact or inquiry forms allowing users to submit business inquiries to the Company.
          </LegalParagraph>
          <LegalSubheading>3.1 User obligations when submitting inquiries</LegalSubheading>
          <LegalParagraph>By submitting a form, you represent and warrant that:</LegalParagraph>
          <LegalList
            items={[
              'You are acting on behalf of a business entity and are duly authorised to do so',
              'All information provided is accurate, complete, and not misleading',
              'You are not submitting spam, automated requests, or content violating applicable law',
            ]}
          />
          <LegalSubheading>3.2 No contractual obligation</LegalSubheading>
          <LegalParagraph>
            Submission of an inquiry form does not create any contractual relationship between you and the Company. A
            contract is formed only upon execution of a separate written agreement signed by both parties.
          </LegalParagraph>
        </LegalSection>

        <LegalSection number="3A" title="Review Form">
          <LegalSubheading>3A.1 User obligations when submitting a review</LegalSubheading>
          <LegalParagraph>By submitting a review, you represent and warrant that:</LegalParagraph>
          <LegalList
            items={[
              'You are a current or former client of Ortvest and have personally experienced the services you describe',
              'All information provided is truthful, accurate, and based on genuine experience',
              'Your review does not contain false, misleading, defamatory, offensive, or unlawful content',
              'You are acting on behalf of a business entity and are authorised to do so',
            ]}
          />
          <LegalSubheading>3A.2 Licence to publish</LegalSubheading>
          <LegalParagraph>
            By submitting a review, you grant Ortvest a non-exclusive, royalty-free, worldwide, perpetual licence to
            publish, display, reproduce, and promote your review (including your name, role, and company) on the Website
            and in marketing materials. You may request removal of your review at any time by contacting
            contact@ortvest.com.
          </LegalParagraph>
          <LegalSubheading>3A.3 Moderation</LegalSubheading>
          <LegalParagraph>
            The Company reserves the right to moderate, edit for formatting, decline to publish, or remove any submitted
            review at its sole discretion, including reviews that violate these Terms or applicable law.
          </LegalParagraph>
          <LegalSubheading>3A.4 No compensation</LegalSubheading>
          <LegalParagraph>
            Submission of a review is voluntary and does not entitle you to any compensation, discount, or benefit unless
            explicitly agreed in writing.
          </LegalParagraph>
        </LegalSection>

        <LegalSection number="4" title="Intellectual Property">
          <LegalParagraph>
            All content published on the Website – including but not limited to texts, graphics, logos, icons, images,
            videos, code, and design – is the exclusive property of Ortvest or its licensors and is protected by:
          </LegalParagraph>
          <LegalList
            items={[
              'Polish Act of 4 February 1994 on Copyright and Related Rights',
              'Regulation (EU) 2017/1001 on the European Union trade mark',
              'Other applicable intellectual property laws',
            ]}
          />
          <LegalParagraph>You may NOT, without the prior written consent of the Company:</LegalParagraph>
          <LegalList
            items={[
              'Copy, reproduce, distribute, or publish any content from the Website',
              'Modify, translate, or create derivative works based on Website content',
              "Use the Company's name, logo, or trademarks in any commercial context",
            ]}
          />
          <LegalParagraph>
            You may view and print Website content solely for your own non-commercial, internal business evaluation
            purposes.
          </LegalParagraph>
        </LegalSection>

        <LegalSection number="5" title="Prohibited Uses">
          <LegalParagraph>When using the Website, you agree NOT to:</LegalParagraph>
          <LegalList
            items={[
              'Attempt to gain unauthorised access to any part of the Website or its servers',
              'Introduce viruses, malware, or any other harmful code',
              'Use automated tools (bots, crawlers, scrapers) to extract data from the Website without prior written consent',
              'Engage in any activity that disrupts or interferes with the proper functioning of the Website',
              'Use the Website for any unlawful purpose or in violation of applicable regulations',
              'Impersonate the Company or any other person or entity',
            ]}
          />
        </LegalSection>

        <LegalSection number="6" title="Disclaimer of Warranties">
          <LegalParagraph>
            The Website and its content are provided on an &quot;as is&quot; and &quot;as available&quot; basis, without
            warranties of any kind, express or implied.
          </LegalParagraph>
          <LegalParagraph>The Company does not warrant that:</LegalParagraph>
          <LegalList
            items={[
              'The Website will be available without interruption or error',
              'The content is complete, accurate, or up to date',
              'The Website is free from viruses or other harmful components',
            ]}
          />
          <LegalParagraph>
            To the fullest extent permitted by applicable law, the Company disclaims all warranties, including implied
            warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </LegalParagraph>
        </LegalSection>

        <LegalSection number="7" title="Limitation of Liability">
          <LegalParagraph>
            To the maximum extent permitted by Polish and EU law, the Company shall not be liable for:
          </LegalParagraph>
          <LegalList
            items={[
              'Any indirect, incidental, special, or consequential damages arising from your use of the Website',
              'Loss of data, profits, business, or reputation',
              'Damages resulting from reliance on information presented on the Website',
              'Temporary unavailability of the Website due to maintenance, technical failures, or force majeure',
            ]}
          />
          <LegalParagraph>
            The Company&apos;s total liability for any claim arising from these Terms or use of the Website shall not
            exceed EUR 500, to the extent permitted by law.
          </LegalParagraph>
        </LegalSection>

        <LegalSection number="8" title="Third-Party Links">
          <LegalParagraph>
            The Website may contain links to external websites operated by third parties. These links are provided for
            informational convenience only. The Company:
          </LegalParagraph>
          <LegalList
            items={[
              'Does not control or endorse the content of linked websites',
              'Is not responsible for their privacy practices, content, or availability',
              'Recommends reviewing the terms and policies of any third-party websites you visit',
            ]}
          />
        </LegalSection>

        <LegalSection number="9" title="Availability and Modifications">
          <LegalParagraph>
            The Company reserves the right, at its sole discretion and without prior notice, to:
          </LegalParagraph>
          <LegalList
            items={[
              'Modify, suspend, or discontinue the Website (or any part thereof) at any time',
              'Update, amend, or remove content from the Website',
              'Restrict access to all or part of the Website',
            ]}
          />
          <LegalParagraph>
            The Company shall not be liable for any consequences resulting from such modifications or unavailability.
          </LegalParagraph>
        </LegalSection>

        <LegalSection number="10" title="Amendments to These Terms">
          <LegalParagraph>
            The Company reserves the right to update these Terms at any time. The updated version will be published on
            this page with a revised &quot;Last updated&quot; date.
          </LegalParagraph>
          <LegalParagraph>
            Continued use of the Website after publication of the updated Terms constitutes acceptance of the changes.
            If you do not agree with the updated Terms, you must discontinue use of the Website.
          </LegalParagraph>
        </LegalSection>

        <LegalSection number="11" title="Governing Law and Jurisdiction">
          <LegalParagraph>
            These Terms are governed by and construed in accordance with the law of the Republic of Poland, in
            particular:
          </LegalParagraph>
          <LegalList
            items={[
              'The Polish Civil Code (Kodeks cywilny) of 23 April 1964',
              'The Polish Act on the Provision of Electronic Services (Ustawa o swiadczeniu uslug droga elektroniczna) of 18 July 2002',
              'Applicable EU regulations, including GDPR',
            ]}
          />
          <LegalParagraph>
            Any disputes arising from or related to these Terms shall be subject to the exclusive jurisdiction of the
            competent courts in Poland.
          </LegalParagraph>
          <LegalSubheading>11.1 Clients in the United States</LegalSubheading>
          <LegalParagraph>
            If you are accessing the Website from the United States, you acknowledge that the Website is operated from
            Poland and governed by Polish and EU law. No representations are made that the content of the Website
            complies with US federal or state laws. Use of the Website from the US is at your own discretion and risk.
            The Company does not target US consumers; these Terms apply exclusively in a B2B context.
          </LegalParagraph>
          <LegalSubheading>11.2 Clients in Ukraine</LegalSubheading>
          <LegalParagraph>
            If you are accessing the Website from Ukraine, you acknowledge that the governing law of these Terms is
            Polish law and that any contractual relationship between you and the Company shall be subject to Polish
            jurisdiction. The parties may agree in a separate written contract to alternative dispute resolution
            mechanisms (e.g., ICC arbitration) if needed for a specific engagement.
          </LegalParagraph>
        </LegalSection>

        <LegalSection number="12" title="Severability">
          <LegalParagraph>
            If any provision of these Terms is found to be invalid, illegal, or unenforceable by a competent court, the
            remaining provisions shall continue in full force and effect. The invalid provision shall be replaced by a
            valid provision that most closely reflects the original intent.
          </LegalParagraph>
        </LegalSection>

        <LegalSection number="13" title="Contact">
          <LegalParagraph>
            For any questions regarding these Terms of Use, please contact us:
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
