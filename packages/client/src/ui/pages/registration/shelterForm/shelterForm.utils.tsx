import { z } from 'zod'

export enum ShelterFormMessages {
  Title = ' Welcome to Balto, a platform dedicated to facilitating pet adoption through the participation of foundations.',
}

const defaultFormDataSchema = z.object({
  name: z.string().min(3),
  phone: z.string().min(5),
  address: z.string().optional(),
  email: z.string().email(),
  termsAndConditions: z.boolean(),
})

const formFields: Input[] = [
  {
    id: 1,
    label: 'Foundation Name:',
    inputType: 'text',
    key: 'name',
  },
  {
    id: 2,
    label: 'Mobile phone number you contacted',
    inputType: 'tel',
    key: 'phone',
    description: 'In case the adoption is finalized, we request an alternative contact',
  },
  {
    id: 3,
    label: 'Address',
    inputType: 'text',
    key: 'address',
  },
  {
    id: 4,
    label: 'Email:',
    inputType: 'email',
    key: 'email',
  },
]

interface Input {
  id: number
  label: string
  description?: string
  inputType: 'text' | 'tel' | 'email' | 'textarea' | 'radio' | 'number'
  key: 'name' | 'phone' | 'address' | 'email'
}

const defaultFormData = {
  name: '',
  phone: '',
  address: '',
  email: '',
  description: '',
  termsAndConditions: false,
}

export { defaultFormDataSchema, defaultFormData, formFields }
