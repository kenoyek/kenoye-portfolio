import { motion } from "framer-motion";
import { Mail, MapPin, Send, Loader2, User, AtSign, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: form,
      });
      if (error) throw error;
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", type: "", message: "" });
    } catch (err: unknown) {
      console.error('Contact form error:', err);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-12"
        >
          <p className="text-accent font-medium text-sm tracking-widest uppercase mb-3">Contact</p>
          <h2 className="section-title text-foreground mb-4">Let's Work Together</h2>
          <div className="w-16 h-0.5 bg-accent/40 mb-4" />
          <p className="section-subtitle">
            Whether you need software built, a brand designed, or a tutor for your child — I'd love to hear from you.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass-card p-5 sm:p-8 space-y-5 sm:space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  required
                  className="bg-background pl-9 h-11 transition-shadow duration-300 focus:shadow-[0_0_0_3px_hsl(var(--accent)/0.15)]"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
              <div className="relative">
                <AtSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  required
                  className="bg-background pl-9 h-11 transition-shadow duration-300 focus:shadow-[0_0_0_3px_hsl(var(--accent)/0.15)]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Project Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:shadow-[0_0_0_3px_hsl(var(--accent)/0.15)] h-11"
              required
            >
              <option value="">Select a service</option>
              <option value="software">Software Development</option>
              <option value="tutoring">Python Tutoring</option>
              <option value="design">Graphic Design</option>
              <option value="consultation">Consultation</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
            <div className="relative">
              <MessageSquare size={16} className="absolute left-3 top-3 text-muted-foreground" />
              <Textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project..."
                rows={5}
                required
                className="bg-background pl-9 transition-shadow duration-300 focus:shadow-[0_0_0_3px_hsl(var(--accent)/0.15)]"
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold w-full sm:w-auto h-12 transition-all duration-300"
          >
            {loading ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Send size={16} className="mr-2" />}
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </motion.form>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8 mt-8 sm:mt-10 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-accent" />
            okagua.kenny@gmail.com
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-accent" />
            Nigeria
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
