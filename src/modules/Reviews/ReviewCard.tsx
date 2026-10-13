/** Client-safe review DTO — only fields rendered by the reviews spotlight. */
export interface ReviewItem {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

export function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}
