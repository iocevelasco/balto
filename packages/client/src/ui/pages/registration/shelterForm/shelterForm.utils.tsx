import { z } from 'zod'

const defaultFormDataSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  phone: z.string().min(5),
  address: z.string().optional(),
  email: z.string().email().optional(),
})

const formFields: Input[] = [
  {
    id: 1,
    label: 'Name:',
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
  {
    id: 5,
    label: 'Description',
    inputType: 'textarea',
    key: 'description',
    description: "Specify where you work and how long you've been there",
  },
]

interface Input {
  id: number
  label: string
  description?: string
  inputType: 'text' | 'tel' | 'email' | 'textarea' | 'radio' | 'number'
  key: 'name' | 'phone' | 'address' | 'email' | 'description'
}

const defaultFormData = {
  name: '',
  phone: '',
  address: '',
  email: '',
  description: '',
}

export { defaultFormDataSchema, defaultFormData, formFields }
