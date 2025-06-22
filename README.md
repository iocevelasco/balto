# Pet Adoption Platform 🐾

Una plataforma completa de adopción de mascotas construida con Node.js, Express, MongoDB, Next.js 15 y TanStack Query. Esta aplicación proporciona una solución full-stack para conectar mascotas con familias amorosas a través de refugios y organizaciones de adopción.

## Features

### 🏠 **Frontend Next.js con TanStack Query**
- Aplicación React moderna con Next.js 15
- Estado del servidor gestionado con TanStack Query v5
- Interfaz de usuario con Shadcn/ui y Tailwind CSS
- TypeScript para type safety completo
- Optimistic updates y cache inteligente

### 🔌 **API Backend Completa**
- API REST con Node.js y Express
- Base de datos MongoDB con Mongoose
- Autenticación JWT con roles
- Validación con Zod
- Documentación con Swagger

### 🐕 **Gestión Completa de Mascotas**
- Perfiles detallados de mascotas con fotos
- Registros de salud y rasgos de personalidad
- Subida múltiple de imágenes con Cloudinary
- Seguimiento de estado (Disponible, Pendiente, Adoptado)

### 📍 **Búsqueda Basada en Ubicación**
- Búsqueda de mascotas por ubicación y tipo
- Consultas geoespaciales con MongoDB
- Filtrado basado en distancia
- Filtros de búsqueda avanzados

### 📋 **Proceso de Adopción Guiado**
- Aplicaciones de adopción completas
- Seguimiento de estado y notificaciones
- Programación de reuniones
- Coordinación de visitas domiciliarias

### 🔔 **Sistema de Favoritos y Alertas**
- Mascotas favoritas con alertas personalizadas
- Notificaciones por email para actualizaciones
- Seguimiento en tiempo real del proceso de adopción

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + Shadcn/ui
- **State Management**: TanStack Query v5
- **HTTP Client**: Axios
- **Language**: TypeScript
- **Forms**: React Hook Form + Zod

### Backend
- **Runtime**: Node.js + Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with role-based access
- **Validation**: Zod for data validation
- **File Upload**: Multer + Cloudinary
- **Email**: Nodemailer
- **Documentation**: Swagger/OpenAPI
- **Security**: Helmet, CORS, Rate Limiting

## Project Structure

```
pet-adoption-platform/
├── api/                     # Backend API
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── routes/         # API routes
│   │   ├── models/         # Mongoose models
│   │   ├── middlewares/    # Custom middleware
│   │   ├── services/       # Business logic services
│   │   ├── validations/    # Zod validation schemas
│   │   ├── utils/          # Utility functions
│   │   ├── config/         # Configuration files
│   │   └── app.js          # Main application file
│   ├── tests/              # API tests
│   ├── package.json
│   └── server.js
├── client/                  # Frontend Next.js
│   ├── app/                # Next.js App Router
│   ├── components/         # React components
│   ├── lib/               # Utilities and configurations
│   │   ├── api-client.ts  # Axios configuration
│   │   ├── query-client.ts # TanStack Query config
│   │   ├── types.ts       # TypeScript types
│   │   └── services/      # API service functions
│   ├── hooks/             # Custom React hooks
│   ├── styles/            # Global styles
│   ├── public/            # Static assets
│   └── package.json
└── package.json            # Root workspace configuration
```

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)
- Email service (Gmail, SendGrid, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pet-adoption-platform
   ```

2. **Install all dependencies**
   ```bash
   npm run setup
   ```

3. **Environment Setup**
   
   **API Environment** (`api/.env`):
   ```bash
   cd api
   cp env.example .env
   ```
   
   Update `api/.env` with your configuration:
   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development
   
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/pet-adoption
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   
   # CORS Configuration
   CORS_ORIGIN=http://localhost:3001
   
   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

   **Client Environment** (`client/.env.local`):
   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   NODE_ENV=development
   ```

4. **Start the development servers**
   ```bash
   # Start both API and Client with one command
   npm run dev
   
   # Or start individually:
   npm run dev:api    # API on http://localhost:3000
   npm run dev:client # Client on http://localhost:3001
   ```

5. **Access the applications**
   - **Frontend**: http://localhost:3001
   - **API**: http://localhost:3000
   - **API Documentation**: http://localhost:3000/api-docs
   - **Health Check**: http://localhost:3000/health

## Available Scripts

### Development
- `npm run dev` - Start both API and Client in development mode
- `npm run dev:api` - Start only the API server
- `npm run dev:client` - Start only the Next.js client

### Testing
- `npm run test` - Run all tests
- `npm run test:api` - Run API tests
- `npm run test:client` - Run client tests
- `npm run test:endpoints` - Test API endpoints
- `npm run test:connection` - Test API connection from client

### Building & Production
- `npm run build` - Build the client for production
- `npm run start:api` - Start API in production mode
- `npm run start:client` - Start client in production mode

### Utilities
- `npm run setup` - Install all dependencies
- `npm run clean` - Clean all node_modules
- `npm run reset` - Clean and reinstall everything
- `npm run lint` - Run linting on all packages
- `npm run lint:fix` - Fix linting issues

## TanStack Query Integration

The client uses TanStack Query v5 for server state management. Key features:

- **Automatic caching** with smart invalidation
- **Background updates** and refetching
- **Optimistic updates** for better UX
- **Error handling** with retry logic
- **DevTools** for debugging queries

### Example Usage

```tsx
import { usePets, useToggleFavorite } from '@/hooks/use-pets';

function PetsList() {
  const { data: pets, isLoading, error } = usePets({
    page: 1,
    limit: 12,
    filters: { species: ['dog'] }
  });

  const toggleFavorite = useToggleFavorite();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {pets?.data.map(pet => (
        <PetCard 
          key={pet._id} 
          pet={pet}
          onToggleFavorite={() => toggleFavorite.mutate({
            petId: pet._id,
            isFavorite: false
          })}
        />
      ))}
    </div>
  );
}
```

For detailed usage instructions, see [TanStack Query Guide](client/TANSTACK_QUERY_GUIDE.md).

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-email` - Verify email address
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/me` - Get current user profile

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/change-password` - Change password
- `POST /api/users/upload-avatar` - Upload profile picture

### Pets
- `GET /api/pets` - Search pets with filters
- `GET /api/pets/:id` - Get pet details
- `POST /api/pets` - Create new pet (Shelter only)
- `PUT /api/pets/:id` - Update pet (Shelter only)
- `DELETE /api/pets/:id` - Delete pet (Shelter only)
- `POST /api/pets/:id/images` - Upload pet images

### Adoptions
- `POST /api/adoptions` - Submit adoption application
- `GET /api/adoptions/my-applications` - Get user's applications
- `GET /api/adoptions/:id` - Get application details
- `PUT /api/adoptions/:id/status` - Update application status (Shelter)
- `POST /api/adoptions/:id/schedule-meeting` - Schedule meeting

### Favorites
- `GET /api/favorites` - Get favorite pets
- `POST /api/favorites/:petId` - Add to favorites
- `DELETE /api/favorites/:petId` - Remove from favorites
- `PUT /api/favorites/:petId/toggle` - Toggle favorite status

### Shelters
- `GET /api/shelters` - Get all shelters
- `GET /api/shelters/:id` - Get shelter details
- `GET /api/shelters/:id/pets` - Get shelter's pets
- `GET /api/shelters/my/dashboard` - Shelter dashboard

## Data Models

### User
```javascript
{
  email: String,
  password: String (hashed),
  firstName: String,
  lastName: String,
  role: ['user', 'shelter', 'admin'],
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: { latitude: Number, longitude: Number }
  },
  preferences: {
    petTypes: [String],
    maxDistance: Number,
    notifications: { email: Boolean, push: Boolean }
  },
  isVerified: Boolean,
  isActive: Boolean
}
```

### Pet
```javascript
{
  name: String,
  type: ['dog', 'cat', 'bird', 'rabbit', 'hamster', 'fish', 'reptile', 'other'],
  breed: String,
  age: { years: Number, months: Number },
  gender: ['male', 'female', 'unknown'],
  size: ['small', 'medium', 'large', 'extra-large'],
  description: String,
  personality: [String],
  goodWith: { children: Boolean, dogs: Boolean, cats: Boolean },
  healthInfo: {
    vaccinated: Boolean,
    spayedNeutered: Boolean,
    microchipped: Boolean,
    specialNeeds: String
  },
  images: [{ url: String, publicId: String, isPrimary: Boolean }],
  shelter: ObjectId,
  status: ['available', 'pending', 'adopted', 'unavailable'],
  adoptionFee: Number,
  location: { address: String, coordinates: Object }
}
```

### Adoption
```javascript
{
  pet: ObjectId,
  adopter: ObjectId,
  shelter: ObjectId,
  status: ['pending', 'approved', 'rejected', 'completed', 'cancelled'],
  applicationData: {
    experience: String,
    livingSpace: String,
    workSchedule: String,
    reason: String,
    emergencyContact: Object,
    veterinarian: Object
  },
  statusHistory: [{ status: String, date: Date, note: String }],
  meetingScheduled: { date: Date, location: String, notes: String }
}
```

## Development

### Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests
npm run test:watch # Run tests in watch mode
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint errors
```

### Code Style

This project uses ESLint for code linting. Run `npm run lint` to check for issues and `npm run lint:fix` to automatically fix them.

### Testing

Tests are written using Jest and Supertest. Run `npm test` to execute the test suite.

## Deployment

### Environment Variables

Ensure all required environment variables are set in production:

- `NODE_ENV=production`
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Strong secret for JWT signing
- `CLOUDINARY_*` - Cloudinary credentials
- `EMAIL_*` - Email service configuration

### MongoDB Atlas Setup

1. Create a MongoDB Atlas cluster
2. Create a database user
3. Whitelist your IP address
4. Get the connection string and update `MONGODB_URI`

### Cloudinary Setup

1. Create a Cloudinary account
2. Get your cloud name, API key, and API secret
3. Update the Cloudinary environment variables

## API Documentation

Interactive API documentation is available at `/api-docs` when the server is running. The documentation is generated using Swagger/OpenAPI specifications.

## Security Features

- **Authentication**: JWT-based authentication
- **Authorization**: Role-based access control
- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Zod schema validation
- **Security Headers**: Helmet middleware
- **CORS**: Configurable cross-origin requests
- **Password Hashing**: bcrypt for secure password storage

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@petadoption.com or create an issue in the repository.

---

**Happy Pet Adoption! 🐾❤️** 