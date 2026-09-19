export function cn(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/** Clamp a number into [min, max]. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Deterministic pseudo-random in [0, 1) from a seed.
 *
 * Integer-only (a mulberry32-style bit mix). This matters: an earlier version
 * used `Math.sin()`, whose results are NOT specified to the last bit and so
 * differed between the Node build and the browser — React then saw
 * `opacity="0.644...282393"` from the server against `0.644...322411` on the
 * client and reported a hydration mismatch. Bitwise ops on int32 are exact
 * everywhere, so server and client now agree bit for bit.
 *
 * The seed is floored and mixed, so non-integer seeds are accepted safely.
 */
export function seeded(seed: number): number {
  // >>> 0 keeps everything in unsigned 32-bit space.
  let t = (Math.floor(seed) * 1831565813 + 2654435769) >>> 0;
  t = Math.imul(t ^ (t >>> 15), t | 1) >>> 0;
  t = (t ^ (t + Math.imul(t ^ (t >>> 7), t | 61))) >>> 0;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/**
 * `seeded`, rounded to `places` decimals.
 *
 * Used for any value serialised into SSR'd markup (opacities, mostly) so the
 * attribute string is short and stable rather than 17 significant digits.
 */
export function seededQuantized(seed: number, places = 3): number {
  const factor = 10 ** places;
  return Math.round(seeded(seed) * factor) / factor;
}
