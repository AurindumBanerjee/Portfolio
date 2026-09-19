import { seeded, seededQuantized } from "@/lib/utils";

/**
 * The hero landscape, split into depth slices so the Hero can parallax them
 * independently: sky, far ridge, mid city, near ridge, and the foreground
 * terrace where the researcher figure stands.
 *
 * All decorative, all aria-hidden.
 */

const W = 320;
const H = 180;

/**
 * The celestial body's position in the scene's own coordinate space. Exported
 * so the Hero can place its click target exactly over it.
 */
export const CELESTIAL = { x: 244, y: 28, size: 28, viewW: W, viewH: H } as const;

export function HeroSky({ isLight = false }: { readonly isLight?: boolean }) {
  const stars = [];
  for (let i = 0; i < 90; i += 1) {
    const x = Math.floor(seeded(i * 31) * W);
    const y = Math.floor(seeded(i * 77 + 1) * 110);
    // Quantized: this value is serialised into SSR'd markup, so it must be a
    // short, stable string rather than 17 significant digits.
    const r = seededQuantized(i * 11 + 2);
    stars.push(
      <rect
        key={i}
        x={x}
        y={y}
        width={1}
        height={1}
        fill={r > 0.85 ? "#ffc46b" : r > 0.6 ? "#d5dbeb" : "#6b7590"}
        opacity={Math.round((0.45 + r * 0.55) * 1000) / 1000}
      />,
    );
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="crisp h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          {isLight ? (
            <>
              <stop offset="0%" stopColor="#bed2ee" />
              <stop offset="55%" stopColor="#d7e2f3" />
              <stop offset="100%" stopColor="#e8ecf5" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#07080c" />
              <stop offset="55%" stopColor="#0e1322" />
              <stop offset="100%" stopColor="#1a2032" />
            </>
          )}
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#hero-sky)" />

      {/* Stars belong to the night only. */}
      {isLight ? null : stars}

      {isLight ? <SunBody /> : <MoonBody />}
    </svg>
  );
}

/** The night's cold key light: a pale disc with a soft halo. */
function MoonBody() {
  return (
    <g>
      {/* Two halo rings, widest and faintest first, for a soft falloff. */}
      <rect x={232} y={16} width={52} height={52} fill="#c9d2e8" opacity={0.07} />
      <rect x={238} y={22} width={40} height={40} fill="#dde4f2" opacity={0.14} />
      {/* The disc. */}
      <rect x={244} y={28} width={28} height={28} fill="#eef2fb" opacity={0.97} />
      {/* Craters: darker than the disc so they read at this brightness. */}
      <rect x={252} y={34} width={4} height={4} fill="#aab4cd" opacity={0.75} />
      <rect x={262} y={44} width={3} height={3} fill="#aab4cd" opacity={0.65} />
      <rect x={250} y={48} width={2} height={2} fill="#aab4cd" opacity={0.55} />
    </g>
  );
}

/**
 * The day's key light. Kept in the same footprint as the moon so the two
 * read as one object at different hours, and so one click target fits both.
 */
function SunBody() {
  return (
    <g>
      {/* Halo: stepped octagons rather than squares, so the glow reads as a
          radial falloff instead of a pair of grey boxes on the pale sky. */}
      <g fill="#ffc861" opacity={0.16}>
        <rect x={236} y={22} width={44} height={40} />
        <rect x={232} y={28} width={52} height={28} />
        <rect x={240} y={16} width={36} height={52} />
      </g>
      <g fill="#ffb84a" opacity={0.26}>
        <rect x={240} y={26} width={36} height={32} />
        <rect x={236} y={30} width={44} height={24} />
        <rect x={244} y={22} width={28} height={40} />
      </g>
      {/* Disc, corners clipped so it reads as a circle at this scale. */}
      <g fill="#f5a623">
        <rect x={244} y={28} width={28} height={28} />
        <rect x={240} y={32} width={36} height={20} />
        <rect x={248} y={24} width={20} height={36} />
      </g>
      {/* Warm core */}
      <rect x={250} y={34} width={16} height={16} fill="#ffd27a" opacity={0.8} />
      {/* Rays, on the pixel grid */}
      <g fill="#f5a623" opacity={0.85}>
        <rect x={256} y={10} width={4} height={8} />
        <rect x={256} y={66} width={4} height={8} />
        <rect x={222} y={40} width={8} height={4} />
        <rect x={286} y={40} width={8} height={4} />
      </g>
    </g>
  );
}

/** Far ridge — lowest contrast, reads as distance. */
export function HeroFarRidge({ isLight = false }: { readonly isLight?: boolean }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      className="crisp h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 130 L20 118 L34 124 L52 104 L70 116 L88 100 L104 112 L124 94 L144 110 L162 98 L184 114 L204 102 L226 118 L248 106 L270 120 L292 110 L320 124 L320 180 L0 180 Z"
        // By day the ridge is haze-blue and barely separated from the sky,
        // which is what distance actually looks like in daylight.
        fill={isLight ? "#b9c8e2" : "#161d30"}
      />
    </svg>
  );
}

/** Mid layer: a research district of blocky towers with lit windows. */
export function HeroCity({ isLight = false }: { readonly isLight?: boolean }) {
  // By day the towers are lit from outside, so they read mid-tone against a
  // bright sky and their windows become dark glass rather than lamps.
  const body = isLight ? "#8fa2c4" : "#1d2439";
  const edge = isLight ? "#a6b6d3" : "#2d364f";

  const parts = [];
  let x = -6;
  let i = 0;
  while (x < W + 6) {
    const w = 10 + Math.floor(seeded(i * 55) * 18);
    const h = 26 + Math.floor(seeded(i * 91 + 1) * 46);
    const top = 150 - h;
    parts.push(<rect key={`t${i}`} x={x} y={top} width={w} height={h} fill={body} />);
    // A lit edge on one side gives the block volume.
    parts.push(<rect key={`e${i}`} x={x} y={top} width={1} height={h} fill={edge} />);

    // Antenna on the taller towers.
    if (h > 58) {
      parts.push(
        <rect key={`a${i}`} x={x + Math.floor(w / 2)} y={top - 10} width={1} height={10} fill={edge} />,
        <rect key={`al${i}`} x={x + Math.floor(w / 2)} y={top - 12} width={1} height={2} fill="#d95f4a" opacity={0.8} />,
      );
    }

    for (let wy = top + 4; wy < 146; wy += 5) {
      for (let wx = x + 3; wx < x + w - 2; wx += 4) {
        // Integer seeds: `seeded` floors its input, so fractional multipliers
        // would collapse neighbouring windows onto the same value.
        const r = seededQuantized(wx * 137 + wy * 33);
        if (r > 0.62) {
          parts.push(
            <rect
              key={`w${i}-${wx}-${wy}`}
              x={wx}
              y={wy}
              width={2}
              height={2}
              // Day: dark glass reflecting the sky. Night: a lit lamp.
              fill={isLight ? "#5e719a" : r > 0.93 ? "#7ff0e2" : "#ffc46b"}
              opacity={
                isLight
                  ? Math.round((0.3 + r * 0.35) * 1000) / 1000
                  : Math.round((0.55 + r * 0.45) * 1000) / 1000
              }
            />,
          );
        }
      }
    }
    x += w + 2 + Math.floor(seeded(i * 179 + 3) * 5);
    i += 1;
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      className="crisp h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      {parts}
      <rect y={150} width={W} height={30} fill={isLight ? "#7c8fb4" : "#111522"} />
    </svg>
  );
}

/**
 * Foreground terrace with a seated figure at a terminal — a researcher at
 * work, rendered small and unfussy so it reads as scenery, not a mascot.
 */
export function HeroForeground({ isLight = false }: { readonly isLight?: boolean }) {
  // The terrace stays a silhouette in both themes - by day it is simply
  // backlit rather than unlit, so it shifts to a cool slate instead of black.
  const slab = isLight ? "#4a5772" : "#0b0d14";
  const trim = isLight ? "#5d6b89" : "#252d43";
  const post = isLight ? "#54627e" : "#1a2032";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      className="crisp h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      {/* Terrace slab */}
      <rect y={158} width={W} height={22} fill={slab} />
      <rect y={156} width={W} height={2} fill={trim} />

      {/* Railing posts */}
      {Array.from({ length: 21 }, (_, i) => i * 16).map((px) => (
        <rect key={px} x={px} y={146} width={2} height={10} fill={post} />
      ))}
      <rect y={144} width={W} height={2} fill={post} />

      {/* Desk, monitor and figure, right of centre */}
      <g transform="translate(198, 112)">
        {/* Monitor */}
        <rect x={22} y={0} width={30} height={22} fill="#1a2032" />
        <rect x={24} y={2} width={26} height={18} fill="#070b10" />
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={26}
            y={5 + i * 4}
            width={6 + Math.floor(seeded(i * 23) * 16)}
            height={2}
            fill="#4ecfc0"
            opacity={0.65 - i * 0.1}
          />
        ))}
        {/* Screen glow spilling onto the desk */}
        <rect x={18} y={22} width={38} height={4} fill="#4ecfc0" opacity={0.08} />

        {/* Desk */}
        <rect x={10} y={26} width={54} height={3} fill="#252d43" />
        <rect x={14} y={29} width={2} height={17} fill="#1a2032" />
        <rect x={58} y={29} width={2} height={17} fill="#1a2032" />

        {/* Figure: head, torso, arm to the desk */}
        <rect x={2} y={8} width={8} height={8} fill="#37415c" />
        <rect x={3} y={9} width={6} height={6} fill="#6b7590" />
        <rect x={0} y={16} width={12} height={14} fill="#252d43" />
        <rect x={10} y={20} width={8} height={3} fill="#37415c" />
        {/* Stool */}
        <rect x={2} y={30} width={8} height={2} fill="#1a2032" />
        <rect x={5} y={32} width={2} height={14} fill="#1a2032" />
      </g>

      {/* A lantern on a post, left of centre — the warm light source.
          Unlit by day: a lamp burning at noon would read as a mistake. */}
      <g transform="translate(64, 118)">
        <rect x={4} y={0} width={2} height={38} fill={post} />
        <rect x={0} y={0} width={10} height={2} fill={trim} />
        <rect x={2} y={2} width={6} height={8} fill={isLight ? "#6b7890" : "#37415c"} />
        <rect
          x={3}
          y={3}
          width={4}
          height={6}
          fill={isLight ? "#8b98ae" : "#ffc46b"}
          opacity={isLight ? 0.8 : 0.95}
        />
        {isLight ? null : (
          <rect x={-10} y={-4} width={30} height={26} fill="#e8a33d" opacity={0.06} />
        )}
      </g>
    </svg>
  );
}
