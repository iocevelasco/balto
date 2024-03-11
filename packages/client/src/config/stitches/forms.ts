import svgToDataUri from 'mini-svg-data-uri'
import defaultTheme from 'tailwindcss/defaultTheme'
import type { TailwindConfigDefault } from 'tailwindcss/tailwind-config-default'
import type { CSS } from '.'

const [baseFontSize, { lineHeight: baseLineHeight }] = (
  defaultTheme as TailwindConfigDefault['theme']
).fontSize.base

const { borderRadius, borderWidth, spacing } = defaultTheme as TailwindConfigDefault['theme']
/**
 * This is a port of @tailwindcss/forms plugin (https://github.com/tailwindlabs/tailwindcss-forms)
 * Once twin.macro will add a "stitches" preset we will be able to delete this code and add the official plugin
 */
const forms: CSS = {
  '::-webkit-date-and-time-value': {
    minHeight: '1.5em',
  },
  '::-webkit-datetime-edit-fields-wrapper': {
    padding: '0',
  },
  '[multiple]': {
    backgroundImage: 'initial',
    backgroundPosition: 'initial',
    backgroundRepeat: 'unset',
    backgroundSize: 'initial',
    colorAdjust: 'unset',
    paddingRight: spacing[3],
  },
  "[type='checkbox']": {
    borderRadius: borderRadius['none'],
  },
  "[type='checkbox'], [type='radio']": {
    appearance: 'none',
    backgroundColor: '#fff',
    backgroundOrigin: 'border-box',
    borderColor: ({ theme }: { theme: TailwindConfigDefault['theme'] }) => ({
      gray: theme('colors.gray.600'),
    }),
    borderWidth: borderWidth['DEFAULT'],
    // color:  colors.gray[500],
    colorAdjust: 'exact',
    display: 'inline-block',
    flexShrink: '0',
    height: spacing[4],
    padding: '0',
    userSelect: 'none',
    verticalAlign: 'middle',
    width: spacing[4],
  },
  "[type='checkbox']:checked": {
    backgroundImage: `url("${svgToDataUri(
      `<svg viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"/></svg>`
    )}")`,
  },
  "[type='checkbox']:checked, [type='radio']:checked": {
    backgroundColor: `currentColor`,
    backgroundPosition: `center`,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `100% 100%`,
    borderColor: `transparent`,
  },
  "[type='checkbox']:checked:hover,[type='checkbox']:checked:focus,[type='radio']:checked:hover,[type='radio']:checked:focus":
    {
      backgroundColor: 'currentColor',
      borderColor: 'transparent',
    },
  "[type='checkbox']:focus, [type='radio']:focus": {
    //"--tw-ring-color": colors.blue[600],
    '--tw-ring-inset': 'var(--tw-empty,/*!*/ /*!*/)',
    '--tw-ring-offset-color': '#fff',
    '--tw-ring-offset-shadow': `var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)`,
    '--tw-ring-offset-width': '2px',
    '--tw-ring-shadow': `var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
    boxShadow: `var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)`,
    //outline: outline.none[0],
    //outlineOffset: outline.none[1],
  },
  "[type='checkbox']:indeterminate": {
    backgroundColor: `currentColor`,
    backgroundImage: `url("${svgToDataUri(
      `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h8"/></svg>`
    )}")`,
    backgroundPosition: `center`,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `100% 100%`,
    borderColor: `transparent`,
  },
  "[type='checkbox']:indeterminate:hover, [type='checkbox']:indeterminate:focus": {
    backgroundColor: 'currentColor',
    borderColor: 'transparent',
  },
  "[type='file']": {
    background: 'unset',
    borderColor: 'inherit',
    borderRadius: '0',
    borderWidth: '0',
    fontSize: 'unset',
    lineHeight: 'inherit',
    padding: '0',
  },
  "[type='file']:focus": {
    // outline: `1px solid ButtonText`,
    outline: `1px auto -webkit-focus-ring-color`,
  },
  "[type='radio']": {
    borderRadius: '100%',
  },
  "[type='radio']:checked": {
    backgroundImage: `url("${svgToDataUri(
      `<svg viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="3"/></svg>`
    )}")`,
  },
  "[type='text'],[type='email'],[type='url'],[type='password'],[type='number'],[type='date'],[type='datetime-local'],[type='month'],[type='search'],[type='tel'],[type='time'],[type='week'],[multiple],textarea,select":
    {
      '&:focus': {
        //"--tw-ring-color": colors.blue[600],
        '--tw-ring-inset': 'var(--tw-empty,/*!*/ /*!*/)',
        '--tw-ring-offset-color': '#fff',
        '--tw-ring-offset-shadow': `var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)`,
        '--tw-ring-offset-width': '0px',
        '--tw-ring-shadow': `var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
        //borderColor: colors.blue[600],
        boxShadow: `var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)`,
        //outline: outline.none[0],
        //outlineOffset: outline.none[1],
      },
      appearance: 'none',
      backgroundColor: '#fff',
      //borderColor: colors.gray[600],
      borderRadius: borderRadius.none,
      borderWidth: borderWidth['DEFAULT'],
      fontSize: baseFontSize,
      lineHeight: baseLineHeight,
      paddingBottom: spacing[2],
      paddingLeft: spacing[3],
      paddingRight: spacing[3],
      paddingTop: spacing[2],
    },
  'input::placeholder, textarea::placeholder': {
    //color: colors.gray[600],
    opacity: '1',
  },
  select: {
    backgroundImage: `url("${svgToDataUri(
      `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 8l4 4 4-4"/></svg>`
    )}")`,
    backgroundPosition: `right ${spacing[2]} center`,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `1.5em 1.5em`,
    colorAdjust: `exact`,
    paddingRight: spacing[10],
  },
}

export { forms }
