import { ImageResponse } from "next/og";
import { profile } from "@/data/resume";

/* No `runtime = "edge"`: the card is identical on every request, so letting
   it prerender at build time serves it as a static asset instead. */
export const alt = `${profile.name} - portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share card, generated at the edge.
 *
 * Built from flat blocks rather than the site's SVG scenery: satori supports
 * only a subset of CSS, so this recreates the world's palette and skyline
 * with plain divs.
 */
export default function OpengraphImage() {
  // A deterministic skyline, so the card never changes between builds.
  const towers = [
    [40, 160], [78, 96], [112, 210], [154, 130], [196, 176], [236, 88],
    [270, 240], [318, 120], [356, 190], [398, 144], [436, 224], [482, 100],
    [518, 168], [558, 132], [596, 206], [640, 92], [674, 178], [716, 148],
    [756, 232], [800, 116], [838, 190], [880, 140], [920, 212], [964, 96],
    [1000, 170], [1042, 126], [1082, 198], [1126, 152], [1164, 110],
  ] as const;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: "#07080c",
          position: "relative",
        }}
      >
        {/* Skyline */}
        {towers.map(([x, h], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              bottom: 0,
              width: 30,
              height: h,
              backgroundColor: i % 3 === 0 ? "#111522" : "#1a2032",
            }}
          />
        ))}

        {/* Lantern glow from the left */}
        <div
          style={{
            position: "absolute",
            left: -120,
            top: 120,
            width: 700,
            height: 700,
            borderRadius: 9999,
            backgroundColor: "rgba(232,163,61,0.10)",
          }}
        />

        {/* Copy */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 72px 88px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 28,
            }}
          >
            <div style={{ width: 40, height: 6, backgroundColor: "#e8a33d" }} />
            <div
              style={{
                fontSize: 22,
                color: "#e8a33d",
                letterSpacing: 4,
                textTransform: "uppercase",
              }}
            >
              IIT Jodhpur · CSE
            </div>
          </div>

          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              color: "#d5dbeb",
              lineHeight: 1.05,
              marginBottom: 24,
            }}
          >
            {profile.name}
          </div>

          <div style={{ fontSize: 34, color: "#4ecfc0", lineHeight: 1.3 }}>
            {profile.tagline}
          </div>
        </div>

        {/* Bottom rule */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 1200,
            height: 10,
            backgroundColor: "#e8a33d",
          }}
        />
      </div>
    ),
    size,
  );
}
