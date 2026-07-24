import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { HomeHero } from "@/components/home/HomeHero";
import { ImpactBar } from "@/components/home/ImpactBar";
import { SelectedWork } from "@/components/home/SelectedWork";
import { AdditionalProjects } from "@/components/home/AdditionalProjects";
import { FeaturedAsele } from "@/components/home/FeaturedAsele";
import { ProfessionalPositioning } from "@/components/home/ProfessionalPositioning";
import { EngineeringPrinciples } from "@/components/home/EngineeringPrinciples";
import { SenioritySignals } from "@/components/home/SenioritySignals";
import { HomeCapabilities } from "@/components/home/HomeCapabilities";
import { HomeExperience } from "@/components/home/HomeExperience";
import { ContactPanel } from "@/components/home/ContactPanel";
import { siteConfig } from "@/content/site";
import { setPageMetadata } from "@/lib/seo";

const Index = () => {
  useEffect(() => {
    setPageMetadata({
      title: siteConfig.title,
      description: siteConfig.description,
      canonicalUrl: `${siteConfig.canonicalOrigin}/`,
      imageUrl: "/og-home.svg",
    });
  }, []);

  return (
    <main className="scroll-smooth overflow-x-clip" id="main">
      <Navbar />
      <HomeHero />
      <ImpactBar />
      <SelectedWork />
      <AdditionalProjects />
      <FeaturedAsele />
      <ProfessionalPositioning />
      <EngineeringPrinciples />
      <SenioritySignals />
      <HomeCapabilities />
      <HomeExperience />
      <ContactPanel />
      <Footer />
      <BackToTop />
    </main>
  );
};

export default Index;
