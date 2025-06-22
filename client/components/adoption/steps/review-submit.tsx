"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useFormContext } from "react-hook-form"
import { useTranslations } from "@/lib/i18n"

export const ReviewSubmitStep = () => {
  const { t } = useTranslations()
  const { watch, setValue } = useFormContext<any>()
  const f = (t.forms as any) || {}

  return (
    <div className="space-y-6">
      {/* Why adopt */}
      <div>
        <Label htmlFor="whyAdopt">
          {f.whyAdoptQuestion ?? "Why do you want to adopt this pet?"}
        </Label>
        <Textarea
          id="whyAdopt"
          value={watch("whyAdopt")}
          onChange={(e) => setValue("whyAdopt", e.target.value)}
          placeholder={f.whyAdoptPlaceholder ?? "Tell us why you want to adopt this specific pet and what you can offer them..."}
          rows={4}
        />
      </div>

      {/* Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">{f.applicationSummary ?? "Application Summary"}</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <strong>{t.auth.name}:</strong> {watch("firstName")} {watch("lastName")}
          </p>
          <p>
            <strong>{t.auth.email}:</strong> {watch("email")}
          </p>
          <p>
            <strong>{f.housing ?? "Housing"}:</strong> {watch("housingType")} ({watch("ownRent")})
          </p>
          <p>
            <strong>{f.yard ?? "Yard"}:</strong>{" "}
            {watch("hasYard") === "yes"
              ? `Yes${watch("yardFenced") ? ` (${watch("yardFenced")} fenced)` : ""}`
              : "No"}
          </p>
          <p>
            <strong>{f.petExperience ?? "Pet Experience"}:</strong> {watch("hadPetsBefore")}
          </p>
        </div>
      </div>

      {/* Agreement */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="agreement"
          checked={!!watch("agreement")}
          onCheckedChange={(checked) => setValue("agreement", !!checked)}
        />
        <Label htmlFor="agreement" className="text-sm">
          {f.agreementLabel ?? "I agree to the terms and conditions and understand that this application will be reviewed by the shelter. I certify that all information provided is true and accurate."}
        </Label>
      </div>
    </div>
  )
} 