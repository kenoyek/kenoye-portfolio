import { motion } from "framer-motion";

const milestones = [
  { year: "2018", title: "Started building", desc: "First Python script. First deployed website. The bug that started it all." },
  { year: "2020", title: "First paying client", desc: "Shipped a custom CRM that replaced a year of spreadsheets in two weeks." },
  { year: "2021", title: "Started teaching", desc: "Built a Python curriculum for kids 9–14. The first 10 students became my best teachers." },
  { year: "2023", title: "500+ students", desc: "Curriculum adopted by partner programs across 3 countries." },
  { year: "Today", title: "Systems & impact", desc: "Building multi-tenant platforms, mentoring engineers, and shipping products that matter." },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="max-w-[1120px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <p className="text-accent font-medium text-xs tracking-widest uppercase mb-3">About</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 leading-tight">
              Engineering for impact, not output.
            </h2>
            <div className="w-16 h-0.5 bg-accent/40 mb-6" />
            <p className="text-muted-foreground leading-relaxed mb-4">
              I'm Okagua Kenoye — an engineer who builds production systems and teaches the people who'll build the next ones.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              My focus is scalable architecture, clean abstractions, and making complex systems feel obvious. I think in trade-offs, ship pragmatically, and measure success in outcomes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Teaching keeps me honest. Explaining a concept to a 10-year-old forces me to understand it deeply — and that discipline shows up everywhere in my code.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="relative pl-6 sm:pl-8">
              <div className="absolute left-1 sm:left-2 top-2 bottom-2 w-px bg-border" />
              <div className="space-y-6 sm:space-y-8">
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="relative"
                  >
                    <span className="absolute -left-[22px] sm:-left-[26px] top-1.5 w-3 h-3 rounded-full bg-accent ring-4 ring-background" />
                    <p className="text-xs font-mono text-accent uppercase tracking-wider mb-1">
                      {m.year}
                    </p>
                    <h3 className="font-semibold text-foreground mb-1">{m.title}</h3>
                    <p className="text-sm text-muted-foreground">{m.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
