import { Pet } from '@/types/pet';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Calendar, Weight } from 'lucide-react';

interface PetCardProps {
  pet: Pet;
  onEdit: (pet: Pet) => void;
  onDelete: (id: string) => void;
}

export function PetCard({ pet, onEdit, onDelete }: PetCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 relative overflow-hidden">
        {pet.imageUrl ? (
          <img src={pet.imageUrl} alt={pet.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            {pet.species === 'dog' ? '🐕' : pet.species === 'cat' ? '🐈' : '🐾'}
          </div>
        )}
        <Badge className="absolute top-2 right-2 bg-white/90 text-foreground">
          {pet.gender === 'male' ? '♂' : '♀'}
        </Badge>
      </div>
      <CardContent className="pt-4">
        <h3 className="text-xl font-bold mb-1">{pet.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">
          {pet.breed} · {pet.age} {pet.age === 1 ? 'year' : 'years'}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Weight className="w-4 h-4" />
            <span>{pet.weight}kg</span>
          </div>
          {pet.lastVaccination && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(pet.lastVaccination).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="gap-2 pt-0">
        <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(pet)}>
          <Edit className="w-4 h-4 mr-1" />
          Edit
        </Button>
        <Button variant="destructive" size="sm" className="flex-1" onClick={() => onDelete(pet.id)}>
          <Trash2 className="w-4 h-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}