interface Pet {
  id: number;                   // Unique identifier for the pet
  name: string;                 // Name of the pet
  species: string;              // Species of the pet (e.g., Dog, Cat, Rabbit)
  breed: string;                // Breed of the pet (e.g., Golden Retriever, Siamese, Dwarf Rabbit)
  age: number;                  // Age of the pet in years
  color: string;                // Color of the pet's fur or feathers
  sex: string;                  // Sex of the pet (e.g., Male, Female)
  location: string;             // Location where the pet is available for adoption
  image: string;                // URL to an image of the pet
  description?: string;         // Description of the pet's personality, behavior, etc.
  vaccinated?: boolean;         // Indicates whether the pet is vaccinated
  neutered?: boolean;           // Indicates whether the pet is neutered/spayed
  specialNeeds?: string;        // Any special needs or requirements of the pet
  size?: string;                // Size of the pet (e.g., Small, Medium, Large)
  weight?: string;              // Weight of the pet in pounds or kilograms
  coatLength?: string;          // Length of the pet's coat (e.g., Short, Medium, Long)
  goodWithKids?: boolean;       // Indicates whether the pet is good with children
  goodWithOtherPets?: boolean;  // Indicates whether the pet is good with other pets
  houseTrained?: boolean;       // Indicates whether the pet is house trained
  microchipped?: boolean;       // Indicates whether the pet is microchipped
  adoptionFee?: number;         // Fee required for adopting the pet
  availability?: string;        // Availability status of the pet
  rescueOrganization?: string;  // Name or ID of the rescue organization or shelter
  contactInformation?: string;  // Contact details of the person or organization handling the adoption process
  fosterHome?: boolean;         // Indicates whether the pet is in a foster home
  medicalHistory?: string;      // Information about the pet's medical history
  temperament?: string;         // Description of the pet's temperament
  exerciseNeeds?: string;       // Level of exercise and activity required for the pet
  feedingInstructions?: string; // Instructions for feeding the pet
  groomingRequirements?: string;// Information about grooming needs
  trainingHistory?: string;     // Details about the pet's training history
  licensingRequirements?: string; // Information about local licensing requirements
  video?: string;               // Link to a video showcasing the pet
}

export type { Pet }