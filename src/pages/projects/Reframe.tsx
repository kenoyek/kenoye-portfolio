import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Smartphone,
  Bell,
  Link2,
  Zap,
  Layers,
  RefreshCw,
  Rocket,
  ShieldCheck,
  Apple,
  Cpu,
  Newspaper,
  MessagesSquare,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { Button } from "@/components/ui/button";

const stack = [
  "React", "TypeScript", "Capacitor", "Next.js", "Tailwind CSS",
  "iOS", "Android", "REST APIs", "Push Notifications", "Deep Linking",
  "WebView Optimization", "CMS Integration", "Git",
];

const responsibilities = [
  {
    icon: Layers,
    title: "Mobile Architecture",
    points: [
      "Designed the Capacitor mobile architecture",
      "Integrated the existing Next.js web platform into native shells",
      "Produced production-ready Android and iOS builds",
      "Tuned WebView behavior for mobile devices",
    ],
  },
  {
    icon: Smartphone,
    title: "Native Integration",
    points: [
      "Push notifications & deep linking",
      "Native status bar, splash screen, safe-area handling",
      "App lifecycle & native browser support",
      "Device permissions and platform APIs",
    ],
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    points: [
      "Reduced unnecessary reloads and cold-start work",
      "Optimized rendering and navigation transitions",
      "Improved mobile responsiveness and content loading",
    ],
  },
  {
    icon: RefreshCw,
    title: "CMS Synchronization",
    points: [
      "News, articles, and images sync instantly to mobile",
      "Updates ship without new app releases",
      "Likes & comments stay in sync across surfaces",
    ],
  },
  {
    icon: Rocket,
    title: "App Store Deployment",
    points: [
      "iOS & Android native project configuration",
      "Signing, release optimization, store-ready builds",
      "Production testing and build troubleshooting",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Production Engineering",
    points: [
      "Mobile debugging and build pipelines",
      "Platform configuration & native project management",
      "End-to-end store deployment process",
    ],
  },
];

const challenges = [
  {
    n: "01",
    title: "Live CMS ↔ Mobile Sync",
    problem: "Keep both apps continuously in sync with editorial content published from the CMS.",
    solution: "Mobile apps consume the same backend APIs as the web platform — content updates propagate automatically with zero app releases.",
  },
  {
    n: "02",
    title: "Native Feel from a Web Core",
    problem: "Avoid the “wrapped website” UX that plagues most Capacitor apps.",
    solution: "Native plugins, safe-area, status bar theming, lifecycle handling, and mobile-first layouts deliver a polished native experience.",
  },
  {
    n: "03",
    title: "Cross-platform Consistency",
    problem: "Reconcile platform-specific rendering differences between iOS and Android.",
    solution: "Unified codebase with targeted platform overrides; consistent typography, spacing, and gesture behavior across devices.",
  },
  {
    n: "04",
    title: "App Store Readiness",
    problem: "Meet Apple and Google submission requirements on the first attempt.",
    solution: "Configured native projects, signing, and release builds; validated against store guidelines and production QA passes.",
  },
];

const features = [
  { icon: Newspaper, label: "Daily News Feed" },
  { icon: Newspaper, label: "Article Reader" },
  { icon: MessagesSquare, label: "Community Posts" },
  { icon: RefreshCw, label: "CMS Synchronization" },
  { icon: Smartphone, label: "Native Navigation" },
  { icon: Zap, label: "Mobile Optimizations" },
  { icon: Bell, label: "Push Notifications" },
  { icon: Link2, label: "Deep Linking" },
  { icon: Layers, label: "Responsive Layouts" },
  { icon: Rocket, label: "Cross-platform Deployment" },
  { icon: Cpu, label: "Native Device Integration" },
  { icon: ShieldCheck, label: "Production Build Pipeline" },
];

const timeline = [
  {
    phase: "Phase 1",
    title: "Project Assessment",
    items: ["Reviewed existing web architecture", "Evaluated CMS integration", "Planned mobile architecture"],
  },
  {
    phase: "Phase 2",
    title: "Mobile Foundation",
    items: ["Capacitor integration", "Native configuration", "Android setup", "iOS setup"],
  },
  {
    phase: "Phase 3",
    title: "Mobile Enhancements",
    items: ["Safe-area improvements", "Native UI polish", "Performance optimization", "Navigation improvements"],
  },
  {
    phase: "Phase 4",
    title: "Native Features",
    items: ["Push notification infrastructure", "Deep linking", "Device integrations", "Lifecycle handling"],
  },
  {
    phase: "Phase 5",
    title: "Production Readiness",
    items: ["Build optimization", "Cross-platform testing", "Store preparation", "Release pipeline"],
  },
];

const metrics = [
  { k: "1", label: "Shared codebase across Web, iOS & Android" },
  { k: "0", label: "App resubmissions needed for content updates" },
  { k: "2", label: "Production-ready native platforms" },
  { k: "10+", label: "Native integrations implemented" },
];

const gallery = [
  "Home Screen", "News Feed", "Article Page", "Community Feed",
  "Mobile Navigation", "iOS Screens", "Android Screens", "Push Notifications",
];

const Reframe = () => {
  useEffect(() => {
    document.title = "Reframe Mobile App | Cross-platform Mobile Engineering Case Study";
    const desc = "A detailed case study on transforming a CMS-driven web platform into production-ready Android and iOS apps with React, TypeScript, Next.js, and Capacitor.";
    let m = document.querySelector('meta[name="description"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute("content", desc);
  }, []);

  return (
    <main className="overflow-x-clip bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="absolute inset-0 -z-10 opacity-40 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent)/0.15),transparent_60%)]" />
        <div className="max-w-[1120px] mx-auto">
          <Link
            to="/#portfolio"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Back to work
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-accent font-medium text-xs tracking-widest uppercase mb-3">
              Featured Case Study · Mobile Engineering
            </p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-4 leading-tight">
              Reframe Mobile App
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-6">
              Turning a CMS-driven Next.js platform into a production-ready native iOS and Android
              experience — one shared codebase, live content sync, and zero app resubmissions for editorial updates.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {["Lead Mobile Engineer", "iOS", "Android", "Capacitor", "Next.js"].map((t) => (
                <span
                  key={t}
                  className="text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="grid sm:grid-cols-3 gap-3 mt-8">
              {[
                { label: "Role", value: "Lead Mobile / Full Stack Engineer" },
                { label: "Type", value: "Cross-platform Mobile App" },
                { label: "Platforms", value: "iOS · Android · Web" },
              ].map((i) => (
                <div key={i.label} className="border border-border rounded-xl p-4 bg-card">
                  <p className="text-[10px] uppercase tracking-wider text-accent font-semibold mb-1">{i.label}</p>
                  <p className="text-sm text-foreground font-medium">{i.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding bg-muted/30 border-y border-border">
        <div className="max-w-[1120px] mx-auto grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Project Overview</h2>
            <div className="w-16 h-0.5 bg-accent/40 mb-4" />
            <p className="text-muted-foreground leading-relaxed mb-4">
              Reframe is a content-driven digital platform that publishes daily news, articles, images, and community
              updates. The objective was to transform the existing web experience into production-quality native iOS
              and Android apps using Capacitor — while ensuring every CMS publication automatically syncs to both apps.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This wasn't about wrapping a website. It was about delivering a polished mobile experience worthy of the
              Apple App Store and Google Play — with native integrations, mobile-tuned performance, and an
              architecture that keeps the CMS as the single source of truth.
            </p>
          </div>
          <div className="border border-border rounded-xl p-5 bg-card">
            <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {stack.map((s) => (
                <span key={s} className="text-[11px] font-mono px-2 py-1 rounded-md bg-foreground/5 text-foreground/80 border border-border">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="section-padding">
        <div className="max-w-[1120px] mx-auto">
          <p className="text-accent font-medium text-xs tracking-widest uppercase mb-3">What I Owned</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">My Responsibilities</h2>
          <div className="w-16 h-0.5 bg-accent/40 mb-8" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {responsibilities.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="border border-border rounded-xl p-5 bg-card hover:border-accent/40 hover:-translate-y-0.5 transition-all"
              >
                <r.icon className="text-accent mb-3" size={22} />
                <h3 className="font-semibold text-foreground mb-3">{r.title}</h3>
                <ul className="space-y-2">
                  {r.points.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 size={14} className="text-accent mt-0.5 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="section-padding bg-muted/30 border-y border-border">
        <div className="max-w-[1120px] mx-auto">
          <p className="text-accent font-medium text-xs tracking-widest uppercase mb-3">System Design</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Architecture</h2>
          <div className="w-16 h-0.5 bg-accent/40 mb-8" />

          <p className="text-muted-foreground max-w-2xl mb-8">
            The CMS remains the single source of truth. Web and mobile consume the same backend APIs, so editorial
            content flows to every surface — no app releases required.
          </p>

          <div className="border border-border rounded-2xl p-6 sm:p-10 bg-card">
            <div className="flex flex-col items-center gap-3 text-sm font-mono">
              {[
                "Editorial Team",
                "CMS",
                "Backend APIs",
                "Next.js Web Platform",
                "Capacitor",
              ].map((node) => (
                <div key={node} className="w-full sm:w-80 text-center border border-border rounded-lg py-3 px-4 bg-background">
                  {node}
                </div>
              ))}
              <div className="text-accent">▼</div>
              <div className="grid grid-cols-2 gap-3 w-full sm:w-80">
                <div className="border border-accent/40 rounded-lg py-3 text-center bg-accent/5 flex items-center justify-center gap-2">
                  <Apple size={14} /> iOS App
                </div>
                <div className="border border-accent/40 rounded-lg py-3 text-center bg-accent/5 flex items-center justify-center gap-2">
                  <Smartphone size={14} /> Android App
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="section-padding">
        <div className="max-w-[1120px] mx-auto">
          <p className="text-accent font-medium text-xs tracking-widest uppercase mb-3">Deep Work</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Engineering Challenges Solved</h2>
          <div className="w-16 h-0.5 bg-accent/40 mb-8" />

          <div className="grid md:grid-cols-2 gap-4">
            {challenges.map((c, i) => (
              <motion.div
                key={c.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="border border-border rounded-xl p-6 bg-card"
              >
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-accent font-mono text-sm">{c.n}</span>
                  <h3 className="text-lg font-semibold text-foreground">{c.title}</h3>
                </div>
                <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">Problem</p>
                <p className="text-sm text-muted-foreground mb-3">{c.problem}</p>
                <p className="text-xs uppercase tracking-wider text-accent font-semibold mb-1">Solution</p>
                <p className="text-sm text-foreground/85">{c.solution}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-muted/30 border-y border-border">
        <div className="max-w-[1120px] mx-auto">
          <p className="text-accent font-medium text-xs tracking-widest uppercase mb-3">Delivered</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Key Features</h2>
          <div className="w-16 h-0.5 bg-accent/40 mb-8" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {features.map((f) => (
              <div
                key={f.label}
                className="border border-border rounded-xl p-4 bg-card flex items-center gap-3 hover:border-accent/40 transition-colors"
              >
                <f.icon size={18} className="text-accent shrink-0" />
                <span className="text-sm text-foreground">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="max-w-[1120px] mx-auto">
          <p className="text-accent font-medium text-xs tracking-widest uppercase mb-3">Process</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Engineering Timeline</h2>
          <div className="w-16 h-0.5 bg-accent/40 mb-8" />

          <div className="relative">
            <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-6">
              {timeline.map((t, i) => (
                <motion.div
                  key={t.phase}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="relative pl-10 sm:pl-14"
                >
                  <div className="absolute left-0 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center text-[10px] sm:text-xs font-mono text-accent">
                    {i + 1}
                  </div>
                  <p className="text-xs uppercase tracking-wider text-accent font-semibold">{t.phase}</p>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{t.title}</h3>
                  <ul className="grid sm:grid-cols-2 gap-1.5">
                    {t.items.map((it) => (
                      <li key={it} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="section-padding bg-muted/30 border-y border-border">
        <div className="max-w-[1120px] mx-auto">
          <p className="text-accent font-medium text-xs tracking-widest uppercase mb-3">Outcomes</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Results</h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((m) => (
              <div key={m.label} className="border border-border rounded-xl p-5 bg-card">
                <p className="text-3xl sm:text-4xl font-bold text-accent mb-2">{m.k}</p>
                <p className="text-xs sm:text-sm text-muted-foreground leading-snug">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding">
        <div className="max-w-[1120px] mx-auto">
          <p className="text-accent font-medium text-xs tracking-widest uppercase mb-3">Gallery</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">Screens</h2>
          <div className="w-16 h-0.5 bg-accent/40 mb-8" />
          <p className="text-sm text-muted-foreground mb-6">
            Screenshots coming soon — placeholders shown below.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {gallery.map((label) => (
              <div
                key={label}
                className="aspect-[9/16] rounded-xl border border-border bg-gradient-to-br from-muted/40 to-card flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-accent/40 transition-colors"
              >
                <ImageIcon size={20} className="text-accent/70" />
                <span className="text-[11px] uppercase tracking-wider text-center px-2">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section-padding bg-muted/30 border-y border-border">
        <div className="max-w-[1120px] mx-auto">
          <p className="text-accent font-medium text-xs tracking-widest uppercase mb-3">Toolbelt</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Skills Demonstrated</h2>
          <div className="flex flex-wrap gap-2">
            {stack.concat([
              "Mobile Engineering", "Cross-platform Development", "Native Integration",
              "App Store Deployment", "Google Play Deployment", "Performance Optimization",
              "Responsive Design",
            ]).map((s) => (
              <span
                key={s}
                className="text-xs px-3 py-1.5 rounded-full border border-border bg-card text-foreground/85 hover:border-accent/40 transition-colors"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-[1120px] mx-auto">
          <div className="border border-accent/30 rounded-2xl p-8 sm:p-12 bg-gradient-to-br from-accent/5 to-transparent text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              Building something ambitious?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              I help teams ship senior-level mobile and full-stack products — from architecture through App Store release.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                <Link to="/#contact">Work With Me</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/#portfolio">
                  <ArrowLeft size={16} className="mr-2" /> More Projects
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </main>
  );
};

export default Reframe;
