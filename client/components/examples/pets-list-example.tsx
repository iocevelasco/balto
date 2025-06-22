'use client';

import { useState } from 'react';
import { usePets, useFeaturedPets } from '@/hooks/use-pets';
import { useToggleFavorite, useIsFavorite } from '@/hooks/use-favorites';
import { SearchParams } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Calendar } from 'lucide-react';

export function PetsListExample() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    page: 1,
    limit: 12,
  });

  // Obtener mascotas con paginación y filtros
  const { 
    data: petsData, 
    isLoading: petsLoading, 
    error: petsError,
    refetch: refetchPets 
  } = usePets(searchParams);

  // Obtener mascotas destacadas
  const { 
    data: featuredPets, 
    isLoading: featuredLoading 
  } = useFeaturedPets();

  const toggleFavorite = useToggleFavorite();

  const handleToggleFavorite = (petId: string, isFavorite: boolean) => {
    toggleFavorite.mutate({ petId, isFavorite });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => ({ ...prev, page: newPage }));
  };

  const handleFilterChange = (filters: SearchParams['filters']) => {
    setSearchParams(prev => ({ ...prev, filters, page: 1 }));
  };

  if (petsLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Cargando mascotas...</p>
        </div>
      </div>
    );
  }

  if (petsError) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error al cargar mascotas</p>
          <Button onClick={() => refetchPets()}>Reintentar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Mascotas Destacadas */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Mascotas Destacadas</h2>
        {featuredLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredPets?.map((pet) => (
              <PetCard 
                key={pet._id} 
                pet={pet} 
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </section>

      {/* Todas las Mascotas */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Todas las Mascotas</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleFilterChange({ species: ['dog'] })}
            >
              Perros
            </Button>
            <Button
              variant="outline"
              onClick={() => handleFilterChange({ species: ['cat'] })}
            >
              Gatos
            </Button>
            <Button
              variant="outline"
              onClick={() => handleFilterChange({})}
            >
              Todos
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {petsData?.data.map((pet) => (
            <PetCard 
              key={pet._id} 
              pet={pet} 
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>

        {/* Paginación */}
        {petsData?.pagination && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button
              variant="outline"
              disabled={petsData.pagination.page === 1}
              onClick={() => handlePageChange(petsData.pagination.page - 1)}
            >
              Anterior
            </Button>
            
            <span className="px-4 py-2">
              Página {petsData.pagination.page} de {petsData.pagination.totalPages}
            </span>
            
            <Button
              variant="outline"
              disabled={petsData.pagination.page === petsData.pagination.totalPages}
              onClick={() => handlePageChange(petsData.pagination.page + 1)}
            >
              Siguiente
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}

// Componente para mostrar una mascota individual
function PetCard({ 
  pet, 
  onToggleFavorite 
}: { 
  pet: any; 
  onToggleFavorite: (petId: string, isFavorite: boolean) => void;
}) {
  const { data: isFavorite = false } = useIsFavorite(pet._id);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        {pet.images?.[0] ? (
          <img
            src={pet.images[0]}
            alt={pet.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Sin imagen</span>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={() => onToggleFavorite(pet._id, isFavorite)}
        >
          <Heart 
            className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
          />
        </Button>

        {pet.featured && (
          <Badge className="absolute top-2 left-2 bg-yellow-500">
            Destacado
          </Badge>
        )}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{pet.name}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Badge variant="secondary">{pet.species}</Badge>
          <Badge variant="outline">{pet.size}</Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{pet.age} años</span>
          </div>
          
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{pet.location?.city}, {pet.location?.state}</span>
          </div>
          
          <p className="text-gray-600 line-clamp-2">{pet.description}</p>
          
          <div className="flex justify-between items-center pt-2">
            <span className="font-semibold text-green-600">
              ${pet.adoptionFee}
            </span>
            <Badge 
              variant={pet.status === 'available' ? 'default' : 'secondary'}
            >
              {pet.status === 'available' ? 'Disponible' : 'No disponible'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 