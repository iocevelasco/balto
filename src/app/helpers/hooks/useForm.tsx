import { SelectChangeEvent } from '@mui/material'
import { ChangeEvent, useState } from 'react'

/**
 * custom hook that allow to manipule an state as an object
 * @returns state and methods to handle the state
 */
export const useForm = <T,>(initialState: T) => {
  const [form, setForm] = useState(initialState)

  const handleChange = (
    event:
      | SelectChangeEvent<unknown>
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value || '',
    })
  }

  const updateForm = (values: Object) => {
    setForm({
      ...form,
      ...values,
    })
  }

  return {
    form,
    setForm,
    handleChange,
    updateForm,
  }
}
