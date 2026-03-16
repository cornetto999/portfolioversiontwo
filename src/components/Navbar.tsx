import { useEffect, useRef, useState } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import gsap from 'gsap';

const Navbar = () => {
  const navRef = useRef<HTMLDivElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#tech', label: 'Tech' },
    { href: '#projects', label: 'Projects' },
    { href: '#services', label: 'Services' },
    { href: '#experience', label: 'Experience' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ];

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -20, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    let ticking = false;

    const updateActiveSection = () => {
      const offsetY = 120;
      const scrollPos = window.scrollY + offsetY;

      if (window.scrollY < 60) {
        setActiveSection('home');
        ticking = false;
        return;
      }

      let current = sections[0].id;
      for (const section of sections) {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        if (sectionTop <= scrollPos) {
          current = section.id;
        } else {
          break;
        }
      }
      setActiveSection(current);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const targetId = href.replace('#', '');
      const offset = 96;
      const absoluteTop = element.getBoundingClientRect().top + window.scrollY;
      const top = targetId === 'home' ? 0 : Math.max(0, absoluteTop - offset);

      window.scrollTo({ top, behavior: 'smooth' });
      setActiveSection(targetId);
      setIsMobileMenuOpen(false);
    }
  };

  const showNavbarName = activeSection !== 'home';

  return (
    <div
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-navbar shadow-[0_10px_30px_-20px_rgba(0,0,0,0.6)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            className={`text-lg font-semibold tracking-tight transition-all duration-300 ${
              showNavbarName
                ? isScrolled
                  ? 'brand-gradient opacity-100'
                  : 'text-foreground opacity-100'
                : 'pointer-events-none opacity-0'
            }`}
            onClick={() => scrollToSection('#home')}
          >
            Francis Jake Roaya
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`text-sm font-medium transition-colors relative ${
                  activeSection === link.href.replace('#', '')
                    ? 'brand-gradient'
                    : 'text-foreground/80 hover:text-foreground'
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-2 left-0 h-[2px] w-full origin-left rounded-full brand-gradient-line transition-all duration-500 ease-out ${
                    activeSection === link.href.replace('#', '')
                      ? 'scale-x-100 opacity-100'
                      : 'scale-x-0 opacity-0'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              className="glass-button rounded-full px-4"
              asChild
            >
              <a href="/resume.pdf" download>
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </a>
            </Button>
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="mt-2 rounded-2xl border border-border/60 bg-background/90 p-4 backdrop-blur-xl">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors ${
                    activeSection === link.href.replace('#', '')
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground/80 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <Button
                variant="outline"
                className="glass-button mt-2 w-full rounded-xl"
                asChild
              >
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
