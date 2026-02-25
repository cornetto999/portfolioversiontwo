import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import type { Engine } from "@tsparticles/engine";

const ParticleBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      interactivity: {
        detectsOn: "window" as const,
        events: {
          onHover: { enable: true, mode: "attract" },
        },
        modes: {
          attract: { distance: 160, duration: 0.3, factor: 2 },
        },
      },
      particles: {
        color: { value: ["#3B82F6", "#A855F7", "#EC4899"] },
        move: {
          direction: "none" as const,
          enable: true,
          outModes: { default: "bounce" as const },
          speed: 1.2,
        },
        number: {
          density: { enable: true },
          value: 36,
        },
        opacity: { value: 0.45 },
        shape: { type: "circle" as const },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={options}
      className="absolute inset-0 pointer-events-none"
    />
  );
};

export default ParticleBackground;
