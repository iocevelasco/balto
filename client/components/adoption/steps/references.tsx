"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"
import { useTranslations } from "@/lib/i18n"

export const ReferencesStep = () => {
  const { t } = useTranslations()
  const { watch, setValue } = useFormContext<any>()
  const f = (t.forms as any) || {}

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(field, e.target.value)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">
          {f.referencesTitle ?? "Personal References"}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {f.referencesSubtitle ?? "Please provide two personal references (not family members) who can speak to your character and ability to care for a pet."}
        </p>
      </div>

      {/* Reference 1 */}
      <div className="space-y-4">
        <h4 className="font-medium">{f.reference1 ?? "Reference 1"}</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="reference1Name">{f.fullName ?? "Full Name"}</Label>
            <Input
              id="reference1Name"
              value={watch("reference1Name")}
              onChange={handleChange("reference1Name")}
              placeholder={f.referenceNamePlaceholder ?? "Reference name"}
            />
          </div>
          <div>
            <Label htmlFor="reference1Phone">{f.phoneNumber ?? "Phone Number"}</Label>
            <Input
              id="reference1Phone"
              value={watch("reference1Phone")}
              onChange={handleChange("reference1Phone")}
              placeholder={f.referencePhonePlaceholder ?? "Reference phone"}
            />
          </div>
        </div>
      </div>

      {/* Reference 2 */}
      <div className="space-y-4">
        <h4 className="font-medium">{f.reference2 ?? "Reference 2"}</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="reference2Name">{f.fullName ?? "Full Name"}</Label>
            <Input
              id="reference2Name"
              value={watch("reference2Name")}
              onChange={handleChange("reference2Name")}
              placeholder={f.referenceNamePlaceholder ?? "Reference name"}
            />
          </div>
          <div>
            <Label htmlFor="reference2Phone">{f.phoneNumber ?? "Phone Number"}</Label>
            <Input
              id="reference2Phone"
              value={watch("reference2Phone")}
              onChange={handleChange("reference2Phone")}
              placeholder={f.referencePhonePlaceholder ?? "Reference phone"}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 