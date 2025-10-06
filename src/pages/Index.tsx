import { useState } from 'react';
import { usePetStore } from '@/store/petStore';
import { Pet, PetFormData } from '@/types/pet';
import { PetCard } from '@/components/PetCard';
import { PetDialog } from '@/components/PetDialog';
import { Button } from '@/components/ui/button';
import { Plus, PawPrint } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Index = () => {
  const { pets, addPet, updatePet, deletePet } = usePetStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [deletingPetId, setDeletingPetId] = useState<string | null>(null);

  const handleSavePet = (petData: PetFormData) => {
    if (editingPet) {
      updatePet(editingPet.id, petData);
    } else {
      addPet(petData);
    }
    setEditingPet(null);
  };

  const handleEditPet = (pet: Pet) => {
    setEditingPet(pet);
    setDialogOpen(true);
  };

  const handleDeletePet = (id: string) => {
    deletePet(id);
    setDeletingPetId(null);
  };

  const handleAddNew = () => {
    setEditingPet(null);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <PawPrint className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Pet Manager</h1>
                <p className="text-muted-foreground">Manage your furry friends</p>
              </div>
            </div>
            <Button onClick={handleAddNew} size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Add Pet
            </Button>
          </div>
        </header>

        {pets.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center text-5xl">
              🐾
            </div>
            <h2 className="text-2xl font-bold mb-2">No pets yet</h2>
            <p className="text-muted-foreground mb-6">Start by adding your first pet</p>
            <Button onClick={handleAddNew}>
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Pet
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onEdit={handleEditPet}
                onDelete={(id) => setDeletingPetId(id)}
              />
            ))}
          </div>
        )}
      </div>

      <PetDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSavePet}
        pet={editingPet}
      />

      <AlertDialog open={!!deletingPetId} onOpenChange={() => setDeletingPetId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this pet from your collection. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingPetId && handleDeletePet(deletingPetId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;