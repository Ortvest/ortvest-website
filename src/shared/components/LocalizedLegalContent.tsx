import { Fragment } from 'react';

import { LegalPageLayout } from '@shared/components/LegalPageLayout';
import { LegalList, LegalParagraph, LegalSection, LegalSubheading } from '@shared/components/LegalSection';

type LegalParagraphBlock = {
  type: 'paragraph' | 'subheading';
  text: string;
};

type LegalListBlock = {
  type: 'list';
  items: string[];
};

type LegalBlock = LegalParagraphBlock | LegalListBlock;

export type LegalPageDocument = {
  metadata: {
    title: string;
    description: string;
  };
  title: string;
  meta: string;
  sections: Array<{
    number: string;
    title: string;
    blocks: LegalBlock[];
  }>;
};

function TextWithBreaks({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, index) => (
        <Fragment key={`${index}-${line}`}>
          {index > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  );
}

export function LocalizedLegalContent({ content }: { content: LegalPageDocument }) {
  return (
    <LegalPageLayout title={content.title} meta={content.meta}>
      {content.sections.map((section) => (
        <LegalSection key={section.number} number={section.number} title={section.title}>
          {section.blocks.map((block, index) => {
            const key = `${section.number}-${index}`;
            if (block.type === 'list') return <LegalList key={key} items={block.items} />;
            if (block.type === 'subheading') {
              return (
                <LegalSubheading key={key}>
                  <TextWithBreaks text={block.text} />
                </LegalSubheading>
              );
            }
            return (
              <LegalParagraph key={key}>
                <TextWithBreaks text={block.text} />
              </LegalParagraph>
            );
          })}
        </LegalSection>
      ))}
    </LegalPageLayout>
  );
}
