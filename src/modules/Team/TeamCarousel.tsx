'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { EASE } from '@lib/motion';
import { animate, motion, type PanInfo, useMotionValue } from 'framer-motion';

import { type DisciplineItem, TeamCard } from './TeamCard';

const AUTOPLAY_MS = 7000;

type TeamCarouselProps = {
  disciplines: readonly DisciplineItem[];
  getTitle: (id: DisciplineItem['id']) => string;
  getDescription: (id: DisciplineItem['id']) => string;
  getYears: (id: DisciplineItem['id']) => string;
  getYearsLabel: (id: DisciplineItem['id']) => string;
};

export function TeamCarousel({ disciplines, getTitle, getDescription, getYears, getYearsLabel }: TeamCarouselProps) {
  const slideCount = disciplines.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(Math.max(0, Math.min(slideCount - 1, index)));
    },
    [slideCount]
  );

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const measure = () => setSlideWidth(node.offsetWidth);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (slideWidth === 0) return;
    animate(x, -activeIndex * slideWidth, { duration: 0.45, ease: EASE });
  }, [activeIndex, slideWidth, x]);

  useEffect(() => {
    if (slideCount <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slideCount);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [slideCount]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (slideWidth === 0) return;

    const threshold = slideWidth * 0.18;
    let next = activeIndex;

    if (info.offset.x < -threshold || info.velocity.x < -400) {
      next = activeIndex + 1;
    } else if (info.offset.x > threshold || info.velocity.x > 400) {
      next = activeIndex - 1;
    }

    goTo(next);
  };

  return (
    <div>
      <div ref={containerRef} className="overflow-hidden" aria-roledescription="carousel">
        <motion.div
          className="flex cursor-grab select-none active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragElastic={0.08}
          dragMomentum={false}
          dragConstraints={slideWidth > 0 ? { left: -(slideCount - 1) * slideWidth, right: 0 } : undefined}
          onDragEnd={handleDragEnd}>
          {disciplines.map((discipline) => (
            <div key={discipline.id} className="w-full shrink-0">
              <TeamCard
                discipline={discipline}
                title={getTitle(discipline.id)}
                description={getDescription(discipline.id)}
                years={getYears(discipline.id)}
                yearsLabel={getYearsLabel(discipline.id)}
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Team pagination">
        {disciplines.map((discipline, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={discipline.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={getTitle(discipline.id)}
              onClick={() => goTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                isActive ? 'w-7 bg-zinc-950' : 'w-2 bg-zinc-300 hover:bg-zinc-400'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
