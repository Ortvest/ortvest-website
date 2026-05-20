'use client';

import type { CaseItem } from '@modules/Cases/data';

import { CaseStudyDetail } from '../CaseStudyDetail';

interface CaseDetailProps {
  caseItem: CaseItem;
}

export function CaseDetail({ caseItem }: CaseDetailProps) {
  return <CaseStudyDetail caseItem={caseItem} />;
}
