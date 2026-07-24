import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { siteConfig } from "@/content/site";
import { fadeUp, inViewProps, staggerContainer } from "@/lib/animations";

export const ProfessionalPositioning = () => (
  <Section id="about">
    <Container>
      <div className="grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)]">
        <motion.div variants={fadeUp} {...inViewProps}>
          <p className="text-metadata uppercase text-accent">About the work</p>
          <h2 className="mt-3 text-section-title font-semibold text-foreground">
            Architecture, implementation, and product judgment from start to finish.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          {...inViewProps}
          className="max-w-3xl space-y-5 text-body-large text-muted-foreground"
        >
          <motion.p variants={fadeUp}>
            I work at the intersection of product decisions and technical systems: where requirements become data models,
            where platform constraints shape architecture, and where a team needs someone who can hold both the user experience
            and the backend schema in the same conversation.
          </motion.p>
          <motion.p variants={fadeUp}>
            My strongest work sits across health technology, education technology, SaaS platforms, and CMS-driven products.
            These are contexts where architecture has to accommodate real users, sensitive data, changing product requirements, and
            mobile delivery. I have taken products from initial scoping through production release on Android and iOS, and I
            understand the distance between those two points.
          </motion.p>
          <motion.p variants={fadeUp}>
            I care about systems that can be explained, maintained, shipped, and improved. The right abstraction at the right
            moment. Security and permissions as structural properties. Mobile not as a port of the web, but as a platform with
            its own constraints and expectations.
          </motion.p>
          <motion.p variants={fadeUp}>
            Teaching and consulting keep the work grounded. Explaining a database schema to a non-technical founder is
            similar to explaining a technical trade-off to a product manager, and both are part of good engineering.
          </motion.p>
          {siteConfig.openToWork && (
            <motion.p variants={fadeUp} className="text-sm font-medium text-foreground">
              {siteConfig.availabilityNote}.{" "}
              <a
                href="#contact"
                className="text-accent underline-offset-4 hover:underline"
              >
                Start a conversation.
              </a>
            </motion.p>
          )}
        </motion.div>
      </div>
    </Container>
  </Section>
);
