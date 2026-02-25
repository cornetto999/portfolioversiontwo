import { useLayoutEffect, useRef } from 'react';
import { Code2, ServerCog, Database, LayoutDashboard, Wrench, Rocket } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { useGsapCards } from '@/hooks/use-gsap-cards';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Frontend Development',
    description: 'Pixel-perfect UIs with modern frameworks and accessible patterns.',
    icon: Code2,
  },
  {
    title: 'Backend/API Development',
    description: 'Secure APIs and integrations that scale with your product.',
    icon: ServerCog,
  },
  {
    title: 'Database Design',
    description: 'Structured data models and optimized queries for performance.',
    icon: Database,
  },
  {
    title: 'Admin Dashboards',
    description: 'Operational tools for analytics, workflows, and control panels.',
    icon: LayoutDashboard,
  },
  {
    title: 'Bug Fixing / Maintenance',
    description: 'Fast troubleshooting, refactors, and stability improvements.',
    icon: Wrench,
  },
  {
    title: 'Deployment (Vercel / VPS)',
    description: 'Production-ready launches with monitoring and clean handoff.',
    icon: Rocket,
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  useGsapCards(sectionRef, { selector: '.service-card', start: 'top 80%', stagger: 0.12, once: true });

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.services-reveal', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="services" ref={sectionRef} className="relative overflow-hidden py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="services-reveal text-center">
            <h2 className="text-4xl font-semibold md:text-5xl">
              Services <span>I Provide</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              End-to-end support from interface design to production deployment.
            </p>
          </div>

          <div className="services-reveal mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="service-card glass-card glass-hover group relative overflow-hidden rounded-3xl p-6"
              >
                <div className="absolute left-0 top-6 h-10 w-1.5 rounded-full bg-gradient-to-b from-primary via-secondary to-tertiary opacity-0 transition-all duration-300 group-hover:opacity-100" />
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                    <service.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
