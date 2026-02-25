import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import type { Engine } from "@tsparticles/engine";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const ParticleBackground = () => {
  const [init, setInit] = useState(false);
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, [isMobile, prefersReducedMotion]);

  const options = useMemo(
    () => ({
      background: { color: { value: "transparent" } },
      fpsLimit: 30,
      interactivity: {
        detectsOn: "window" as const,
        events: {
          onHover: { enable: true, mode: "attract" },
        },
        modes: {
          attract: { distance: 120, duration: 0.15, factor: 1.2 },
        },
      },
      particles: {
        color: { value: ["#3B82F6", "#A855F7", "#EC4899"] },
        move: {
          direction: "none" as const,
          enable: true,
          outModes: { default: "bounce" as const },
          speed: 0.45,
          random: false,
          straight: false,
        },
        number: {
          density: { enable: true },
          value: 22,
        },
        opacity: { value: 0.45 },
        shape: { type: "circle" as const },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init || isMobile || prefersReducedMotion) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="absolute inset-0 pointer-events-none"
    />
  );
};

export default ParticleBackground;
