import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import project1 from '@/assets/e-boy.png';
import project2 from '@/assets/who.png';
import project3 from '@/assets/yt.png';
import project4 from '@/assets/dtr.png';

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
      liveUrl: 'https://yt-web-app.vercel.app/',
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group"
              >
                <motion.div
                  className={`glass-card rounded-2xl overflow-hidden hover:shadow-glow-primary transition-all duration-500 group-hover:shadow-glow-secondary cursor-pointer ${
                    project.featured ? 'lg:col-span-1' : ''
                  }`}
                  whileHover={{ 
                    y: -15,
                    rotateX: 8,
                    rotateY: 8,
                    scale: 1.02,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center center',
                  }}
                  onClick={() => handleProjectClick(project.liveUrl)}
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
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
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                      <Button
                        size="sm"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProjectClick(project.liveUrl);
                        }}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg rounded-xl magnetic-hover"
            >
              View All Projects
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;