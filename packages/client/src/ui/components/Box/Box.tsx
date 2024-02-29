import tw from "twin.macro";
import { styled } from "../../../config/stitches";

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
      caution: tw`bg-caution-400`,
      cautionLight: tw`bg-caution-100`,
      critical: tw`bg-critical-600`,
      criticalActive: tw`bg-critical-700`,
      criticalHover: tw`bg-critical-500`,
      criticalLight: tw`bg-critical-100`,
      formAccent: tw`bg-info-700`,
      formAccentActive: tw`bg-info-800`,
      formAccentDisabled: tw`bg-gray-300`,
      formAccentHover: tw`bg-info-600`,
      image: {
        "&": {
          position: "relative",
          zIndex: 0,
        },
        // We use the last-child because cypress will consider that the background
        // is "hidding" the actual content
        "& > :last-child": {
          bottom: 0,
          // Set container height/width to allow TwicPics to guess the image size context
          left: 0,
          position: "absolute",
          right: 0,
          top: 0,
          width: "100%",
          // Take the same zIndex as the current box
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
      positive: tw`bg-positive-500`,
      positiveLight: tw`bg-positive-100`,
      promote: tw`bg-promote-500`,
      promoteLight: tw`bg-promote-200`,
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
      brandAccent: tw`border-emerald-500`,
      caution: tw`border-caution-500`,
      critical: tw`border-critical-500`,
      formAccent: tw`border-info-700`,
      info: tw`border-info-400`,
      link: tw`border-info-700 cursor-pointer`,
      neutral: tw`border-neutral-500`,
      positive: tw`border-positive-500`,
      promote: tw`border-promote-500`,
      secondary: tw`border-gray-500`,
      white: tw`border-white`,
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
      xxlarge: {
        marginBottom: "$xxlarge",
      },
      xxsmall: {
        marginBottom: "$xxsmall",
      },
    },
    marginLeft: {
      gutter: {
        marginLeft: "$gutter",
      },
      large: {
        marginLeft: "$large",
      },
      medium: {
        marginLeft: "$medium",
      },
      small: {
        marginLeft: "$small",
      },
      xlarge: {
        marginLeft: "$xlarge",
      },
      xsmall: {
        marginLeft: "$xsmall",
      },
      xxlarge: {
        marginLeft: "$xxlarge",
      },
      xxsmall: {
        marginLeft: "$xxsmall",
      },
    },
    marginRight: {
      gutter: {
        marginRight: "$gutter",
      },
      large: {
        marginRight: "$large",
      },
      medium: {
        marginRight: "$medium",
      },
      small: {
        marginRight: "$small",
      },
      xlarge: {
        marginRight: "$xlarge",
      },
      xsmall: {
        marginRight: "$xsmall",
      },
      xxlarge: {
        marginRight: "$xxlarge",
      },
      xxsmall: {
        marginRight: "$xxsmall",
      },
    },
    marginTop: {
      gutter: {
        marginTop: "$gutter",
      },
      large: {
        marginTop: "$large",
      },
      medium: {
        marginTop: "$medium",
      },
      small: {
        marginTop: "$small",
      },
      xlarge: {
        marginTop: "$xlarge",
      },
      xsmall: {
        marginTop: "$xsmall",
      },
      xxlarge: {
        marginTop: "$xxlarge",
      },
      xxsmall: {
        marginTop: "$xxsmall",
      },
    },
    marginX: {
      gutter: {
        marginX: "$gutter",
      },
      large: {
        marginX: "$large",
      },
      medium: {
        marginX: "$medium",
      },
      small: {
        marginX: "$small",
      },
      xlarge: {
        marginX: "$xlarge",
      },
      xsmall: {
        marginX: "$xsmall",
      },
      xxlarge: {
        marginX: "$xxlarge",
      },
      xxsmall: {
        marginX: "$xxsmall",
      },
    },
    marginY: {
      gutter: {
        marginY: "$gutter",
      },
      large: {
        marginY: "$large",
      },
      medium: {
        marginY: "$medium",
      },
      small: {
        marginY: "$small",
      },
      xlarge: {
        marginY: "$xlarge",
      },
      xsmall: {
        marginY: "$xsmall",
      },
      xxlarge: {
        marginY: "$xxlarge",
      },
      xxsmall: {
        marginY: "$xxsmall",
      },
    },
    maxWidth: {
      large: tw`max-w-7xl`,
      medium: tw`max-w-4xl`,
      small: tw`max-w-2xl`,
      xsmall: tw`max-w-md`,
      xxsmall: tw`max-w-sm`,
    },
    minWidth: {
      0: tw`min-w-0`,
    },
    opacity: {
      0: tw`opacity-0`,
    },
    outline: {
      none: tw`outline-none`,
    },
    overflow: {
      auto: tw`overflow-auto`,
      hidden: tw`overflow-hidden`,
      scroll: tw`overflow-scroll`,
      visible: tw`overflow-visible`,
    },
    overflowX: {
      auto: tw`overflow-x-auto`,
    },
    overflowY: {
      auto: tw`overflow-y-auto`,
    },
    padding: {
      gutter: {
        padding: "$gutter",
      },
      large: {
        padding: "$large",
      },
      medium: {
        padding: "$medium",
      },
      small: {
        padding: "$small",
      },
      xlarge: {
        padding: "$xlarge",
      },
      xsmall: {
        padding: "$xsmall",
      },
      xxlarge: {
        padding: "$xxlarge",
      },
      xxsmall: {
        padding: "$xxsmall",
      },
    },
    paddingBottom: {
      gutter: {
        paddingBottom: "$gutter",
      },
      large: {
        paddingBottom: "$large",
      },
      medium: {
        paddingBottom: "$medium",
      },
      small: {
        paddingBottom: "$small",
      },
      xlarge: {
        paddingBottom: "$xlarge",
      },
      xsmall: {
        paddingBottom: "$xsmall",
      },
      xxlarge: {
        paddingBottom: "$xxlarge",
      },
      xxsmall: {
        paddingBottom: "$xxsmall",
      },
    },
    paddingLeft: {
      gutter: {
        paddingLeft: "$gutter",
      },
      large: {
        paddingLeft: "$large",
      },
      medium: {
        paddingLeft: "$medium",
      },
      small: {
        paddingLeft: "$small",
      },
      xlarge: {
        paddingLeft: "$xlarge",
      },
      xsmall: {
        paddingLeft: "$xsmall",
      },
      xxlarge: {
        paddingLeft: "$xxlarge",
      },
      xxsmall: {
        paddingLeft: "$xxsmall",
      },
    },
    paddingRight: {
      gutter: {
        paddingRight: "$gutter",
      },
      large: {
        paddingRight: "$large",
      },
      medium: {
        paddingRight: "$medium",
      },
      small: {
        paddingRight: "$small",
      },
      xlarge: {
        paddingRight: "$xlarge",
      },
      xsmall: {
        paddingRight: "$xsmall",
      },
      xxlarge: {
        paddingRight: "$xxlarge",
      },
      xxsmall: {
        paddingRight: "$xxsmall",
      },
    },
    paddingTop: {
      gutter: {
        paddingTop: "$gutter",
      },
      large: {
        paddingTop: "$large",
      },
      medium: {
        paddingTop: "$medium",
      },
      safe: {
        paddingTop: "env(safe-area-inset-top)",
      },
      small: {
        paddingTop: "$small",
      },
      xlarge: {
        paddingTop: "$xlarge",
      },
      xsmall: {
        paddingTop: "$xsmall",
      },
      xxlarge: {
        paddingTop: "$xxlarge",
      },
      xxsmall: {
        paddingTop: "$xxsmall",
      },
    },
    paddingX: {
      gutter: {
        paddingLeft: "$gutter",
        paddingRight: "$gutter",
      },
      large: {
        paddingLeft: "$large",
        paddingRight: "$large",
      },
      medium: {
        paddingLeft: "$medium",
        paddingRight: "$medium",
      },
      small: {
        paddingLeft: "$small",
        paddingRight: "$small",
      },
      xlarge: {
        paddingLeft: "$xlarge",
        paddingRight: "$xlarge",
      },
      xsmall: {
        paddingLeft: "$xsmall",
        paddingRight: "$xsmall",
      },
      xxlarge: {
        paddingLeft: "$xxlarge",
        paddingRight: "$xxlarge",
      },
      xxsmall: {
        paddingLeft: "$xxsmall",
        paddingRight: "$xxsmall",
      },
    },
    paddingY: {
      gutter: {
        paddingBottom: "$gutter",
        paddingTop: "$gutter",
      },
      large: {
        paddingBottom: "$large",
        paddingTop: "$large",
      },
      medium: {
        paddingBottom: "$medium",
        paddingTop: "$medium",
      },
      small: {
        paddingBottom: "$small",
        paddingTop: "$small",
      },
      xlarge: {
        paddingBottom: "$xlarge",
        paddingTop: "$xlarge",
      },
      xsmall: {
        paddingBottom: "$xsmall",
        paddingTop: "$xsmall",
      },
      xxlarge: {
        paddingBottom: "$xxlarge",
        paddingTop: "$xxlarge",
      },
      xxsmall: {
        paddingBottom: "$xxsmall",
        paddingTop: "$xxsmall",
      },
    },
    pointerEvents: {
      none: tw`pointer-events-none`,
    },
    position: {
      absolute: tw`absolute`,
      fixed: tw`fixed`,
      relative: tw`relative`,
      sticky: tw`sticky`,
    },
    right: {
      0: tw`right-0`,
    },
    textAlign: {
      center: tw`text-center`,
      left: tw`text-left`,
      right: tw`text-right`,
    },
    top: {
      0: tw`top-0`,
    },
    userSelect: {
      none: tw`select-none`,
    },
    width: {
      auto: tw`w-auto`,
      full: tw`w-full`,
      modal: tw`w-96`,
      screen: tw`w-screen`,
      touchable: tw`w-12`,
    },
    zIndex: {
      0: tw`z-0`,
      1: tw`z-1`,
      2: tw`z-2`,
      dropdown: tw`z-100`,
      dropdownBackdrop: tw`z-90`,
      modal: tw`z-300`,
      modalBackdrop: tw`z-290`,
      notification: tw`z-400`,
      sticky: tw`z-200`,
    },
  },
});

type BoxProps = React.ComponentProps<typeof Box>;

export type { BoxProps };
export { Box };
