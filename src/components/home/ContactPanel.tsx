import { useState } from "react";
import type { FormEvent } from "react";
import { AtSign, Github, Linkedin, Loader2, Mail, Send, User } from "lucide-react";
import { toast } from "sonner";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { siteConfig } from "@/content/site";

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
      toast.success("Message sent. I'll get back to you soon.");
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
          <div>
            <p className="text-metadata uppercase text-accent">Contact</p>
            <h2 className="mt-3 text-page-title font-semibold text-foreground">Build something that needs senior engineering judgment.</h2>
            <p className="mt-5 max-w-xl text-body-large text-muted-foreground">
              I work with teams building ambitious web and mobile products, particularly in health, education, SaaS, CMS platforms, and systems that need careful architecture.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 font-medium text-accent underline-offset-4 hover:underline">
                <Mail size={16} /> Email
              </a>
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium text-accent underline-offset-4 hover:underline">
                <Linkedin size={16} /> LinkedIn
              </a>
              <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium text-accent underline-offset-4 hover:underline">
                <Github size={16} /> GitHub
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="border border-border bg-card p-5 shadow-subtle sm:p-6" aria-busy={loading}>
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
                <label className="mb-2 block text-sm font-medium text-foreground" htmlFor="contact-name">Name</label>
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
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground" htmlFor="contact-email">Email</label>
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
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-foreground" htmlFor="contact-type">Project type</label>
              <select
                id="contact-type"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              >
                <option value="">Select a fit</option>
                <option value="architecture">Architecture / technical leadership</option>
                <option value="product">Full-stack product build</option>
                <option value="mobile">Cross-platform mobile delivery</option>
                <option value="consulting">Consulting or review</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-foreground" htmlFor="contact-message">Message</label>
              <Textarea
                id="contact-message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about the product, platform, or technical problem..."
                rows={5}
                required
                maxLength={5000}
              />
            </div>

            <Button type="submit" disabled={loading} className="mt-5 min-h-11 bg-accent text-accent-foreground hover:bg-accent/90">
              {loading ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Send size={16} className="mr-2" />}
              {loading ? "Sending..." : "Send message"}
            </Button>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Prefer direct email? Use <a className="text-accent underline-offset-4 hover:underline" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
            </p>
          </form>
        </div>
      </Container>
    </Section>
  );
};
