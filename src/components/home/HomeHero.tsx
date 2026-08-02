import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SignatureOrbit } from "@/components/home/SignatureOrbit";
import { siteConfig } from "@/content/site";
import { fadeIn, fadeUp, inViewProps, slideFromRight, staggerContainer } from "@/lib/animations";

export const HomeHero = () => (
  <section className="relative overflow-hidden border-b border-border bg-background pt-24 sm:pt-28 lg:pt-24">
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,hsl(var(--surface))_0%,transparent_100%)]"
      aria-hidden="true"
    />
    <Container className="relative pb-14 sm:pb-16 lg:pb-16">
      <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center">
        {/* Left column */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          {/* Availability badge */}
          {siteConfig.openToWork && (
            <motion.div variants={fadeIn} className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="text-xs font-medium text-accent">
                  {siteConfig.availabilityNote}
                </span>
              </div>
            </motion.div>
          )}

          <motion.p variants={fadeUp} className="mb-5 text-metadata uppercase text-accent">
            Senior Full-Stack and Product Engineer
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="max-w-5xl text-[2.2rem] font-semibold leading-[1.04] text-foreground sm:text-5xl sm:leading-[1.03] lg:text-[3.55rem] xl:text-[3.75rem]"
          >
            I design, architect, and ship product software for web, mobile, health, education, and
            SaaS.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-2xl text-body-large text-muted-foreground"
          >
            I'm Okagua Kenoye, a product-focused software developer working across React,
            TypeScript, Supabase, and Capacitor. I help teams turn complex product requirements into
            secure, usable systems that can move from concept to production release.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <a
              href="#work"
              className="group inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              View selected work{" "}
              <ArrowRight
                className="ml-2 transition-transform group-hover:translate-x-1"
                size={16}
                aria-hidden="true"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-border-strong px-5 text-sm font-semibold text-foreground transition-all hover:border-accent hover:text-accent hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Start a conversation <Mail className="ml-2" size={16} aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right column */}
        <motion.aside
          variants={slideFromRight}
          {...inViewProps}
          className="space-y-6 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
          aria-label="Professional focus summary"
        >
          <SignatureOrbit />

          <dl className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[
              ["Focus", "Product architecture, mobile delivery, full-stack systems"],
              ["Domains", "HealthTech · EdTech · SaaS · CMS platforms"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="border-t border-border pt-4 first:border-t-0 first:pt-0 sm:first:border-t sm:first:pt-4 lg:first:border-t-0 lg:first:pt-0"
              >
                <dt className="text-metadata uppercase text-muted-foreground">{label}</dt>
                <dd className="mt-2 text-sm font-medium text-foreground">{value}</dd>
              </div>
            ))}
            <div className="border-t border-border pt-4">
              <dt className="text-metadata uppercase text-muted-foreground">Location</dt>
              <dd className="mt-2 flex items-center gap-1.5 text-sm font-medium text-foreground">
                <MapPin size={13} className="text-muted-foreground" aria-hidden="true" />
                {siteConfig.location} · {siteConfig.workPreference}
              </dd>
            </div>
          </dl>
        </motion.aside>
      </div>
    </Container>
  </section>
);
