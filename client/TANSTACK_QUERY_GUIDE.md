# Guía de TanStack Query - Adopción Responsable

Esta guía explica cómo usar TanStack Query (React Query) en el proyecto de adopción de mascotas para conectar el frontend Next.js con el backend API.

## 📋 Tabla de Contenidos

1. [Configuración](#configuración)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Servicios API](#servicios-api)
4. [Hooks Personalizados](#hooks-personalizados)
5. [Ejemplos de Uso](#ejemplos-de-uso)
6. [Mejores Prácticas](#mejores-prácticas)
7. [Manejo de Errores](#manejo-de-errores)
8. [Optimizaciones](#optimizaciones)

## 🚀 Configuración

### Dependencias Instaladas

```json
{
  "@tanstack/react-query": "^5.79.0",
  "@tanstack/react-query-devtools": "^5.79.0",
  "axios": "^1.9.0"
}
```

### Variables de Entorno

Crea un archivo `.env.local` en la carpeta `client`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=development
```

### Configuración del Provider

El `QueryProvider` está configurado en `app/layout.tsx` y envuelve toda la aplicación:

```tsx
import { QueryProvider } from "@/components/providers/query-provider"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
```

## 📁 Estructura del Proyecto

```
client/
├── lib/
│   ├── api-client.ts          # Cliente Axios configurado
│   ├── query-client.ts        # Configuración de QueryClient
│   ├── types.ts               # Tipos TypeScript
│   └── services/              # Servicios API
│       ├── auth.service.ts
│       ├── pets.service.ts
│       ├── adoptions.service.ts
│       └── favorites.service.ts
├── hooks/                     # Hooks personalizados
│   ├── use-auth.ts
│   ├── use-pets.ts
│   └── use-favorites.ts
├── components/
│   ├── providers/
│   │   └── query-provider.tsx
│   └── examples/
│       └── pets-list-example.tsx
```

## 🔧 Servicios API

### Cliente API Base (`lib/api-client.ts`)

```tsx
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
});

// Interceptor para autenticación
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Servicios por Entidad

Cada entidad tiene su propio servicio:

- **Auth Service**: Login, registro, logout
- **Pets Service**: CRUD de mascotas, búsqueda, filtros
- **Adoptions Service**: Proceso de adopción
- **Favorites Service**: Gestión de favoritos

## 🎣 Hooks Personalizados

### Hooks de Autenticación

```tsx
import { useCurrentUser, useLogin, useLogout } from '@/hooks/use-auth';

function LoginComponent() {
  const login = useLogin();
  const { data: user } = useCurrentUser();
  const logout = useLogout();

  const handleLogin = (credentials) => {
    login.mutate(credentials, {
      onSuccess: () => {
        console.log('Login exitoso');
      },
      onError: (error) => {
        console.error('Error en login:', error);
      }
    });
  };

  return (
    <div>
      {user ? (
        <button onClick={() => logout.mutate()}>
          Logout
        </button>
      ) : (
        <button onClick={() => handleLogin({ email, password })}>
          Login
        </button>
      )}
    </div>
  );
}
```

### Hooks de Mascotas

```tsx
import { usePets, useFeaturedPets, useCreatePet } from '@/hooks/use-pets';

function PetsComponent() {
  const { data: pets, isLoading, error } = usePets({
    page: 1,
    limit: 12,
    filters: { species: ['dog'] }
  });

  const { data: featuredPets } = useFeaturedPets();
  const createPet = useCreatePet();

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {pets?.data.map(pet => (
        <div key={pet._id}>{pet.name}</div>
      ))}
    </div>
  );
}
```

### Hooks de Favoritos

```tsx
import { useToggleFavorite, useIsFavorite } from '@/hooks/use-favorites';

function FavoriteButton({ petId }) {
  const { data: isFavorite } = useIsFavorite(petId);
  const toggleFavorite = useToggleFavorite();

  const handleToggle = () => {
    toggleFavorite.mutate({ petId, isFavorite });
  };

  return (
    <button onClick={handleToggle}>
      {isFavorite ? '❤️' : '🤍'}
    </button>
  );
}
```

## 💡 Ejemplos de Uso

### 1. Lista de Mascotas con Paginación

```tsx
function PetsList() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePets({ page, limit: 12 });

  return (
    <div>
      {data?.data.map(pet => <PetCard key={pet._id} pet={pet} />)}
      
      <Pagination
        current={page}
        total={data?.pagination.totalPages}
        onChange={setPage}
      />
    </div>
  );
}
```

### 2. Búsqueda en Tiempo Real

```tsx
function PetSearch() {
  const [query, setQuery] = useState('');
  const { data: results } = useSearchPets(query, {}, {
    enabled: query.length > 2
  });

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar mascotas..."
      />
      
      {results?.map(pet => (
        <PetCard key={pet._id} pet={pet} />
      ))}
    </div>
  );
}
```

### 3. Formulario de Adopción

```tsx
function AdoptionForm({ petId }) {
  const createAdoption = useCreateAdoptionApplication();

  const handleSubmit = (formData) => {
    createAdoption.mutate({
      petId,
      ...formData
    }, {
      onSuccess: () => {
        toast.success('Solicitud enviada exitosamente');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos del formulario */}
      <button 
        type="submit" 
        disabled={createAdoption.isPending}
      >
        {createAdoption.isPending ? 'Enviando...' : 'Enviar Solicitud'}
      </button>
    </form>
  );
}
```

## ✅ Mejores Prácticas

### 1. Claves de Query Consistentes

```tsx
// ✅ Bueno - Estructura consistente
['pets'] // Todas las mascotas
['pets', { page: 1, filters: {...} }] // Con parámetros
['pets', petId] // Mascota específica
['pets', petId, 'similar'] // Datos relacionados

// ❌ Malo - Inconsistente
['allPets']
['pet-123']
['similarPets']
```

### 2. Manejo de Estados de Carga

```tsx
function Component() {
  const { data, isLoading, error, isError } = usePets();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage error={error} />;
  if (!data) return <EmptyState />;

  return <PetsList pets={data.data} />;
}
```

### 3. Optimistic Updates

```tsx
const updatePet = useUpdatePet();

const handleUpdate = (petData) => {
  updatePet.mutate(petData, {
    onMutate: async (newData) => {
      // Cancelar queries en curso
      await queryClient.cancelQueries(['pets', petId]);
      
      // Snapshot del valor anterior
      const previousPet = queryClient.getQueryData(['pets', petId]);
      
      // Actualización optimista
      queryClient.setQueryData(['pets', petId], newData);
      
      return { previousPet };
    },
    onError: (err, newData, context) => {
      // Revertir en caso de error
      queryClient.setQueryData(['pets', petId], context.previousPet);
    },
    onSettled: () => {
      // Refetch para sincronizar
      queryClient.invalidateQueries(['pets', petId]);
    },
  });
};
```

## 🚨 Manejo de Errores

### 1. Errores Globales

```tsx
// En query-client.ts
const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => {
        toast.error(error.message);
      },
    },
  },
});
```

### 2. Errores Específicos

```tsx
function Component() {
  const { error, isError } = usePets();

  if (isError) {
    if (error.response?.status === 404) {
      return <NotFound />;
    }
    if (error.response?.status === 401) {
      return <Unauthorized />;
    }
    return <GenericError error={error} />;
  }

  // ...resto del componente
}
```

## ⚡ Optimizaciones

### 1. Prefetching

```tsx
function PetCard({ pet }) {
  const queryClient = useQueryClient();

  const handleMouseEnter = () => {
    // Prefetch detalles de la mascota
    queryClient.prefetchQuery({
      queryKey: ['pets', pet._id],
      queryFn: () => petsService.getPetById(pet._id),
      staleTime: 5 * 60 * 1000,
    });
  };

  return (
    <div onMouseEnter={handleMouseEnter}>
      {/* Contenido de la card */}
    </div>
  );
}
```

### 2. Infinite Queries

```tsx
function InfinitePetsList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['pets', 'infinite'],
    queryFn: ({ pageParam = 1 }) => 
      petsService.getPets({ page: pageParam }),
    getNextPageParam: (lastPage) => 
      lastPage.pagination.page < lastPage.pagination.totalPages 
        ? lastPage.pagination.page + 1 
        : undefined,
  });

  return (
    <div>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.data.map(pet => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      ))}
      
      {hasNextPage && (
        <button 
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Cargando...' : 'Cargar más'}
        </button>
      )}
    </div>
  );
}
```

### 3. Background Updates

```tsx
// Configurar background refetch
const { data } = usePets({}, {
  refetchInterval: 5 * 60 * 1000, // Cada 5 minutos
  refetchIntervalInBackground: true,
});
```

## 🔧 DevTools

Las DevTools de TanStack Query están habilitadas en desarrollo:

- Presiona la esquina inferior derecha para abrir
- Inspecciona queries, mutaciones y cache
- Útil para debugging y optimización

## 📚 Recursos Adicionales

- [Documentación oficial de TanStack Query](https://tanstack.com/query/latest)
- [Guía de migración](https://tanstack.com/query/latest/docs/react/guides/migrating-to-react-query-5)
- [Ejemplos de patrones](https://github.com/TanStack/query/tree/main/examples)

---

Esta configuración proporciona una base sólida para manejar el estado del servidor en la aplicación de adopción de mascotas, con patrones escalables y mejores prácticas implementadas. 