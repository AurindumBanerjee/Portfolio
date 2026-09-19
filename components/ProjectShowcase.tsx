"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { projects, type Project } from "@/data/resume";
import { Section, PixelPanel } from "./Section";
import { PixelEnvironment } from "./PixelEnvironment";
import { ProjectModal } from "./ProjectModal";
import { useRichInteraction } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * A card that tilts slightly toward the cursor.
 *
 * The whole card is a <button> so it is reachable by keyboard and announced
 * as an activatable control; the tilt is applied to an inner wrapper so it
 * never interferes with focus geometry.
 */
function TiltCard({
  children,
  onClick,
  label,
  className,
}: {
  readonly children: React.ReactNode;
  readonly onClick: () => void;
  readonly label: string;
  readonly className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const rich = useRichInteraction();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [3.5, -3.5]), {
    stiffness: 180,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-3.5, 3.5]), {
    stiffness: 180,
    damping: 20,
  });

  const onPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!rich || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
    // Feed the cursor position to the card so the CSS sheen can follow it.
    ref.current.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    ref.current.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      aria-label={`${label} - open details`}
      className={cn(
        "group block w-full text-left [perspective:1200px]",
        className,
      )}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="h-full"
      >
        {children}
      </motion.div>
    </button>
  );
}

/** Large editorial treatment: scenery beside the copy. */
function FeatureCard({
  project,
  index,
  onOpen,
}: {
  readonly project: Project;
  readonly index: number;
  readonly onOpen: () => void;
}) {
  // Alternate which side the art sits on, so the column never looks like a grid.
  const artRight = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
    >
      <TiltCard onClick={onOpen} label={project.name}>
        <PixelPanel className="h-full overflow-hidden transition-shadow duration-200 pixel-frame-hover">
          <div
            className={cn(
              "grid lg:grid-cols-2",
              artRight && "lg:[&>*:first-child]:order-2",
            )}
          >
            {/* The location */}
            <div className="relative h-48 overflow-hidden sm:h-60 lg:h-full lg:min-h-[19rem]">
              <PixelEnvironment
                scene={project.scene}
                seed={index * 17 + 3}
                className="h-full w-full transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 bg-void/85 px-3 py-1.5 font-pixel text-pixel-sm uppercase tracking-[0.14em] text-lantern">
                {project.period}
              </span>
            </div>

            {/* The copy */}
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <h3 className="text-pixel-lg leading-snug text-stone-bright">
                {project.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-mid sm:text-base">
                {project.summary}
              </p>

              {project.metrics.length > 0 ? (
                <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
                  {project.metrics.slice(0, 3).map((metric) => (
                    <div key={metric.label}>
                      <dt className="label-pixel text-[0.55rem]">{metric.label}</dt>
                      <dd className="mt-1 font-pixel text-pixel-base text-signal">
                        {metric.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              <ul className="mt-6 flex flex-wrap gap-2">
                {project.tech.slice(0, 6).map((tech) => (
                  <li key={tech} className="tech-tag">
                    {tech}
                  </li>
                ))}
                {project.tech.length > 6 ? (
                  <li className="tech-tag text-stone-dim">
                    +{project.tech.length - 6}
                  </li>
                ) : null}
              </ul>

              <span className="mt-7 inline-flex items-center gap-2 font-pixel text-pixel-sm uppercase tracking-[0.14em] text-lantern transition-colors group-hover:text-lantern-bright">
                Read case study
                <ArrowUpRight
                  size={14}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </div>
        </PixelPanel>
      </TiltCard>
    </motion.div>
  );
}

/** Compact treatment for the supporting body of work. */
function CompactCard({
  project,
  index,
  onOpen,
}: {
  readonly project: Project;
  readonly index: number;
  readonly onOpen: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="h-full"
    >
      <TiltCard onClick={onOpen} label={project.name} className="h-full">
        <PixelPanel className="flex h-full flex-col overflow-hidden transition-shadow duration-200 pixel-frame-hover">
          <div className="relative h-28 overflow-hidden">
            <PixelEnvironment
              scene={project.scene}
              seed={index * 29 + 11}
              className="h-full w-full transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="text-pixel-base leading-relaxed text-stone-bright">
              {project.name}
            </h3>
            <p className="mt-2.5 flex-1 text-sm leading-relaxed text-stone-mid">
              {project.summary}
            </p>
            <p className="mt-4 font-pixel text-pixel-sm text-stone-dim">{project.period}</p>
          </div>
        </PixelPanel>
      </TiltCard>
    </motion.div>
  );
}

export function ProjectShowcase() {
  const [openId, setOpenId] = useState<string | null>(null);
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const open = projects.find((p) => p.id === openId) ?? null;

  return (
    <>
      <Section
        id="projects"
        eyebrow="Selected work"
        title="Projects."
        lead="Each project below is a place I spent real time. Open any one for the problem it addresses, the approach, and the results."
      >
        <div className="space-y-6">
          {featured.map((project, i) => (
            <FeatureCard
              key={project.id}
              project={project}
              index={i}
              onOpen={() => setOpenId(project.id)}
            />
          ))}
        </div>

        <h3 className="label-pixel mb-5 mt-16 text-lantern">Also built</h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, i) => (
            <CompactCard
              key={project.id}
              project={project}
              index={i}
              onOpen={() => setOpenId(project.id)}
            />
          ))}
        </div>

        {/* A direct route to the source, for visitors who prefer to read code. */}
        <div className="mt-14 flex justify-center">
          <a
            href="https://github.com/AurindumBanerjee"
            target="_blank"
            rel="noreferrer noopener"
            className="pixel-button-ghost"
          >
            <Github size={16} aria-hidden="true" />
            All repositories
          </a>
        </div>
      </Section>

      <ProjectModal project={open} onClose={() => setOpenId(null)} />
    </>
  );
}
