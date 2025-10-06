import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Pet, PetFormData } from '@/types/pet';

interface PetStore {
  pets: Pet[];
  addPet: (pet: PetFormData) => void;
  updatePet: (id: string, pet: PetFormData) => void;
  deletePet: (id: string) => void;
  getPet: (id: string) => Pet | undefined;
}

export const usePetStore = create<PetStore>()(
  persist(
    (set, get) => ({
      pets: [],
      addPet: (petData) => {
        const newPet: Pet = {
          ...petData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ pets: [...state.pets, newPet] }));
      },
      updatePet: (id, petData) => {
        set((state) => ({
          pets: state.pets.map((pet) =>
            pet.id === id ? { ...pet, ...petData } : pet
          ),
        }));
      },
      deletePet: (id) => {
        set((state) => ({
          pets: state.pets.filter((pet) => pet.id !== id),
        }));
      },
      getPet: (id) => {
        return get().pets.find((pet) => pet.id === id);
      },
    }),
    {
      name: 'pet-storage',
    }
  )
);