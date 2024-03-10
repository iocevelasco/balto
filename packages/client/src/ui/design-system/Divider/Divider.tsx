import tw from "twin.macro";
import { styled } from "src/config/stitches";

export const Divider = styled("div", {
  ...tw`outline-none`,

  defaultVariants: {
    vertical: false,
    weight: "regular",
  },

  variants: {
    vertical: {
      false: tw`h-px w-full`,
      true: tw`h-full w-px`,
    },
    weight: {
      regular: tw`bg-neutral-200`,
      strong: tw`bg-neutral-500`,
    },
  },
});
