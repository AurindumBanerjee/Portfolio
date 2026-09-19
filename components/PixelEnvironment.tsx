import type { SceneId } from "@/data/resume";
import { seeded } from "@/lib/utils";

/**
 * Each project and experience entry is set in a "location". These are drawn
 * procedurally as SVG on a coarse grid, so a scene is a few hundred bytes of
 * markup rather than an image request — and always crisp.
 *
 * Scenes are decorative only. They never carry information, and every one is
 * aria-hidden; the text beside them says everything the visitor needs.
 */

const VIEW_W = 160;
const VIEW_H = 90;

interface SceneTheme {
  /** Back-to-front wash colours. */
  readonly sky: readonly [string, string];
  readonly structure: string;
  readonly structureDark: string;
  readonly accent: string;
  readonly accentSoft: string;
}

const THEMES: Record<SceneId, SceneTheme> = {
  laboratory: {
    sky: ["#0d1322", "#161f38"],
    structure: "#242e4a",
    structureDark: "#161d30",
    accent: "#4ecfc0",
    accentSoft: "#1f7d73",
  },
  "multimodal-lab": {
    sky: ["#0f1020", "#1d1b3a"],
    structure: "#2a2750",
    structureDark: "#1a1833",
    accent: "#a98bf0",
    accentSoft: "#5f4da8",
  },
  security: {
    sky: ["#140d10", "#2a151a"],
    structure: "#3a2128",
    structureDark: "#24141a",
    accent: "#d95f4a",
    accentSoft: "#9c3a29",
  },
  archive: {
    sky: ["#13100a", "#241d10"],
    structure: "#3b3019",
    structureDark: "#241d10",
    accent: "#e8a33d",
    accentSoft: "#a86a1c",
  },
  observatory: {
    sky: ["#080c18", "#111c33"],
    structure: "#1e2b45",
    structureDark: "#131c2d",
    accent: "#7fb0f0",
    accentSoft: "#3d6ba8",
  },
  workshop: {
    sky: ["#100f14", "#232028"],
    structure: "#38323c",
    structureDark: "#221f28",
    accent: "#6fd97a",
    accentSoft: "#2f7a38",
  },
  terminal: {
    sky: ["#070a08", "#0e1610"],
    structure: "#1a2620",
    structureDark: "#0e1610",
    accent: "#5fe08a",
    accentSoft: "#26793f",
  },
  datastore: {
    sky: ["#0a0d16", "#151a2e"],
    structure: "#232a44",
    structureDark: "#161b2c",
    accent: "#4ecfc0",
    accentSoft: "#1f7d73",
  },
};

/** Stars, for the scenes whose sky is open. */
function Stars({ seed, count }: { seed: number; count: number }) {
  const stars = [];
  for (let i = 0; i < count; i += 1) {
    const x = Math.floor(seeded(seed + i * 3) * VIEW_W);
    const y = Math.floor(seeded(seed + i * 7 + 1) * 40);
    const bright = seeded(seed + i * 11 + 2) > 0.7;
    stars.push(
      <rect
        key={i}
        x={x}
        y={y}
        width={1}
        height={1}
        fill={bright ? "#d5dbeb" : "#6b7590"}
        opacity={bright ? 0.9 : 0.5}
      />,
    );
  }
  return <g>{stars}</g>;
}

/** A skyline of blocky towers — the far parallax layer for most scenes. */
function Skyline({
  seed,
  theme,
  baseY,
  opacity,
}: {
  seed: number;
  theme: SceneTheme;
  baseY: number;
  opacity: number;
}) {
  const towers = [];
  let x = -4;
  let i = 0;
  while (x < VIEW_W + 4) {
    const w = 6 + Math.floor(seeded(seed + i * 5) * 12);
    const h = 10 + Math.floor(seeded(seed + i * 9 + 1) * 34);
    towers.push(
      <rect key={`t${i}`} x={x} y={baseY - h} width={w} height={h} fill={theme.structureDark} />,
    );
    // Lit windows, on a 3px pitch so they read as a grid.
    for (let wy = baseY - h + 3; wy < baseY - 2; wy += 4) {
      for (let wx = x + 2; wx < x + w - 2; wx += 3) {
        if (seeded(seed + wx * 13 + wy * 7) > 0.68) {
          towers.push(
            <rect
              key={`w${i}-${wx}-${wy}`}
              x={wx}
              y={wy}
              width={1}
              height={2}
              fill={theme.accent}
              opacity={0.55}
            />,
          );
        }
      }
    }
    x += w + 1 + Math.floor(seeded(seed + i * 17 + 3) * 4);
    i += 1;
  }
  return <g opacity={opacity}>{towers}</g>;
}

/** Scene-specific foreground furniture. This is what makes a location legible. */
function Foreground({ scene, theme }: { scene: SceneId; theme: SceneTheme }) {
  const g = theme.structure;
  const d = theme.structureDark;
  const a = theme.accent;

  switch (scene) {
    case "laboratory":
    case "multimodal-lab":
      // Server columns flanking a bank of lit tanks.
      return (
        <g>
          <rect x={10} y={46} width={18} height={34} fill={g} />
          <rect x={132} y={46} width={18} height={34} fill={g} />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect x={12} y={49 + i * 6} width={14} height={4} fill={d} />
              <rect x={14} y={50 + i * 6} width={2} height={2} fill={a} opacity={0.8} />
              <rect x={134} y={49 + i * 6} width={14} height={4} fill={d} />
              <rect x={144} y={50 + i * 6} width={2} height={2} fill={a} opacity={0.6} />
            </g>
          ))}
          {/* Culture tanks */}
          {[46, 70, 94].map((x, i) => (
            <g key={x}>
              <rect x={x} y={54} width={18} height={26} fill={d} />
              <rect x={x + 2} y={58 + i * 2} width={14} height={22 - i * 2} fill={a} opacity={0.22} />
              <rect x={x + 2} y={58 + i * 2} width={14} height={1} fill={a} opacity={0.7} />
              <rect x={x} y={52} width={18} height={2} fill={g} />
            </g>
          ))}
        </g>
      );

    case "security":
      // Server room with a breached rack, bathed in warning light.
      return (
        <g>
          {[14, 40, 66, 92, 118].map((x, i) => (
            <g key={x}>
              <rect x={x} y={40} width={22} height={40} fill={i === 2 ? d : g} />
              {[0, 1, 2, 3, 4, 5].map((j) => (
                <rect key={j} x={x + 2} y={43 + j * 6} width={18} height={4} fill={d} />
              ))}
              {[0, 1, 2, 3, 4, 5].map((j) => (
                <rect
                  key={`l${j}`}
                  x={x + 4}
                  y={44 + j * 6}
                  width={2}
                  height={2}
                  fill={a}
                  opacity={i === 2 ? 0.95 : 0.35}
                />
              ))}
            </g>
          ))}
          {/* Alert beam over the compromised rack */}
          <rect x={72} y={16} width={10} height={24} fill={a} opacity={0.12} />
          <rect x={75} y={14} width={4} height={3} fill={a} opacity={0.8} />
        </g>
      );

    case "archive":
      // Shelves of pixel books under warm lamplight.
      return (
        <g>
          {[0, 1, 2].map((row) => {
            const y = 44 + row * 13;
            const books = [];
            for (let x = 12; x < 148; x += 4) {
              const h = 6 + Math.floor(seeded(x * 3 + row * 31) * 4);
              const warm = seeded(x * 7 + row * 13) > 0.72;
              books.push(
                <rect
                  key={x}
                  x={x}
                  y={y + (10 - h)}
                  width={3}
                  height={h}
                  fill={warm ? a : g}
                  opacity={warm ? 0.85 : 0.75}
                />,
              );
            }
            return (
              <g key={row}>
                {books}
                <rect x={10} y={y + 10} width={140} height={2} fill={d} />
              </g>
            );
          })}
          <rect x={76} y={10} width={8} height={5} fill={g} />
          <rect x={78} y={15} width={4} height={2} fill={a} opacity={0.9} />
          <rect x={68} y={17} width={24} height={20} fill={a} opacity={0.07} />
        </g>
      );

    case "observatory":
      // Dome, telescope barrel, open aperture on the night sky.
      return (
        <g>
          <rect x={44} y={54} width={72} height={26} fill={g} />
          <rect x={52} y={46} width={56} height={8} fill={g} />
          <rect x={60} y={40} width={40} height={6} fill={g} />
          {/* Aperture slit */}
          <rect x={74} y={40} width={12} height={14} fill={d} />
          {/* Barrel pointing up-right */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={78 + i * 4} y={38 - i * 4} width={6} height={6} fill={theme.accentSoft} />
          ))}
          <rect x={102} y={12} width={6} height={6} fill={a} opacity={0.85} />
          {/* Ground */}
          <rect x={0} y={78} width={VIEW_W} height={12} fill={d} />
        </g>
      );

    case "workshop":
      // Bench with a microcontroller board, components and a soldering iron.
      return (
        <g>
          <rect x={0} y={62} width={VIEW_W} height={4} fill={g} />
          <rect x={0} y={66} width={VIEW_W} height={24} fill={d} />
          {/* Dev board */}
          <rect x={52} y={46} width={40} height={16} fill={theme.accentSoft} />
          <rect x={58} y={50} width={12} height={8} fill={d} />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <rect key={i} x={54 + i * 5} y={44} width={2} height={2} fill={g} />
          ))}
          {[0, 1, 2].map((i) => (
            <rect key={`led${i}`} x={76 + i * 5} y={52} width={2} height={2} fill={a} opacity={0.9} />
          ))}
          {/* Scope readout on the left */}
          <rect x={10} y={38} width={30} height={24} fill={d} />
          <rect x={12} y={40} width={26} height={20} fill="#0a0f0c" />
          <path
            d="M12 54 L16 54 L18 46 L20 54 L26 54 L28 48 L30 54 L38 54"
            fill="none"
            stroke={a}
            strokeWidth={1}
            opacity={0.9}
          />
          {/* Iron on its stand */}
          <rect x={112} y={54} width={26} height={3} fill={g} />
          <rect x={132} y={50} width={3} height={5} fill={theme.accentSoft} />
          <rect x={132} y={48} width={3} height={2} fill="#d95f4a" opacity={0.9} />
        </g>
      );

    case "terminal":
      // A CRT workstation, prompt glowing.
      return (
        <g>
          <rect x={0} y={70} width={VIEW_W} height={20} fill={d} />
          <rect x={44} y={28} width={72} height={46} fill={g} />
          <rect x={48} y={32} width={64} height={34} fill="#060b08" />
          {/* Prompt lines of decreasing certainty */}
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect x={51} y={36 + i * 6} width={2} height={2} fill={a} opacity={0.9} />
              <rect
                x={55}
                y={36 + i * 6}
                width={12 + Math.floor(seeded(i * 19) * 40)}
                height={2}
                fill={a}
                opacity={0.4 - i * 0.05}
              />
            </g>
          ))}
          <rect x={51} y={66} width={2} height={2} fill={a} opacity={0.95} />
          {/* Stand */}
          <rect x={72} y={74} width={16} height={4} fill={g} />
          <rect x={64} y={78} width={32} height={3} fill={theme.structureDark} />
        </g>
      );

    case "datastore":
      // A segment tree rendered as a lit lattice above storage blocks.
      return (
        <g>
          <rect x={0} y={74} width={VIEW_W} height={16} fill={d} />
          {/* Tree: 1 -> 2 -> 4 nodes */}
          <rect x={76} y={18} width={8} height={6} fill={a} opacity={0.9} />
          <rect x={48} y={34} width={8} height={6} fill={a} opacity={0.7} />
          <rect x={104} y={34} width={8} height={6} fill={a} opacity={0.7} />
          {[32, 64, 88, 120].map((x) => (
            <rect key={x} x={x} y={50} width={8} height={6} fill={a} opacity={0.5} />
          ))}
          {/* Edges */}
          <g stroke={theme.accentSoft} strokeWidth={1} opacity={0.75} fill="none">
            <path d="M80 24 L80 29 L52 29 L52 34" />
            <path d="M80 24 L80 29 L108 29 L108 34" />
            <path d="M52 40 L52 45 L36 45 L36 50" />
            <path d="M52 40 L52 45 L68 45 L68 50" />
            <path d="M108 40 L108 45 L92 45 L92 50" />
            <path d="M108 40 L108 45 L124 45 L124 50" />
          </g>
          {/* Storage blocks below */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <rect key={i} x={16 + i * 17} y={62} width={13} height={10} fill={g} />
          ))}
        </g>
      );
  }
}

export interface PixelEnvironmentProps {
  readonly scene: SceneId;
  readonly className?: string;
  /** Stars and skyline are skipped for interior scenes. */
  readonly seed?: number;
}

export function PixelEnvironment({ scene, className, seed = 7 }: PixelEnvironmentProps) {
  const theme = THEMES[scene];
  const openSky = scene === "observatory" || scene === "laboratory" || scene === "datastore";
  const gradientId = `sky-${scene}-${seed}`;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      className={`crisp ${className ?? ""}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={theme.sky[0]} />
          <stop offset="100%" stopColor={theme.sky[1]} />
        </linearGradient>
      </defs>

      <rect width={VIEW_W} height={VIEW_H} fill={`url(#${gradientId})`} />

      {openSky ? <Stars seed={seed} count={40} /> : null}
      {openSky ? <Skyline seed={seed + 100} theme={theme} baseY={68} opacity={0.5} /> : null}

      <Foreground scene={scene} theme={theme} />

      {/* Dither band along the bottom: the scene fading into its own shadow.
          Deliberately NOT the panel colour - these scenes stay dark in both
          themes, so a pale band would read as a white stripe by day rather
          than as shading. */}
      <g opacity={0.5}>
        {Array.from({ length: VIEW_W / 2 }, (_, i) => i).map((i) =>
          i % 2 === 0 ? (
            <rect key={i} x={i * 2} y={VIEW_H - 4} width={2} height={2} fill={theme.structureDark} />
          ) : null,
        )}
        {Array.from({ length: VIEW_W / 2 }, (_, i) => i).map((i) =>
          i % 2 === 1 ? (
            <rect key={`b${i}`} x={i * 2} y={VIEW_H - 2} width={2} height={2} fill={theme.structureDark} />
          ) : null,
        )}
      </g>
      <rect y={VIEW_H - 2} width={VIEW_W} height={2} fill={theme.structureDark} />
    </svg>
  );
}
