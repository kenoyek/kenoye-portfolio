import { motion } from "framer-motion";
import { ArrowUpRight, Database, Layout, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const decisions = [
  { icon: Layout, title: "React + TypeScript", desc: "Type-safe UI with predictable component contracts." },
  { icon: Database, title: "Supabase + Postgres", desc: "Realtime data, RLS, and zero-config auth." },
  { icon: Shield, title: "Row-Level Security", desc: "Tenant isolation enforced at the database, not the API." },
  { icon: Zap, title: "Edge Functions", desc: "Stateless compute close to users — sub-100ms cold starts." },
];

const FeaturedCaseStudy = () => {
  return (
    <section id="case-studies" className="section-padding bg-background">
      <div className="max-w-[1120px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-12"
        >
          <p className="text-accent font-medium text-xs tracking-widest uppercase mb-3">Featured Case Study</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            TogaCode — A Multi-Tenant LMS for Coding Tutors
          </h2>
          <div className="w-16 h-0.5 bg-accent/40 mb-4" />
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
            How I designed and shipped a scalable learning platform with realtime classes, an embedded code runner, and tenant-safe data isolation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3 space-y-6 sm:space-y-8"
          >
            <div>
              <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Problem</h3>
              <p className="text-muted-foreground leading-relaxed">
                Independent coding tutors juggled spreadsheets, Zoom links, and email threads to manage students. There was no unified system for course delivery, live code feedback, or class membership — and no path to scale beyond a handful of learners.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Architecture</h3>
              {/* Desktop diagram */}
              <pre className="hidden sm:block text-[10px] sm:text-xs bg-muted/50 border border-border rounded-xl p-3 sm:p-4 overflow-x-auto font-mono leading-relaxed text-foreground/80 max-w-full">
{`┌──────────────┐    ┌──────────────────┐    ┌──────────────┐
│  React SPA   │───▶│  Supabase API    │───▶│  Postgres +  │
│  (Vite, TS)  │    │  (Auth + RLS)    │    │  RLS Policies│
└──────────────┘    └──────────────────┘    └──────────────┘
        │                    │                      ▲
        │                    ▼                      │
        │           ┌──────────────────┐            │
        └──────────▶│  Edge Functions  │────────────┘
                    │  (Code runner)   │
                    └──────────────────┘`}
              </pre>
              {/* Mobile simplified diagram */}
              <div className="sm:hidden bg-muted/50 border border-border rounded-xl p-3 font-mono text-[10px] leading-relaxed text-foreground/80 space-y-1">
                <div className="border border-border/60 rounded px-2 py-1">React SPA (Vite, TS)</div>
                <div className="text-accent text-center">▼</div>
                <div className="border border-border/60 rounded px-2 py-1">Supabase API (Auth + RLS)</div>
                <div className="text-accent text-center">▼</div>
                <div className="border border-border/60 rounded px-2 py-1">Postgres + RLS Policies</div>
                <div className="text-accent text-center">▲</div>
                <div className="border border-border/60 rounded px-2 py-1">Edge Functions (Code runner)</div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Trade-offs</h3>
              <ul className="space-y-2 text-muted-foreground text-sm sm:text-base">
                <li className="flex gap-2">
                  <span className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />
                  <span>Chose RLS over a custom auth layer — slower iteration up front, but eliminated an entire class of authorization bugs.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />
                  <span>Sandboxed code execution in edge functions instead of client-side eval — small latency cost, large security win.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />
                  <span>Invite codes over email-only enrollment — lower friction for non-technical parents, easier classroom onboarding.</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold w-full sm:w-auto h-12"
              >
                <a href="https://code-buddy-lms.vercel.app/" target="_blank" rel="noopener noreferrer">
                  View Live Project <ArrowUpRight className="ml-2" size={16} />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Decisions sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            <h3 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">Key Decisions</h3>
            {decisions.map((d) => (
              <div
                key={d.title}
                className="border border-border rounded-xl p-4 bg-card hover:border-accent/40 transition-colors"
              >
                <d.icon className="text-accent mb-2" size={20} />
                <h4 className="font-semibold text-foreground mb-1">{d.title}</h4>
                <p className="text-sm text-muted-foreground">{d.desc}</p>
              </div>
            ))}

            <div className="border border-accent/30 rounded-xl p-5 bg-accent/5 mt-6">
              <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-2">Outcome</p>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Tutors now run end-to-end classes from one dashboard. Course creation time dropped ~70%, and student progress is visible in real time.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCaseStudy;
