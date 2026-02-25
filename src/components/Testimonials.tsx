import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Client A',
    role: 'Startup Founder',
    quote: 'Delivered a clean dashboard build with fast turnaround and clear communication.',
    rating: 5,
  },
  {
    name: 'Client B',
    role: 'Operations Lead',
    quote: 'The admin panel improved our workflow instantly. Great UX decisions.',
    rating: 5,
  },
  {
    name: 'Client C',
    role: 'Project Manager',
    quote: 'Reliable, detail-oriented, and proactive with solutions.',
    rating: 4,
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselHovered, setCarouselHovered] = useState(false);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.testimonials-reveal', {
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
    }, 3600);
    return () => window.clearInterval(interval);
  }, [carouselApi, prefersReducedMotion, carouselHovered]);

  const getSlideClass = (index: number) => {
    const total = testimonials.length;
    if (total === 0) return 'testi-cover';
    let delta = (index - carouselIndex + total) % total;
    if (delta > total / 2) delta -= total;
    if (delta === 0) return 'testi-cover is-active';
    if (delta === -1) return 'testi-cover is-left';
    if (delta === 1) return 'testi-cover is-right';
    return 'testi-cover is-far';
  };

  return (
    <section id="testimonials" ref={sectionRef} className="relative overflow-hidden py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="testimonials-reveal text-center">
            <h2 className="text-4xl font-semibold md:text-5xl">
              Client <span>Testimonials</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Feedback from collaborations and real-world builds.
            </p>
          </div>

          <div
            className="testimonials-reveal mt-12"
            onMouseEnter={() => setCarouselHovered(true)}
            onMouseLeave={() => setCarouselHovered(false)}
          >
            <Carousel setApi={setCarouselApi} opts={{ loop: true, align: 'center' }} className="relative">
              <CarouselContent className="-ml-6">
                {testimonials.map((item, index) => (
                  <CarouselItem key={item.name} className="pl-6 md:basis-1/2 lg:basis-1/3">
                    <div className={`${getSlideClass(index)} glass-card glass-hover rounded-3xl p-7 text-center`}>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border/40 bg-background/50 text-xl">
                        “
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground">“{item.quote}”</p>
                      <div className="mt-5 text-sm font-semibold text-foreground">{item.name}</div>
                      <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{item.role}</div>
                      <div className="mt-3 flex justify-center gap-1 text-primary">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="glass-button" />
              <CarouselNext className="glass-button" />
            </Carousel>

            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => carouselApi?.scrollTo(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    carouselIndex === index ? 'bg-primary' : 'bg-muted/60'
                  }`}
                  aria-label={`Show testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
