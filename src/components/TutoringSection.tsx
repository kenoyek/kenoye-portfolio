import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const outcomes = [
  { stat: "500+", label: "Students taught" },
  { stat: "50", label: "Project curriculum" },
  { stat: "92%", label: "Capstone completion" },
  { stat: "30+", label: "Building independently" },
];

const curriculum = [
  { phase: "01", title: "Foundations", desc: "Variables, loops, conditions — through small games and puzzles." },
  { phase: "02", title: "Projects", desc: "Calculators, quizzes, interactive stories — owning a build end to end." },
  { phase: "03", title: "Data & Logic", desc: "Data structures, algorithms, intro to data thinking." },
  { phase: "04", title: "Capstone", desc: "Design, build, and ship a real project with mentorship." },
];

const TutoringSection = () => {
  return (
    <section id="tutoring" className="section-padding bg-primary text-primary-foreground">
      <div className="max-w-[1120px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-12"
        >
          <p className="text-accent font-medium text-xs tracking-widest uppercase mb-3">Teaching & Impact</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Why teaching makes me a better engineer
          </h2>
          <div className="w-16 h-0.5 bg-accent/40 mb-4" />
          <p className="text-base sm:text-lg text-primary-foreground/65 max-w-2xl">
            If you can't explain a system to a 10-year-old, you don't understand it well enough. Teaching is my forcing function for clarity.
          </p>
        </motion.div>

        {/* Outcomes strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 sm:mb-16 border border-primary-foreground/10 rounded-xl p-5 sm:p-6 bg-primary-foreground/[0.02]"
        >
          {outcomes.map((o) => (
            <div key={o.label} className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent mb-1">{o.stat}</p>
              <p className="text-[11px] sm:text-xs uppercase tracking-wider text-primary-foreground/55">{o.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Curriculum */}
        <div className="mb-8 sm:mb-10">
          <h3 className="font-semibold text-lg mb-6">Curriculum architecture</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {curriculum.map((c, i) => (
              <motion.div
                key={c.phase}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="border border-primary-foreground/10 rounded-xl p-4 sm:p-5 hover:border-accent/40 hover:-translate-y-0.5 transition-all relative overflow-hidden"
              >
                <span className="text-xs font-mono text-accent">{c.phase}</span>
                <h4 className="font-semibold text-base mt-1 mb-2">{c.title}</h4>
                <p className="text-sm text-primary-foreground/55 leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <Button
          asChild
          size="lg"
          className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold w-full sm:w-auto h-12"
        >
          <a href="#contact">
            Book a session <ArrowRight className="ml-2" size={16} />
          </a>
        </Button>
      </div>
    </section>
  );
};

export default TutoringSection;
