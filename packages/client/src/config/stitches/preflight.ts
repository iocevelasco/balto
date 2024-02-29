import type { CSS } from ".";

/**
 * This is a port of Preflight (https://tailwindcss.com/docs/preflight), Tailwindcss reset style sheet
 * Once twin.macro will add a "stitches" preset we will be able to delete this code
 */
const preflight: CSS = {
  "*": {
    "--tw-ring-color": "rgba(59, 130, 246, 0.5)",
    "--tw-ring-inset": "var(--tw-empty, /*!*/ /*!*/)",
    "--tw-ring-offset-color": "#fff",
    "--tw-ring-offset-shadow": "0 0 #0000",
    "--tw-ring-offset-width": "0px",
    "--tw-ring-shadow": "0 0 #0000",
    "--tw-shadow": "0 0 #0000",
  },
  "*, *::before, *::after": { boxSizing: "border-box" },
  "*, ::before, ::after": {
    borderColor: "#e5e7eb",
    borderStyle: "solid",
    borderWidth: "0",
    boxSizing: "border-box",
  },
  ":-moz-focusring": { outline: "1px dotted ButtonText" },
  ":-moz-ui-invalid": { boxShadow: "none" },
  "::-moz-focus-inner": { borderStyle: "none", padding: "0" },
  "::-webkit-file-upload-button": {
    WebkitAppearance: "button",
    font: "inherit",
  },
  "::-webkit-inner-spin-button, ::-webkit-outer-spin-button": {
    height: "auto",
  },
  "::-webkit-search-decoration": { WebkitAppearance: "none" },
  ":root": { MozTabSize: "4", tabSize: 4 },
  "@keyframes bounce": {
    "0%, 100%": {
      animationtimingfunction: "cubic-bezier(0.8,0,1,1)",
      transform: "translateY(-25%)",
    },
    "50%": {
      animationtimingfunction: "cubic-bezier(0,0,0.2,1)",
      transform: "none",
    },
  },
  "@keyframes ping": { "75%, 100%": { opacity: 0, transform: "scale(2)" } },
  "@keyframes pulse": { "50%": { opacity: 0.5 } },
  "@keyframes spin": { to: { transform: "rotate(360deg)" } },
  "[type='search']": { WebkitAppearance: "textfield", outlineOffset: "-2px" },
  a: { color: "inherit", textDecoration: "inherit" },

  "abbr[title]": { textDecoration: "underline dotted" },

  "b, strong": { fontWeight: "bolder" },

  "blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre": {
    margin: "0",
  },

  body: { fontFamily: "inherit", lineHeight: "inherit", margin: "0" },

  button: { backgroundColor: "transparent", backgroundImage: "none" },

  'button, [role="button"]': { cursor: "pointer" },

  "button, [type='button'], [type='reset'], [type='submit']": {
    WebkitAppearance: "button",
  },

  "button, input, optgroup, select, textarea": {
    color: "inherit",
    fontFamily: "inherit",
    fontSize: "100%",
    lineHeight: "inherit",
    margin: "0",
    padding: "0",
  },

  "button, select": { textTransform: "none" },

  "button:focus": {
    outline: "1px dotted",
  },

  "code, kbd, samp, pre": {
    fontFamily:
      "ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace",
    fontSize: "1em",
  },

  /* to prevent Safari to override button style */
  'div[type="button"], span[type="button"]': {
    appearance: "none",
  },

  fieldset: { margin: "0", padding: "0" },

  "h1, h2, h3, h4, h5, h6": {
    fontSize: "inherit",
    fontWeight: "inherit",
  },

  hr: { borderTopWidth: "1px", color: "inherit", height: "0" },

  html: {
    WebkitTextSizeAdjust: "100%",
    fontFamily:
      '"Source Sans Pro", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    height: "100vh",
    lineHeight: 1.5,
    overflow: "hidden",
  },

  img: { borderStyle: "solid" },

  "img, svg, video, canvas, audio, iframe, embed, object": {
    display: "block",
    verticalAlign: "middle",
  },

  "img, video": { height: "auto", maxWidth: "100%" },
  "input::placeholder, textarea::placeholder": { color: "#9ca3af" },
  legend: { padding: "0" },
  "ol, ul": { listStyle: "none", margin: "0", padding: "0" },
  "pre, code, kbd, samp": {
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  progress: { verticalAlign: "baseline" },
  small: { fontSize: "80%" },
  sub: { bottom: "-0.25em" },
  "sub, sup": {
    fontSize: "75%",
    lineHeight: 0,
    position: "relative",
    verticalAlign: "baseline",
  },
  summary: { display: "list-item" },
  sup: { top: "-0.5em" },
  table: {
    borderCollapse: "collapse",
    borderColor: "inherit",
    textIndent: "0",
  },
  textarea: { resize: "vertical" },
};

export { preflight };
