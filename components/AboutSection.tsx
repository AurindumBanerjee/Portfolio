"use client";

import { motion } from "framer-motion";
import { education, profile, courseGroups } from "@/data/resume";
import { Section, PixelPanel } from "./Section";
import { PixelIcon, type PixelIconName } from "./PixelIcon";

/** The four things I work on, each with its own pixel glyph. */
const PILLARS: readonly {
  readonly icon: PixelIconName;
  readonly title: string;
  readonly body: string;
}[] = [
  {
    icon: "brain",
    title: "LLMs & Adaptation",
    body: "Continual pre-training and supervised fine-tuning to give language models knowledge they never saw in training - and evaluation harnesses to prove the knowledge stuck without breaking everything else.",
  },
  {
    icon: "eye",
    title: "Computer Vision",
    body: "Classical features and deep backbones side by side: HOG and SIFT against ResNet, VGG and ViT, on script identification, surveillance video, and multimodal prompt optimization for CLIP.",
  },
  {
    icon: "terminal",
    title: "Systems & Security",
    body: "A Unix shell, a segment-tree database engine, a neural network in C, and a Dockerized Blind XSS testbed - built low enough to see the system calls.",
  },
  {
    icon: "chip",
    title: "Research",
    body: "TinyML inference on an ARM Cortex-M4, and theoretical work on Diversity Maximisation in metric spaces with Dr. Tanmay Nitin Inamdar.",
  },
];

export function AboutSection() {
  return (
    <Section
      id="about"
      eyebrow="Who you're reading"
      title="Computer science, from the model down to the microcontroller."
      lead={`I'm a ${profile.degree} student in ${profile.branch} at ${profile.institute}, currently holding a 9.09 CGPA. My work runs along one axis: taking a capable model or system and making it work under a real constraint - a domain it doesn't know, a class it rarely sees, or a board with kilobytes of RAM.`}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {PILLARS.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
          >
            <PixelPanel className="h-full p-6 sm:p-7">
              <div className="mb-4 flex items-center gap-4">
                <PixelIcon
                  name={pillar.icon}
                  tone={i % 2 === 0 ? "lantern" : "signal"}
                  size={32}
                />
                <h3 className="text-pixel-base uppercase tracking-[0.1em] text-stone-bright">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-stone-mid sm:text-base">
                {pillar.body}
              </p>
            </PixelPanel>
          </motion.div>
        ))}
      </div>

      {/* Education — a compact record, styled as an inventory ledger. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45 }}
        className="mt-6"
      >
        <PixelPanel className="p-6 sm:p-7">
          <h3 className="label-pixel mb-5 text-lantern">Education</h3>
          <ul className="space-y-4">
            {education.map((row) => (
              <li
                key={row.qualification}
                className="flex flex-col gap-1 border-b-2 border-slate-mid pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <div>
                  <p className="text-sm font-semibold text-stone-bright sm:text-base">
                    {row.qualification}
                  </p>
                  <p className="text-sm text-stone-dim">{row.institute}</p>
                </div>
                <div className="flex flex-none items-baseline gap-4 sm:text-right">
                  <span className="font-mono text-sm text-signal">{row.score}</span>
                  <span className="font-pixel text-pixel-sm text-stone-dim">{row.years}</span>
                </div>
              </li>
            ))}
          </ul>
        </PixelPanel>
      </motion.div>

      {/* Coursework, grouped. Grades appear only where the resume records one. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45 }}
        className="mt-6"
      >
        <PixelPanel className="p-6 sm:p-7">
          <h3 className="label-pixel mb-5 text-lantern">Key Coursework</h3>
          <div className="grid gap-6 sm:grid-cols-2">
            {courseGroups.map((group) => (
              <div key={group.label}>
                <p className="mb-3 font-pixel text-pixel-sm uppercase tracking-[0.12em] text-signal">
                  {group.label}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {group.courses.map((course) => (
                    <li key={course.name} className="tech-tag">
                      {course.name}
                      {course.grade ? (
                        <span className="ml-1.5 text-lantern">{course.grade}</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </PixelPanel>
      </motion.div>
    </Section>
  );
}
