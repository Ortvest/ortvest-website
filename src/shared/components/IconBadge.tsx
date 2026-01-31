import { LucideIcon } from 'lucide-react';

type BadgeSize = 'sm' | 'md' | 'lg';
type BadgeVariant = 'default' | 'accent' | 'muted';

interface IconBadgeProps {
  icon: LucideIcon;
  size?: BadgeSize;
  variant?: BadgeVariant;
  className?: string;
}

const sizeClasses: Record<BadgeSize, { container: string; icon: string }> = {
  sm: { container: 'h-8 w-8 rounded-lg', icon: 'h-4 w-4' },
  md: { container: 'h-10 w-10 rounded-xl', icon: 'h-5 w-5' },
  lg: { container: 'h-12 w-12 rounded-xl', icon: 'h-6 w-6' },
};

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-black/[0.06] text-black',
  accent: 'bg-accent/20 text-black',
  muted: 'bg-black/[0.04] text-black/60',
};

export function IconBadge({ icon: Icon, size = 'md', variant = 'default', className = '' }: IconBadgeProps) {
  const { container, icon } = sizeClasses[size];
  return (
    <div className={`flex items-center justify-center ${container} ${variantClasses[variant]} ${className}`.trim()}>
      <Icon className={icon} />
    </div>
  );
}
