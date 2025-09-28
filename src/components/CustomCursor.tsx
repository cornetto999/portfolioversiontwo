import { useEffect, useState } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const handleMouseOut = () => setIsVisible(false);

    // Add mouse move listener
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseout', handleMouseOut);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], .magnetic-hover');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseout', handleMouseOut);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Don't show custom cursor on mobile devices
  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        style={{
          transform: `translate(${mousePosition.x - 10}px, ${mousePosition.y - 10}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div
          className={`w-5 h-5 rounded-full border-2 border-primary transition-all duration-300 ${
            isHovering ? 'scale-150 bg-primary/20' : 'scale-100'
          }`}
        />
      </div>
      
      {/* Trailing glow effect */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-40"
        style={{
          transform: `translate(${mousePosition.x - 25}px, ${mousePosition.y - 25}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div
          className={`w-12 h-12 rounded-full bg-primary/10 blur-lg transition-all duration-300 ${
            isHovering ? 'scale-200 bg-primary/30' : 'scale-100'
          }`}
        />
      </div>
    </>
  );
};

export default CustomCursor;