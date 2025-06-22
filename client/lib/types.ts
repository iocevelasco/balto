// Tipos de usuario
export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'shelter' | 'admin';
  profile?: UserProfile;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  preferences?: {
    petTypes: string[];
    sizes: string[];
    ages: string[];
  };
  avatar?: string;
  bio?: string;
}

// Tipos de mascota
export interface Pet {
  _id: string;
  name: string;
  species: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';
  breed: string;
  age: number;
  size: 'small' | 'medium' | 'large' | 'extra-large';
  gender: 'male' | 'female';
  color: string;
  description: string;
  personality: string[];
  healthInfo: {
    vaccinated: boolean;
    spayedNeutered: boolean;
    microchipped: boolean;
    specialNeeds?: string;
    medicalHistory?: string;
  };
  images: string[];
  status: 'available' | 'pending' | 'adopted' | 'not-available';
  shelter: string | Shelter;
  location: {
    city: string;
    state: string;
    country: string;
  };
  adoptionFee: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// Tipos de refugio
export interface Shelter {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  description: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  verified: boolean;
  rating: number;
  totalReviews: number;
  images: string[];
  operatingHours: {
    [key: string]: {
      open: string;
      close: string;
      closed: boolean;
    };
  };
  createdAt: string;
  updatedAt: string;
}

// Tipos de adopción
export interface Adoption {
  _id: string;
  pet: string | Pet;
  adopter: string | User;
  shelter: string | Shelter;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  applicationData: {
    experience: string;
    livingSpace: string;
    otherPets: boolean;
    children: boolean;
    workSchedule: string;
    reason: string;
    references?: {
      name: string;
      phone: string;
      relationship: string;
    }[];
  };
  notes?: string;
  scheduledVisit?: {
    date: string;
    time: string;
    location: string;
  };
  adoptionDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Tipos de favoritos
export interface Favorite {
  _id: string;
  user: string | User;
  pet: string | Pet;
  createdAt: string;
}

// Tipos de autenticación
export interface AuthUser {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: 'user' | 'shelter';
}

// Tipos para filtros y búsqueda
export interface PetFilters {
  species?: string[];
  breed?: string;
  age?: {
    min?: number;
    max?: number;
  };
  size?: string[];
  gender?: string;
  location?: {
    city?: string;
    state?: string;
    radius?: number;
  };
  adoptionFee?: {
    min?: number;
    max?: number;
  };
  healthInfo?: {
    vaccinated?: boolean;
    spayedNeutered?: boolean;
    microchipped?: boolean;
  };
  personality?: string[];
  featured?: boolean;
}

export interface SearchParams {
  query?: string;
  filters?: PetFilters;
  sort?: 'newest' | 'oldest' | 'name' | 'age' | 'fee-low' | 'fee-high';
  page?: number;
  limit?: number;
}

// Tipos para formularios
export interface PetFormData {
  name: string;
  species: Pet['species'];
  breed: string;
  age: number;
  size: Pet['size'];
  gender: Pet['gender'];
  color: string;
  description: string;
  personality: string[];
  healthInfo: Pet['healthInfo'];
  adoptionFee: number;
  location: Pet['location'];
}

export interface ShelterFormData {
  name: string;
  email: string;
  phone: string;
  address: Shelter['address'];
  description: string;
  website?: string;
  socialMedia?: Shelter['socialMedia'];
  operatingHours: Shelter['operatingHours'];
}

// Tipos para respuestas de error
export interface ApiError {
  message: string;
  status: number;
  errors?: {
    field: string;
    message: string;
  }[];
} 