"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useFormContext } from "react-hook-form"
import { useTranslations } from "@/lib/i18n"

export const PetSpecificStep = () => {
  const { t } = useTranslations()
  const { watch, setValue } = useFormContext<any>()
  const f = (t.forms as any) || {}
  const a = (t.adoption as any) || {}

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">
          {a.petQuestionsTitle ?? "Preguntas Sobre Perros y Gatos"}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {a.petQuestionsSubtitle ?? "Estas preguntas nos ayudan a asegurar la mejor compatibilidad entre tú y tu futura mascota."}
        </p>
      </div>

      {/* Experience with breed */}
      <div>
        <Label className="text-base font-medium">
          {a.experienceWithBreedQuestion ?? "¿Tienes experiencia con esta raza específica?"}
        </Label>
        <RadioGroup
          value={watch("experienceWithBreed")}
          onValueChange={(value) => setValue("experienceWithBreed", value)}
          className="mt-2"
        >
          {[
            { value: "yes", label: a.experienceYes ?? "Sí, tengo experiencia con esta raza" },
            { value: "some", label: a.experienceSome ?? "Algo de experiencia con razas similares" },
            { value: "no", label: a.experienceNo ?? "No, pero he investigado sobre la raza" },
            { value: "first", label: a.experienceFirst ?? "Esta sería mi primera mascota" },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.value} id={`breed-${opt.value}`} />
              <Label htmlFor={`breed-${opt.value}`}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Daily exercise */}
      <div>
        <Label className="text-base font-medium">
          {a.dailyExerciseQuestion ?? "¿Cuánto tiempo puedes dedicar al ejercicio/juego diario?"}
        </Label>
        <RadioGroup
          value={watch("dailyExerciseTime")}
          onValueChange={(value) => setValue("dailyExerciseTime", value)}
          className="mt-2"
        >
          {[
            { value: "30min", label: a.exercise30 ?? "30 minutos o menos" },
            { value: "1hour", label: a.exercise60 ?? "1 hora" },
            { value: "2hours", label: a.exercise120 ?? "2+ horas" },
            { value: "3hours", label: a.exercise180 ?? "3+ horas (estilo de vida muy activo)" },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.value} id={`exercise-${opt.value}`} />
              <Label htmlFor={`exercise-${opt.value}`}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Grooming */}
      <div>
        <Label className="text-base font-medium">
          {a.groomingQuestion ?? "¿Estás preparado/a para los requisitos regulares de aseo?"}
        </Label>
        <RadioGroup
          value={watch("groomingCommitment")}
          onValueChange={(value) => setValue("groomingCommitment", value)}
          className="mt-2"
        >
          {[
            { value: "daily", label: a.groomDaily ?? "Sí, cepillado diario si es necesario" },
            { value: "weekly", label: a.groomWeekly ?? "Sesiones de aseo semanales" },
            { value: "professional", label: a.groomProfessional ?? "Aseo profesional cada 6-8 semanas" },
            { value: "minimal", label: a.groomMinimal ?? "Preferencia por aseo mínimo" },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.value} id={`groom-${opt.value}`} />
              <Label htmlFor={`groom-${opt.value}`}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Budget */}
      <div>
        <Label className="text-base font-medium" htmlFor="petBudget">
          {a.petBudgetQuestion ?? "¿Cuál es tu presupuesto mensual para el cuidado de mascotas? (comida, veterinario, suministros)"}
        </Label>
        <RadioGroup
          value={watch("petBudget")}
          onValueChange={(value) => setValue("petBudget", value)}
          className="mt-2"
        >
          {[
            { value: "50-100", label: "$50 - $100" },
            { value: "100-200", label: "$100 - $200" },
            { value: "200-300", label: "$200 - $300" },
            { value: "300+", label: "$300+" },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center space-x-2">
              <RadioGroupItem value={opt.value} id={`budget-${opt.value}`} />
              <Label htmlFor={`budget-${opt.value}`}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
} 