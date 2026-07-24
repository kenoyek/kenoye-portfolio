import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="px-5 py-16 sm:px-6 md:py-24 lg:py-28 bg-primary text-primary-foreground relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--accent) / 0.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative max-w-[1120px] mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 max-w-3xl mx-auto leading-tight"
        >
          I build scalable systems, teach the next generation, and solve real-world problems.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-primary-foreground/60 max-w-xl mx-auto mb-8 sm:mb-10 text-base sm:text-lg"
        >
          Have a product idea, a class to launch, or a system to scale? Let's talk.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-8 sm:mb-10"
        >
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-12 text-base"
          >
            <a href="#contact">
              Work With Me <ArrowRight className="ml-2" size={16} />
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/5 hover:border-accent hover:text-accent font-semibold h-12 text-base"
          >
            <a
              href="https://drive.google.com/drive/folders/18QK8VnGCzIs0w01PqOqxK0rtuXB0PCK2?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="mr-2" size={16} /> Download Resume
            </a>
          </Button>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-primary-foreground/60 text-sm">
          <a href="mailto:okagua.kenny@gmail.com" className="flex items-center gap-2 hover:text-accent transition-colors py-2">
            <Mail size={16} /> Email
          </a>
          <a href="https://github.com/kenoyek" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors py-2">
            <Github size={16} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/okagua/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-accent transition-colors py-2">
            <Linkedin size={16} /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
