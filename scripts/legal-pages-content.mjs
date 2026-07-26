/** Canonical legal page content — July 2026 update. Applied to en, pl, and ua (English pending translation). */

export const legalPages = {
  privacy: {
    metadata: {
      title: 'Privacy Policy | Ortvest',
      description: 'How Ortvest collects, uses and protects your personal data.',
    },
    title: 'PRIVACY POLICY',
    meta: 'ortvest.com | Last updated: July 2026',
    sections: [
      {
        number: '1',
        title: 'General Information',
        blocks: [
          {
            type: 'paragraph',
            text: 'This Privacy Policy describes how Ortvest ("Company", "we", "us") collects, uses, stores, and protects personal data of users ("you") who visit or interact with ortvest.com ("Website").',
          },
          { type: 'paragraph', text: 'We process personal data in accordance with:' },
          {
            type: 'list',
            items: [
              'Regulation (EU) 2016/679 (General Data Protection Regulation – GDPR)',
              'Polish Act of 10 May 2018 on the Protection of Personal Data',
              'Polish Telecommunications Law',
            ],
          },
        ],
      },
      {
        number: '2',
        title: 'Data Controller',
        blocks: [
          { type: 'paragraph', text: 'The controller of your personal data is:' },
          {
            type: 'paragraph',
            text: 'Ortvest sp. z o.o.\nul. Szamarzewskiego 21/2, Poznań, Poland\nNIP: 7812111756 | KRS: 0001244461\nWebsite: ortvest.com\nContact email: contact@ortvest.com',
          },
          {
            type: 'paragraph',
            text: 'For all matters related to personal data protection, you may contact us at the email address above.',
          },
        ],
      },
      {
        number: '3',
        title: 'What Data We Collect',
        blocks: [
          {
            type: 'paragraph',
            text: 'When you submit a form on our Website, we collect the following data:',
          },
          { type: 'subheading', text: '3.1 Contact form' },
          { type: 'paragraph', text: 'Contact form:' },
          {
            type: 'list',
            items: [
              'Name – your first and/or last name',
              'Email address – used to reply to your inquiry',
              'Project type (optional) – one or more of the following categories you select: P2P, Community & clubs, Logistics, Other',
              'Budget (optional) – selected budget range: €10–25k, €25–50k, €50–100k, €100k+, or Not sure yet',
              'Consultation type – type of session requested: Discovery Call (Free) or Cold Start Audit (€199)',
              'Message (optional) – a free-text description of your project and timeline',
            ],
          },
          { type: 'subheading', text: '3.2 Review form' },
          {
            type: 'list',
            items: [
              'Name – your first and/or last name',
              'Role – your job title or position',
              'Company – the name of your organisation',
              'Rating – a numeric or star rating of your experience',
              'Review text – a free-text description of your experience working with us',
            ],
          },
          { type: 'subheading', text: '3.3 Partnership application form' },
          {
            type: 'list',
            items: [
              'Name – your first and/or last name',
              'Email address – used to respond to your application',
              'Product description – a free-text description of what you are building, including the participants on each side of your platform',
              'Market access – a free-text description of which side of your platform you can currently reach and approximately how many participants',
              'Development stage – idea, prototype, live with users, or generating revenue',
              'Funding status – bootstrapped, pre-seed raised, seed raised, or Series A or beyond',
              'Preferred engagement model – embedded team, build plus equity, technical co-founder function, or not sure',
              'Previous attempts – a free-text description of what you have already tried and why it did not work',
            ],
          },
          {
            type: 'paragraph',
            text: 'Free-text fields in this form may contain information about your business, your team, or third parties. Please do not include personal data of other individuals unless you have a lawful basis to share it with us, and do not include commercially sensitive information unless a non-disclosure agreement is in place (see our Terms of Use).',
          },
          { type: 'subheading', text: '3.4 Data collected automatically' },
          {
            type: 'list',
            items: [
              'IP address',
              'Browser type and version',
              'Pages visited and time of visit',
              'Referral source (how you found the Website)',
            ],
          },
          {
            type: 'paragraph',
            text: 'This data is collected via analytics tools (e.g., Google Analytics) to improve Website performance and user experience.',
          },
          {
            type: 'paragraph',
            text: 'We do NOT collect sensitive personal data (health, political views, religious beliefs, financial details, etc.).',
          },
        ],
      },
      {
        number: '4',
        title: 'Purposes and Legal Bases for Processing',
        blocks: [
          { type: 'paragraph', text: 'We process your data for the following purposes:' },
          { type: 'subheading', text: '4.1 Responding to inquiries (contact form)' },
          {
            type: 'paragraph',
            text: 'Legal basis: Art. 6(1)(b) GDPR – processing is necessary for taking steps at the request of the data subject prior to entering into a contract.',
          },
          { type: 'subheading', text: '4.2 Direct marketing of our services (B2B)' },
          {
            type: 'paragraph',
            text: 'Legal basis: Art. 6(1)(f) GDPR – legitimate interest of the Company (marketing own services to business clients).',
          },
          { type: 'subheading', text: '4.3 Analytics and Website improvement' },
          {
            type: 'paragraph',
            text: 'Legal basis: Art. 6(1)(f) GDPR – legitimate interest in understanding how the Website is used and improving user experience.',
          },
          { type: 'subheading', text: '4.4 Legal obligations' },
          {
            type: 'paragraph',
            text: 'Legal basis: Art. 6(1)(c) GDPR – compliance with applicable legal obligations (e.g., accounting, tax records).',
          },
          { type: 'subheading', text: '4.5 Publishing and displaying client reviews' },
          {
            type: 'paragraph',
            text: 'We process review form data to publish client testimonials on our Website, subject to moderation.',
          },
          {
            type: 'paragraph',
            text: 'Legal basis: Art. 6(1)(a) GDPR – consent. By submitting the review form, you voluntarily provide data intended for public display. You may withdraw consent at any time by contacting contact@ortvest.com, and we will remove your review.',
          },
          { type: 'subheading', text: '4.6 Evaluating partnership applications' },
          {
            type: 'paragraph',
            text: 'We process partnership application data to assess whether a proposed engagement is a suitable fit, to respond to your application, and to prepare for potential contractual negotiations.',
          },
          {
            type: 'paragraph',
            text: 'Legal basis: Art. 6(1)(b) GDPR – processing is necessary for taking steps at your request prior to entering into a contract.',
          },
          {
            type: 'paragraph',
            text: 'Partnership application data is reviewed internally and is not published, shared with other applicants, or used for any purpose other than evaluating and responding to your application.',
          },
        ],
      },
      {
        number: '5',
        title: 'Cookies and Tracking Technologies',
        blocks: [
          {
            type: 'paragraph',
            text: 'Our Website uses cookies and similar technologies. Cookies are small text files stored on your device.',
          },
          { type: 'paragraph', text: 'We use:' },
          {
            type: 'list',
            items: [
              'Necessary cookies – required for the proper functioning of the Website',
              'Analytics cookies – e.g., Google Analytics (to analyse traffic and usage patterns)',
              'Marketing cookies – only if you have given explicit consent',
            ],
          },
          {
            type: 'paragraph',
            text: 'You can manage cookie preferences through your browser settings or via our cookie consent banner. Refusing analytics or marketing cookies will not affect access to the Website.',
          },
        ],
      },
      {
        number: '6',
        title: 'Data Sharing',
        blocks: [
          {
            type: 'paragraph',
            text: 'We do not sell your personal data. We may share data with trusted third parties only to the extent necessary:',
          },
          {
            type: 'list',
            items: [
              'IT service providers and hosting companies (data processors under GDPR)',
              'Email and CRM platforms (e.g., for managing inquiries)',
              'Analytics providers (e.g., Google Analytics)',
              'Legal, tax, or financial advisors, where required',
            ],
          },
          {
            type: 'paragraph',
            text: 'All third-party processors are bound by data processing agreements in compliance with GDPR Art. 28.',
          },
        ],
      },
      {
        number: '7',
        title: 'International Data Transfers',
        blocks: [
          {
            type: 'paragraph',
            text: 'Due to the international nature of our business, personal data may be transferred to and processed in countries outside the European Economic Area (EEA), including the United States and Ukraine. We ensure that all such transfers are carried out with appropriate safeguards as required by Chapter V of GDPR:',
          },
          { type: 'subheading', text: '7.1 Transfers to the United States' },
          {
            type: 'paragraph',
            text: 'Transfers to the US may occur via service providers (e.g., Google, cloud platforms). These transfers are carried out under Standard Contractual Clauses (SCCs) approved by the European Commission (Commission Decision 2021/914), and where applicable, supplementary technical and organisational measures to ensure an equivalent level of data protection.',
          },
          { type: 'subheading', text: '7.2 Transfers to Ukraine' },
          {
            type: 'paragraph',
            text: 'Ukraine is not listed among countries recognised by the European Commission as providing an adequate level of data protection. Where personal data is transferred to Ukraine (e.g., for development or operational purposes), we rely on Standard Contractual Clauses (Art. 46(2)(c) GDPR) and implement additional safeguards including data minimisation, encryption in transit and at rest, and access controls. Where required, we will seek your explicit consent for such transfers (Art. 49(1)(a) GDPR).',
          },
          {
            type: 'paragraph',
            text: 'You may request a copy of the safeguards applied to international transfers by contacting us at contact@ortvest.com.',
          },
        ],
      },
      {
        number: '8',
        title: 'Data Retention',
        blocks: [
          { type: 'paragraph', text: 'We retain your personal data for as long as necessary:' },
          {
            type: 'list',
            items: [
              'Inquiry data: up to 3 years from the last contact, or until you request deletion',
              'Partnership application data: up to 12 months from submission where no engagement follows, or until you request deletion. Where an engagement begins, the data is retained under the client data period below.',
              'Client data (if a contract is concluded): 5 years from the end of the business relationship (tax and accounting requirements)',
              'Analytics data: as per the settings of the analytics provider (typically up to 26 months)',
              'Review data: retained for as long as the review is published on the Website, or until you request deletion by contacting contact@ortvest.com',
            ],
          },
        ],
      },
      {
        number: '9',
        title: 'Your Rights',
        blocks: [
          {
            type: 'paragraph',
            text: 'Under GDPR, you have the following rights regarding your personal data:',
          },
          {
            type: 'list',
            items: [
              'Right of access (Art. 15 GDPR) – obtain a copy of your data',
              'Right to rectification (Art. 16 GDPR) – correct inaccurate data',
              'Right to erasure / "right to be forgotten" (Art. 17 GDPR)',
              'Right to restriction of processing (Art. 18 GDPR)',
              'Right to data portability (Art. 20 GDPR)',
              'Right to object to processing (Art. 21 GDPR) – including direct marketing',
              'Right to withdraw consent at any time (where processing is based on consent)',
            ],
          },
          {
            type: 'paragraph',
            text: 'To exercise any of these rights, contact us at: contact@ortvest.com\nWe will respond within 30 days as required by GDPR Art. 12.',
          },
        ],
      },
      {
        number: '10',
        title: 'Right to Lodge a Complaint',
        blocks: [
          {
            type: 'paragraph',
            text: 'If you believe we are processing your data unlawfully, you have the right to lodge a complaint with the Polish supervisory authority:',
          },
          {
            type: 'paragraph',
            text: 'Urząd Ochrony Danych Osobowych (UODO)\nul. Stawki 2, 00-193 Warsaw, Poland\nWebsite: uodo.gov.pl\nPhone: +48 22 531 03 00',
          },
        ],
      },
      {
        number: '11',
        title: 'Data Security',
        blocks: [
          {
            type: 'paragraph',
            text: 'We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, disclosure, or destruction. These include:',
          },
          {
            type: 'list',
            items: [
              'Encrypted data transmission (SSL/TLS)',
              'Access controls and authentication',
              'Regular security reviews',
            ],
          },
        ],
      },
      {
        number: '12',
        title: 'Links to Third-Party Websites',
        blocks: [
          {
            type: 'paragraph',
            text: 'Our Website may contain links to external websites. We are not responsible for the privacy practices of third-party websites and encourage you to review their privacy policies separately.',
          },
        ],
      },
      {
        number: '13',
        title: 'Changes to This Privacy Policy',
        blocks: [
          {
            type: 'paragraph',
            text: 'We reserve the right to update this Privacy Policy at any time. The current version will always be available on this page with the "Last updated" date. Continued use of the Website after changes constitutes acceptance of the updated Policy.',
          },
        ],
      },
      {
        number: '14',
        title: 'Contact',
        blocks: [
          {
            type: 'paragraph',
            text: 'For any questions about this Privacy Policy or personal data processing, please contact us:\nEmail: contact@ortvest.com\nWebsite: ortvest.com',
          },
        ],
      },
    ],
  },
  terms: {
    metadata: {
      title: 'Terms of Use | Ortvest',
      description: 'Terms and conditions for using the ortvest.com website.',
    },
    title: 'TERMS OF USE',
    meta: 'ortvest.com | Last updated: July 2026',
    sections: [
      {
        number: '1',
        title: 'General Provisions',
        blocks: [
          {
            type: 'paragraph',
            text: 'These Terms of Use ("Terms") govern the conditions of use of the website ortvest.com ("Website") operated by Ortvest sp. z o.o. ("Company", "we", "us").',
          },
          {
            type: 'paragraph',
            text: 'By accessing or using the Website, you confirm that you have read, understood, and agreed to be bound by these Terms. If you do not agree, please discontinue use of the Website immediately.',
          },
          {
            type: 'paragraph',
            text: 'These Terms are addressed to business entities (B2B). The Website is not intended for consumers (natural persons acting outside the scope of business or professional activity).',
          },
        ],
      },
      {
        number: '2',
        title: 'Services Described on the Website',
        blocks: [
          {
            type: 'paragraph',
            text: 'The Website presents information about services provided by Ortvest, including:',
          },
          {
            type: 'list',
            items: [
              'Design and development of web and mobile platforms, including marketplaces, peer-to-peer products, membership networks, and logistics systems',
              'UI/UX design and brand identity',
              'Digital marketing and go-to-market services',
              'Partnership engagements, including embedded teams, build-plus-equity arrangements, and technical co-founder functions',
            ],
          },
          {
            type: 'paragraph',
            text: 'The content of the Website is for informational purposes only and does not constitute a binding offer within the meaning of the Polish Civil Code, unless explicitly stated otherwise in a separate written agreement.',
          },
        ],
      },
      {
        number: '3',
        title: 'Inquiry and Contact Forms',
        blocks: [
          {
            type: 'paragraph',
            text: 'The Website may include contact or inquiry forms allowing users to submit business inquiries to the Company.',
          },
          { type: 'subheading', text: '3.1 User obligations when submitting inquiries' },
          { type: 'paragraph', text: 'By submitting a form, you represent and warrant that:' },
          {
            type: 'list',
            items: [
              'You are acting on behalf of a business entity and are duly authorised to do so',
              'All information provided is accurate, complete, and not misleading',
              'You are not submitting spam, automated requests, or content violating applicable law',
            ],
          },
          { type: 'subheading', text: '3.2 No contractual obligation' },
          {
            type: 'paragraph',
            text: 'Submission of an inquiry form does not create any contractual relationship between you and the Company. A contract is formed only upon execution of a separate written agreement signed by both parties.',
          },
        ],
      },
      {
        number: '3A',
        title: 'Review Form',
        blocks: [
          { type: 'subheading', text: '3A.1 User obligations when submitting a review' },
          { type: 'paragraph', text: 'By submitting a review, you represent and warrant that:' },
          {
            type: 'list',
            items: [
              'You are a current or former client of Ortvest and have personally experienced the services you describe',
              'All information provided is truthful, accurate, and based on genuine experience',
              'Your review does not contain false, misleading, defamatory, offensive, or unlawful content',
              'You are acting on behalf of a business entity and are authorised to do so',
            ],
          },
          { type: 'subheading', text: '3A.2 Licence to publish' },
          {
            type: 'paragraph',
            text: 'By submitting a review, you grant Ortvest a non-exclusive, royalty-free, worldwide, perpetual licence to publish, display, reproduce, and promote your review (including your name, role, and company) on the Website and in marketing materials. You may request removal of your review at any time by contacting contact@ortvest.com.',
          },
          { type: 'subheading', text: '3A.3 Moderation' },
          {
            type: 'paragraph',
            text: 'The Company reserves the right to moderate, edit for formatting, decline to publish, or remove any submitted review at its sole discretion, including reviews that violate these Terms or applicable law.',
          },
          { type: 'subheading', text: '3A.4 No compensation' },
          {
            type: 'paragraph',
            text: 'Submission of a review is voluntary and does not entitle you to any compensation, discount, or benefit unless explicitly agreed in writing.',
          },
        ],
      },
      {
        number: '3B',
        title: 'Partnership Applications',
        blocks: [
          {
            type: 'paragraph',
            text: 'The Website includes a partnership application form through which you may express interest in an engagement beyond a standard service contract, including an embedded team, a build-plus-equity arrangement, or a technical co-founder function.',
          },
          { type: 'subheading', text: '3B.1 No offer and no commitment' },
          {
            type: 'paragraph',
            text: 'Submission of the partnership application form does not create any offer, commitment, contract, or binding relationship of any kind between you and the Company. This applies in particular, and without limitation, to any terms concerning equity, shareholding, investment, revenue sharing, or other financial arrangements.',
          },
          {
            type: 'paragraph',
            text: 'The Company is under no obligation to respond to, evaluate, accept, or pursue any application, and may decline any application at its sole discretion without providing reasons.',
          },
          { type: 'subheading', text: '3B.2 Terms agreed separately' },
          {
            type: 'paragraph',
            text: 'Any partnership engagement, including any arrangement involving equity or a shareholding in your company, is subject to a separate written agreement negotiated and signed by both parties. Engagement models, commercial terms, equity ranges, and minimum durations described on the Website are indicative only and do not constitute an offer or a commitment to specific terms.',
          },
          { type: 'subheading', text: '3B.3 No advice' },
          {
            type: 'paragraph',
            text: 'The Company does not provide investment, financial, tax, accounting, or legal advice through the partnership application form or in the course of any partnership discussion. You are solely responsible for obtaining independent professional advice before entering into any equity-based or other financial arrangement, and for ensuring that any such arrangement complies with the laws applicable to you and your company.',
          },
          { type: 'subheading', text: '3B.4 Your representations' },
          { type: 'paragraph', text: 'By submitting a partnership application, you represent and warrant that:' },
          {
            type: 'list',
            items: [
              'You are acting on behalf of a business entity, or intend to establish one, and are duly authorised to submit the application',
              'All information provided is accurate, complete, and not misleading',
              'You have the right to share the information you submit, and doing so does not breach any obligation owed to a third party',
              'You are not subject to any restriction that would prevent you from entering into the engagement you are proposing',
            ],
          },
        ],
      },
      {
        number: '3C',
        title: 'Confidentiality of Submitted Information',
        blocks: [
          { type: 'subheading', text: '3C.1 Information is not automatically confidential' },
          {
            type: 'paragraph',
            text: 'Information you submit through any form on the Website, including the partnership application form, is not automatically treated as confidential and does not create a confidential relationship between you and the Company.',
          },
          {
            type: 'paragraph',
            text: 'If you wish to share commercially sensitive information, you should request a mutual non-disclosure agreement before submitting it. The Company will consider such requests in good faith.',
          },
          { type: 'subheading', text: '3C.2 Independent development' },
          {
            type: 'paragraph',
            text: 'The Company works with multiple clients and develops its own products across the same and adjacent markets. Nothing in these Terms restricts the Company from independently developing, acquiring, or working on products, features, or concepts that are similar to those described in any application or inquiry, provided the Company does not use information subject to a signed non-disclosure agreement in doing so.',
          },
          { type: 'subheading', text: '3C.3 Internal handling' },
          {
            type: 'paragraph',
            text: 'Notwithstanding the above, the Company will handle partnership applications with reasonable care, will review them internally only, and will not publish them or share them with other applicants.',
          },
        ],
      },
      {
        number: '4',
        title: 'Intellectual Property',
        blocks: [
          {
            type: 'paragraph',
            text: 'All content published on the Website – including but not limited to texts, graphics, logos, icons, images, videos, code, and design – is the exclusive property of Ortvest or its licensors and is protected by:',
          },
          {
            type: 'list',
            items: [
              'Polish Act of 4 February 1994 on Copyright and Related Rights',
              'Regulation (EU) 2017/1001 on the European Union trade mark',
              'Other applicable intellectual property laws',
            ],
          },
          { type: 'paragraph', text: 'You may NOT, without the prior written consent of the Company:' },
          {
            type: 'list',
            items: [
              'Copy, reproduce, distribute, or publish any content from the Website',
              'Modify, translate, or create derivative works based on Website content',
              "Use the Company's name, logo, or trademarks in any commercial context",
            ],
          },
          {
            type: 'paragraph',
            text: 'You may view and print Website content solely for your own non-commercial, internal business evaluation purposes.',
          },
        ],
      },
      {
        number: '5',
        title: 'Prohibited Uses',
        blocks: [
          { type: 'paragraph', text: 'When using the Website, you agree NOT to:' },
          {
            type: 'list',
            items: [
              'Attempt to gain unauthorised access to any part of the Website or its servers',
              'Introduce viruses, malware, or any other harmful code',
              'Use automated tools (bots, crawlers, scrapers) to extract data from the Website without prior written consent',
              'Engage in any activity that disrupts or interferes with the proper functioning of the Website',
              'Use the Website for any unlawful purpose or in violation of applicable regulations',
              'Impersonate the Company or any other person or entity',
            ],
          },
        ],
      },
      {
        number: '6',
        title: 'Disclaimer of Warranties',
        blocks: [
          {
            type: 'paragraph',
            text: 'The Website and its content are provided on an "as is" and "as available" basis, without warranties of any kind, express or implied.',
          },
          { type: 'paragraph', text: 'The Company does not warrant that:' },
          {
            type: 'list',
            items: [
              'The Website will be available without interruption or error',
              'The content is complete, accurate, or up to date',
              'The Website is free from viruses or other harmful components',
            ],
          },
          {
            type: 'paragraph',
            text: 'To the fullest extent permitted by applicable law, the Company disclaims all warranties, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.',
          },
        ],
      },
      {
        number: '7',
        title: 'Limitation of Liability',
        blocks: [
          {
            type: 'paragraph',
            text: 'To the maximum extent permitted by Polish and EU law, the Company shall not be liable for:',
          },
          {
            type: 'list',
            items: [
              'Any indirect, incidental, special, or consequential damages arising from your use of the Website',
              'Loss of data, profits, business, or reputation',
              'Damages resulting from reliance on information presented on the Website',
              'Temporary unavailability of the Website due to maintenance, technical failures, or force majeure',
              'Any decision taken by you on the basis of a partnership discussion that did not result in a signed agreement',
            ],
          },
          {
            type: 'paragraph',
            text: "The Company's total liability for any claim arising from these Terms or use of the Website shall not exceed EUR 500, to the extent permitted by law. This limitation does not apply to liability arising under a separately signed service or partnership agreement, which shall be governed by the terms of that agreement.",
          },
        ],
      },
      {
        number: '8',
        title: 'Third-Party Links',
        blocks: [
          {
            type: 'paragraph',
            text: 'The Website may contain links to external websites operated by third parties. These links are provided for informational convenience only. The Company:',
          },
          {
            type: 'list',
            items: [
              'Does not control or endorse the content of linked websites',
              'Is not responsible for their privacy practices, content, or availability',
              'Recommends reviewing the terms and policies of any third-party websites you visit',
            ],
          },
        ],
      },
      {
        number: '9',
        title: 'Availability and Modifications',
        blocks: [
          {
            type: 'paragraph',
            text: 'The Company reserves the right, at its sole discretion and without prior notice, to:',
          },
          {
            type: 'list',
            items: [
              'Modify, suspend, or discontinue the Website (or any part thereof) at any time',
              'Update, amend, or remove content from the Website',
              'Restrict access to all or part of the Website',
            ],
          },
          {
            type: 'paragraph',
            text: 'The Company shall not be liable for any consequences resulting from such modifications or unavailability.',
          },
        ],
      },
      {
        number: '10',
        title: 'Amendments to These Terms',
        blocks: [
          {
            type: 'paragraph',
            text: 'The Company reserves the right to update these Terms at any time. The updated version will be published on this page with a revised "Last updated" date.',
          },
          {
            type: 'paragraph',
            text: 'Continued use of the Website after publication of the updated Terms constitutes acceptance of the changes. If you do not agree with the updated Terms, you must discontinue use of the Website.',
          },
        ],
      },
      {
        number: '11',
        title: 'Governing Law and Jurisdiction',
        blocks: [
          {
            type: 'paragraph',
            text: 'These Terms are governed by and construed in accordance with the law of the Republic of Poland, in particular:',
          },
          {
            type: 'list',
            items: [
              'The Polish Civil Code (Kodeks cywilny) of 23 April 1964',
              'The Polish Act on the Provision of Electronic Services (Ustawa o świadczeniu usług drogą elektroniczną) of 18 July 2002',
              'Applicable EU regulations, including GDPR',
            ],
          },
          {
            type: 'paragraph',
            text: 'Any disputes arising from or related to these Terms shall be subject to the exclusive jurisdiction of the competent courts in Poland.',
          },
          { type: 'subheading', text: '11.1 Clients in the United States' },
          {
            type: 'paragraph',
            text: 'If you are accessing the Website from the United States, you acknowledge that the Website is operated from Poland and governed by Polish and EU law. No representations are made that the content of the Website complies with US federal or state laws. Use of the Website from the US is at your own discretion and risk. The Company does not target US consumers; these Terms apply exclusively in a B2B context.',
          },
          {
            type: 'paragraph',
            text: 'Nothing on the Website, including the partnership application form, constitutes an offer or solicitation of securities in the United States or in any other jurisdiction where such an offer or solicitation would be unlawful.',
          },
          { type: 'subheading', text: '11.2 Clients in Ukraine' },
          {
            type: 'paragraph',
            text: 'If you are accessing the Website from Ukraine, you acknowledge that the governing law of these Terms is Polish law and that any contractual relationship between you and the Company shall be subject to Polish jurisdiction. The parties may agree in a separate written contract to alternative dispute resolution mechanisms (e.g., ICC arbitration) if needed for a specific engagement.',
          },
        ],
      },
      {
        number: '12',
        title: 'Severability',
        blocks: [
          {
            type: 'paragraph',
            text: 'If any provision of these Terms is found to be invalid, illegal, or unenforceable by a competent court, the remaining provisions shall continue in full force and effect. The invalid provision shall be replaced by a valid provision that most closely reflects the original intent.',
          },
        ],
      },
      {
        number: '13',
        title: 'Contact',
        blocks: [
          {
            type: 'paragraph',
            text: 'For any questions regarding these Terms of Use, please contact us:\nEmail: contact@ortvest.com\nWebsite: ortvest.com',
          },
        ],
      },
    ],
  },
};
