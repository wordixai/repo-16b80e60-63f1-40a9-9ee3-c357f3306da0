export interface Pet {
  id: string;
  user_id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: 'male' | 'female';
  color: string;
  weight: number;
  image_url?: string;
  medical_notes?: string;
  last_vaccination?: string;
  created_at: string;
  updated_at?: string;
}

export type PetFormData = Omit<Pet, 'id' | 'user_id' | 'created_at' | 'updated_at'>;