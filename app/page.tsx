import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { SkillsSection } from "@/components/SkillsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { PixelCursor } from "@/components/PixelCursor";
import { AmbientParticles } from "@/components/AmbientParticles";

export default function Page() {
  return (
    <>
      {/* Desktop-only atmosphere. Both self-disable on touch and reduced motion. */}
      <PixelCursor />
      <AmbientParticles />

      <Navbar />

      <main id="main">
        <Hero />

        {/* A single continuous backdrop behind every section below the hero,
            so the site reads as one place rather than a stack of panels. */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="pixel-grid pointer-events-none absolute inset-0 -z-10 opacity-40"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-void via-obsidian to-void"
          />

          <AboutSection />
          <ExperienceTimeline />
          <ProjectShowcase />
          <SkillsSection />
          <ContactSection />
        </div>
      </main>

      <Footer />
    </>
  );
}
