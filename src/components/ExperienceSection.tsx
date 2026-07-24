import { motion } from "framer-motion";

const roles = [
  {
    title: "Founder & Lead Engineer",
    org: "Kasel Consults",
    period: "2022 — Present",
    bullets: [
      "Designed and shipped 10+ production web and mobile apps across health, edtech, and e-commerce.",
      "Architected multi-tenant systems on Supabase with RLS, serving thousands of end users.",
      "Lead all phases — discovery, system design, implementation, and deployment.",
    ],
  },
  {
    title: "Python Curriculum Lead & Instructor",
    org: "Independent / Partner Schools",
    period: "2021 — Present",
    bullets: [
      "Built a 50-project Python curriculum used by 500+ learners aged 9–14.",
      "Trained 30+ kids who now build independent projects (games, calculators, web apps).",
      "Designed assessment frameworks adopted by 3 partner programs.",
    ],
  },
  {
    title: "Software Developer & Brand Designer",
    org: "Freelance",
    period: "2019 — 2022",
    bullets: [
      "Delivered custom web apps, dashboards, and brand systems to SMB clients across 3 countries.",
      "Reduced manual workflow time by 60%+ for clients through tailored automation.",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding bg-background">
      <div className="max-w-[1120px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-12"
        >
          <p className="text-accent font-medium text-xs tracking-widest uppercase mb-3">Experience</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            What I've shipped
          </h2>
          <div className="w-16 h-0.5 bg-accent/40 mb-4" />
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
            Roles defined by outcomes, not job titles.
          </p>
        </motion.div>

        <div className="relative pl-6 sm:pl-8 md:pl-12">
          <div className="absolute left-1 sm:left-2 md:left-4 top-2 bottom-2 w-px bg-border" />
          <div className="space-y-8 sm:space-y-10">
            {roles.map((r, i) => (
              <motion.div
                key={r.title + r.period}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                <span className="absolute -left-[22px] sm:-left-[26px] md:-left-[34px] top-2 w-3 h-3 rounded-full bg-accent ring-4 ring-background" />
                <div className="border border-border rounded-xl p-4 sm:p-5 md:p-6 bg-card hover:-translate-y-0.5 hover:shadow-lg transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-2 mb-1">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground">{r.title}</h3>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">{r.period}</span>
                  </div>
                  <p className="text-sm text-accent font-medium mb-3">{r.org}</p>
                  <ul className="space-y-2">
                    {r.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
