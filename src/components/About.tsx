import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useGitHubStats } from '@/hooks/useGitHubStats';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { languages, totalRepos, totalStars, isLoading, error } = useGitHubStats('cornetto999');

  // Fallback skills if GitHub API fails
  const fallbackSkills = [
    { name: 'React/Next.js', level: 95, color: '#61dafb' },
    { name: 'TypeScript', level: 90, color: '#3178c6' },
    { name: 'Next.js', level: 88, color: '#000000' },
    { name: 'Python', level: 85, color: '#3776ab' },
    { name: 'UI/UX Design', level: 92, color: '#ff6b6b' },
    { name: 'MySQL', level: 82, color: '#336791' },
    { name: 'PHP', level: 80, color: '#777bb4' },
    { name: 'PL/pgSQL', level: 75, color: '#336791' },
    { name: 'HTML', level: 95, color: '#e34f26' },
    { name: 'CSS', level: 90, color: '#1572b6' },
  ];

  const skills = isLoading || error ? fallbackSkills : languages.map(lang => ({
    name: lang.name,
    level: lang.percentage,
    color: lang.color
  }));

  // Show warning if using fallback data
  const isUsingFallback = isLoading || error;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" ref={ref} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            About <span className="gradient-text">Me</span>
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Bio Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Passionate Developer & Creative Problem Solver
              </h3>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                As a recent graduate in web development, I’m passionate about building digital solutions that connect design and functionality. My journey began with a strong curiosity about how technology can bring ideas to life, which has grown into a commitment to learning and creating.
                </p>
                
                <p>
                I’ve gained hands-on experience with modern web technologies through academic projects, internships, and personal work. My skills include frontend frameworks like React and Next.js, as well as backend tools such as Node.js and PHP/Python. I enjoy writing clean, efficient code and focusing on user-friendly experiences.
                </p>
                
                <p>
                Beyond coding, I love exploring new design trends, experimenting with creative projects, and expanding my knowledge in emerging technologies. I’m eager to collaborate, grow, and contribute to impactful projects in the tech industry.
                </p>
              </div>

              <motion.div
                className="flex flex-wrap gap-3 mt-6"
                variants={containerVariants}
              >
                {['React', 'TypeScript', 'Next.js', 'Python', 'MySQL', 'PHP', 'PL/pgSQL', 'HTML', 'CSS', 'Tailwind CSS', 'Flutter', 'Figma'].map((tech) => (
                  <motion.span
                    key={tech}
                    variants={itemVariants}
                    className="px-4 py-2 glass-card rounded-full text-sm font-medium hover:bg-primary/20 transition-colors cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            {/* Skills Section */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-secondary">
                  Skills & Expertise
                </h3>
                {!isLoading && !error && (
                  <div className="text-sm text-muted-foreground">
                    <span className="text-primary font-semibold">{totalRepos}</span> repos • 
                    <span className="text-primary font-semibold ml-1">{totalStars}</span> stars
                  </div>
                )}
              </div>

              {isLoading && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <p className="text-muted-foreground mt-2">Loading GitHub stats...</p>
                </div>
              )}

              {error && (
                <div className="text-center py-4">
                  <p className="text-muted-foreground text-sm">
                    Using fallback data (GitHub API unavailable)
                  </p>
                </div>
              )}
              
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {skill.color && (
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: skill.color }}
                          />
                        )}
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-primary font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-border rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        style={skill.color ? { 
                          background: `linear-gradient(90deg, ${skill.color} 0%, ${skill.color}80 100%)` 
                        } : undefined}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {!isLoading && !error && (
                <div className="text-center pt-4">
                  <p className="text-xs text-muted-foreground">
                    Data fetched from <a 
                      href="https://github.com/cornetto999" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      GitHub
                    </a>
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;