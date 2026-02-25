import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { useGsapCards } from '@/hooks/use-gsap-cards';

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  {
    name: 'HTML5',
    label: 'HTML',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  },
  {
    name: 'CSS3',
    label: 'CSS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
  },
  {
    name: 'JavaScript',
    label: 'JS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  },
  {
    name: 'React',
    label: 'React',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  },
  {
    name: 'Next.js',
    label: 'Next',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  },
  {
    name: 'PHP',
    label: 'PHP',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
  },
  {
    name: 'Flutter',
    label: 'Flutter',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
  },
  {
    name: 'Node.js',
    label: 'Node',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  },
  {
    name: 'MySQL',
    label: 'MySQL',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
  },
  {
    name: 'PostgreSQL',
    label: 'PgSQL',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  },
  {
    name: 'Supabase',
    label: 'DB',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg',
  },
  {
    name: 'Tailwind CSS',
    label: 'TW',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  },
  {
    name: 'Bootstrap',
    label: 'BS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg',
  },
  {
    name: 'Git',
    label: 'Git',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
  },
  {
    name: 'GitHub',
    label: 'GH',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
  },
  {
    name: 'Vercel',
    label: 'VC',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg',
  },
];

const TechStack = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  useGsapCards(sectionRef, { selector: '.tech-card', start: 'top 80%', stagger: 0.1, once: true });

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
              Tech <span>Stack</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Core technologies and platforms I use to build fast, maintainable products.
            </p>
          </div>

          <div className="tech-reveal mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {technologies.map((tech) => (
              <div
                key={tech.name}
                className="tech-card glass-card glass-hover group relative flex flex-col items-center justify-center gap-3 rounded-2xl p-4 text-center"
                data-tooltip={tech.name}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-background/60 p-2">
                  <img
                    src={tech.logo}
                    alt={tech.name}
                    className="h-10 w-10 object-contain"
                    loading="lazy"
                  />
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
