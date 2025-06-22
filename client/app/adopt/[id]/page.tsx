"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { PersonalInfoStep } from "@/components/adoption/steps/personal-info"
import { LivingSituationStep } from "@/components/adoption/steps/living-situation"
import { PetExperienceStep } from "@/components/adoption/steps/pet-experience"
import { PetSpecificStep } from "@/components/adoption/steps/pet-specific"
import { ReferencesStep } from "@/components/adoption/steps/references"
import { ReviewSubmitStep } from "@/components/adoption/steps/review-submit"
import { useTranslations } from "@/lib/i18n"

export default function AdoptionApplicationPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const { t } = useTranslations()

  // Helper to bypass strict typing for newly added translation keys
  const f = t.forms as any

  // Build step titles once translations are available
  const adoptionSteps = [
    { id: 1, title: f.personalInfo ?? "Personal Info", completed: false },
    { id: 2, title: f.livingSituation ?? "Living Situation", completed: false },
    { id: 3, title: f.petExperience ?? "Pet Experience", completed: false },
    { id: 4, title: f.petSpecific ?? "Pet Specific", completed: false },
    { id: 5, title: f.references ?? "References", completed: false },
    { id: 6, title: f.reviewSubmit ?? "Review & Submit", completed: false },
  ]

  type AdoptionFormValues = {
    // Personal Information
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    // Living Situation
    housingType: string
    ownRent: string
    hasYard: string
    yardFenced: string
    landlordPermission: boolean
    // Pet Experience
    hadPetsBefore: string
    currentPets: string
    petExperience: string
    vetReference: string
    // Pet-Specific Questions
    experienceWithBreed: string
    dailyExerciseTime: string
    groomingCommitment: string
    petBudget: string
    // References
    reference1Name: string
    reference1Phone: string
    reference2Name: string
    reference2Phone: string
    // Additional
    whyAdopt: string
    agreement: boolean
  }

  const methods = useForm<AdoptionFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      housingType: "",
      ownRent: "",
      hasYard: "",
      yardFenced: "",
      landlordPermission: false,
      hadPetsBefore: "",
      currentPets: "",
      petExperience: "",
      vetReference: "",
      experienceWithBreed: "",
      dailyExerciseTime: "",
      groomingCommitment: "",
      petBudget: "",
      reference1Name: "",
      reference1Phone: "",
      reference2Name: "",
      reference2Phone: "",
      whyAdopt: "",
      agreement: false,
    },
    mode: "onTouched",
  })

  const nextStep = async () => {
    let valid = true
    if (currentStep === 1) {
      valid = await methods.trigger()
    }
    if (!valid) return
    if (currentStep < 6) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep />

      case 2:
        return <LivingSituationStep />

      case 3:
        return <PetExperienceStep />

      case 4:
        return <PetSpecificStep />

      case 5:
        return <ReferencesStep />

      case 6:
        return <ReviewSubmitStep />

      default:
        return null
    }
  }

  return (
    <FormProvider {...methods}>
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/pets/1">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="font-semibold text-lg">{t.pets.applicationForm}</h1>
            <div className="w-8"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {adoptionSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.id === currentStep
                      ? "bg-purple-500 text-white"
                      : step.id < currentStep
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step.id < currentStep ? <CheckCircle className="w-4 h-4" /> : step.id}
                </div>
                {index < adoptionSteps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-2 ${step.id < currentStep ? "bg-green-500" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 text-center">
            Step {currentStep} of {adoptionSteps.length}: {adoptionSteps[currentStep - 1].title}
          </p>
        </div>

        {/* Form Content */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{adoptionSteps[currentStep - 1].title}</CardTitle>
          </CardHeader>
          <CardContent>{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between space-x-4">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} className="flex-1">
            {t.common.previous}
          </Button>
          {currentStep < 6 ? (
            <Button
              onClick={nextStep}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {t.common.next}
            </Button>
          ) : (
            <Button
              disabled={!methods.watch("agreement")}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {t.common.submit}
            </Button>
          )}
        </div>
      </div>
    </div>
    </FormProvider>
  )
}
