import tw from "twin.macro";
import { styled } from "~config/stitches";

const Box = styled("div", {
  compoundVariants: [
    {
      boxShadow: "xsmall",
      css: tw`hover:shadow`,
      hoverEffect: true,
    },
    {
      boxShadow: "small",
      css: tw`hover:shadow-md`,
      hoverEffect: true,
    },
    {
      boxShadow: "medium",
      css: tw`hover:shadow-xl`,
      hoverEffect: true,
    },
  ],

  variants: {
    alignItems: {
      baseline: tw`items-baseline`,
      center: tw`items-center`,
      flexEnd: tw`items-end`,
      flexStart: tw`items-start`,
    },
    background: {
      body: tw`bg-transparent`,
      brand: tw`bg-emerald-500`,
      brandAccent: tw`bg-emerald-700`,
      brandAccentActive: tw`bg-emerald-800`,
      brandAccentHover: tw`bg-emerald-600`,
      card: tw`bg-white`,
      caution: tw`bg-cyan-400`,
      image: {
        "&": {
          position: "relative",
          zIndex: 0,
        },
        "& > :last-child": {
          bottom: 0,
          left: 0,
          position: "absolute",
          right: 0,
          top: 0,
          width: "100%",
          zIndex: -1,
        },
      },
      info: tw`bg-blue-400`,
      infoLight: tw`bg-blue-200`,
      input: tw`bg-white`,
      inputDisabled: tw`bg-gray-200`,
      navy: tw`bg-slate-800`,
      navyDark: tw`bg-slate-900`,
      neutral: tw`bg-gray-300`,
      neutralLight: tw`bg-gray-100`,
      neutralLightExtra: tw`bg-gray-50`,
      selection: tw`bg-gray-100`,
      transparent: tw`bg-transparent`,
    },
    borderRadius: {
      full: tw`rounded-full`,
      medium: tw`rounded-3xl`,
      none: tw`rounded-none`,
      standard: tw`rounded-lg`,
    },
    borderTone: {
      black: tw`border-black`,
    },
    borderWidth: {
      large: tw`border-8`,
      medium: tw`border-4`,
      small: tw`border-2`,
      xsmall: tw`border`,
    },
    bottom: {
      0: tw`bottom-0`,
    },
    boxShadow: {
      large: tw`shadow-2xl`,
      medium: tw`shadow-lg`,
      none: tw`shadow-none`,
      small: tw`shadow`,
      xsmall: tw`shadow-sm`,
    },
    cursor: {
      default: tw`cursor-default`,
      pointer: tw`cursor-pointer`,
    },
    display: {
      block: tw`block`,
      contents: tw`contents`,
      flex: tw`flex`,
      grid: tw`grid`,
      inline: tw`inline`,
      inlineBlock: tw`inline-block`,
      none: tw`hidden`,
    },
    flexDirection: {
      column: tw`flex-col`,
      columnReverse: tw`flex-col-reverse`,
      row: tw`flex-row`,
      rowReverse: tw`flex-row-reverse`,
    },
    flexGrow: {
      0: tw`flex-grow-0`,
      1: tw`flex-grow`,
    },
    flexShrink: {
      0: tw`flex-shrink-0`,
    },
    flexWrap: {
      nowrap: tw`flex-nowrap`,
      wrap: tw`flex-wrap`,
    },
    gap: {
      gutter: {
        gap: "$gutter",
      },
      large: {
        gap: "$large",
      },
      medium: {
        gap: "$medium",
      },
      small: {
        gap: "$small",
      },
      xlarge: {
        gap: "$xlarge",
      },
      xsmall: {
        gap: "$xsmall",
      },
      xxsmall: {
        gap: "$xxsmall",
      },
    },
    height: {
      full: tw`h-full`,
      screen: tw`h-screen`,
      touchable: tw`h-12`,
    },
    hoverEffect: {
      true: {
        "&:hover": { transform: "translateY(-2%)", ...tw`` },
        ...tw`transition-all`,
      },
    },
    justifyContent: {
      around: tw`justify-around`,
      center: tw`justify-center`,
      evenly: tw`justify-evenly`,
      flexEnd: tw`justify-end`,
      flexStart: tw`justify-start`,
      spaceBetween: tw`justify-between`,
    },
    left: {
      0: tw`left-0`,
    },
    margin: {
      gutter: {
        margin: "$gutter",
      },
      large: {
        margin: "$large",
      },
      medium: {
        margin: "$medium",
      },
      small: {
        margin: "$small",
      },
      xlarge: {
        margin: "$xlarge",
      },
      xsmall: {
        margin: "$xsmall",
      },
      xxlarge: {
        margin: "$xxlarge",
      },
      xxsmall: {
        margin: "$xxsmall",
      },
    },
    marginBottom: {
      gutter: {
        marginBottom: "$gutter",
      },
      large: {
        marginBottom: "$large",
      },
      medium: {
        marginBottom: "$medium",
      },
      small: {
        marginBottom: "$small",
      },
      xlarge: {
        marginBottom: "$xlarge",
      },
      xsmall: {
        marginBottom: "$xsmall",
      },
    }
  },
})

type BoxProps = React.ComponentProps<typeof Box>;

export type { BoxProps };
export { Box };
