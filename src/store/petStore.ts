import { create } from 'zustand';
import { Pet, PetFormData } from '@/types/pet';
import { supabase } from '@/lib/supabase';

interface PetStore {
  pets: Pet[];
  loading: boolean;
  fetchPets: () => Promise<void>;
  addPet: (pet: PetFormData) => Promise<void>;
  updatePet: (id: string, pet: PetFormData) => Promise<void>;
  deletePet: (id: string) => Promise<void>;
}

export const usePetStore = create<PetStore>((set, get) => ({
  pets: [],
  loading: false,

  fetchPets: async () => {
    set({ loading: true });
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      set({ pets: [], loading: false });
      return;
    }

    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching pets:', error);
      set({ loading: false });
      return;
    }

    set({ pets: data || [], loading: false });
  },

  addPet: async (petData) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('pets')
      .insert([{ ...petData, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error('Error adding pet:', error);
      return;
    }

    if (data) {
      set((state) => ({ pets: [data, ...state.pets] }));
    }
  },

  updatePet: async (id, petData) => {
    const { data, error } = await supabase
      .from('pets')
      .update({ ...petData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating pet:', error);
      return;
    }

    if (data) {
      set((state) => ({
        pets: state.pets.map((pet) => (pet.id === id ? data : pet)),
      }));
    }
  },

  deletePet: async (id) => {
    const { error } = await supabase
      .from('pets')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting pet:', error);
      return;
    }

    set((state) => ({
      pets: state.pets.filter((pet) => pet.id !== id),
    }));
  },
}));