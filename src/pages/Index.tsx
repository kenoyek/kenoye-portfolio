import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { HomeHero } from "@/components/home/HomeHero";
import { ImpactBar } from "@/components/home/ImpactBar";
import { SelectedWork } from "@/components/home/SelectedWork";
import { AdditionalProjects } from "@/components/home/AdditionalProjects";
import { ProfessionalPositioning } from "@/components/home/ProfessionalPositioning";
import { EngineeringPrinciples } from "@/components/home/EngineeringPrinciples";
import { HomeCapabilities } from "@/components/home/HomeCapabilities";
import { HomeExperience } from "@/components/home/HomeExperience";
import { ContactPanel } from "@/components/home/ContactPanel";
import { primaryProjects } from "@/content/projects";
import { absoluteUrl, siteConfig } from "@/content/site";
import { setPageMetadata } from "@/lib/seo";

const Index = () => {
  useEffect(() => {
    setPageMetadata({
      title: siteConfig.title,
      description: siteConfig.description,
      canonicalUrl: `${siteConfig.canonicalOrigin}/`,
      imageUrl: "/og-home.svg",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Person",
          name: siteConfig.name,
          url: absoluteUrl("/"),
          email: `mailto:${siteConfig.email}`,
          jobTitle: "Software Architect and Product Engineer",
          address: {
            "@type": "PostalAddress",
            addressCountry: "NG",
          },
          sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
          knowsAbout: [
            "React",
            "TypeScript",
            "Supabase",
            "PostgreSQL",
            "Multi-tenant SaaS architecture",
            "Health technology",
            "Education technology",
            "Cross-platform mobile delivery",
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: absoluteUrl("/"),
          description: siteConfig.description,
        },
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Selected portfolio work",
          itemListElement: primaryProjects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: absoluteUrl(`/projects/${project.slug}`),
            name: project.title,
            description: project.shortSummary,
          })),
        },
      ],
    });
  }, []);

  return (
    <main className="portfolio-home" id="main">
      <Navbar />
      <HomeHero />
      <ImpactBar />
      <SelectedWork />
      <HomeCapabilities />
      <ProfessionalPositioning />
      <HomeExperience />
      <EngineeringPrinciples />
      <AdditionalProjects />
      <ContactPanel />
      <Footer />
      <BackToTop />
    </main>
  );
};

export default Index;
