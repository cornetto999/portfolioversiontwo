import { useEffect, useRef } from 'react';
import gsap from 'gsap';

type PreloaderProps = {
  onComplete: () => void;
};

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !barRef.current || !textRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete,
    });

    tl.set(document.body, { overflow: 'hidden' })
      .fromTo(
        textRef.current,
        { y: 10, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5 }
      )
      .fromTo(
        barRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'power2.inOut' },
        0.1
      )
      .to(
        textRef.current,
        { autoAlpha: 0, y: -10, duration: 0.4 },
        1
      )
      .to(
        containerRef.current,
        { autoAlpha: 0, duration: 0.6 },
        1.1
      )
      .set(document.body, { overflow: 'auto' });

    return () => {
      tl.kill();
      gsap.set(document.body, { overflow: 'auto' });
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center gap-4">
        <p ref={textRef} className="text-sm uppercase tracking-[0.4em] text-muted-foreground">
          Loading Portfolio
        </p>
        <div className="h-1 w-56 overflow-hidden rounded-full bg-muted/30">
          <div
            ref={barRef}
            className="h-full origin-left rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary"
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
