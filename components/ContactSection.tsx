"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Code2, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { contactLinks, profile } from "@/data/resume";
import { Section, PixelPanel } from "./Section";

const ICONS: Record<string, LucideIcon> = {
  mail: Mail,
  phone: Phone,
  github: Github,
  linkedin: Linkedin,
  code: Code2,
  trophy: Trophy,
};

export function ContactSection() {
  return (
    <Section
      id="contact"
      eyebrow="Get in touch"
      title="Let's talk."
      lead="Open to roles and research in LLMs, computer vision and systems engineering. The fastest way to reach me is email."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {contactLinks.map((link, i) => {
          const Icon = ICONS[link.icon] ?? Mail;
          const external = link.href.startsWith("http");
          return (
            <motion.a
              key={link.href}
              href={link.href}
              {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 2) * 0.06 }}
              className="group block"
            >
              <PixelPanel className="flex items-center gap-4 p-5 transition-colors group-hover:bg-slate-mid">
                <span className="flex h-11 w-11 flex-none items-center justify-center bg-slate-mid text-lantern transition-colors group-hover:bg-lantern group-hover:text-void">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block font-pixel text-pixel-sm uppercase tracking-[0.12em] text-stone-dim">
                    {link.label}
                  </span>
                  <span className="mt-1.5 block truncate font-mono text-sm text-stone-bright">
                    {link.value}
                  </span>
                </span>
              </PixelPanel>
            </motion.a>
          );
        })}
      </div>

      {/* A closing dialogue box — the one place the game grammar speaks. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45 }}
        className="mt-10"
      >
        <PixelPanel tone="lit" className="crt-lines relative p-6 sm:p-8">
          <p className="label-pixel mb-4 text-lantern">{profile.name}</p>
          <p className="max-w-2xl text-base leading-relaxed text-stone-bright">
            Thanks for reading this far. If any of the work above is close to
            what your team is building, I&rsquo;d be glad to talk it through in
            more detail.
          </p>
          <p className="mt-6 font-mono text-sm text-stone-dim">
            {profile.rollNumber} · {profile.institute}
          </p>
        </PixelPanel>
      </motion.div>
    </Section>
  );
}
