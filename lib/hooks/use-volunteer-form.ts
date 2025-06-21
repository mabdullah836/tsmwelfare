import { useForm } from "react-hook-form"
import { VolunteerFormData } from "@/lib/types/volunteer"

export const useVolunteerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<VolunteerFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      occupation: "",
      availability: "",
      interests: [],
      skills: "",
      experience: "",
      motivation: "",
      references: "",
    },
  })

  const handleInterestChange = (interest: string) => {
    const currentInterests = watch("interests")
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter((i) => i !== interest)
      : [...currentInterests, interest]
    setValue("interests", newInterests)
  }

  const handleAvailabilityChange = (value: string) => {
    setValue("availability", value)
  }

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    handleInterestChange,
    handleAvailabilityChange,
    watch,
    reset,
  }
} 