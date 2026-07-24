import { motion } from "framer-motion";
import { Code, GraduationCap, Palette, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Code,
    title: "Software Development",
    description: "Custom web & mobile solutions built with modern tech stacks. From MVPs to production-ready applications.",
    deliverables: ["Web Applications", "Mobile Apps (Flutter)", "API Development", "Database Design"],
    audience: "Startups, SMBs, Agritech orgs",
  },
  {
    icon: GraduationCap,
    title: "Python Tutoring",
    description: "Private and small group sessions for kids and beginners. A structured 50-project curriculum that makes coding fun.",
    deliverables: ["1-on-1 Sessions", "Group Classes", "Custom Curriculum", "Progress Reports"],
    audience: "Parents, Schools, EdTech companies",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Brand identity and digital marketing assets that communicate your message with clarity and visual power.",
    deliverables: ["Brand Identity", "Social Media Assets", "Marketing Collateral", "UI Mockups"],
    audience: "Small businesses, Startups",
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

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="mb-16"
        >
          <p className="text-accent font-medium text-sm tracking-widest uppercase mb-3">Services</p>
          <h2 className="section-title mb-4">What I Can Do for You</h2>
          <div className="w-16 h-0.5 bg-accent/40 mb-4" />
          <p className="text-lg text-primary-foreground/60 max-w-2xl">
            Three areas of expertise, one goal — delivering measurable impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i + 1}
              whileHover={{ y: -4 }}
              className="relative border border-primary-foreground/10 rounded-xl p-6 hover:border-accent/40 transition-all duration-300 group overflow-hidden"
            >
              {/* Background number */}
              <span className="absolute top-4 right-4 text-6xl font-heading font-bold text-primary-foreground/5 select-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              <service.icon className="text-accent mb-4 relative z-10" size={28} />
              <h3 className="font-heading font-semibold text-xl mb-3 relative z-10">{service.title}</h3>
              <p className="text-sm text-primary-foreground/60 mb-5 relative z-10">{service.description}</p>

              <ul className="space-y-2 mb-6 relative z-10">
                {service.deliverables.map((d) => (
                  <li key={d} className="text-sm text-primary-foreground/50 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent" />
                    {d}
                  </li>
                ))}
              </ul>

              <p className="text-xs text-accent/80 mb-4 relative z-10">For: {service.audience}</p>

              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-accent/40 text-accent hover:bg-accent/10 group-hover:border-accent relative z-10"
              >
                <a href="#contact">
                  Get Started <ArrowRight className="ml-1 transition-transform duration-300 group-hover:translate-x-1" size={14} />
                </a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
