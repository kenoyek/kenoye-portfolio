import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import FeaturedCaseStudy from "@/components/FeaturedCaseStudy";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import TutoringSection from "@/components/TutoringSection";
import ContactSection from "@/components/ContactSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const Index = () => {
  return (
    <main className="scroll-smooth overflow-x-clip">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <FeaturedCaseStudy />
      <SkillsSection />
      <ExperienceSection />
      <TutoringSection />
      <ContactSection />
      <FinalCTA />
      <Footer />
      <BackToTop />
    </main>
  );
};

export default Index;
