import type { CSSProperties } from "react";

/**
 * Icons drawn on a 16x16 grid as literal pixel maps.
 *
 * Each glyph is an array of 16 strings of 16 characters. A space is empty;
 * any other character indexes into the palette passed alongside it. This is
 * the same way sprite sheets are authored, and it keeps the icons consistent
 * with the rest of the art instead of importing a vector icon set.
 */

/* Resolved through CSS variables so icons follow the day/night palette.
   Order is [base, highlight, shadow], matching the '1'/'2'/'3' glyph keys. */
const PALETTES = {
  lantern: ["var(--lantern)", "var(--lantern-bright)", "var(--lantern-deep)"],
  signal: [
    "rgb(var(--c-signal))",
    "rgb(var(--c-signal-bright))",
    "rgb(var(--c-signal-deep))",
  ],
  stone: ["var(--stone-mid)", "var(--stone-bright)", "var(--stone-dim)"],
  ember: [
    "rgb(var(--c-ember))",
    "rgb(var(--c-ember) / 0.7)",
    "rgb(var(--c-ember) / 0.45)",
  ],
} as const;

export type PixelIconTone = keyof typeof PALETTES;

/* Glyphs: '1' = base, '2' = highlight, '3' = shadow. */
const GLYPHS = {
  /** Flask — research / ML work. */
  brain: [
    "                ",
    "     111111     ",
    "     1    1     ",
    "     1 22 1     ",
    "     1 22 1     ",
    "    1  22  1    ",
    "    1 2222 1    ",
    "   1  2222  1   ",
    "   1 222222 1   ",
    "  1  222222  1  ",
    "  1 22222222 1  ",
    " 1  22222222  1 ",
    " 1 3322222233 1 ",
    " 1  33333333  1 ",
    "  11111111111   ",
    "                ",
  ],
  /** Angle brackets — code. */
  code: [
    "                ",
    "                ",
    "       11       ",
    "   11 11  11    ",
    "  1111 1 1111   ",
    " 1111  1  1111  ",
    "111    1    111 ",
    "11    1 1    11 ",
    "11    1 1    11 ",
    "111    1    111 ",
    " 1111  1  1111  ",
    "  1111 1 1111   ",
    "   11 11  11    ",
    "       11       ",
    "                ",
    "                ",
  ],
  /** Eye — computer vision. */
  eye: [
    "                ",
    "                ",
    "                ",
    "    11111111    ",
    "  11        11  ",
    " 1   333333   1 ",
    "1   33222233   1",
    "1  332222223  1 ",
    "1  332222223  1 ",
    "1   33222233   1",
    " 1   333333   1 ",
    "  11        11  ",
    "    11111111    ",
    "                ",
    "                ",
    "                ",
  ],
  /** Stacked server racks — backend. */
  server: [
    "                ",
    " 11111111111111 ",
    " 1            1 ",
    " 1 22       3 1 ",
    " 1            1 ",
    " 11111111111111 ",
    " 1            1 ",
    " 1 22       3 1 ",
    " 1            1 ",
    " 11111111111111 ",
    " 1            1 ",
    " 1 22       3 1 ",
    " 1            1 ",
    " 11111111111111 ",
    "                ",
    "                ",
  ],
  /** Cylinder — database. */
  database: [
    "                ",
    "   11111111     ",
    "  1222222221    ",
    " 1 22222222 1   ",
    "  1222222221    ",
    "   11111111     ",
    "  1        1    ",
    "  1        1    ",
    "   11111111     ",
    "  1        1    ",
    "  1        1    ",
    "   11111111     ",
    "  1        1    ",
    "  1        1    ",
    "   11111111     ",
    "                ",
  ],
  /** Wrench — tooling. */
  wrench: [
    "                ",
    "          1111  ",
    "         122221 ",
    "        12211221",
    "        12    21",
    "        122  221",
    "         122221 ",
    "       11 11111 ",
    "      1331      ",
    "     1331       ",
    "    1331        ",
    "   1331         ",
    "  1331          ",
    " 1331           ",
    " 111            ",
    "                ",
  ],
  /** Shield — security. */
  shield: [
    "                ",
    "    11111111    ",
    "   1222222221   ",
    "  122222222221  ",
    "  122222222221  ",
    "  122233322221  ",
    "  122233322221  ",
    "  122233322221  ",
    "  122222222221  ",
    "   1222222221   ",
    "   1222222221   ",
    "    12222221    ",
    "     122221     ",
    "      1221      ",
    "       11       ",
    "                ",
  ],
  /** Terminal prompt. */
  terminal: [
    "                ",
    " 11111111111111 ",
    " 1            1 ",
    " 1            1 ",
    " 1 22         1 ",
    " 1  22        1 ",
    " 1   22       1 ",
    " 1    22      1 ",
    " 1   22       1 ",
    " 1  22        1 ",
    " 1 22         1 ",
    " 1     333333 1 ",
    " 1            1 ",
    " 11111111111111 ",
    "                ",
    "                ",
  ],
  /** Open book — archive. */
  archive: [
    "                ",
    "                ",
    "  111      111  ",
    " 12221    12221 ",
    " 12221333312221 ",
    " 12221333312221 ",
    " 12221333312221 ",
    " 12221333312221 ",
    " 12221333312221 ",
    " 12221333312221 ",
    " 12221333312221 ",
    " 12221    12221 ",
    "  111      111  ",
    "                ",
    "                ",
    "                ",
  ],
  /** Microchip — embedded. */
  chip: [
    "                ",
    "    1  1  1     ",
    "  1111111111    ",
    "  1        1    ",
    "1 1 222222 1 1  ",
    "  1 222222 1    ",
    "1 1 222222 1 1  ",
    "  1 222222 1    ",
    "1 1 222222 1 1  ",
    "  1 222222 1    ",
    "1 1 222222 1 1  ",
    "  1        1    ",
    "  1111111111    ",
    "    1  1  1     ",
    "                ",
    "                ",
  ],
  /** Node graph — data structures. */
  graph: [
    "                ",
    "      1221      ",
    "      1221      ",
    "     113311     ",
    "    11    11    ",
    "   11      11   ",
    "  1221    1221  ",
    "  1221    1221  ",
    "  1331    1331  ",
    " 11  11  11  11 ",
    "1221 1221 1221  ",
    "1221 1221 1221  ",
    "                ",
    "                ",
    "                ",
    "                ",
  ],
  /** Telescope / observatory. */
  telescope: [
    "                ",
    "           1111 ",
    "          122221",
    "         12222 1",
    "        1222 11 ",
    "       1222 1   ",
    "      1222 1    ",
    "     1222 1     ",
    "    13331       ",
    "   1331         ",
    "    11          ",
    "    11          ",
    "   1111         ",
    "  111111        ",
    "                ",
    "                ",
  ],
  /** Spark / lantern flame. */
  spark: [
    "                ",
    "       11       ",
    "      1221      ",
    "      1221      ",
    "   1  1221  1   ",
    "    1 1221 1    ",
    "     11221 1    ",
    "  111122221111  ",
    "     11221 1    ",
    "    1 1221 1    ",
    "   1  1221  1   ",
    "      1221      ",
    "      1221      ",
    "       11       ",
    "                ",
    "                ",
  ],
} as const;

export type PixelIconName = keyof typeof GLYPHS;

export interface PixelIconProps {
  readonly name: PixelIconName;
  readonly tone?: PixelIconTone;
  /** Rendered edge length in CSS pixels. Use multiples of 16 to stay crisp. */
  readonly size?: number;
  readonly className?: string;
  readonly style?: CSSProperties;
  /** Supply when the icon carries meaning on its own; omit when decorative. */
  readonly title?: string;
}

export function PixelIcon({
  name,
  tone = "stone",
  size = 32,
  className,
  style,
  title,
}: PixelIconProps) {
  const glyph = GLYPHS[name];
  const palette = PALETTES[tone];
  const rects: React.ReactElement[] = [];

  for (let y = 0; y < glyph.length; y += 1) {
    const row = glyph[y];
    if (!row) continue;
    for (let x = 0; x < row.length; x += 1) {
      const ch = row[x];
      if (!ch || ch === " ") continue;
      const fill = palette[Number(ch) - 1] ?? palette[0];
      rects.push(
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} />,
      );
    }
  }

  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      className={`crisp ${className ?? ""}`}
      style={style}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {rects}
    </svg>
  );
}
