import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

type GsapCardsOptions = {
  selector: string;
  start?: string;
  stagger?: number;
  once?: boolean;
};

export const useGsapCards = (
  containerRef: React.RefObject<HTMLElement>,
  { selector, start = 'top 80%', stagger = 0.12, once = true }: GsapCardsOptions
) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.from(selector, {
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: once ? 'play none none none' : 'play none none reset',
        },
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.8,
        ease: 'power3.out',
        stagger,
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef, prefersReducedMotion, selector, start, stagger, once]);
};
