import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import TechStack from '@/components/TechStack';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import Timeline from '@/components/Timeline';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import CustomCursor from '@/components/CustomCursor';
import FloatingAvatarBot from '@/components/FloatingAvatarBot';
import Preloader from '@/components/Preloader';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import Footer from '@/components/Footer';

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 1800);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen bg-background cursor-none">
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Services />
        <Timeline />
        <Testimonials />
        <Contact />
      </main>
      <BackToTop />
      <FloatingAvatarBot />
      <Footer />
    </div>
  );
};

export default Index;
