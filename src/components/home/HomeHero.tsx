import { ArrowRight, Mail } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/content/site";

export const HomeHero = () => (
  <section className="relative border-b border-border bg-background pt-28 sm:pt-32 lg:pt-36">
    <Container className="pb-16 sm:pb-20 lg:pb-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <div>
          <p className="mb-5 text-metadata uppercase text-accent">Software architect / Product engineer</p>
          <h1 className="max-w-5xl text-[2.15rem] font-semibold leading-[1.08] text-foreground sm:text-5xl sm:leading-tight lg:text-6xl xl:text-7xl">
            I architect and ship production software across web, mobile, health, and education.
          </h1>
          <p className="mt-7 max-w-2xl text-body-large text-muted-foreground">
            I’m Okagua Kenoye, a full-stack product engineer working across React, TypeScript, Supabase, Capacitor, multi-tenant platforms, AI-assisted product features, and production deployment.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#work"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              View selected work <ArrowRight className="ml-2" size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-border-strong px-5 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Contact me <Mail className="ml-2" size={16} />
            </a>
          </div>
        </div>

        <aside className="border-l border-border pl-5 lg:pl-8" aria-label="Professional summary">
          <dl className="space-y-6">
            <div>
              <dt className="text-metadata uppercase text-muted-foreground">Focus</dt>
              <dd className="mt-2 text-sm font-medium text-foreground">Product architecture, mobile delivery, full-stack systems</dd>
            </div>
            <div>
              <dt className="text-metadata uppercase text-muted-foreground">Domains</dt>
              <dd className="mt-2 text-sm font-medium text-foreground">HealthTech / EdTech / SaaS / CMS platforms</dd>
            </div>
            <div>
              <dt className="text-metadata uppercase text-muted-foreground">Location</dt>
              <dd className="mt-2 text-sm font-medium text-foreground">{siteConfig.location}</dd>
            </div>
            <div>
              <dt className="text-metadata uppercase text-muted-foreground">Resume</dt>
              <dd className="mt-2">
                <a
                  href={siteConfig.social.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-accent underline-offset-4 hover:underline"
                >
                  View credentials
                </a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </Container>
  </section>
);
