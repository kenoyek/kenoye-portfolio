import { motion } from "framer-motion";

type Level = "Advanced" | "Proficient" | "Familiar";

const groups: { title: string; skills: { name: string; level: Level; core?: boolean }[] }[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: "Advanced", core: true },
      { name: "TypeScript", level: "Advanced", core: true },
      { name: "Tailwind CSS", level: "Advanced" },
      { name: "Framer Motion", level: "Proficient" },
      { name: "Flutter", level: "Proficient" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Supabase", level: "Advanced", core: true },
      { name: "Postgres + RLS", level: "Proficient" },
      { name: "Edge Functions", level: "Proficient" },
      { name: "Node.js", level: "Proficient" },
      { name: "REST APIs", level: "Advanced" },
    ],
  },
  {
    title: "Data / AI",
    skills: [
      { name: "Python", level: "Advanced", core: true },
      { name: "Pandas / NumPy", level: "Proficient" },
      { name: "LLM Integrations", level: "Proficient" },
      { name: "Data Visualization", level: "Proficient" },
    ],
  },
  {
    title: "Tools & Practices",
    skills: [
      { name: "Git", level: "Advanced" },
      { name: "Vite", level: "Advanced" },
      { name: "Vercel", level: "Proficient" },
      { name: "Capacitor", level: "Proficient" },
      { name: "System Design", level: "Proficient" },
    ],
  },
];

const levelStyles: Record<Level, string> = {
  Advanced: "bg-accent/15 text-accent border-accent/30",
  Proficient: "bg-foreground/5 text-foreground/80 border-border",
  Familiar: "bg-muted text-muted-foreground border-border",
};

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding bg-background">
      <div className="max-w-[1120px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-12"
        >
          <p className="text-accent font-medium text-xs tracking-widest uppercase mb-3">Skills</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Depth across the stack
          </h2>
          <div className="w-16 h-0.5 bg-accent/40 mb-4" />
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
            Tools I reach for daily, grouped by where they live in the system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {groups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="border border-border rounded-xl p-4 sm:p-5 bg-card hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-semibold text-foreground mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.skills.map((s) => (
                  <li
                    key={s.name}
                    className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg border text-sm ${
                      s.core ? "border-accent/40 bg-accent/5" : "border-transparent"
                    }`}
                  >
                    <span className="text-foreground/90 font-medium">{s.name}</span>
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border whitespace-nowrap ${levelStyles[s.level]}`}>
                      {s.level}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
