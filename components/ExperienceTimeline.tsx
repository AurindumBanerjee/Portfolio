"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { experience, leadership } from "@/data/resume";
import { Section, PixelPanel } from "./Section";
import { PixelEnvironment } from "./PixelEnvironment";

/**
 * A vertical timeline. The road/waypoint styling is visual only — this is an
 * ordinary ordered list of roles, navigable by keyboard and readable in order
 * by a screen reader.
 */
export function ExperienceTimeline() {
  return (
    <Section
      id="experience"
      eyebrow="The road so far"
      title="Research and industry work."
      lead="Three positions, from LLM domain adaptation at InfoEdge to theoretical optimisation and embedded machine learning at IIT Jodhpur."
    >
      <ol className="relative">
        {/* The road: a dashed vertical pixel rule the entries hang from. */}
        <div
          aria-hidden="true"
          className="absolute left-[15px] top-2 bottom-2 w-1 sm:left-[23px]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, #37415c 0 8px, transparent 8px 16px)",
          }}
        />

        {experience.map((entry, i) => (
          <motion.li
            key={entry.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="relative mb-8 pl-12 last:mb-0 sm:pl-20"
          >
            {/* Waypoint marker */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-6 flex h-8 w-8 items-center justify-center sm:h-12 sm:w-12"
            >
              <span className="h-4 w-4 bg-lantern shadow-[0_0_0_4px_#07080c,0_0_0_7px_#37415c] sm:h-5 sm:w-5" />
            </span>

            <PixelPanel className="overflow-hidden">
              {/* A strip of the location's scenery across the top. */}
              <div className="relative h-20 w-full overflow-hidden sm:h-24">
                <PixelEnvironment
                  scene={entry.scene}
                  seed={i * 13 + 5}
                  className="h-full w-full"
                />
              </div>

              <div className="p-6 sm:p-7">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div>
                    <h3 className="text-pixel-base leading-relaxed text-stone-bright sm:text-pixel-lg">
                      {entry.title}
                    </h3>
                    <p className="mt-2 text-sm text-signal sm:text-base">
                      {entry.role}
                      {entry.organisation ? (
                        <span className="text-stone-dim"> · {entry.organisation}</span>
                      ) : null}
                    </p>
                  </div>
                  <div className="flex flex-none flex-col gap-1.5 sm:items-end">
                    <span className="flex items-center gap-2 font-pixel text-pixel-sm text-lantern">
                      <Calendar size={12} aria-hidden="true" />
                      {entry.period}
                    </span>
                    <span className="flex items-center gap-2 text-xs text-stone-dim">
                      <MapPin size={12} aria-hidden="true" />
                      {entry.location}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5">
                  {entry.highlights.map((point) => (
                    <li
                      key={point}
                      className="relative pl-5 text-sm leading-relaxed text-stone-mid sm:text-base"
                    >
                      {/* Bullet as a literal pixel square. */}
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-[0.5em] h-1.5 w-1.5 bg-lantern"
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {entry.tech.map((tech) => (
                    <li key={tech} className="tech-tag">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </PixelPanel>
          </motion.li>
        ))}
      </ol>

      {/* Leadership, kept compact — it supports the record without competing. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45 }}
        className="mt-14"
      >
        <h3 className="label-pixel mb-5 text-lantern">Positions of Responsibility</h3>
        <ul className="grid gap-4 lg:grid-cols-2">
          {leadership.map((role) => (
            <li key={`${role.role}-${role.organisation}`}>
              <PixelPanel className="flex h-full flex-col p-5 sm:p-6">
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <p className="text-sm font-semibold text-stone-bright sm:text-base">
                    {role.role}
                  </p>
                  <p className="flex-none font-pixel text-pixel-sm text-lantern">
                    {role.period}
                  </p>
                </div>

                <p className="mt-2 text-sm text-signal">{role.organisation}</p>
                {role.location ? (
                  <p className="mt-1 text-xs text-stone-dim">{role.location}</p>
                ) : null}

                {/* Sub-roles, where one organisation covered a progression. */}
                {role.tracks ? (
                  <ul className="mt-4 space-y-1.5 border-l-2 border-slate-soft pl-4">
                    {role.tracks.map((track) => (
                      <li
                        key={track.name}
                        className="flex flex-wrap items-baseline justify-between gap-x-4 text-xs"
                      >
                        <span className="text-stone-mid">{track.name}</span>
                        <span className="font-mono text-stone-dim">{track.period}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {role.detail ? (
                  <ul className="mt-4 space-y-2">
                    {role.detail.map((point) => (
                      <li
                        key={point}
                        className="relative pl-4 text-sm leading-relaxed text-stone-mid"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-[0.5em] h-1.5 w-1.5 bg-lantern"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </PixelPanel>
            </li>
          ))}
        </ul>
      </motion.div>
    </Section>
  );
}
