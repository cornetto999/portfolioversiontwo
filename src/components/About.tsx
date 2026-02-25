import { useLayoutEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGitHubStats } from '@/hooks/useGitHubStats';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { useGsapCards } from '@/hooks/use-gsap-cards';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { languages, totalRepos, totalStars, isLoading, error } = useGitHubStats('cornetto999');
  const prefersReducedMotion = usePrefersReducedMotion();
  useGsapCards(sectionRef, { selector: '.about-card', start: 'top 78%', stagger: 0.12, once: true });
  useGsapCards(sectionRef, { selector: '.skill-card', start: 'top 78%', stagger: 0.08, once: true });

  const preferredSkills = [
    'React',
    'TypeScript',
    'Next.js',
    'Python',
    'MySQL',
    'PHP',
    'PL/pgSQL',
    'HTML',
    'CSS',
    'Tailwind CSS',
    'Flutter',
    'Figma',
  ];

  const githubLanguageAlias: Record<string, string[]> = {
    React: ['JavaScript', 'TypeScript', 'JSX', 'TSX'],
    TypeScript: ['TypeScript'],
    'Next.js': ['JavaScript', 'TypeScript', 'TSX', 'JSX'],
    Python: ['Python'],
    MySQL: ['SQL'],
    PHP: ['PHP'],
    'PL/pgSQL': ['PL/pgSQL'],
    HTML: ['HTML'],
    CSS: ['CSS', 'SCSS', 'Sass'],
    'Tailwind CSS': ['CSS'],
    Flutter: ['Dart'],
    Figma: [],
  };

  const skills = useMemo(() =>
    preferredSkills.map((name) => {
      const aliases = githubLanguageAlias[name] || [name];
      const matched = languages
        .filter((lang) => aliases.includes(lang.name))
        .sort((a, b) => b.percentage - a.percentage)[0];

      return {
        name,
        level: matched?.percentage ?? null,
        color: matched?.color ?? '#6b7280',
      };
    }), [languages]
  );

  const stats = [
    { label: 'Projects', value: '6+', sub: 'Built & shipped' },
    { label: 'Technologies', value: `${preferredSkills.length}+`, sub: 'Core toolkit' },
    { label: 'GitHub Stars', value: `${totalStars ?? 0}`, sub: 'Community impact' },
  ];

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      });

      gsap.from('.skill-bar', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        scaleX: 0,
        transformOrigin: 'left',
        duration: 1.1,
        ease: 'power2.out',
        stagger: 0.05,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="about" ref={sectionRef} className="relative overflow-hidden py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="about-reveal text-center">
            <h2 className="text-4xl font-semibold md:text-5xl">
            About <span>Me</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A quick snapshot of my background, strengths, and what I bring to every project.
            </p>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            <div className="about-reveal space-y-6">
              <h3 className="text-2xl font-semibold text-primary">
                Passionate Developer & Creative Problem Solver
              </h3>

              <div className="space-y-4 text-muted-foreground">
                <p>
                  As a recent graduate in web development, I’m passionate about building digital solutions that connect
                  design and functionality. My journey began with a strong curiosity about how technology can bring ideas
                  to life, which has grown into a commitment to learning and creating.
                </p>

                <p>
                  I’ve gained hands-on experience with modern web technologies through academic projects, internships, and
                  personal work. My skills include frontend frameworks like React and Next.js, as well as backend tools such
                  as Node.js and PHP/Python. I enjoy writing clean, efficient code and focusing on user-friendly
                  experiences.
                </p>

                <p>
                  Beyond coding, I love exploring new design trends, experimenting with creative projects, and expanding my
                  knowledge in emerging technologies. I’m eager to collaborate, grow, and contribute to impactful projects
                  in the tech industry.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {preferredSkills.map((tech) => (
                  <span
                    key={tech}
                    className="glass-badge rounded-full px-4 py-2 text-sm font-medium text-foreground/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="about-reveal space-y-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="about-card glass-card glass-hover rounded-2xl p-4">
                  <div className="text-sm text-muted-foreground">Years of experience</div>
                  <div className="mt-2 text-3xl font-semibold text-primary">1+ Years</div>
                </div>
                <div className="about-card glass-card glass-hover rounded-2xl p-4">
                  <div className="text-sm text-muted-foreground">What I build</div>
                  <div className="mt-2 text-lg font-semibold">Web Apps • Dashboards • Admin Panels</div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { title: 'Web Apps', desc: 'Polished, responsive experiences with modern stacks.' },
                  { title: 'Dashboards', desc: 'Data-rich interfaces with clarity and speed.' },
                  { title: 'Admin Panels', desc: 'Workflow-focused tools with secure access.' },
                  { title: 'API Integrations', desc: 'Clean data flows and automation-ready services.' },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="about-card glass-card glass-hover rounded-2xl p-5"
                  >
                    <h4 className="text-base font-semibold">{card.title}</h4>
                    <p className="mt-2 text-sm text-muted-foreground">{card.desc}</p>
                  </div>
                ))}
              </div>

              <div className="glass-card rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-secondary">Skills & Expertise</h3>
                  {!isLoading && !error && (
                    <div className="text-sm text-muted-foreground">
                      <span className="text-primary font-semibold">{totalRepos}</span> repos •
                      <span className="ml-1 text-primary font-semibold">{totalStars}</span> stars
                    </div>
                  )}
                </div>

                {isLoading && (
                  <div className="py-8 text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
                    <p className="mt-2 text-muted-foreground">Loading GitHub stats...</p>
                  </div>
                )}

                {error && (
                  <div className="py-4 text-center">
                    <p className="text-sm text-muted-foreground">Unable to load live GitHub stats: {error}</p>
                  </div>
                )}

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {skills.map((skill) => (
                    <div key={skill.name} className="skill-card glass-card glass-hover rounded-2xl px-4 py-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: skill.color }} />
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <span className="font-semibold text-primary">
                          {skill.level !== null ? `${skill.level}%` : 'Listed'}
                        </span>
                      </div>
                      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-muted/30">
                        <div
                          className="skill-bar h-full rounded-full"
                          style={{
                            width: `${Math.max(skill.level ?? 18, 18)}%`,
                            background: `linear-gradient(90deg, ${skill.color} 0%, ${skill.color}80 100%)`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {!isLoading && !error && skills.length === 0 && (
                  <div className="py-4 text-center">
                    <p className="text-sm text-muted-foreground">No GitHub language data available yet.</p>
                  </div>
                )}

                {!isLoading && !error && (
                  <div className="pt-4 text-center">
                    <p className="text-xs text-muted-foreground">
                      Data fetched from{' '}
                      <a
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
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="glass-card glass-hover rounded-2xl p-4 text-center"
                  >
                    <div className="text-2xl font-semibold text-primary">{stat.value}</div>
                    <div className="mt-1 text-sm font-medium text-foreground/80">{stat.label}</div>
                    <div className="text-xs text-muted-foreground">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
