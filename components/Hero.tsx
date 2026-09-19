"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { profile, githubUrl, linkedinUrl, primaryEmail } from "@/data/resume";
import { ParallaxLayer } from "./ParallaxLayer";
import { MagneticButton } from "./MagneticButton";
import { Typewriter } from "./Typewriter";
import { HeroSky, HeroFarRidge, HeroCity, HeroForeground } from "./HeroScene";
import { useTheme } from "@/lib/theme";
import { CelestialToggle } from "./CelestialToggle";

export function Hero() {
  // The scene's parallax is measured against this section.
  const sectionRef = useRef<HTMLElement>(null);
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <section
      ref={sectionRef}
      id="top"
      className="vignette relative flex min-h-[100svh] items-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* ------------------------------------------------------------------
          The landscape. Five depth slices, each drifting at its own rate.
          Far layers move least; the foreground terrace moves with the page.
          ------------------------------------------------------------------ */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <ParallaxLayer scrollShift={-10} pointerShift={6} container={sectionRef} className="absolute inset-0">
          <HeroSky isLight={isLight} />
        </ParallaxLayer>

        <ParallaxLayer scrollShift={20} pointerShift={10} container={sectionRef} className="absolute inset-0">
          <HeroFarRidge isLight={isLight} />
        </ParallaxLayer>

        <ParallaxLayer scrollShift={50} pointerShift={16} container={sectionRef} className="absolute inset-0">
          <HeroCity isLight={isLight} />
        </ParallaxLayer>

        <ParallaxLayer scrollShift={90} pointerShift={24} container={sectionRef} className="absolute inset-0">
          <HeroForeground isLight={isLight} />
        </ParallaxLayer>

        {/* Readability scrim: the text sits over art, so it needs a floor.
            Both themes wash toward --void, which means darkening at night and
            lightening by day - the copy stays legible either way. */}
        <div className="absolute inset-0 bg-gradient-to-r from-void via-void/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />
        {/* Day needs a little extra lift over the bright sky behind the copy. */}
        <div className="hero-scrim-day absolute inset-0 bg-gradient-to-r from-void via-void/70 to-transparent" />
      </div>

      {/* The sun/moon is a real control: clicking it turns the world over.
          It sits above the scrims so it stays clickable, and is positioned to
          track the body drawn inside the sky layer. */}
      <CelestialToggle isLight={isLight} onToggle={toggleTheme} />

      {/* z-10 keeps the copy above the .vignette overlay. */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-24 pt-32 sm:px-8">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="eyebrow mb-6"
          >
            {profile.branch} · IIT Jodhpur
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-shadow-pixel text-pixel-xl leading-tight text-stone-bright sm:text-[2.5rem] sm:leading-[1.25] lg:text-[3.25rem] lg:leading-[1.2]"
          >
            {profile.name}
          </motion.h1>

          {/* The positioning statement types itself in — the one place the
              terminal influence is literal rather than decorative. */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mt-5 font-mono text-base text-signal sm:text-lg"
          >
            <Typewriter text={profile.tagline} delay={700} />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-stone-mid sm:text-lg"
          >
            {profile.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton>
              <a href="#projects" className="pixel-button">
                View Projects
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="#experience" className="pixel-button-ghost">
                Experience
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="#contact" className="pixel-button-ghost">
                Contact
              </a>
            </MagneticButton>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-10 flex items-center gap-5"
          >
            <li>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 text-stone-dim transition-colors hover:text-lantern-bright"
              >
                <Github size={20} aria-hidden="true" />
                <span className="font-pixel text-pixel-sm uppercase tracking-[0.12em]">GitHub</span>
              </a>
            </li>
            <li>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-2 text-stone-dim transition-colors hover:text-lantern-bright"
              >
                <Linkedin size={20} aria-hidden="true" />
                <span className="font-pixel text-pixel-sm uppercase tracking-[0.12em]">LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${primaryEmail}`}
                className="flex items-center gap-2 text-stone-dim transition-colors hover:text-lantern-bright"
              >
                <Mail size={20} aria-hidden="true" />
                <span className="font-pixel text-pixel-sm uppercase tracking-[0.12em]">Email</span>
              </a>
            </li>
          </motion.ul>
        </div>
      </div>

      {/* Scroll hint. Decorative — the nav already offers every destination. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center"
        aria-hidden="true"
      >
        <ArrowDown size={18} aria-hidden="true" className="animate-bob text-stone-dim" />
      </motion.div>
    </section>
  );
}
