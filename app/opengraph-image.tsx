import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Allan Kirsten, from chaos to done, by design.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [bg, serif, sans] = await Promise.all([
    readFile(join(process.cwd(), "public/images/og-octopus.jpg")),
    readFile(join(process.cwd(), "public/fonts/DMSerifDisplay-Regular.woff")),
    readFile(join(process.cwd(), "public/fonts/AtkinsonHyperlegible-Regular.woff")),
  ]);
  const bgSrc = `data:image/jpeg;base64,${bg.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
        }}
      >
        <img
          src={bgSrc}
          width={size.width}
          height={size.height}
          style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 38%, rgba(0,0,0,0) 72%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 72,
            bottom: 64,
            right: 72,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Atkinson",
              fontSize: 26,
              color: "rgba(255,255,255,0.75)",
              letterSpacing: 1,
              marginBottom: 18,
            }}
          >
            Allan Kirsten
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "DM Serif Display",
              fontSize: 66,
              lineHeight: 1.08,
              color: "#fff",
            }}
          >
            From chaos to done, by design.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "DM Serif Display", data: serif, style: "normal", weight: 400 },
        { name: "Atkinson", data: sans, style: "normal", weight: 400 },
      ],
    }
  );
}
