import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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

  const displayProjects = [...projects].sort(
    (a, b) => Number(b.featured) - Number(a.featured)
  );

  const featuredProjects = displayProjects;

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
    const interval = window.setInterval(() => {
      carouselApi.scrollNext();
    }, 3200);
    return () => window.clearInterval(interval);
  }, [carouselApi, prefersReducedMotion, carouselHovered]);

  const handleProjectClick = (url: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const getSlideClass = (index: number) => {
    const total = featuredProjects.length;
    if (total === 0) return 'cover-slide';
    let delta = (index - carouselIndex + total) % total;
    if (delta > total / 2) delta -= total;
    if (delta === 0) return 'cover-slide is-active';
    if (delta === -1) return 'cover-slide is-left';
    if (delta === 1) return 'cover-slide is-right';
    return 'cover-slide is-far';
  };

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="projects-reveal text-center">
            <h2 className="text-4xl font-semibold md:text-5xl">
              Featured <span>Projects</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A showcase of my recent work and creative projects that demonstrate my technical skills and passion for
              innovative solutions.
            </p>
          </div>

          {featuredProjects.length > 0 && (
            <div
              className="projects-reveal mt-12"
              onMouseEnter={() => setCarouselHovered(true)}
              onMouseLeave={() => setCarouselHovered(false)}
            >
              <Carousel
                setApi={setCarouselApi}
                opts={{ loop: true, align: 'center' }}
                className="relative"
              >
                <CarouselContent className="-ml-6">
                  {featuredProjects.map((project, index) => (
                    <CarouselItem
                      key={project.title}
                      className="pl-6 md:basis-1/2 lg:basis-1/3"
                    >
                      <div className={`${getSlideClass(index)} glass-card glass-hover flex h-full flex-col overflow-hidden rounded-3xl`}>
                        <div className="relative overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="h-52 w-full object-cover transition-transform duration-500 hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                          <div className="glass-badge absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-primary">
                            <Sparkles className="h-3.5 w-3.5" />
                            Featured
                          </div>
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
                              onClick={() => handleProjectClick(project.liveUrl)}
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Live Demo
                            </Button>
                            {project.githubUrl && project.githubUrl !== '#' && (
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
                  ))}
                </CarouselContent>
                <CarouselPrevious className="glass-button" />
                <CarouselNext className="glass-button" />
              </Carousel>

              <div className="mt-6 flex items-center justify-center gap-2">
                {featuredProjects.map((_, index) => (
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
                />
                <p className="text-sm text-muted-foreground">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span key={tech} className="glass-badge rounded-full px-3 py-1 text-xs text-primary">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button
                    className="glass-button rounded-xl text-primary-foreground"
                    onClick={() => handleProjectClick(selectedProject.liveUrl)}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Button>
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
    </section>
  );
};

export default Projects;
