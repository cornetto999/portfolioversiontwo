import { type ReactNode, useEffect, useRef, useState } from "react";

type DeferredSectionProps = {
  children: ReactNode;
  anchorId?: string;
  fallbackClassName?: string;
  rootMargin?: string;
};

const DeferredSection = ({
  children,
  anchorId,
  fallbackClassName = "min-h-[45vh]",
  rootMargin = "300px 0px",
}: DeferredSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return (
    <div id={anchorId} ref={containerRef}>
      {isVisible ? children : <div className={fallbackClassName} aria-hidden="true" />}
    </div>
  );
};

export default DeferredSection;
