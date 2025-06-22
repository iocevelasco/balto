"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useFormContext } from "react-hook-form"
import { useTranslations } from "@/lib/i18n"

export const LivingSituationStep = () => {
  const { t } = useTranslations()
  const { watch, setValue } = useFormContext<any>()

  // Casting to 'any' to avoid TypeScript errors for yet-to-be-added keys.
  const f = (t.forms as any) || {}
  const a = (t.adoption as any) || {}

  return (
    <div className="space-y-6">
      {/* Housing type */}
      <div>
        <Label className="text-base font-medium">
          {a.housingTypeQuestion ?? "¿En qué tipo de vivienda vives?"}
        </Label>
        <RadioGroup
          value={watch("housingType")}
          onValueChange={(value) => setValue("housingType", value)}
          className="mt-2"
        >
          {[
            { value: "house", label: a.house ?? "Casa" },
            { value: "apartment", label: a.apartment ?? "Apartamento" },
            { value: "condo", label: a.condo ?? "Condominio" },
            { value: "other", label: a.other ?? "Otro" },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.value} id={opt.value} />
              <Label htmlFor={opt.value}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Own / Rent */}
      <div>
        <Label className="text-base font-medium">
          {a.ownRentQuestion ?? "¿Eres propietario o inquilino de tu hogar?"}
        </Label>
        <RadioGroup
          value={watch("ownRent")}
          onValueChange={(value) => setValue("ownRent", value)}
          className="mt-2"
        >
          {[
            { value: "own", label: a.own ?? "Propietario" },
            { value: "rent", label: a.rent ?? "Inquilino" },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.value} id={opt.value} />
              <Label htmlFor={opt.value}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Yard */}
      <div>
        <Label className="text-base font-medium">
          {a.hasYardQuestion ?? "¿Tienes patio?"}
        </Label>
        <RadioGroup
          value={watch("hasYard")}
          onValueChange={(value) => setValue("hasYard", value)}
          className="mt-2"
        >
          {[
            { value: "yes", label: t.common.yes ?? "Sí" },
            { value: "no", label: t.common.no ?? "No" },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.value} id={`yard-${opt.value}`} />
              <Label htmlFor={`yard-${opt.value}`}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Yard fenced */}
      {watch("hasYard") === "yes" && (
        <div>
          <Label className="text-base font-medium">
            {a.yardFencedQuestion ?? "¿Tu patio está cercado?"}
          </Label>
          <RadioGroup
            value={watch("yardFenced")}
            onValueChange={(value) => setValue("yardFenced", value)}
            className="mt-2"
          >
            {[
              { value: "yes", label: t.common.yes ?? "Sí" },
              { value: "no", label: t.common.no ?? "No" },
              { value: "partial", label: a.partially ?? "Parcialmente" },
            ].map((opt) => (
              <div key={opt.value} className="flex items-center space-x-2">
                <RadioGroupItem value={opt.value} id={`fenced-${opt.value}`} />
                <Label htmlFor={`fenced-${opt.value}`}>{opt.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {/* Landlord permission */}
      {watch("ownRent") === "rent" && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="landlordPermission"
            checked={!!watch("landlordPermission")}
            onCheckedChange={(checked) => setValue("landlordPermission", !!checked)}
          />
          <Label htmlFor="landlordPermission">
            {a.landlordPermissionLabel ?? "Tengo permiso de mi arrendador para tener mascotas"}
          </Label>
        </div>
      )}
    </div>
  )
} 