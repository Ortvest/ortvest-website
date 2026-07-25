'use client';

import { useEffect, useState } from 'react';

export function ArticleReadingProgress({ articleId }: { articleId: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const article = document.getElementById(articleId);
      if (!article) return;

      const start = article.getBoundingClientRect().top + window.scrollY;
      const distance = Math.max(1, article.offsetHeight - window.innerHeight);
      const next = Math.min(1, Math.max(0, (window.scrollY - start) / distance));
      setProgress(next);
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [articleId]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-1 bg-black/10" aria-hidden="true">
      <div className="h-full origin-left bg-accent" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
