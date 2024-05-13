type Shelter = {
  id: number;
  shelterName: string;
  shelterDescription: string;
  contactInformation: {
    email: string;
    phone: string;
    address: string;
  };
  image: string;
};

type SheltersData = {
  shelters: Shelter[];
};