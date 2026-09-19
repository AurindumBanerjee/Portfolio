"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/resume";
import { Section, PixelPanel } from "./Section";
import { PixelIcon, type PixelIconName } from "./PixelIcon";

/**
 * Skills as an inventory of categorised panels.
 *
 * Deliberately no levels, ratings or bars: the resume does not claim
 * proficiency scores, so inventing them would be fabrication. The RPG
 * influence here is the inventory *framing*, not a progression system.
 */

const ICONS: Record<string, PixelIconName> = {
  code: "code",
  brain: "brain",
  eye: "eye",
  server: "server",
  database: "database",
  wrench: "wrench",
  shield: "shield",
};

export function SkillsSection() {
  return (
    <Section
      id="skills"
      eyebrow="Inventory"
      title="Technical skills."
      lead="Languages, frameworks and tools I've used to ship the work above."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {skillCategories.map((category, i) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
          >
            <PixelPanel className="h-full p-6">
              <div className="mb-5 flex items-center gap-4">
                <span className="flex h-12 w-12 flex-none items-center justify-center bg-slate-mid">
                  <PixelIcon
                    name={ICONS[category.icon] ?? "code"}
                    tone={i % 2 === 0 ? "lantern" : "signal"}
                    size={28}
                  />
                </span>
                <h3 className="text-pixel-base uppercase tracking-[0.1em] text-stone-bright">
                  {category.label}
                </h3>
              </div>

              <ul className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="bg-slate-mid px-3 py-2 font-mono text-xs text-stone-mid transition-colors hover:bg-slate-soft hover:text-stone-bright"
                    style={{ boxShadow: "inset 0 0 0 1px #37415c" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </PixelPanel>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
