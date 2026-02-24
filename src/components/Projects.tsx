import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import project1 from '@/assets/e-boy.png';
import project2 from '@/assets/who.png';
import project3 from '@/assets/ytweb.png';
import project4 from '@/assets/dtr.png';
import project5 from '@/assets/luxera.png';
import project6 from '@/assets/pos-sari.png';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const projects = [
    {
      id: 1,
      title: ' Chat with E-boy',
      description: 'An AI chatbot that can answer questions and help with tasks.',
      image: project1,
      technologies: ['React', 'TypeScript', 'OpenAI API', 'Tailwind CSS'],
      liveUrl: 'https://chatwitheboy-gpt.vercel.app/',
    
      featured: true,
    },
    {
      id: 2,
      title: 'WHOFILL DIS GAME',
      description: 'An Web app based game that you can play with your feelings.',
      image: project2,
      technologies: ['Next.js', 'Node.js', 'MySQL','Firebase'],
      liveUrl: 'https://whofilldisgame.vercel.app/',
      githubUrl: '#',
      featured: true,
    },
    {
      id: 3,
      title: ' YT WEB APP',
      description: 'Watch without ads, play in PiP. Trending in Philippines.',
      image: project3,
      technologies: ['React', 'Tailwind CSS', 'Google API'],
      liveUrl: 'https://yt-webapp.vercel.app/',
      githubUrl: 'https://github.com/cornetto999/yt-web-app',
      featured: false,
    },
    {
      id: 4,
      title: 'DTR Attendance System',
      description: 'Sign in to track your work hours and achieve your goals',
      image: project4,
      technologies: ['Tailwind CSS', 'TypeScript', 'Supabase'],
      liveUrl: 'https://dtr-jek999.lovable.app',
      featured: false,
    },
    {
      id: 5,
      title: 'Luxera',
      description: 'Discover Your Signature Scent',
      image: project5,
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
      liveUrl: 'https://luxera.lovable.app',
      featured: true,
    },
    {
      id: 6,
      title: 'POS-Sari',
      description: 'A lightweight point-of-sale web app tailored for sari-sari stores, for fast sales and inventory tracking.',
      image: project6,
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
      liveUrl: 'https://pos-sari.vercel.app',
      featured: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  const handleProjectClick = (url: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const displayProjects = [...projects].sort(
    (a, b) => Number(b.featured) - Number(a.featured)
  );

  return (
    <section id="projects" ref={ref} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-4"
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto"
          >
            A showcase of my recent work and creative projects that demonstrate my 
            technical skills and passion for innovative solutions.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group w-full"
              >
                <motion.div
                  className="relative h-full min-h-[420px] rounded-[24px] overflow-hidden bg-card/80 border border-border/70 backdrop-blur-xl shadow-[0_12px_45px_-22px_hsl(var(--primary)/0.65)] transition-all duration-500 hover:border-primary/60 hover:shadow-[0_22px_65px_-25px_hsl(var(--primary)/0.75)] cursor-pointer flex flex-col"
                  whileHover={{ 
                    y: -8,
                    scale: 1.01,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center center',
                  }}
                  onClick={() => handleProjectClick(project.liveUrl)}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.18),transparent_55%)]" />
                  <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

                  {/* Project Image */}
                  <div className="relative overflow-hidden border-b border-border/60">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {project.featured && (
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-background/85 border border-primary/40 px-3 py-1 text-xs font-semibold text-primary shadow-[0_0_20px_hsl(var(--primary)/0.2)]">
                        <Sparkles className="w-3.5 h-3.5" />
                        Featured
                      </div>
                    )}
                    
                    {/* Overlay buttons */}
                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full w-12 h-12 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProjectClick(project.liveUrl);
                        }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      {project.githubUrl && project.githubUrl !== '#' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-background/90 border-border rounded-full w-12 h-12 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectClick(project.githubUrl!);
                          }}
                        >
                          <Github className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 relative z-10 flex h-full flex-col">
                    <h3 className="text-xl font-bold mb-2 tracking-tight group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 border border-primary/25 bg-primary/10 text-primary text-xs rounded-full tracking-wide"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="mt-auto flex gap-3">
                      <Button
                        size="sm"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-9"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProjectClick(project.liveUrl);
                        }}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                      {project.githubUrl && project.githubUrl !== '#' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-xl h-9 px-3 border-primary/30 hover:border-primary/60 hover:bg-primary/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectClick(project.githubUrl!);
                          }}
                        >
                          <Github className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
