import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import CustomCursor from '@/components/CustomCursor';
import FloatingAvatarBot from '@/components/FloatingAvatarBot';

const Index = () => {
  return (
    <div className="min-h-screen bg-background cursor-none">
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <FloatingAvatarBot />
    </div>
  );
};

export default Index;
