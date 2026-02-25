import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  { name: 'HTML5', label: 'HTML' },
  { name: 'CSS3', label: 'CSS' },
  { name: 'JavaScript', label: 'JS' },
  { name: 'React', label: 'React' },
  { name: 'Next.js', label: 'Next' },
  { name: 'PHP', label: 'PHP' },
  { name: 'Node.js', label: 'Node' },
  { name: 'MySQL', label: 'MySQL' },
  { name: 'Supabase', label: 'DB' },
  { name: 'Tailwind CSS', label: 'TW' },
  { name: 'Bootstrap', label: 'BS' },
  { name: 'Git', label: 'Git' },
  { name: 'GitHub', label: 'GH' },
  { name: 'Vercel', label: 'VC' },
];

const TechStack = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.tech-reveal', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="tech" ref={sectionRef} className="relative overflow-hidden py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="tech-reveal text-center">
            <h2 className="text-4xl font-semibold md:text-5xl">
              Tech <span className="gradient-text">Stack</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Core technologies and platforms I use to build fast, maintainable products.
            </p>
          </div>

          <div className="tech-reveal mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="tech-card group relative flex flex-col items-center justify-center gap-3 rounded-2xl border border-border/60 bg-card/50 p-4 text-center shadow-[0_15px_40px_-30px_rgba(0,0,0,0.7)]"
                data-tooltip={tech.name}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm font-semibold text-primary transition-all duration-300 group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.45)]">
                  {tech.label}
                </div>
                <div className="text-sm font-medium text-foreground/80">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
