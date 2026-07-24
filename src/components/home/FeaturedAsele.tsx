import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ProjectEvidence } from "@/components/home/ProjectEvidence";
import { getProjectBySlug } from "@/content/projects";
import { fadeUp, inViewProps, slideFromLeft, slideFromRight, staggerContainer } from "@/lib/animations";

const asele = getProjectBySlug("asele");

export const FeaturedAsele = () => {
  if (!asele) return null;

  return (
    <Section className="border-y border-border bg-surface">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:items-center">

          {/* Left column */}
          <motion.div variants={slideFromLeft} {...inViewProps}>
            <p className="mb-3 text-metadata uppercase text-accent">Flagship project</p>
            <h2 className="text-page-title font-semibold text-foreground">{asele.title}</h2>
            <p className="mt-5 max-w-2xl text-body-large text-muted-foreground">{asele.summary}</p>

            <div className="mt-8 border-y border-border py-6">
              <ProjectEvidence project={asele} variant="featured" />
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="mt-8 grid gap-6 md:grid-cols-2"
            >
              <motion.div variants={fadeUp}>
                <h3 className="text-sm font-semibold text-foreground">Engineering challenge</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Build a wellness platform around sensitive personal health context, supporting mobile delivery,
                  notifications, multilingual flows, AI-assisted briefs, and administrative operations while keeping
                  clear product scope boundaries.
                </p>
              </motion.div>
              <motion.div variants={fadeUp}>
                <h3 className="text-sm font-semibold text-foreground">Product boundary</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Asele supports wellness tracking and cycle-aware briefs. It is deliberately not positioned as
                  medical diagnosis, a product decision that shapes every data model and feature boundary.
                </p>
              </motion.div>
            </motion.div>

            <div className="mt-8 flex flex-wrap gap-3">
              {asele.links?.filter((link) => link.kind !== "case-study").map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/90 hover:shadow-md"
                >
                  {link.label} <ArrowRight className="ml-2" size={16} aria-hidden="true" />
                </a>
              ))}
              <Link
                to="/projects/asele"
                className="inline-flex min-h-11 items-center rounded-md border border-border px-5 text-sm font-medium text-foreground transition-all hover:border-accent/60 hover:text-accent"
              >
                Read case study <ArrowRight className="ml-2" size={16} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          {/* Right summary card */}
          <motion.aside
            variants={slideFromRight}
            {...inViewProps}
            className="relative overflow-hidden rounded-lg border border-border bg-card shadow-subtle"
            aria-label="Asele HealthTech project summary"
          >
            <div className="grid min-h-[420px] grid-rows-[auto_1fr_auto] p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <p className="text-metadata uppercase text-muted-foreground">HealthTech · Mobile · Full-stack</p>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
              </div>
              <div className="flex flex-col justify-center py-10">
                <p className="max-w-sm text-2xl font-semibold leading-tight text-foreground">
                  Women's cycle and wellness platform
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  React · TypeScript · Supabase · Capacitor · Push Notifications · AI health briefs
                </p>
                <ul className="mt-6 space-y-2" role="list">
                  {(asele.outcomes ?? []).slice(0, 4).map((outcome) => (
                    <li key={outcome.label} className="flex items-center gap-2 text-sm text-foreground/80">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {outcome.label}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-xs font-medium text-muted-foreground">
                  View the live product at{" "}
                  <a
                    href="https://www.asele.health"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline-offset-4 hover:underline"
                  >
                    asele.health
                  </a>
                </p>
              </div>
            </div>
          </motion.aside>

        </div>
      </Container>
    </Section>
  );
};
