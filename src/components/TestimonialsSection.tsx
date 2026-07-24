import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Okagua built our internal CRM from scratch and it transformed how our team works. Incredibly professional and detail-oriented.",
    name: "Amara K.",
    role: "Operations Manager, Lagos",
    rating: 5,
  },
  {
    quote:
      "My son went from struggling with basic Python to building his own projects in just 8 weeks. The tutoring approach is exceptional.",
    name: "David O.",
    role: "Parent & Educator",
    rating: 5,
  },
  {
    quote:
      "The branding and web design for our startup exceeded expectations. Okagua understands both the technical and creative sides.",
    name: "Chioma E.",
    role: "Founder, HealthTech Startup",
    rating: 5,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15 },
  }),
};

const getInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase();

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="mb-16"
        >
          <p className="text-accent font-medium text-sm tracking-widest uppercase mb-3">
            Testimonials
          </p>
          <h2 className="section-title text-foreground mb-4">
            What People Say
          </h2>
          <div className="w-16 h-0.5 bg-accent/40 mb-4" />
          <p className="section-subtitle">
            Feedback from clients, students, and collaborators.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i + 1}
              whileHover={{ y: -4 }}
              className="glass-card p-6 flex flex-col border-l-2 border-l-accent/30 hover:border-l-accent transition-all duration-300"
            >
              <Quote className="text-accent/30 mb-4" size={28} />

              {/* Star rating */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} size={14} className="text-accent fill-accent" />
                ))}
              </div>

              <p className="text-foreground/80 text-sm leading-relaxed flex-1 mb-6">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3">
                {/* Initials avatar */}
                <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center text-accent text-xs font-bold font-heading">
                  {getInitials(t.name)}
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground text-sm">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
