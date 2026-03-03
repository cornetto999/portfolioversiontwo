import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import heroAvatar from '@/assets/profile.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

const roles = ['Full-Stack Developer', 'Frontend Specialist', 'System Builder'];

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [displayText, setDisplayText] = useState('');
  const prefersReducedMotion = usePrefersReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const nameText = 'Francis Jake Roaya';
  const titleText =
    "Frontend Developer specializing in System Development, passionate about responsive design and web performance. I specialize in building sleek and scalable user interfaces using Next.js, Tailwind CSS, and other programming languages. Currently pursuing a Bachelor of Science in Information Technology (BSIT) at Phinma Cagayan de Oro College, I'm dedicated to learning and growing as a developer while creating modern web experiences.";

  useEffect(() => {
    const currentRole = roles[roleIndex % roles.length];
    const speed = isDeleting ? 40 : 90;
    let pauseTimeout: number | undefined;

    const timeout = window.setTimeout(() => {
      if (!isDeleting) {
        const next = currentRole.slice(0, displayText.length + 1);
        setDisplayText(next);
        if (next === currentRole) {
          pauseTimeout = window.setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        const next = currentRole.slice(0, displayText.length - 1);
        setDisplayText(next);
        if (next === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => {
      window.clearTimeout(timeout);
      if (pauseTimeout) window.clearTimeout(pauseTimeout);
    };
  }, [displayText, isDeleting, roleIndex]);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-fade', {
        y: 30,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
      });

      gsap.from('.hero-avatar', {
        x: 40,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      });

      gsap.to('.hero-orb', {
        y: (i) => (i % 2 === 0 ? -40 : 30),
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pb-16 pt-28"
    >
      <div ref={heroRef} className="container relative z-10 mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <div className="hero-fade hidden flex-wrap items-center gap-3 lg:flex">
              <span className="glass-badge inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs uppercase tracking-[0.3em] text-foreground">
                Open to work
              </span>
              <span className="glass-badge inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs uppercase tracking-[0.3em] text-foreground">
                Currently working on system tools
              </span>
            </div>
            <h1 className="hero-fade mt-6 text-4xl font-semibold leading-tight text-foreground sm:text-5xl md:text-6xl">
              <span className="gradient-text">{nameText}</span>
            </h1>
            <p className="hero-fade mt-4 text-lg text-muted-foreground">
              <span className="brand-gradient">{displayText || roles[0]}</span>
            </p>
            <p className="hero-fade mt-6 max-w-2xl text-base text-muted-foreground">
              {titleText}
            </p>
            <div className="hero-fade mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                onClick={() => scrollToSection('#projects')}
                className="glass-button magnetic-hover h-12 rounded-full px-8 text-base text-primary-foreground hover:bg-primary/90"
              >
                View Projects
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection('#contact')}
                className="glass-button magnetic-hover h-12 rounded-full px-8 text-base text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Contact Me
              </Button>
              <Button
                variant="ghost"
                className="glass-button magnetic-hover h-12 rounded-full px-6 text-base"
                asChild
              >
                <a href="/resume.pdf" download>
                  Download CV
                </a>
              </Button>
            </div>
          </div>

          <div className="hero-avatar order-1 flex flex-col items-center justify-center gap-4 lg:order-2 lg:items-end lg:justify-end">
            <div className="hero-fade flex flex-wrap items-center justify-center gap-3 lg:hidden">
              <span className="glass-badge inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs uppercase tracking-[0.3em] text-foreground">
                Open to work
              </span>
              <span className="glass-badge inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs uppercase tracking-[0.3em] text-foreground">
                Currently working on system tools
              </span>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 blur-2xl" />
              <div className="relative h-72 w-72 overflow-hidden rounded-full border border-border/60 bg-card/70 p-2 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.8)] sm:h-80 sm:w-80">
                <img
                  src={heroAvatar}
                  alt="Francis Jake Roaya"
                  className="h-full w-full rounded-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
