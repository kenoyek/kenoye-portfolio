import { motion } from "framer-motion";
import { ArrowRight, FileText, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/content/site";
import { fadeIn, fadeUp, inViewProps, slideFromRight, staggerContainer } from "@/lib/animations";

export const HomeHero = () => (
  <section className="relative border-b border-border bg-background pt-28 sm:pt-32 lg:pt-36">
    <Container className="pb-16 sm:pb-20 lg:pb-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">

        {/* Left column */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Availability badge */}
          {siteConfig.openToWork && (
            <motion.div variants={fadeIn} className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/8 px-3.5 py-1.5">
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
            className="max-w-5xl text-[2.15rem] font-semibold leading-[1.08] text-foreground sm:text-5xl sm:leading-tight lg:text-6xl xl:text-7xl"
          >
            I architect and ship production software across web, mobile, health, and education.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-body-large text-muted-foreground">
            I'm Okagua Kenoye, a full-stack and product engineer working across React, TypeScript, Supabase, and Capacitor.
            I take products from architecture to production delivery, including mobile app releases to Android and iOS.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#work"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              View selected work <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={16} aria-hidden="true" />
            </a>
            <a
              href={siteConfig.social.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-border-strong px-5 text-sm font-semibold text-foreground transition-all hover:border-accent hover:text-accent hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              View résumé <FileText className="ml-2" size={16} aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-border px-5 text-sm font-medium text-muted-foreground transition-all hover:border-accent/60 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Discuss an opportunity <Mail className="ml-2" size={16} aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right column */}
        <motion.aside
          variants={slideFromRight}
          {...inViewProps}
          className="border-l border-border pl-5 lg:pl-8"
          aria-label="Professional summary"
        >
          <dl className="space-y-6">
            <div>
              <dt className="text-metadata uppercase text-muted-foreground">Focus</dt>
              <dd className="mt-2 text-sm font-medium text-foreground">
                Product architecture, mobile delivery, full-stack systems
              </dd>
            </div>
            <div>
              <dt className="text-metadata uppercase text-muted-foreground">Domains</dt>
              <dd className="mt-2 text-sm font-medium text-foreground">
                HealthTech · EdTech · SaaS · CMS platforms
              </dd>
            </div>
            <div>
              <dt className="text-metadata uppercase text-muted-foreground">Location</dt>
              <dd className="mt-2 flex items-center gap-1.5 text-sm font-medium text-foreground">
                <MapPin size={13} className="text-muted-foreground" aria-hidden="true" />
                {siteConfig.location} · {siteConfig.workPreference}
              </dd>
            </div>
            <div>
              <dt className="text-metadata uppercase text-muted-foreground">Résumé</dt>
              <dd className="mt-2">
                <a
                  href={siteConfig.social.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-accent underline-offset-4 hover:underline"
                  aria-label="View Okagua Kenoye's résumé (opens in new tab)"
                >
                  View résumé
                </a>
              </dd>
            </div>
          </dl>
        </motion.aside>

      </div>
    </Container>
  </section>
);
