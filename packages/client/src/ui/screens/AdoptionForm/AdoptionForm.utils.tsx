import * as yup from 'yup'

const schema = yup.object().shape({
  name_last_name: yup.string().required('Name and Last Name is required'),
  contact_number: yup.string().required('Mobile phone number is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  social_media_email: yup.string().required('Social media username or email is required'),
  occupation: yup.string().required('Occupation details are required'),
  ages_of_members: yup.string().required('Ages of members are required'),
  older_person_at_home: yup
    .boolean()
    .required('Information about older person at home is required'),
  allergic_to_animal_fur: yup.boolean().required('Information about allergies is required'),
  allergic_person_agree_adoption: yup.boolean().required('Allergic person agreement is required'),
  had_pets: yup.boolean().required('Information about previous pets is required'),
  given_up_pet_for_adoption: yup.boolean().required('Information about giving up pets is required'),
  current_pets: yup.string().required('Information about current pets is required'),
  sleeping_location_of_pets: yup.string().required('Sleeping location of pets is required'),
  neutered_or_spayed: yup.boolean().required('Information about neutering/spaying is required'),
  time_spent_by_pets: yup.string().required('Information about time spent by pets is required'),
  pet_food_brand: yup.string().required('Pet food brand is required'),
  consulted_animal_name: yup.string().required('Consulted animal name is required'),
  hours_without_human_company: yup.string().required('Hours without human company is required'),
  expected_location_of_pet: yup.string().required('Expected location of pet is required'),
  sleeping_location_of_pet: yup.string().required('Sleeping location of pet is required'),
  planned_pet_food_brand: yup.string().required('Planned pet food brand is required'),
  walking_method: yup.string().required('Walking method is required'),
  residence_type: yup.boolean().required('Residence type is required'),
  ownership_status: yup.boolean().required('Ownership status is required'),
  outdoor_space: yup.boolean().required('Information about outdoor space is required'),
  securely_enclosed_space: yup
    .boolean()
    .required('Information about securely enclosed space is required'),
  pool_status: yup.boolean().required('Information about pool status is required'),
  pet_policy_of_building: yup
    .boolean()
    .required('Information about pet policy of building is required'),
  plans_for_dog_when_moving: yup.string().required('Plans for dog when moving is required'),
  plans_for_dog_when_moving_to_non_dog_friendly_place: yup
    .string()
    .required('Plans for dog when moving to a non-dog-friendly place is required'),
  puppy_neutering_spaying_agreement: yup
    .boolean()
    .required('Information about puppy neutering/spaying agreement is required'),
  plans_if_future_partner_dislikes_dogs: yup
    .string()
    .required('Plans if future partner dislikes dogs is required'),
  plans_for_dog_when_having_children: yup
    .string()
    .required('Plans for dog when having children is required'),
  first_approach_to_shelter: yup
    .boolean()
    .required('Information about first approach to shelter is required'),
  reason_for_adoption: yup.string().required('Reason for adoption is required'),
  household_agreement_on_adoption: yup
    .boolean()
    .required('Household agreement on adoption is required'),
  preferences_for_next_adoption: yup.string().required('Preferences for next adoption is required'),
  willingness_to_send_photos: yup.boolean().required('Willingness to send photos is required'),
  willingness_to_collaborate_on_expenses: yup
    .boolean()
    .required('Willingness to collaborate on expenses is required'),
  additional_comments: yup.string().required('Additional comments are required'),
})

interface FormDataType {
  [key: string]: string
}

export { schema }
export type { FormDataType }
