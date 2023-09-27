import parsePhoneNumberFromString from 'libphonenumber-js'

export const validatePhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber) return false
  // Check if the phone number starts with a '+', if not, add it
  const normalizedPhoneNumber = phoneNumber.startsWith('+')
    ? phoneNumber
    : `+${phoneNumber}`
  const parsedNumber = parsePhoneNumberFromString(normalizedPhoneNumber)
  return !!parsedNumber?.isValid()
}
