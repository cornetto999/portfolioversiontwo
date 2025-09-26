import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ParticleBackground from '@/components/ParticleBackground';
import heroAvatar from '@/assets/profile.png';

const Hero = () => {
  const nameText = 'Francis Jake Roaya';
  const titleText = 'Frontend Developer specializing in System Development, passionate about responsive design and web performance. I specialize in building sleek and scalable user interfaces using Next.js, Tailwind CSS, and other programming languages. Currently pursuing a Bachelor of Science in Information Technology (BSIT) at Phinma Cagayan de Oro College, I\'m dedicated to learning and growing as a developer while creating modern web experiences.';

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Particle background */}
      <ParticleBackground />
      
      {/* Animated background gradient */}
      <div className="absolute inset-0 hero-gradient opacity-30" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl animate-float [animation-delay:1s]" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-tertiary/20 rounded-full blur-xl animate-float [animation-delay:2s]" />

      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="gradient-text">
                {nameText}
              </span>
            </motion.h1>
            
            <motion.p
              className="text-lg text-muted-foreground mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {titleText}
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button
                onClick={() => scrollToSection('#projects')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-xl magnetic-hover glow-hover"
              >
                View My Work
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection('#contact')}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg rounded-xl magnetic-hover"
              >
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <motion.div
              className="relative"
              whileHover={{ 
                scale: 1.05,
                filter: "blur(2px)"
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300,
                duration: 0.3
              }}
            >
              <div className="w-80 h-80 rounded-full overflow-hidden glass-card p-2">
                <img
                  src={heroAvatar}
                  alt=" Francis Jake Roaya"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-1 h-3 bg-primary rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;