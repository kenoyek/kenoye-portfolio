import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-primary text-primary-foreground">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary-foreground) / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-foreground) / 0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />
      {/* Soft accent glow */}
      <div className="absolute top-1/3 -left-32 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1120px] w-full mx-auto px-5 py-28 sm:px-6 sm:py-32 md:py-40">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Available for select engagements
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08] mb-6">
              I build scalable systems, train future engineers, and ship products that matter.
            </h1>

            <p className="text-base sm:text-lg text-primary-foreground/65 max-w-xl mb-8 sm:mb-10 leading-relaxed">
              I help teams turn vague problems into shipped software — from architecture to launch — and teach the next generation of builders along the way.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8 sm:mb-10">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold h-12 text-base"
              >
                <a href="#portfolio">
                  View My Work <ArrowRight className="ml-2" size={16} />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/5 hover:border-accent hover:text-accent font-semibold h-12 text-base"
              >
                <a href="#contact">Let's Talk</a>
              </Button>
            </div>

            {/* Credibility strip */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-primary-foreground/55">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary-foreground">20+</span> Projects shipped
              </div>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-primary-foreground/30" />
              <div className="flex items-center gap-2">
                <span className="font-semibold text-primary-foreground">500+</span> Students taught
              </div>
              <span className="hidden sm:inline w-1 h-1 rounded-full bg-primary-foreground/30" />
              <div className="flex items-center gap-2 font-mono text-xs">
                React · TypeScript · Python
              </div>
            </div>
          </motion.div>

          {/* Terminal chip — desktop only */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block lg:col-span-5"
          >
            <div className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/[0.03] backdrop-blur-sm overflow-hidden shadow-2xl">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-primary-foreground/10">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="ml-3 text-xs text-primary-foreground/40 font-mono">~/portfolio</span>
              </div>
              <pre className="p-5 text-xs leading-relaxed font-mono text-primary-foreground/70">
{`$ whoami
> okagua kenoye
> engineer · educator · designer

$ stack --primary
> react · typescript · python · supabase

$ now --building
> scalable systems for real users`}
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
