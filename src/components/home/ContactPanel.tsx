import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { AtSign, Github, Linkedin, Loader2, Mail, Send, User } from "lucide-react";
import { toast } from "sonner";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { siteConfig } from "@/content/site";
import { fadeUp, inViewProps, slideFromLeft, slideFromRight } from "@/lib/animations";

const opportunityTypes = [
  { value: "", label: "Select the type of conversation" },
  { value: "fulltime", label: "Full-time engineering role" },
  { value: "recruitment", label: "Recruitment enquiry" },
  { value: "architecture", label: "Architecture or technical leadership" },
  { value: "product", label: "Full-stack product build" },
  { value: "mobile", label: "Cross-platform mobile delivery" },
  { value: "consulting", label: "Consulting or technical review" },
];

export const ContactPanel = () => {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "", website: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: form,
      });
      if (error) throw error;
      toast.success("Message sent. I'll get back to you within 48 hours.");
      setForm({ name: "", email: "", type: "", message: "", website: "" });
    } catch (err: unknown) {
      console.error("Contact form error:", err);
      toast.error("Message could not be sent. You can email me directly instead.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="contact" className="border-t border-border">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)] lg:items-start">

          {/* Left column */}
          <motion.div variants={slideFromLeft} {...inViewProps}>
            <p className="text-metadata uppercase text-accent">Contact</p>
            <h2 className="mt-3 text-page-title font-semibold text-foreground">
              Let's work on something that deserves careful engineering.
            </h2>
            <p className="mt-5 max-w-xl text-body-large text-muted-foreground">
              I work with teams building ambitious web and mobile products in health, education, SaaS,
              and CMS platforms that need careful architecture and reliable delivery.
            </p>

            {siteConfig.openToWork && (
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/8 px-3.5 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="text-xs font-medium text-accent">{siteConfig.availabilityNote}</span>
              </div>
            )}

            <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
              I'm open to senior full-stack roles, technical lead and founding engineer positions, and product architecture engagements.
              Prefer to start with a direct email? Use the address below.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 font-medium text-accent underline-offset-4 hover:underline">
                <Mail size={16} aria-hidden="true" /> {siteConfig.email}
              </a>
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium text-accent underline-offset-4 hover:underline">
                <Linkedin size={16} aria-hidden="true" /> LinkedIn
              </a>
              <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium text-accent underline-offset-4 hover:underline">
                <Github size={16} aria-hidden="true" /> GitHub
              </a>
            </div>
          </motion.div>

          {/* Right column form */}
          <motion.form
            variants={slideFromRight}
            {...inViewProps}
            onSubmit={handleSubmit}
            className="border border-border bg-card p-5 shadow-subtle sm:p-6"
            aria-busy={loading}
          >
            {/* Honeypot */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground" htmlFor="contact-name">
                  Name <span aria-hidden="true" className="text-muted-foreground">*</span>
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id="contact-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    required
                    maxLength={120}
                    className="pl-9"
                    aria-required="true"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground" htmlFor="contact-email">
                  Email <span aria-hidden="true" className="text-muted-foreground">*</span>
                </label>
                <div className="relative">
                  <AtSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    required
                    maxLength={160}
                    className="pl-9"
                    aria-required="true"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-foreground" htmlFor="contact-type">
                Enquiry type <span aria-hidden="true" className="text-muted-foreground">*</span>
              </label>
              <select
                id="contact-type"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
                aria-required="true"
              >
                {opportunityTypes.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-foreground" htmlFor="contact-message">
                Message <span aria-hidden="true" className="text-muted-foreground">*</span>
              </label>
              <Textarea
                id="contact-message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about the role, product, platform, or problem you're working on..."
                rows={5}
                required
                maxLength={5000}
                aria-required="true"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mt-5 min-h-11 w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto"
            >
              {loading ? <Loader2 size={16} className="mr-2 animate-spin" aria-hidden="true" /> : <Send size={16} className="mr-2" aria-hidden="true" />}
              {loading ? "Sending..." : "Send message"}
            </Button>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Prefer direct email?{" "}
              <a className="text-accent underline-offset-4 hover:underline" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </p>
          </motion.form>

        </div>
      </Container>
    </Section>
  );
};
