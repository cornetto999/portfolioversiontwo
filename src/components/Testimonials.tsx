import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Client A',
    role: 'Startup Founder',
    quote: 'Delivered a clean dashboard build with fast turnaround and clear communication.',
  },
  {
    name: 'Client B',
    role: 'Operations Lead',
    quote: 'The admin panel improved our workflow instantly. Great UX decisions.',
  },
  {
    name: 'Client C',
    role: 'Project Manager',
    quote: 'Reliable, detail-oriented, and proactive with solutions.',
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.testimonials-reveal', {
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

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || !cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [activeIndex, prefersReducedMotion]);

  return (
    <section id="testimonials" ref={sectionRef} className="relative overflow-hidden py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="testimonials-reveal text-center">
            <h2 className="text-4xl font-semibold md:text-5xl">
              Client <span className="gradient-text">Testimonials</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Feedback from collaborations and real-world builds.
            </p>
          </div>

          <div className="testimonials-reveal mt-12">
            <div
              ref={cardRef}
              className="rounded-3xl border border-border/60 bg-card/60 p-8 text-center shadow-[0_22px_70px_-40px_rgba(0,0,0,0.8)]"
            >
              <p className="text-lg text-muted-foreground">“{testimonials[activeIndex].quote}”</p>
              <div className="mt-6 text-sm font-semibold text-foreground">
                {testimonials[activeIndex].name}
              </div>
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {testimonials[activeIndex].role}
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    activeIndex === index ? 'bg-primary' : 'bg-muted/60'
                  }`}
                  aria-label={`Show testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
