import { useLayoutEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import project1 from '@/assets/e-boy.png';
import project2 from '@/assets/who.png';
import project3 from '@/assets/ytweb.png';
import project4 from '@/assets/dtr.png';
import project5 from '@/assets/luxera.png';
import project6 from '@/assets/pos-sari.png';

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  category: 'Web Apps' | 'Dashboards' | 'UI';
};

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const projects: Project[] = [
    {
      id: 1,
      title: ' Chat with E-boy',
      description: 'An AI chatbot that can answer questions and help with tasks.',
      image: project1,
      technologies: ['React', 'TypeScript', 'OpenAI API', 'Tailwind CSS'],
      liveUrl: 'https://chatwitheboy-gpt.vercel.app/',
      featured: true,
      category: 'Web Apps',
    },
    {
      id: 2,
      title: 'WHOFILL DIS GAME',
      description: 'An Web app based game that you can play with your feelings.',
      image: project2,
      technologies: ['Next.js', 'Node.js', 'MySQL', 'Firebase'],
      liveUrl: 'https://whofilldisgame.vercel.app/',
      githubUrl: '#',
      featured: true,
      category: 'Web Apps',
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
      category: 'Dashboards',
    },
    {
      id: 4,
      title: 'DTR Attendance System',
      description: 'Sign in to track your work hours and achieve your goals',
      image: project4,
      technologies: ['Tailwind CSS', 'TypeScript', 'Supabase'],
      liveUrl: 'https://dtr-jek999.lovable.app',
      featured: false,
      category: 'UI',
    },
    {
      id: 5,
      title: 'Luxera',
      description: 'Discover Your Signature Scent',
      image: project5,
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
      liveUrl: 'https://luxera.lovable.app',
      featured: true,
      category: 'Web Apps',
    },
    {
      id: 6,
      title: 'POS-Sari',
      description: 'A lightweight point-of-sale web app tailored for sari-sari stores, for fast sales and inventory tracking.',
      image: project6,
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
      liveUrl: 'https://pos-sari.vercel.app',
      featured: false,
      category: 'Dashboards',
    },
    {
      id: 7,
      title: 'Inventory Management System',
      description: 'Stock tracking, reorder alerts, and supplier management in one dashboard.',
      image: '/placeholder.svg',
      technologies: ['React', 'Node.js', 'MySQL'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      category: 'Dashboards',
    },
    {
      id: 8,
      title: 'QR Attendance System',
      description: 'Fast QR-based attendance tracking with real-time logs and reporting.',
      image: '/placeholder.svg',
      technologies: ['Next.js', 'Supabase', 'Tailwind CSS'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      category: 'Web Apps',
    },
    {
      id: 9,
      title: 'Barangay Incident Reporting System',
      description: 'Case intake, status tracking, and community incident analytics.',
      image: '/placeholder.svg',
      technologies: ['PHP', 'MySQL', 'Bootstrap'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      category: 'UI',
    },
    {
      id: 10,
      title: 'Car Rental Booking Tracker',
      description: 'Reservation pipeline with fleet availability and payment tracking.',
      image: '/placeholder.svg',
      technologies: ['React', 'Supabase', 'Tailwind CSS'],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      category: 'Dashboards',
    },
  ];

  const filters = ['All', 'Web Apps', 'Dashboards', 'UI'];

  const baseProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const displayProjects = [...baseProjects].sort(
    (a, b) => Number(b.featured) - Number(a.featured)
  );

  const featuredProject = projects.find((project) => project.featured);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.projects-reveal', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });

      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        },
        y: 40,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeFilter, prefersReducedMotion]);

  const handleProjectClick = (url: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="projects-reveal text-center">
            <h2 className="text-4xl font-semibold md:text-5xl">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A showcase of my recent work and creative projects that demonstrate my technical skills and passion for
              innovative solutions.
            </p>
          </div>

          {featuredProject && (
            <div className="projects-reveal mt-12 rounded-3xl border border-border/60 bg-card/60 p-6 shadow-[0_20px_70px_-35px_rgba(0,0,0,0.7)] lg:flex lg:items-center lg:gap-8">
              <div className="relative overflow-hidden rounded-2xl border border-border/60 lg:w-[45%]">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="h-56 w-full object-cover lg:h-64"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  Spotlight
                </div>
              </div>
              <div className="mt-6 lg:mt-0 lg:flex-1">
                <h3 className="text-2xl font-semibold">{featuredProject.title}</h3>
                <p className="mt-3 text-muted-foreground">{featuredProject.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {featuredProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    className="rounded-full bg-primary text-primary-foreground"
                    onClick={() => handleProjectClick(featuredProject.liveUrl)}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Button>
                  {featuredProject.githubUrl && featuredProject.githubUrl !== '#' && (
                    <Button
                      variant="outline"
                      className="rounded-full border-primary/30"
                      onClick={() => handleProjectClick(featuredProject.githubUrl!)}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="projects-reveal mt-10 flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  activeFilter === filter
                    ? 'border-primary/60 bg-primary/10 text-primary shadow-[0_12px_35px_-24px_hsl(var(--primary)/0.9)]'
                    : 'border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayProjects.map((project) => (
              <div key={project.id} className="project-card group">
                <div
                  className="relative flex h-full min-h-[420px] cursor-pointer flex-col overflow-hidden rounded-[28px] border border-border/60 bg-card/70 shadow-[0_20px_55px_-35px_rgba(0,0,0,0.8)] transition-all duration-500 hover:-translate-y-2 hover:border-primary/50"
                  onClick={() => handleProjectClick(project.liveUrl)}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.18),transparent_60%)]" />

                  <div className="relative overflow-hidden border-b border-border/60">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    {project.featured && (
                      <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/85 border border-primary/40 px-3 py-1 text-xs font-semibold text-primary">
                        <Sparkles className="h-3.5 w-3.5" />
                        Featured
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <Button
                        size="icon"
                        className="h-11 w-11 rounded-full bg-primary text-primary-foreground"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProjectClick(project.liveUrl);
                        }}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      {project.githubUrl && project.githubUrl !== '#' && (
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-11 w-11 rounded-full border-border bg-background/90"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectClick(project.githubUrl!);
                          }}
                        >
                          <Github className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="relative z-10 flex h-full flex-col p-6">
                    <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      {project.category}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold transition-colors group-hover:text-primary">
                      {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex gap-3 pt-6">
                      <Button
                        size="sm"
                        className="w-full rounded-xl bg-primary text-primary-foreground"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProjectClick(project.liveUrl);
                        }}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Button>
                      {project.caseStudyUrl && project.caseStudyUrl !== '#' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-xl border-border/60"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectClick(project.caseStudyUrl!);
                          }}
                        >
                          Case Study
                        </Button>
                      ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-xl border-border/60"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                      >
                        Details
                      </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-lg">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProject.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-48 w-full rounded-2xl object-cover"
                  loading="lazy"
                />
                <p className="text-sm text-muted-foreground">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button
                    className="rounded-xl bg-primary text-primary-foreground"
                    onClick={() => handleProjectClick(selectedProject.liveUrl)}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Button>
                  {selectedProject.caseStudyUrl && selectedProject.caseStudyUrl !== '#' && (
                    <Button
                      variant="outline"
                      className="rounded-xl"
                      onClick={() => handleProjectClick(selectedProject.caseStudyUrl!)}
                    >
                      Case Study
                    </Button>
                  )}
                  {selectedProject.githubUrl && selectedProject.githubUrl !== '#' && (
                    <Button
                      variant="outline"
                      className="rounded-xl"
                      onClick={() => handleProjectClick(selectedProject.githubUrl!)}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
