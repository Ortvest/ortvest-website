import Image from 'next/image';

/**
 * Hosts configured in `next.config.mjs` → `images.remotePatterns`. Covers can
 * also come from the CMS cover library, which stores arbitrary URLs, so any
 * other host falls back to a plain <img> instead of crashing the page.
 */
const OPTIMIZED_HOSTS = ['ucarecdn.com'];

function isOptimizable(src: string): boolean {
  try {
    return OPTIMIZED_HOSTS.includes(new URL(src).hostname);
  } catch {
    return src.startsWith('/');
  }
}

type BlogCoverImageProps = {
  src: string;
  /** Post title — never empty: these covers carry the article's topic. */
  alt: string;
  /** Set on the first cover above the fold (LCP element) to skip lazy loading. */
  priority?: boolean;
  sizes: string;
  className?: string;
};

/**
 * Fixed 16:9 box so the cover reserves its space before it loads (no CLS),
 * optimized and lazy by default, eager only where it is the LCP element.
 */
export function BlogCoverImage({ src, alt, priority = false, sizes, className }: BlogCoverImageProps) {
  const wrapperClass = `relative aspect-video w-full overflow-hidden ${className ?? ''}`.trim();

  if (!isOptimizable(src)) {
    return (
      <div className={wrapperClass}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
