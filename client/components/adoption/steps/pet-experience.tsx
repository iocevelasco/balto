"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"
import { useTranslations } from "@/lib/i18n"

export const PetExperienceStep = () => {
  const { t } = useTranslations()
  const { watch, setValue } = useFormContext<any>()
  const f = (t.forms as any) || {}
  const a = (t.adoption as any) || {}

  return (
    <div className="space-y-6">
      {/* Had pets before */}
      <div>
        <Label className="text-base font-medium">
          {a.hadPetsBeforeQuestion ?? "¿Has tenido mascotas antes?"}
        </Label>
        <RadioGroup
          value={watch("hadPetsBefore")}
          onValueChange={(value) => setValue("hadPetsBefore", value)}
          className="mt-2"
        >
          {[
            { value: "yes", label: t.common.yes ?? "Sí" },
            { value: "no", label: t.common.no ?? "No" },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.value} id={`pets-${opt.value}`} />
              <Label htmlFor={`pets-${opt.value}`}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Current pets */}
      <div>
        <Label className="text-base font-medium">
          {a.currentPetsQuestion ?? "¿Actualmente tienes mascotas?"}
        </Label>
        <RadioGroup
          value={watch("currentPets")}
          onValueChange={(value) => setValue("currentPets", value)}
          className="mt-2"
        >
          {[
            { value: "yes", label: t.common.yes ?? "Sí" },
            { value: "no", label: t.common.no ?? "No" },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.value} id={`current-${opt.value}`} />
              <Label htmlFor={`current-${opt.value}`}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Experience textarea */}
      <div>
        <Label htmlFor="petExperience">
          {a.petExperienceLabel ?? "Cuéntanos sobre tu experiencia con mascotas"}
        </Label>
        <Textarea
          id="petExperience"
          value={watch("petExperience")}
          onChange={(e) => setValue("petExperience", e.target.value)}
          placeholder={a.petExperiencePlaceholder ?? "Describe tu experiencia con mascotas, incluyendo razas que has tenido, experiencia en entrenamiento, etc."}
          rows={4}
        />
      </div>

      {/* Vet Reference */}
      <div>
        <Label htmlFor="vetReference">
          {a.vetReferenceLabel ?? "Referencia Veterinaria (si aplica)"}
        </Label>
        <Input
          id="vetReference"
          value={watch("vetReference")}
          onChange={(e) => setValue("vetReference", e.target.value)}
          placeholder={a.vetReferencePlaceholder ?? "Nombre del veterinario e información de contacto"}
        />
      </div>
    </div>
  )
} 