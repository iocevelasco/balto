"use client"

import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormContext } from "react-hook-form"
import { useTranslations } from "@/lib/i18n"
import { useAuth } from "@/components/providers/auth-provider"

export const PersonalInfoStep = () => {
  const { t } = useTranslations()
  const { user, isAuthenticated } = useAuth()

  const {
    register,
    formState: { errors },
    setValue,
    watch
  } = useFormContext()

  // Auto-llenar campos con datos del usuario autenticado
  useEffect(() => {
    if (isAuthenticated && user) {
      // Solo llenar si los campos están vacíos
      const currentFirstName = watch("firstName")
      const currentLastName = watch("lastName") 
      const currentEmail = watch("email")

      if (!currentFirstName && user.firstName) {
        setValue("firstName", user.firstName)
      }
      
      if (!currentLastName && user.lastName) {
        setValue("lastName", user.lastName)
      }
      
      if (!currentEmail && user.email) {
        setValue("email", user.email)
      }

      // Si tiene teléfono en su perfil, también llenarlo  
      if (!watch("phone") && user.profile?.phone) {
        setValue("phone", user.profile.phone)
      }
    }
  }, [isAuthenticated, user, setValue, watch])

  return (
    <div className="space-y-4">
      {isAuthenticated && user && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm">✓</span>
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">
                {(t.adoption as any)?.personalInfoPrefilled ?? "Información precargada de tu cuenta"}
              </p>
              <p className="text-xs text-green-600">
                {(t.adoption as any)?.personalInfoCanModify ?? "Puedes modificar cualquier campo si es necesario"}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">{t.auth.firstName}</Label>
          <Input 
            id="firstName" 
            {...register("firstName", { required: t.forms.fieldRequired })}
            className={isAuthenticated && user?.firstName ? "bg-green-50" : ""}
          />
          {errors.firstName && (
            <p className="text-xs text-red-500 mt-1">{(errors.firstName as any).message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName">{t.auth.lastName}</Label>
          <Input 
            id="lastName" 
            {...register("lastName", { required: t.forms.fieldRequired })}
            className={isAuthenticated && user?.lastName ? "bg-green-50" : ""}
          />
          {errors.lastName && (
            <p className="text-xs text-red-500 mt-1">{(errors.lastName as any).message}</p>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="email">{t.auth.email}</Label>
        <Input
          id="email"
          type="email"
          {...register("email", {
            required: t.forms.fieldRequired,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t.forms.invalidEmail,
            },
          })}
          className={isAuthenticated && user?.email ? "bg-green-50" : ""}
        />
        {errors.email && <p className="text-xs text-red-500 mt-1">{(errors.email as any).message}</p>}
      </div>
      <div>
        <Label htmlFor="phone">{(t.auth as any).phone ?? "Phone"}</Label>
        <Input 
          id="phone" 
          {...register("phone", { required: t.forms.fieldRequired })}
          className={isAuthenticated && user?.profile?.phone ? "bg-green-50" : ""}
        />
        {errors.phone && <p className="text-xs text-red-500 mt-1">{(errors.phone as any).message}</p>}
      </div>
      <div>
        <Label htmlFor="dateOfBirth">{(t.auth as any).dateOfBirth ?? "Date of Birth"}</Label>
        <Input id="dateOfBirth" type="date" {...register("dateOfBirth", { required: t.forms.fieldRequired })} />
        {errors.dateOfBirth && (
          <p className="text-xs text-red-500 mt-1">{(errors.dateOfBirth as any).message}</p>
        )}
      </div>
    </div>
  )
} 