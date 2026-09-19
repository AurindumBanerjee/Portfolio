import { Github, Linkedin, Mail } from "lucide-react";
import { profile, githubUrl, linkedinUrl, primaryEmail } from "@/data/resume";
import { PixelRule } from "./Section";

export function Footer() {
  return (
    <footer className="relative pb-12 pt-4">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <PixelRule className="mb-8" />
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-pixel text-pixel-sm uppercase tracking-[0.12em] text-stone-mid">
              {profile.name}
            </p>
            <p className="mt-2 text-sm text-stone-dim">
              {profile.branch} · {profile.institute}
            </p>
          </div>

          <ul className="flex items-center gap-5">
            <li>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub profile"
                className="text-stone-dim transition-colors hover:text-lantern-bright"
              >
                <Github size={20} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn profile"
                className="text-stone-dim transition-colors hover:text-lantern-bright"
              >
                <Linkedin size={20} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={`mailto:${primaryEmail}`}
                aria-label="Send an email"
                className="text-stone-dim transition-colors hover:text-lantern-bright"
              >
                <Mail size={20} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
