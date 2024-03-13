import useDefaultBreakpoint from "use-breakpoint";
import { BREAKPOINTS } from "../constants/tokens";

const breakpoints = {
  desktop: BREAKPOINTS.desktop,
  mobile: 0,
  tablet: BREAKPOINTS.tablet,
};

const useBreakpoint = (defaultBreakpoint = "mobile" as const) => {
  return useDefaultBreakpoint(breakpoints, defaultBreakpoint);
};

export {
  useBreakpoint
}