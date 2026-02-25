import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { useGsapCards } from '@/hooks/use-gsap-cards';

gsap.registerPlugin(ScrollTrigger);

const timelineItems = [
  {
    year: '2023',
    role: 'OJT / Intern Developer',
    summary: 'Supported front-end builds and helped ship school and community tools.',
  },
  {
    year: '2024',
    role: 'Freelance Web Developer',
    summary: 'Delivered responsive web apps and dashboards for local clients.',
  },
  {
    year: '2025',
    role: 'Full-Stack Projects',
    summary: 'Built inventory systems, attendance trackers, and admin panels.',
  },
];

const Timeline = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  useGsapCards(sectionRef, { selector: '.timeline-card', start: 'top 80%', stagger: 0.12, once: true });

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: 0.6,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="experience" ref={sectionRef} className="relative overflow-hidden py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-4xl font-semibold md:text-5xl">
              Experience <span>Timeline</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A quick look at my recent experience, roles, and growth milestones.
            </p>
          </div>

          <div className="relative mt-16">
            <div className="timeline-line absolute left-4 top-0 h-full w-[2px] rounded-full brand-gradient-line" />
            <div className="space-y-10">
              {timelineItems.map((item) => (
                <div key={item.year} className="timeline-item relative pl-12">
                  <div className="absolute left-2 top-1.5 h-4 w-4 rounded-full border border-primary/40 bg-background" />
                  <div className="timeline-card glass-card glass-hover rounded-2xl p-5">
                    <div className="text-sm uppercase tracking-[0.3em] text-primary">{item.year}</div>
                    <h3 className="mt-2 text-lg font-semibold">{item.role}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
