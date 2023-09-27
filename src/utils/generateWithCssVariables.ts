/**
 * Transform a json with css values into a json map of css variables
 * @param {object} obj - json object containing the values for the styles
 * @param {string} prefix - Used internally during recursion to generate the nested css variables
 * @returns object - json object containing the css variables
 */

// @ts-check

export default function generateWithCssVariables(
  obj: Record<string, string>,
  prefix: string = '',
): string | object {
  const result: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      result[key] = `var(--${prefix}${key})`
    } else {
      result[key] = generateWithCssVariables(value, `${prefix}${key}-`)
    }
  }
  return result
}
