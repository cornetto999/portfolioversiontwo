import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  const links = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#tech', label: 'Tech Stack' },
    { href: '#projects', label: 'Projects' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#contact', label: 'Contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/cornetto999', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:roayafrancisjake@gmail.com', label: 'Email' },
    { icon: MessageCircle, href: '#', label: 'WhatsApp' },
  ];

  return (
    <footer className="border-t border-border/60 bg-background/80 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <div className="text-lg font-semibold">Francis Jake Roaya</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Full-stack developer focused on clean, scalable web experiences.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="text-muted-foreground hover:text-primary">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card glass-hover flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Francis Jake Roaya. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
