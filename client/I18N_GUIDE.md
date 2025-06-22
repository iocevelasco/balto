# Guía de Internacionalización (i18n) - PetMatch

## 📋 Resumen

PetMatch soporta tres idiomas:
- **Español (es)** - Idioma principal/por defecto
- **Inglés (en)** - Idioma secundario
- **Portugués (pt)** - Idioma terciario

## 🚀 Inicio Rápido

### 1. Usando Traducciones en Componentes

```tsx
import { useTranslations } from "@/lib/i18n"

function MiComponente() {
  const { t, formatMessage } = useTranslations()

  return (
    <div>
      <h1>{t.navigation.home}</h1>
      <p>{t.pets.adoptNow}</p>
      <p>{formatMessage(t.pets.aboutPet, { name: "Luna" })}</p>
    </div>
  )
}
```

### 2. Selector de Idiomas

```tsx
import { LanguageSelector } from "@/components/language-selector"

function Header() {
  return (
    <header>
      <LanguageSelector showText variant="outline" />
    </header>
  )
}
```

## 📚 Estructura de Traducciones

### Categorías Disponibles

- **`common`** - Elementos comunes (botones, estados, etc.)
- **`navigation`** - Navegación y menús
- **`auth`** - Autenticación y registro
- **`pets`** - Todo relacionado con mascotas
- **`shelters`** - Información de refugios
- **`favorites`** - Sistema de favoritos
- **`donations`** - Donaciones
- **`share`** - Compartir en redes sociales
- **`categories`** - Categorías de mascotas
- **`errors`** - Mensajes de error

### Ejemplos de Uso

```tsx
// Elementos comunes
{t.common.loading}       // "Cargando..."
{t.common.save}          // "Guardar"
{t.common.cancel}        // "Cancelar"

// Navegación
{t.navigation.home}      // "Inicio"
{t.navigation.pets}      // "Mascotas"
{t.navigation.profile}   // "Perfil"

// Mascotas
{t.pets.adoptNow}        // "Adoptar Ahora"
{t.pets.healthInfo}      // "Información de Salud"
{t.pets.vaccinated}      // "Vacunado"

// Con variables
{formatMessage(t.pets.aboutPet, { name: "Luna" })}
// Resultado: "Sobre Luna"
```

## 🔧 API del Hook useTranslations

```tsx
const { t, locale, changeLocale, formatMessage } = useTranslations()
```

### Propiedades

- **`t`** - Objeto con todas las traducciones del idioma actual
- **`locale`** - Idioma actual (`"es" | "en" | "pt"`)
- **`changeLocale`** - Función para cambiar idioma
- **`formatMessage`** - Función para interpolar variables

### Métodos

```tsx
// Cambiar idioma
changeLocale("en")  // Cambia a inglés
changeLocale("pt")  // Cambia a portugués
changeLocale("es")  // Cambia a español

// Formatear mensajes con variables
formatMessage(t.pets.aboutPet, { name: "Max" })
formatMessage(t.share.messages.pet, { 
  name: "Luna", 
  breed: "Golden Retriever" 
})
```

## 📱 Componente LanguageSelector

### Propiedades

```tsx
interface LanguageSelectorProps {
  variant?: "default" | "ghost" | "outline"  // Estilo del botón
  size?: "default" | "sm" | "lg"             // Tamaño del botón
  showText?: boolean                         // Mostrar nombre del idioma
  className?: string                         // Clases CSS adicionales
}
```

### Ejemplos

```tsx
// Básico (solo icono y bandera)
<LanguageSelector />

// Con texto
<LanguageSelector showText />

// Personalizado
<LanguageSelector 
  variant="outline" 
  size="lg" 
  showText 
  className="ml-4" 
/>
```

## 🌍 Detección de Idioma

El sistema detecta automáticamente el idioma en este orden:

1. **Preferencia guardada** en localStorage
2. **Idioma del navegador** (si está soportado)
3. **Español** como fallback

```tsx
// Función de detección
function detectLocale(): Locale {
  // 1. Verificar localStorage
  const savedLocale = localStorage.getItem("preferredLocale")
  
  // 2. Verificar idioma del navegador
  const browserLang = navigator.language.split("-")[0]
  
  // 3. Fallback a español
  return "es"
}
```

## 💾 Persistencia

El idioma seleccionado se guarda automáticamente en `localStorage` con la clave `preferredLocale`.

```tsx
// Se guarda automáticamente al cambiar idioma
changeLocale("en")  // Guarda "en" en localStorage
```

## 📝 Agregar Nuevas Traducciones

### 1. Actualizar la Interfaz

```tsx
// En lib/i18n/translations.ts
export interface Translations {
  // ... traducciones existentes
  nuevaSeccion: {
    mensaje1: string
    mensaje2: string
    mensajeConVariable: string
  }
}
```

### 2. Agregar Traducciones

```tsx
// Español
export const es: Translations = {
  // ... traducciones existentes
  nuevaSeccion: {
    mensaje1: "Nuevo mensaje",
    mensaje2: "Otro mensaje",
    mensajeConVariable: "Hola {nombre}, bienvenido",
  }
}

// Inglés
export const en: Translations = {
  // ... traducciones existentes
  nuevaSeccion: {
    mensaje1: "New message",
    mensaje2: "Another message",
    mensajeConVariable: "Hello {nombre}, welcome",
  }
}

// Portugués
export const pt: Translations = {
  // ... traducciones existentes
  nuevaSeccion: {
    mensaje1: "Nova mensagem",
    mensaje2: "Outra mensagem",
    mensajeConVariable: "Olá {nombre}, bem-vindo",
  }
}
```

### 3. Usar en Componentes

```tsx
function NuevoComponente() {
  const { t, formatMessage } = useTranslations()

  return (
    <div>
      <h1>{t.nuevaSeccion.mensaje1}</h1>
      <p>{t.nuevaSeccion.mensaje2}</p>
      <p>{formatMessage(t.nuevaSeccion.mensajeConVariable, { nombre: "Juan" })}</p>
    </div>
  )
}
```

## 🛠️ Configuración Avanzada

### Idiomas Disponibles

```tsx
import { getAvailableLocales } from "@/lib/i18n"

const locales = getAvailableLocales()
// [
//   { code: "es", name: "Español", flag: "🇪🇸" },
//   { code: "en", name: "English", flag: "🇺🇸" },
//   { code: "pt", name: "Português", flag: "🇧🇷" }
// ]
```

### Obtener Traducciones Específicas

```tsx
import { getTranslations } from "@/lib/i18n"

const spanishTranslations = getTranslations("es")
const englishTranslations = getTranslations("en")
```

## 📋 Lista Completa de Traducciones

### Common (Común)
- `loading`, `error`, `success`, `cancel`, `save`, `delete`, `edit`
- `back`, `next`, `previous`, `submit`, `close`, `ok`, `yes`, `no`
- `search`, `filter`, `clear`, `retry`, `copy`, `copied`
- `welcome`, `thankYou`, `and`

### Navigation (Navegación)
- `home`, `pets`, `shelters`, `favorites`, `donations`
- `profile`, `about`, `contact`
- `signIn`, `signUp`, `signOut`

### Auth (Autenticación)
- `signIn`, `signUp`, `signOut`, `email`, `password`, `confirmPassword`
- `firstName`, `lastName`, `name`, `welcomeTitle`, `welcomeSubtitle`
- `createAccount`, `signingIn`, `creatingAccount`, `welcomeBack`
- `passwordMismatch`, `passwordMinLength`, `loginFailed`, `registrationFailed`
- `forgotPassword`, `resetPassword`, `termsOfService`, `privacyPolicy`
- `byContining`, `googleSignIn`, `orContinueWith`
- `alreadyHaveAccount`, `dontHaveAccount`, `showPassword`, `hidePassword`

### Pets (Mascotas)
- `pets`, `petDetails`, `adoptNow`, `requestAdoption`, `contactShelter`
- `addToFavorites`, `removeFromFavorites`, `shareThisPet`
- `age`, `gender`, `size`, `breed`, `color`, `weight`, `location`
- `adoptionFee`, `featured`, `available`, `pending`, `adopted`
- `healthInfo`, `vaccinated`, `spayedNeutered`, `microchipped`, `specialNeeds`
- `personality`, `goodWith`, `children`, `dogs`, `cats`
- `aboutPet`, `medicalHistory`, `recentCheckup`
- `loadingPets`, `noPetsFound`, `errorLoadingPets`, `searchPets`
- `filterByType`, `filterBySize`, `filterByAge`, `allPets`
- `years`, `months`, `male`, `female`
- `small`, `medium`, `large`, `extraLarge`

### Y muchas más categorías...

## 🎯 Mejores Prácticas

### 1. Usa Nombres Descriptivos
```tsx
// ❌ Malo
{t.msg1}

// ✅ Bueno
{t.pets.adoptionFee}
```

### 2. Agrupa Lógicamente
```tsx
// ✅ Correcto
{t.auth.signIn}
{t.pets.vaccinated}
{t.navigation.home}
```

### 3. Variables en Mensajes
```tsx
// ✅ Para contenido dinámico
{formatMessage(t.pets.aboutPet, { name: petName })}
```

### 4. Fallbacks para Contenido Opcional
```tsx
// ✅ Con fallback
{t.pets[petSize as keyof typeof t.pets] || petSize}
```

## 🔍 Troubleshooting

### Error: Propiedad no existe en traducciones
```tsx
// ❌ Error común
{t.nonExistent.property}

// ✅ Verificar que existe en todas las traducciones
```

### Variable no definida
```tsx
// ❌ Variable faltante
{formatMessage(t.pets.aboutPet, {})}  // {name} será undefined

// ✅ Todas las variables definidas
{formatMessage(t.pets.aboutPet, { name: "Luna" })}
```

### TypeScript Errors
Asegúrate de que todas las traducciones (es, en, pt) tengan la misma estructura y propiedades.

## 📈 Próximos Pasos

- ✅ Sistema básico implementado
- ✅ Español, inglés y portugués soportados
- ✅ Persistencia en localStorage
- ✅ Detección automática de idioma
- 🔄 Agregar más traducciones según se necesiten
- 🔄 Implementar pluralización avanzada si se requiere
- 🔄 Agregar formato de fechas/números por región si se necesita 