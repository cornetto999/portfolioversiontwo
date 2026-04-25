import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Info, Sparkles, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { useGsapCards } from '@/hooks/use-gsap-cards';
import project1 from '@/assets/e-boy.jpg';
import project2 from '@/assets/who.jpg';
import project3 from '@/assets/ytweb.jpg';
import project4 from '@/assets/dtr.jpg';
import project5 from '@/assets/luxera.jpg';
import project6 from '@/assets/pos-sari.jpg';
import convoyProject from '@/assets/convoy.jpg';

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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  useGsapCards(sectionRef, { selector: '.project-card', start: 'top 80%', stagger: 0.14, once: true });
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [carouselHovered, setCarouselHovered] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

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
      title: 'Convoy App',
      description: 'A group travel web app built around shared routes, live tracking, and smart alerts for safer convoy coordination.',
      image: convoyProject,
      technologies: ['Shared Routes', 'Live Tracking', 'Smart Alerts', 'Maps'],
      liveUrl: 'https://convoyapp.vercel.app',
      featured: true,
      category: 'Web Apps',
    },
    {
      id: 7,
      title: 'POS-Sari',
      description: 'A lightweight point-of-sale web app tailored for sari-sari stores, for fast sales and inventory tracking.',
      image: project6,
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
      liveUrl: 'https://pos-sari.vercel.app',
      featured: false,
      category: 'Dashboards',
    },
    {
      id: 8,
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
      id: 9,
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
      id: 10,
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
      id: 11,
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

  const displayProjects = [...projects].sort(
    (a, b) => Number(b.featured) - Number(a.featured)
  );

  const filteredProjects = displayProjects;

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

    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => setCarouselIndex(carouselApi.selectedScrollSnap());
    carouselApi.on('select', onSelect);
    onSelect();
    return () => carouselApi.off('select', onSelect);
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi || prefersReducedMotion || carouselHovered) return;
    if (filteredProjects.length <= 1) return;
    const interval = window.setInterval(() => {
      carouselApi.scrollNext();
    }, 3200);
    return () => window.clearInterval(interval);
  }, [carouselApi, prefersReducedMotion, carouselHovered, filteredProjects.length]);

  useEffect(() => {
    if (filteredProjects.length === 0) {
      setCarouselIndex(0);
      return;
    }
    if (carouselApi) {
      carouselApi.scrollTo(0);
    }
    setCarouselIndex(0);
  }, [carouselApi, filteredProjects.length]);

  const handleProjectClick = (url: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const openLiveDemoPreview = (project: Project) => {
    if (!project.liveUrl || project.liveUrl === '#') return;
    setPreviewProject(project);
    setSelectedProject(null);
  };

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="projects-reveal text-center">
            <h2 className="text-4xl font-semibold md:text-5xl">
              Best <span>Projects</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A showcase of my recent work and creative projects that demonstrate my technical skills and passion for
              innovative solutions.
            </p>
          </div>

          <div className="projects-reveal mt-10 rounded-3xl border border-border/60 bg-card/30 p-5 backdrop-blur-lg md:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between" />
          </div>

          {filteredProjects.length > 0 ? (
            <div
              className="projects-reveal mt-12"
              onMouseEnter={() => setCarouselHovered(true)}
              onMouseLeave={() => setCarouselHovered(false)}
            >
              <Carousel
                setApi={setCarouselApi}
                opts={{ loop: true, align: 'start' }}
                className="projects-carousel relative"
              >
                <CarouselContent className="-ml-6">
                  {filteredProjects.map((project, index) => {
                    const hasLiveDemo = project.liveUrl && project.liveUrl !== '#';
                    const hasGitHub = !!project.githubUrl && project.githubUrl !== '#';
                    return (
                    <CarouselItem
                      key={project.title}
                      className="pb-2 pl-6 md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="project-card glass-card glass-hover flex h-full flex-col overflow-hidden rounded-3xl transition-transform duration-500">
                        <div className="relative overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="h-52 w-full object-cover transition-transform duration-500 hover:scale-105"
                            loading={index < 2 ? 'eager' : 'lazy'}
                            decoding="async"
                            fetchPriority={index < 2 ? 'high' : 'low'}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                          <div className="glass-badge absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-primary">
                            {project.category}
                          </div>
                          {project.featured && (
                            <div className="glass-badge absolute right-4 top-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-primary">
                              <Sparkles className="h-3.5 w-3.5" />
                              Featured
                            </div>
                          )}
                        </div>
                        <div className="flex h-full flex-col p-5">
                          <h3 className="text-lg font-semibold">{project.title}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <span key={tech} className="glass-badge rounded-full px-3 py-1 text-xs text-primary">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="mt-auto flex gap-3 pt-5">
                            <Button
                              size="sm"
                              className="glass-button w-full rounded-xl text-primary-foreground"
                              disabled={!hasLiveDemo}
                              onClick={() => openLiveDemoPreview(project)}
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              {hasLiveDemo ? 'Live Demo' : 'Preview Soon'}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="glass-button rounded-xl"
                              onClick={() => setSelectedProject(project)}
                              aria-label={`View details for ${project.title}`}
                            >
                              <Info className="h-4 w-4" />
                            </Button>
                            {hasGitHub && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="glass-button rounded-xl"
                                onClick={() => handleProjectClick(project.githubUrl!)}
                              >
                                <Github className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  )})}
                </CarouselContent>
                <CarouselPrevious className="glass-button" />
                <CarouselNext className="glass-button" />
              </Carousel>

              <div className="mt-6 flex items-center justify-center gap-2">
                {filteredProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => carouselApi?.scrollTo(index)}
                    className={`h-2.5 w-2.5 rounded-full transition-all ${
                      carouselIndex === index ? 'bg-primary' : 'bg-muted/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="projects-reveal mt-10 rounded-3xl border border-border/60 bg-card/30 p-10 text-center">
              <h3 className="text-xl font-semibold">No projects match your filters.</h3>
              <p className="mt-3 text-muted-foreground">
                Try another keyword or category to explore the rest of my work.
              </p>
              <Button
                className="glass-button mt-5 rounded-full"
                variant="outline"
                onClick={() => null}
              >
                Reset filters
              </Button>
            </div>
          )}

          {/* Grid removed in favor of carousel-only */}
        </div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="glass-card max-w-lg">
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
                  decoding="async"
                />
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="glass-badge rounded-full px-3 py-1">{selectedProject.category}</span>
                  {selectedProject.featured && (
                    <span className="glass-badge rounded-full px-3 py-1 text-primary">Featured project</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span key={tech} className="glass-badge rounded-full px-3 py-1 text-xs text-primary">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {selectedProject.liveUrl && selectedProject.liveUrl !== '#' && (
                    <Button
                      className="glass-button rounded-xl text-primary-foreground"
                      onClick={() => openLiveDemoPreview(selectedProject)}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                  )}
                  {selectedProject.caseStudyUrl && selectedProject.caseStudyUrl !== '#' && (
                    <Button
                      variant="outline"
                      className="glass-button rounded-xl"
                      onClick={() => handleProjectClick(selectedProject.caseStudyUrl!)}
                    >
                      Case Study
                    </Button>
                  )}
                  {selectedProject.githubUrl && selectedProject.githubUrl !== '#' && (
                    <Button
                      variant="outline"
                      className="glass-button rounded-xl"
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
      {previewProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md">
          <div className="glass-card w-full max-w-6xl rounded-3xl border border-border/60 p-4 md:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold md:text-xl">{previewProject.title} Live Demo</h3>
              <Button
                variant="outline"
                size="icon"
                className="glass-button rounded-full"
                onClick={() => setPreviewProject(null)}
                aria-label="Close live demo preview"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <AspectRatio
                ratio={16 / 9}
                className="overflow-hidden rounded-xl border border-border/60 bg-black/40"
              >
                <iframe
                  src={previewProject.liveUrl}
                  title={`${previewProject.title} live demo`}
                  className="h-full w-full"
                  loading="lazy"
                  allow="fullscreen"
                />
              </AspectRatio>
              <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
                <p>If embed is blocked by the site, use Open in New Tab.</p>
                <Button
                  variant="outline"
                  className="glass-button rounded-xl"
                  onClick={() => handleProjectClick(previewProject.liveUrl)}
                >
                  Open in New Tab
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
