import { z } from 'zod'

enum RadioOptions {
  YES = 'yes',
  NO = 'no',
}
const radioSchema = z
  .enum([RadioOptions.YES, RadioOptions.NO], {
    required_error: 'You need to select a notification type.',
  })
  .optional()

const defaultFormDataSchema = z.object({
  nameLastName: z.string().min(3),
  contactNumber: z.string().min(5),
  address: z.string().optional(),
  email: z.string().email().optional(),
  occupation: z.string().optional(),
  agesOfMembers: z.string().optional(),
  hadPets: radioSchema,
  givenUpPetForAdoption: radioSchema,
  currentPets: z.string().optional(),
  neuteredOrSpayed: radioSchema,
  timeSpentByPets: z.string().optional(),
  hoursWithoutHumanCompany: z.string().optional(),
  sleepingLocationOfPet: z.string().optional(),
  residenceType: z.string().optional(),
  ownershipStatus: radioSchema,
  outdoorSpace: radioSchema,
  securelyEnclosedSpace: radioSchema,
  petPolicyOfBuilding: radioSchema,
  plansForDogWhenMoving: z.string().optional(),
  plansForDogWhenMovingToNonDogFriendlyPlace: z.string().optional(),
  puppyNeuteringSpayingAgreement: radioSchema,
  plansIfFuturePartnerDislikesDogs: z.string().optional(),
  plansForDogWhenHavingChildren: z.string().optional(),
  firstApproachToShelter: radioSchema,
  householdAgreementOnAdoption: radioSchema,
})

const formFields: Input[] = [
  {
    id: 1,
    label: 'Name and Last Name:',
    inputType: 'text',
    key: 'nameLastName',
  },
  {
    id: 2,
    label: 'Mobile phone number you contacted',
    inputType: 'tel',
    key: 'contactNumber',
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
    label: 'What do you do for a living?',
    inputType: 'textarea',
    key: 'occupation',
    description: "Specify where you work and how long you've been there",
  },
  {
    id: 6,
    label: 'Starting with yours, what is the age of each member?',
    inputType: 'text',
    key: 'agesOfMembers',
  },
  {
    id: 7,
    label: 'Have you had pets throughout your life?',
    inputType: 'radio',
    key: 'hadPets',
  },
  {
    id: 8,
    label: 'Have you ever had to give a pet up for adoption?',
    inputType: 'radio',
    key: 'givenUpPetForAdoption',
  },
  {
    id: 9,
    label: 'What animals do you currently have?',
    inputType: 'textarea',
    key: 'currentPets',
    description: 'Write species and quantity',
  },
  {
    id: 10,
    label: 'Are they neutered/spayed?',
    inputType: 'radio',
    key: 'neuteredOrSpayed',
  },
  {
    id: 11,
    label: 'Where do they spend most of their time?',
    inputType: 'textarea',
    key: 'timeSpentByPets',
  },
  {
    id: 12,
    label: 'How many hours would your new little animal be without human company?',
    inputType: 'text',
    key: 'hoursWithoutHumanCompany',
  },
  {
    id: 13,
    label: 'Where in the house will it sleep?',
    inputType: 'textarea',
    key: 'sleepingLocationOfPet',
  },
  {
    id: 14,
    label: 'Do you live in a house or an apartment?',
    inputType: 'text',
    key: 'residenceType',
  },
  {
    id: 15,
    label: 'Are you an owner or a renter?',
    inputType: 'radio',
    key: 'ownershipStatus',
  },
  {
    id: 16,
    label: 'Does your home have any outdoor space?',
    inputType: 'radio',
    key: 'outdoorSpace',
  },
  {
    id: 17,
    label: 'If you have that space, is it securely enclosed?',
    inputType: 'radio',
    key: 'securelyEnclosedSpace',
  },
  {
    id: 18,
    label: 'If you live in an apartment, are you aware if the building administration allows pets?',
    inputType: 'radio',
    key: 'petPolicyOfBuilding',
  },
  {
    id: 19,
    label:
      'What would you do with your dog if you move to a different neighborhood/province/country?',
    inputType: 'textarea',
    key: 'plansForDogWhenMoving',
  },
  {
    id: 20,
    label: "If you rent and move, and your new home doesn't accept dogs, what would you do?",
    inputType: 'textarea',
    key: 'plansForDogWhenMovingToNonDogFriendlyPlace',
  },
  {
    id: 21,
    label:
      'If you adopt a puppy, do you agree to neuter/spay it at 6 months? Do you accept follow-up? Do you know what it entails?',
    inputType: 'radio',
    key: 'puppyNeuteringSpayingAgreement',
  },
  {
    id: 22,
    label:
      "If you are single and in the future you form a couple, what would happen to the pet if that person doesn't like dogs?",
    inputType: 'textarea',
    key: 'plansIfFuturePartnerDislikesDogs',
  },
  {
    id: 23,
    label:
      "If you don't have human children, but you want to have them someday, have you thought about how you would handle your dog in the case of a baby's birth?",
    inputType: 'textarea',
    key: 'plansForDogWhenHavingChildren',
  },
  {
    id: 24,
    label: 'Is this your first approach to a shelter for adoption?',
    inputType: 'radio',
    key: 'firstApproachToShelter',
  },
  {
    id: 25,
    label: 'Are all those who live in the house in agreement with this decision?',
    inputType: 'radio',
    key: 'householdAgreementOnAdoption',
  },
]

interface Input {
  id: number
  label: string
  description?: string
  inputType: 'text' | 'tel' | 'email' | 'textarea' | 'radio' | 'number'
  key:
    | 'nameLastName'
    | 'contactNumber'
    | 'address'
    | 'email'
    | 'occupation'
    | 'agesOfMembers'
    | 'hadPets'
    | 'givenUpPetForAdoption'
    | 'currentPets'
    | 'neuteredOrSpayed'
    | 'timeSpentByPets'
    | 'hoursWithoutHumanCompany'
    | 'sleepingLocationOfPet'
    | 'residenceType'
    | 'ownershipStatus'
    | 'outdoorSpace'
    | 'securelyEnclosedSpace'
    | 'petPolicyOfBuilding'
    | 'plansForDogWhenMoving'
    | 'plansForDogWhenMovingToNonDogFriendlyPlace'
    | 'puppyNeuteringSpayingAgreement'
    | 'plansIfFuturePartnerDislikesDogs'
    | 'plansForDogWhenHavingChildren'
    | 'firstApproachToShelter'
    | 'householdAgreementOnAdoption'
}

const defaultFormData = {
  nameLastName: '',
  contactNumber: '',
  address: '',
  email: '',
  occupation: '',
  agesOfMembers: '',
  hadPets: 'no' as RadioOptions,
  givenUpPetForAdoption: 'no' as RadioOptions,
  currentPets: '',
  neuteredOrSpayed: 'no' as RadioOptions,
  timeSpentByPets: '',
  hoursWithoutHumanCompany: '',
  sleepingLocationOfPet: '',
  residenceType: '',
  ownershipStatus: 'no' as RadioOptions,
  outdoorSpace: 'no' as RadioOptions,
  securelyEnclosedSpace: 'no' as RadioOptions,
  petPolicyOfBuilding: 'no' as RadioOptions,
  plansForDogWhenMoving: '',
  plansForDogWhenMovingToNonDogFriendlyPlace: '',
  puppyNeuteringSpayingAgreement: 'no' as RadioOptions,
  plansIfFuturePartnerDislikesDogs: '',
  plansForDogWhenHavingChildren: '',
  firstApproachToShelter: 'no' as RadioOptions,
  householdAgreementOnAdoption: 'no' as RadioOptions,
}

export { defaultFormDataSchema, defaultFormData, formFields }
