export interface ShelterType {
  id?: string;
  name: string;
  description: string;
  image: string;
  information: ShelterInfoType
}

interface ShelterInfoType {
  email: string;
  phone: string;
  address: string;
}