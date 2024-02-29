import { tailwind } from "stitches-zigzag";

type ColorScale =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

/*
  We use template literal types (https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html)
  to expand the Palette type into many different types via the union ColorScale.
  You can try it yourself by copying and inspecting this line :
  type ClovisPalette = Palette<"clovis">;
  The ClovisPalette type will be a record of shape : { clovis50: string, clovis100: string, ... }
*/
type Palette<T extends string> = Record<`${T}${ColorScale}`, string>;

const getPaletteTokens = <T extends string>(paletteName: T) =>
  Object.fromEntries(
    Object.entries(tailwind.theme.colors).filter(([name]) =>
      name.startsWith(paletteName)
    )
  ) as Palette<T>;

const aliasPaletteTokens = <T extends string>(paletteName: string, alias: T) =>
  Object.fromEntries(
    Object.entries(getPaletteTokens(paletteName)).map(([k, v]) => [
      k.replace(paletteName, alias),
      v,
    ])
  ) as Palette<T>;

const paletteToTokens = <T extends string>(
  name: T,
  palette: Record<string, string>
) =>
  Object.fromEntries(
    Object.entries(palette).map(([k, v]) => [`${name}${k}`, v])
  ) as Palette<T>;

export { aliasPaletteTokens, getPaletteTokens, paletteToTokens };
