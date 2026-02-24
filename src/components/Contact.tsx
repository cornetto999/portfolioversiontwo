import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/cornetto999', label: 'GitHub', color: 'hover:text-primary' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-secondary' },
    { icon: Mail, href: 'mailto:roayafrancisjake@gmail.com', label: 'Email', color: 'hover:text-primary' },
  ];

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
    <section id="contact" ref={ref} className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-4"
          >
            Get In <span className="gradient-text">Touch</span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto"
          >
            Have a project in mind or want to collaborate? I'd love to hear from you. 
            Let's create something amazing together.
          </motion.p>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
              className="rounded-3xl border border-border/70 bg-card/60 backdrop-blur-xl p-6 md:p-8 shadow-[0_18px_50px_-28px_hsl(var(--primary)/0.65)]"
            >
              <h3 className="text-2xl font-semibold mb-6">Send me a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12 rounded-xl border-border/60 bg-background/70 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/70 transition-all"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 rounded-xl border-border/60 bg-background/70 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/70 transition-all"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="rounded-xl border-border/60 bg-background/70 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/70 transition-all resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-base rounded-xl bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--secondary)))] text-primary-foreground hover:opacity-90 transition-all shadow-[0_12px_30px_-15px_hsl(var(--primary)/0.8)]"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              variants={itemVariants}
              className="space-y-8 rounded-3xl border border-border/70 bg-card/50 backdrop-blur-xl p-6 md:p-8"
            >
              <div>
                <h3 className="text-2xl font-semibold mb-6">Let's connect</h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    I'm always interested in new opportunities, interesting projects, 
                    and great conversations. Whether you're looking to hire, collaborate, 
                    or just want to say hello, feel free to reach out.
                  </p>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>roayafrancisjake@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 text-primary flex items-center justify-center">📍</span>
                    <span> Talakag, Bukidnon, Mindanao, Philippines 8708 </span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Follow me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-12 h-12 rounded-xl border border-border/70 bg-background/70 flex items-center justify-center text-muted-foreground ${social.color} hover:bg-primary/10 hover:border-primary/40 transition-all duration-300 magnetic-hover`}
                      whileHover={{ 
                        scale: 1.2, 
                        y: -3,
                        rotate: [0, -5, 5, 0],
                        boxShadow: "0 0 25px hsl(var(--primary) / 0.5)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <motion.div
                className="p-6 rounded-2xl border border-border/70 bg-background/60"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-lg font-semibold mb-2">Ready to start a project?</h4>
                <p className="text-muted-foreground mb-4">
                  I'm available for freelance work and exciting collaborations.
                </p>
                <Button
                  variant="outline"
                  className="border-primary/40 bg-card/70 text-primary hover:bg-primary hover:text-primary-foreground rounded-xl"
                  asChild
                >
                  <a href="/resume.pdf" download target="_blank" rel="noopener noreferrer">
                    Download Resume
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
