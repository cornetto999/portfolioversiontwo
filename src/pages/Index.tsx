import { Suspense, lazy, useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ScrollProgress from '@/components/ScrollProgress';
import DeferredSection from '@/components/DeferredSection';

const About = lazy(() => import('@/components/About'));
const TechStack = lazy(() => import('@/components/TechStack'));
const Projects = lazy(() => import('@/components/Projects'));
const Services = lazy(() => import('@/components/Services'));
const Timeline = lazy(() => import('@/components/Timeline'));
const Testimonials = lazy(() => import('@/components/Testimonials'));
const Contact = lazy(() => import('@/components/Contact'));
const FloatingAvatarBot = lazy(() => import('@/components/FloatingAvatarBot'));
const BackToTop = lazy(() => import('@/components/BackToTop'));
const Footer = lazy(() => import('@/components/Footer'));

const Index = () => {
  const [showAssistant, setShowAssistant] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setShowAssistant(true), 2500);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />
      <main className="relative">
        <Hero />
        <DeferredSection anchorId="about" fallbackClassName="min-h-[70vh]">
          <Suspense fallback={<div className="min-h-[70vh]" aria-hidden="true" />}>
            <About />
          </Suspense>
        </DeferredSection>
        <DeferredSection anchorId="tech" fallbackClassName="min-h-[60vh]">
          <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
            <TechStack />
          </Suspense>
        </DeferredSection>
        <DeferredSection anchorId="projects" fallbackClassName="min-h-[75vh]">
          <Suspense fallback={<div className="min-h-[75vh]" aria-hidden="true" />}>
            <Projects />
          </Suspense>
        </DeferredSection>
        <DeferredSection anchorId="services" fallbackClassName="min-h-[65vh]">
          <Suspense fallback={<div className="min-h-[65vh]" aria-hidden="true" />}>
            <Services />
          </Suspense>
        </DeferredSection>
        <DeferredSection anchorId="experience" fallbackClassName="min-h-[65vh]">
          <Suspense fallback={<div className="min-h-[65vh]" aria-hidden="true" />}>
            <Timeline />
          </Suspense>
        </DeferredSection>
        <DeferredSection anchorId="testimonials" fallbackClassName="min-h-[60vh]">
          <Suspense fallback={<div className="min-h-[60vh]" aria-hidden="true" />}>
            <Testimonials />
          </Suspense>
        </DeferredSection>
        <DeferredSection anchorId="contact" fallbackClassName="min-h-[65vh]">
          <Suspense fallback={<div className="min-h-[65vh]" aria-hidden="true" />}>
            <Contact />
          </Suspense>
        </DeferredSection>
      </main>
      <Suspense fallback={null}>
        <BackToTop />
      </Suspense>
      {showAssistant ? (
        <Suspense fallback={null}>
          <FloatingAvatarBot />
        </Suspense>
      ) : null}
      <DeferredSection fallbackClassName="min-h-[20vh]">
        <Suspense fallback={<div className="min-h-[20vh]" aria-hidden="true" />}>
          <Footer />
        </Suspense>
      </DeferredSection>
    </div>
  );
};

export default Index;
