export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: 'male' | 'female';
  color: string;
  weight: number;
  imageUrl?: string;
  medicalNotes?: string;
  lastVaccination?: string;
  createdAt: string;
}

export type PetFormData = Omit<Pet, 'id' | 'createdAt'>;