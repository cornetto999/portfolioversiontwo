import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      autoAlpha: visible ? 1 : 0,
      y: visible ? 0 : 20,
      duration: 0.4,
      ease: 'power2.out',
    });
  }, [visible]);

  return (
    <div
      ref={buttonRef}
      className="fixed bottom-32 right-6 z-40 opacity-0"
      aria-hidden={!visible}
    >
      <Button
        size="icon"
        className="h-12 w-12 rounded-full bg-primary/90 text-primary-foreground shadow-[0_10px_30px_-12px_hsl(var(--primary)/0.8)] hover:bg-primary"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default BackToTop;
