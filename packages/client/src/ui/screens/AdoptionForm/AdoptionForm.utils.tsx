import { z } from 'zod'

const FormSchema = z.object({
  nameLastName: z.string({
    required_error: 'Name and Last Name is required',
    invalid_type_error: 'Name and Last Name must be a string',
  }),
  contactNumber: z.string({
    required_error: 'Mobile phone number is required',
    invalid_type_error: 'Mobile phone number must be a string',
  }),
  address: z.string({
    required_error: 'Address is required',
    invalid_type_error: 'Address must be a string',
  }),
  city: z.string({
    required_error: 'City is required',
    invalid_type_error: 'City must be a string',
  }),
  socialMediaEmail: z.string({
    required_error: 'Social media username or email is required',
    invalid_type_error: 'Social media username or email must be a string',
  }),
  occupation: z.string({
    required_error: 'Occupation details are required',
    invalid_type_error: 'Occupation details must be a string',
  }),
  agesOfMembers: z.string({
    required_error: 'Ages of members are required',
    invalid_type_error: 'Ages of members must be a string',
  }),
  olderPersonAtHome: z.boolean().optional(),
  allergicToAnimalFur: z.boolean().optional(),
  allergicPersonAgreeAdoption: z.boolean().optional(),
  hadPets: z.boolean().optional(),
  givenUpPetForAdoption: z.boolean().optional(),
  currentPets: z.string({
    required_error: 'Information about current pets is required',
    invalid_type_error: 'Information about current pets must be a string',
  }),
  sleepingLocationOfPets: z.string({
    required_error: 'Sleeping location of pets is required',
    invalid_type_error: 'Sleeping location of pets must be a string',
  }),
  neuteredOrSpayed: z.boolean().optional(),
  timeSpentByPets: z.string({
    required_error: 'Information about time spent by pets is required',
    invalid_type_error: 'Information about time spent by pets must be a string',
  }),
  petFoodBrand: z.string({
    required_error: 'Pet food brand is required',
    invalid_type_error: 'Pet food brand must be a string',
  }),
  consultedAnimalName: z.string({
    required_error: 'Consulted animal name is required',
    invalid_type_error: 'Consulted animal name must be a string',
  }),
  hoursWithoutHumanCompany: z.string({
    required_error: 'Hours without human company is required',
    invalid_type_error: 'Hours without human company must be a string',
  }),
  expectedLocationOfPet: z.string({
    required_error: 'Expected location of pet is required',
    invalid_type_error: 'Expected location of pet must be a string',
  }),
  sleepingLocationOfPet: z.string({
    required_error: 'Sleeping location of pet is required',
    invalid_type_error: 'Sleeping location of pet must be a string',
  }),
  plannedPetFoodBrand: z.string({
    required_error: 'Planned pet food brand is required',
    invalid_type_error: 'Planned pet food brand must be a string',
  }),
  walkingMethod: z.string({
    required_error: 'Walking method is required',
    invalid_type_error: 'Walking method must be a string',
  }),
  residenceType: z.boolean().optional(),
  ownershipStatus: z.boolean().optional(),
  outdoorSpace: z.boolean().optional(),
  securelyEnclosedSpace: z.boolean().optional(),
  poolStatus: z.boolean().optional(),
  petPolicyOfBuilding: z.boolean().optional(),
  plansForDogWhenMoving: z.string({
    required_error: 'Plans for dog when moving is required',
    invalid_type_error: 'Plans for dog when moving must be a string',
  }),
  plansForDogWhenMovingToNonDogFriendlyPlace: z.string({
    required_error: 'Plans for dog when moving to a non-dog-friendly place is required',
    invalid_type_error: 'Plans for dog when moving to a non-dog-friendly place must be a string',
  }),
  puppyNeuteringSpayingAgreement: z.boolean().optional(),
  plansIfFuturePartnerDislikesDogs: z.string({
    required_error: 'Plans if future partner dislikes dogs is required',
    invalid_type_error: 'Plans if future partner dislikes dogs must be a string',
  }),
  plansForDogWhenHavingChildren: z.string({
    required_error: 'Plans for dog when having children is required',
    invalid_type_error: 'Plans for dog when having children must be a string',
  }),
  firstApproachToShelter: z.boolean().optional(),
  reasonForAdoption: z.string({
    required_error: 'Reason for adoption is required',
    invalid_type_error: 'Reason for adoption must be a string',
  }),
  householdAgreementOnAdoption: z.boolean().optional(),
  preferencesForNextAdoption: z.string({
    required_error: 'Preferences for next adoption is required',
    invalid_type_error: 'Preferences for next adoption must be a string',
  }),
  willingnessToSendPhotos: z.boolean().optional(),
  willingnessToCollaborateOnExpenses: z.boolean().optional(),
  additionalComments: z.string({
    required_error: 'Additional comments are required',
    invalid_type_error: 'Additional comments must be a string',
  }),
})

const defaultFormData = {
  nameLastName: '',
  contactNumber: '',
  address: '',
  city: '',
  socialMediaEmail: '',
  occupation: '',
  agesOfMembers: '',
  olderPersonAtHome: false,
  allergicToAnimalFur: false,
  allergicPersonAgreeAdoption: false,
  hadPets: false,
  givenUpPetForAdoption: false,
  currentPets: '',
  sleepingLocationOfPets: '',
  neuteredOrSpayed: false,
  timeSpentByPets: '',
  petFoodBrand: '',
  consultedAnimalName: '',
  hoursWithoutHumanCompany: '',
  expectedLocationOfPet: '',
  sleepingLocationOfPet: '',
  plannedPetFoodBrand: '',
  walkingMethod: '',
  residenceType: false,
  ownershipStatus: false,
  outdoorSpace: false,
  securelyEnclosedSpace: false,
  poolStatus: false,
  petPolicyOfBuilding: false,
  plansForDogWhenMoving: '',
  plansForDogWhenMovingToNonDogFriendlyPlace: '',
  puppyNeuteringSpayingAgreement: false,
  plansIfFuturePartnerDislikesDogs: '',
  plansForDogWhenHavingChildren: '',
  firstApproachToShelter: false,
  reasonForAdoption: '',
  householdAgreementOnAdoption: false,
  preferencesForNextAdoption: '',
  willingnessToSendPhotos: false,
  willingnessToCollaborateOnExpenses: false,
  additionalComments: '',
}

const formData = {
  inputs: [
    {
      id: 1,
      label: 'Name and Last Name:',
      inputType: 'text',
      key: 'nameLastName',
    },
    {
      id: 2,
      label:
        'Mobile phone number you contacted from: In case the adoption is finalized, we request an alternative contact:',
      inputType: 'tel',
      key: 'contactNumber',
    },
    {
      id: 3,
      label: 'Address',
      inputType: 'text',
      key: 'address',
    },
    {
      id: 4,
      label: 'City',
      inputType: 'text',
      key: 'city',
    },
    {
      id: 5,
      label: 'Email:',
      inputType: 'email',
      key: 'socialMediaEmail',
    },
    {
      id: 6,
      label: "What do you do for a living? Specify where you work and how long you've been there",
      inputType: 'textarea',
      key: 'occupation',
    },
    {
      id: 7,
      label: 'Starting with yours, what is the age of each member?',
      inputType: 'text',
      key: 'agesOfMembers',
    },
    {
      id: 8,
      label: 'If you work outside, is there someone older at home during the day?',
      inputType: 'radio',
      key: 'olderPersonAtHome',
    },
    {
      id: 9,
      label: 'Is anyone in your home allergic to animal fur?',
      inputType: 'radio',
      key: 'allergicToAnimalFur',
    },
    {
      id: 10,
      label: 'Did the allergic person(s) agree with the adoption decision?',
      inputType: 'radio',
      key: 'allergicPersonAgreeAdoption',
    },
    {
      id: 11,
      label: 'Have you had pets throughout your life?',
      inputType: 'radio',
      key: 'hadPets',
    },
    {
      id: 12,
      label: 'Have you ever had to give a pet up for adoption?',
      inputType: 'radio',
      key: 'givenUpPetForAdoption',
    },
    {
      id: 13,
      label: 'What animals do you currently have? Write species and quantity',
      inputType: 'textarea',
      key: 'currentPets',
    },
    {
      id: 14,
      label: 'Where do they sleep in the house?',
      inputType: 'textarea',
      key: 'sleepingLocationOfPets',
    },
    {
      id: 15,
      label: 'Are they neutered/spayed?',
      inputType: 'radio',
      key: 'neuteredOrSpayed',
    },
    {
      id: 16,
      label: 'Where do they spend most of their time?',
      inputType: 'textarea',
      key: 'timeSpentByPets',
    },
    {
      id: 17,
      label: 'What brand of balanced food do they consume?',
      inputType: 'text',
      key: 'petFoodBrand',
    },
    {
      id: 18,
      label: 'Name of the little animal you consulted about',
      inputType: 'text',
      key: 'consultedAnimalName',
    },
    {
      id: 19,
      label: 'How many hours would your new little animal be without human company?',
      inputType: 'text',
      key: 'hoursWithoutHumanCompany',
    },
    {
      id: 20,
      label: 'Where in the house do you expect it to stay for longer periods?',
      inputType: 'textarea',
      key: 'expectedLocationOfPet',
    },
    {
      id: 21,
      label: 'Where in the house will it sleep?',
      inputType: 'textarea',
      key: 'sleepingLocationOfPet',
    },
    {
      id: 22,
      label: 'What brand of balanced food will you give it?',
      inputType: 'text',
      key: 'plannedPetFoodBrand',
    },
    {
      id: 23,
      label: 'How would you walk them?',
      inputType: 'textarea',
      key: 'walkingMethod',
    },
    {
      id: 24,
      label: 'Do you live in a house or an apartment?',
      inputType: 'radio',
      key: 'residenceType',
    },
    {
      id: 25,
      label: 'Are you an owner or a renter?',
      inputType: 'radio',
      key: 'ownershipStatus',
    },
    {
      id: 26,
      label: 'Does your home have any outdoor space?',
      inputType: 'radio',
      key: 'outdoorSpace',
    },
    {
      id: 27,
      label: 'If you have that space, is it securely enclosed?',
      inputType: 'radio',
      key: 'securelyEnclosedSpace',
    },
    {
      id: 28,
      label: 'Do you have a pool? With or without protection?',
      inputType: 'radio',
      key: 'poolStatus',
    },
    {
      id: 29,
      label:
        'If you live in an apartment, are you aware if the building administration allows pets?',
      inputType: 'radio',
      key: 'petPolicyOfBuilding',
    },
    {
      id: 30,
      label:
        'What would you do with your dog if you move to a different neighborhood/province/country?',
      inputType: 'textarea',
      key: 'plansForDogWhenMoving',
    },
    {
      id: 31,
      label: "If you rent and move, and your new home doesn't accept dogs, what would you do?",
      inputType: 'textarea',
      key: 'plansForDogWhenMovingToNonDogFriendlyPlace',
    },
    {
      id: 32,
      label:
        'If you adopt a puppy, do you agree to neuter/spay it at 6 months? Do you accept follow-up? Do you know what it entails?',
      inputType: 'radio',
      key: 'puppyNeuteringSpayingAgreement',
    },
    {
      id: 33,
      label:
        "If you are single and in the future you form a couple, what would happen to the pet if that person doesn't like dogs?",
      inputType: 'textarea',
      key: 'plansIfFuturePartnerDislikesDogs',
    },
    {
      id: 34,
      label:
        "If you don't have human children, but you want to have them someday, have you thought about how you would handle your dog in the case of a baby's birth?",
      inputType: 'textarea',
      key: 'plansForDogWhenHavingChildren',
    },
    {
      id: 35,
      label: 'Is this your first approach to a shelter for adoption?',
      inputType: 'radio',
      key: 'firstApproachToShelter',
    },
    {
      id: 36,
      label: 'Do you adopt by personal decision or has someone requested it? Who requested it?',
      inputType: 'textarea',
      key: 'reasonForAdoption',
    },
    {
      id: 37,
      label: 'Are all those who live in the house in agreement with this decision?',
      inputType: 'radio',
      key: 'householdAgreementOnAdoption',
    },
    {
      id: 38,
      label:
        'In case you have chosen an animal and it is adopted by another family, but you are interested in adopting another one, answer the following question and we will consider it for future rescues. What sex, temperament, and size (detail weight limit) of dog are you interested in?',
      inputType: 'textarea',
      key: 'preferencesForNextAdoption',
    },
    {
      id: 39,
      label:
        'Are you willing to send photos of the perimeter of the house, terrace, balcony, and your current pets?',
      inputType: 'radio',
      key: 'willingnessToSendPhotos',
    },
    {
      id: 40,
      label:
        'For consideration: Would you collaborate with some of the expenses generated by your potential adoptee? For example, vaccine in puppies (today $2000, quintuple or sextuple), neutering in adults (today $4000), and if transportation is required, a donation of what you can afford (we are from Zárate). Could you cover these expenses? We do everything from the heart, we have a great need, and we value the help you can give us.',
      inputType: 'radio',
      key: 'willingnessToCollaborateOnExpenses',
    },
    {
      id: 41,
      label: 'Any additional comments to add?',
      inputType: 'textarea',
      key: 'additionalComments',
    },
  ],
} as const

interface FormDataType {
  [key: string]: string
}

export { FormSchema, defaultFormData, formData }
export type { FormDataType }
