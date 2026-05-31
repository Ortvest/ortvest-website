import type { CreateReviewInput } from '@lib/models/review';

const MAX_LENGTH = {
  name: 100,
  role: 100,
  company: 100,
  text: 1000,
} as const;

export function parseCreateReviewInput(body: unknown): { data?: CreateReviewInput; error?: string } {
  if (!body || typeof body !== 'object') {
    return { error: 'All fields are required' };
  }

  const raw = body as Record<string, unknown>;
  const name = typeof raw.name === 'string' ? raw.name.trim() : '';
  const role = typeof raw.role === 'string' ? raw.role.trim() : '';
  const company = typeof raw.company === 'string' ? raw.company.trim() : '';
  const text = typeof raw.text === 'string' ? raw.text.trim() : '';
  const rating = typeof raw.rating === 'number' ? raw.rating : Number(raw.rating);
  const projectSlug =
    typeof raw.projectSlug === 'string' && raw.projectSlug.trim().length > 0 ? raw.projectSlug.trim() : null;

  if (!name || !role || !company || !text || !Number.isFinite(rating)) {
    return { error: 'All fields are required' };
  }

  if (rating < 1 || rating > 5) {
    return { error: 'Rating must be between 1 and 5' };
  }

  if (name.length > MAX_LENGTH.name || role.length > MAX_LENGTH.role || company.length > MAX_LENGTH.company) {
    return { error: 'Field value is too long' };
  }

  if (text.length > MAX_LENGTH.text) {
    return { error: 'Review text is too long' };
  }

  return {
    data: {
      name,
      role,
      company,
      text,
      rating,
      projectSlug,
    },
  };
}
