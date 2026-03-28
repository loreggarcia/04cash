import { Github, Twitter, MessageCircle } from "lucide-react";
import { Logo } from "./logo";

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: MessageCircle, href: "#", label: "Discord" }
];

const footerLinks = {
  Produto: ["Recursos", "Precos", "Seguranca", "Roadmap"],
  Desenvolvedores: ["Documentacao", "API", "SDK", "GitHub"],
  Empresa: ["Sobre", "Blog", "Carreiras", "Contato"],
  Legal: ["Privacidade", "Termos", "Cookies"]
};

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-background">
      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Logo />
            <p className="text-muted-foreground mt-6 max-w-sm leading-relaxed">
              A conta inteligente para trabalhadores autonomos que transforma cada Pix em investimento automatico. Powered by Monad.
            </p>

            <div className="flex gap-3 mt-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-secondary/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-foreground mb-5 text-sm uppercase tracking-wider">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">2024 04Cash. Todos os direitos reservados.</p>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Powered by</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm font-bold gradient-text">Monad</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
