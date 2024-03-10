import tw from "twin.macro";
import { styled } from "src/config/stitches";

const Text = styled("span", {
  defaultVariants: {
    size: "standard",
    weight: "regular",
  },

  variants: {
    align: {
      center: tw`w-full text-center`,
      left: tw`w-full text-left`,
      right: tw`w-full text-right`,
    },
    baseline: {
      true: tw`align-baseline`,
    },
    italic: {
      false: tw``,
      true: tw`italic`,
    },
    noSelectable: {
      false: tw`select-text`,
      true: tw`select-none`,
    },
    size: {
      inherit: {
        fontSize: "inherit",
      },
      large: tw`text-lg`,
      small: tw`text-sm`,
      standard: tw`text-base`,
      xlarge: tw`text-xl`,
      xsmall: tw`text-xs`,
      xxlarge: tw`text-2xl`,
      xxsmall: {
        fontSize: "10px",
        lineHeight: "0.5rem",
      },
      xxxsmall: {
        fontSize: "8px",
        lineHeight: "0.5rem",
      },
    },
    tone: {
      black: tw`text-black`,
      brandAccent: tw`text-emerald-500`,
      link: tw`text-white cursor-pointer`,
      secondary: tw`text-gray-500`,
      white: tw`text-white`,
    },
    truncate: {
      noEllipsis: tw`w-auto max-w-full inline-block whitespace-nowrap overflow-clip overflow-hidden`,
      noFullWidth: tw`w-auto max-w-full inline-block whitespace-nowrap overflow-ellipsis overflow-hidden`,
      true: tw`w-full inline-block whitespace-nowrap overflow-ellipsis overflow-hidden`,
    },
    underline: {
      true: tw`underline`,
    },
    uppercase: {
      true: tw`uppercase`,
    },
    weight: {
      medium: tw`font-medium`,
      regular: tw`font-normal`,
      strong: tw`font-bold`,
    },
  },
});

type TextProps = React.ComponentProps<typeof Text>;

export type { TextProps };
export { Text };
