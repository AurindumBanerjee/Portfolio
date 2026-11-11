"use client";

import { useCallback, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { projects, type Project, type ProjectCategory } from "@/data/resume";
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
            <p className="mt-1.5 font-pixel text-pixel-sm text-stone-dim">{project.period}</p>
            <p className="mt-2.5 text-sm leading-relaxed text-stone-mid">{project.summary}</p>

            {project.metrics.length > 0 ? (
              <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                {project.metrics.slice(0, 2).map((metric) => (
                  <div key={metric.label}>
                    <dt className="label-pixel text-[0.5rem]">{metric.label}</dt>
                    <dd className="mt-1 font-pixel text-pixel-sm text-signal">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            <ul className="mt-4 flex flex-1 flex-wrap content-start gap-1.5">
              {project.tech.slice(0, 4).map((tech) => (
                <li key={tech} className="tech-tag">
                  {tech}
                </li>
              ))}
              {project.tech.length > 4 ? (
                <li className="tech-tag text-stone-dim">+{project.tech.length - 4}</li>
              ) : null}
            </ul>

            <span className="mt-5 inline-flex items-center gap-2 font-pixel text-pixel-sm uppercase tracking-[0.14em] text-lantern transition-colors group-hover:text-lantern-bright">
              Read case study
              <ArrowUpRight
                size={14}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>
        </PixelPanel>
      </TiltCard>
    </motion.div>
  );
}

const FILTERS: readonly { readonly id: "all" | ProjectCategory; readonly label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI & Retrieval" },
  { id: "systems", label: "Systems & DB" },
  { id: "vision", label: "Vision & Edge" },
  { id: "security", label: "Security" },
];

export function ProjectShowcase() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");

  const visible = projects.filter((p) => filter === "all" || p.category === filter);
  const featured = visible.filter((p) => p.featured);
  const rest = visible.filter((p) => !p.featured);
  // Modal navigation follows the order the cards are shown in.
  const ordered = [...featured, ...rest];
  const openIndex = ordered.findIndex((p) => p.id === openId);
  const open = openIndex >= 0 ? (ordered[openIndex] ?? null) : null;

  const close = useCallback(() => setOpenId(null), []);

  return (
    <>
      <Section
        id="projects"
        eyebrow="Selected work"
        title="Projects."
        lead="Each project below is a place I spent real time. Open any one for the problem it addresses, the approach, and the results."
      >
        {/* Filter: toggle buttons rather than ARIA tabs, since every option
            filters the same list instead of switching between panels. */}
        <div role="group" aria-label="Filter projects by area" className="mb-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "px-3 py-2 font-pixel text-pixel-sm uppercase tracking-[0.12em] transition-colors",
                  active
                    ? "bg-lantern text-[var(--on-lantern)]"
                    : "bg-slate-deep text-stone-mid shadow-[inset_0_0_0_2px_var(--slate-edge)] hover:text-lantern-bright",
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <p className="sr-only" aria-live="polite">
          {`${visible.length} project${visible.length === 1 ? "" : "s"} shown`}
        </p>

        {featured.length > 0 ? (
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
        ) : null}

        {rest.length > 0 ? (
          <>
            <h3
              className={cn(
                "label-pixel mb-5 text-lantern",
                featured.length > 0 ? "mt-16" : "mt-2",
              )}
            >
              Also built
            </h3>
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
          </>
        ) : null}

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

      <ProjectModal
        project={open}
        onClose={close}
        prev={openIndex > 0 ? (ordered[openIndex - 1] ?? null) : null}
        next={openIndex >= 0 ? (ordered[openIndex + 1] ?? null) : null}
        onNavigate={setOpenId}
      />
    </>
  );
}
