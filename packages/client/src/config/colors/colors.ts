import { tailwind } from "stitches-zigzag";

const enum Color {
  Amber = "amber",
  Blue = "blue",
  Brown = "brown",
  Cyan = "cyan",
  Dark = "dark",
  Emerald = "emerald",
  Fuchsia = "fuchsia",
  Gray = "gray",
  Green = "green",
  Indigo = "indigo",
  Lime = "lime",
  Orange = "orange",
  Pink = "pink",
  Purple = "purple",
  Red = "red",
  Rose = "rose",
  Sky = "sky",
  Teal = "teal",
  Violet = "violet",
  Yellow = "yellow",
  White = "white",
}

const COLORS = [
  Color.Amber,
  Color.Blue,
  Color.Brown,
  Color.Cyan,
  Color.Dark,
  Color.Emerald,
  Color.Fuchsia,
  Color.Gray,
  Color.Green,
  Color.Indigo,
  Color.Lime,
  Color.Orange,
  Color.Pink,
  Color.Purple,
  Color.Red,
  Color.Rose,
  Color.Sky,
  Color.Teal,
  Color.Violet,
  Color.Yellow,
  Color.White,
];

const getRandomColor = () => {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
};

const PALETTE = {
  ...tailwind.theme.colors,
  // These palettes are Tailwind V3-only and we are still on V2
  slate50: "#f8fafc",
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  slate100: "#f1f5f9",
  slate200: "#e2e8f0",
  slate300: "#cbd5e1",
  slate400: "#94a3b8",
  slate500: "#64748b",
  slate600: "#475569",
  slate700: "#334155",
  slate800: "#1e293b",
  slate900: "#0f172a",
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  sky50: "#f0f9ff",
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  sky100: "#e0f2fe",
  sky200: "#bae6fd",
  sky300: "#7dd3fc",
  sky400: "#38bdf8",
  sky500: "#0ea5e9",
  sky600: "#0284c7",
  sky700: "#0369a1",
  sky800: "#075985",
  sky900: "#0c4a6e",
  white50: "white",
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  white100: "white",
  white200: "white",
  white300: "white",
  white400: "white",
  white500: "white",
  white600: "white",
  white700: "white",
  white800: "white",
  white900: "white",
};

const createVariants = (color: Color) => {
  switch (color) {
    case Color.Brown:
      return {
        base: PALETTE.yellow800,
        light: {
          background: PALETTE.gray200,
          text: PALETTE.yellow800,
        },
        plain: {
          background: PALETTE.yellow800,
          text: PALETTE.yellow100,
        },
      };
    case Color.Dark:
      return {
        base: PALETTE.slate800,
        light: {
          background: PALETTE.slate200,
          text: PALETTE.slate800,
        },
        plain: {
          background: PALETTE.slate800,
          text: PALETTE.slate100,
        },
      };
    default:
      return {
        base: PALETTE[`${color}500`],
        light: {
          background: PALETTE[`${color}100`],
          text: PALETTE[`${color}800`],
        },
        plain: {
          background: PALETTE[`${color}400`],
          text: PALETTE[`${color}50`],
        },
      };
  }
};

const colorToHexValues = new Map(
  COLORS.map((color) => {
    const variants = createVariants(color);
    return [color, variants];
  })
);

export { Color, COLORS, colorToHexValues, getRandomColor };
