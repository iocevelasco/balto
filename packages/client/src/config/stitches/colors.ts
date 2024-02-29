import { tailwind } from "stitches-zigzag";
import { aliasPaletteTokens, paletteToTokens } from "./helpers";

const slate = {
  "100": "#f1f5f9",
  "200": "#e2e8f0",
  "300": "#cbd5e1",
  "400": "#94a3b8",
  "500": "#64748b",
  "600": "#475569",
  "700": "#334155",
  "800": "#1e293b",
  "900": "#0f172a",
};

const sky = {
  "100": "#e0f2fe",
  "200": "#bae6fd",
  "300": "#7dd3fc",
  "400": "#38bdf8",
  "50": "#f0f9ff",
  "500": "#0ea5e9",
  "600": "#0284c7",
  "700": "#0369a1",
  "800": "#075985",
  "900": "#0c4a6e",
};

const colors = {
  ...tailwind.theme.colors,
  ...aliasPaletteTokens("amber", "caution" as const),
  ...aliasPaletteTokens("rose", "critical" as const),
  ...aliasPaletteTokens("sky", "info" as const),
  ...aliasPaletteTokens("blueGray", "neutral" as const),
  ...aliasPaletteTokens("emerald", "positive" as const),
  ...aliasPaletteTokens("violet", "promote" as const),
  // These palettes are Tailwind V3-only and we are still on V2
  ...paletteToTokens("slate" as const, slate),
  ...paletteToTokens("sky" as const, sky),
  transparent: "transparent",
};

export { colors };
