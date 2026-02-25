import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();
  const prefersReducedMotion = usePrefersReducedMotion();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useLayoutEffect(() => {
    if (prefersReducedMotion) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const getValidationErrors = (values: typeof formData, useTouched: boolean) => ({
    name:
      (!useTouched || touched.name) && values.name.trim().length < 2
        ? 'Please enter your name.'
        : '',
    email:
      (!useTouched || touched.email) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
        ? 'Enter a valid email address.'
        : '',
    message:
      (!useTouched || touched.message) && values.message.trim().length < 10
        ? 'Message should be at least 10 characters.'
        : '',
  });

  const errors = getValidationErrors(formData, true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const submitErrors = getValidationErrors(formData, false);
    if (Object.values(submitErrors).some(Boolean)) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result?.success !== true) {
        throw new Error(result?.error || 'Unable to send message.');
      }

      toast({
        title: 'Message sent',
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });
      setTouched({ name: false, email: false, message: false });
    } catch (error) {
      const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      );

      toast({
        title: 'Send failed',
        description: 'Please try again or send directly using your email app.',
        variant: 'destructive',
      });

      window.location.href = `mailto:roayafrancisjake@gmail.com?subject=${subject}&body=${body}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/cornetto999', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:roayafrancisjake@gmail.com', label: 'Email' },
    { icon: MessageCircle, href: '#', label: 'WhatsApp' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="relative overflow-hidden py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="contact-reveal text-center">
            <h2 className="text-4xl font-semibold md:text-5xl">
            Get In <span>Touch</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Let’s build something great together. Have a project in mind or want to collaborate? I’d love to hear from
              you.
            </p>
          </div>

          <div className="contact-reveal mt-16 grid gap-12 lg:grid-cols-2">
            <div className="glass-card rounded-3xl p-6 md:p-8">
              <h3 className="text-2xl font-semibold">Send me a message</h3>
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur('name')}
                    required
                  className={`glass-input h-12 rounded-xl focus-visible:ring-2 ${
                    errors.name ? 'border-destructive/60 focus-visible:ring-destructive/40' : 'focus-visible:ring-primary/40'
                  }`}
                />
                  {errors.name && <p className="mt-2 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    required
                  className={`glass-input h-12 rounded-xl focus-visible:ring-2 ${
                    errors.email ? 'border-destructive/60 focus-visible:ring-destructive/40' : 'focus-visible:ring-primary/40'
                  }`}
                />
                  {errors.email && <p className="mt-2 text-xs text-destructive">{errors.email}</p>}
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur('message')}
                    required
                    rows={6}
                  className={`glass-input rounded-xl focus-visible:ring-2 resize-none ${
                    errors.message
                      ? 'border-destructive/60 focus-visible:ring-destructive/40'
                      : 'focus-visible:ring-primary/40'
                  }`}
                />
                  {errors.message && <p className="mt-2 text-xs text-destructive">{errors.message}</p>}
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="glass-button h-12 w-full rounded-xl text-base text-primary-foreground"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            <div className="contact-reveal glass-card space-y-6 rounded-3xl p-6 md:p-8">
              <div>
                <h3 className="text-2xl font-semibold">Let's connect</h3>
                <p className="mt-4 text-muted-foreground">
                  I'm always interested in new opportunities, interesting projects, and great conversations. Whether
                  you're looking to hire, collaborate, or just want to say hello, feel free to reach out.
                </p>
                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>roayafrancisjake@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center text-primary">📍</span>
                    <span> Talakag, Bukidnon, Mindanao, Philippines 8708 </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold">Follow me</h4>
                <div className="mt-4 flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card glass-hover flex h-11 w-11 items-center justify-center rounded-xl text-muted-foreground"
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <h4 className="text-lg font-semibold">Ready to start a project?</h4>
                <p className="mt-2 text-muted-foreground">I'm available for freelance work and exciting collaborations.</p>
                <Button
                  variant="outline"
                  className="glass-button mt-4 rounded-xl text-primary hover:text-primary-foreground"
                  asChild
                >
                  <a href="/resume.pdf" download target="_blank" rel="noopener noreferrer">
                    Download Resume
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
