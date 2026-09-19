import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Press_Start_2P } from "next/font/google";
import { profile, githubUrl, linkedinUrl } from "@/data/resume";
import { ThemeProvider, themeInitScript } from "@/lib/theme";
import "./globals.css";

/* Long-form copy: modern, highly readable. */
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/* Code, metrics and terminal voice. */
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

/* Pixel voice — headings, labels and UI accents only, never body copy. */
const pixel = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
});

const SITE_URL = "https://aurindumbanerjee.vercel.app";
const DESCRIPTION =
  "Portfolio of Aurindum Banerjee - CSE undergraduate at IIT Jodhpur working on LLM domain adaptation, multimodal prompt optimization, computer vision and systems engineering.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} - ${profile.tagline}`,
    template: `%s - ${profile.name}`,
  },
  description: DESCRIPTION,
  keywords: [
    "Aurindum Banerjee",
    "IIT Jodhpur",
    "LLM",
    "machine learning",
    "computer vision",
    "software engineer",
    "portfolio",
  ],
  authors: [{ name: profile.name, url: githubUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "en_IN",
    url: SITE_URL,
    siteName: `${profile.name} - Portfolio`,
    title: `${profile.name} - ${profile.tagline}`,
    description: DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${profile.name} - portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} - ${profile.tagline}`,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  // Matches --void in each palette, so the browser chrome follows the theme.
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07080c" },
    { media: "(prefers-color-scheme: light)", color: "#e8ecf5" },
  ],
  colorScheme: "dark light",
};

/** Structured data describing the person this site is about. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  jobTitle: "Computer Science Undergraduate",
  description: DESCRIPTION,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: profile.institute,
  },
  knowsAbout: [
    "Large Language Models",
    "Computer Vision",
    "Machine Learning",
    "Systems Programming",
    "Web Security",
  ],
  sameAs: [githubUrl, linkedinUrl],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      // The theme is written onto this element before paint by the script
      // below; suppressHydrationWarning stops React complaining that the
      // attribute it finds differs from the one it rendered.
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} ${pixel.variable}`}
    >
      <head>
        {/* Must run before first paint, or the page flashes the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        {/* Keyboard users land here first. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-lantern focus:px-5 focus:py-3 focus:font-pixel focus:text-pixel-sm focus:uppercase focus:text-[color:var(--on-lantern)]"
        >
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
