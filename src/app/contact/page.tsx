'use client'

import { useForm } from '@/app/helpers/hooks/useForm'
import { validatePhoneNumber } from '@/app/helpers/strings'
import { Input } from '@/components/Input/Input'
import { PhoneInput } from '@/components/PhoneInput/PhoneInput'
import { Select } from '@/components/Select/Select'
import { Box } from '@/components/index'
import { Button, Typography } from '@mui/material'
import React, { FormEvent } from 'react'

export default function HomePage() {
  const { form, handleChange } = useForm({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    hearAboutUs: '',
  })

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="page-wrapper px-8 lg:px-64">
      <Typography className="text-gray-mid !font-light" variant="h1">
        Contact Page
      </Typography>
      <form onSubmit={onSubmit}>
        <Box className="pt-8 grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-5 lg:gap-y-8">
          <Input
            label="Full Name"
            value={form.name}
            onChange={handleChange}
            name="name"
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <PhoneInput
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
          <Input
            label="Company"
            name="company"
            value={form.company}
            onChange={handleChange}
          />
          <div className="lg:col-span-2">
            <Input
              label="Message"
              placeholder="Start typing your message here..."
              multiline
              rows={2}
              name="message"
              value={form.message}
              onChange={handleChange}
            />
          </div>
          <Select
            value={form.hearAboutUs}
            onChange={handleChange}
            label="How do you hear about us?"
            placeholder="Select an option"
            options={['Option 1', 'Option 2', 'Option 3']}
            name="hearAboutUs"
          />
        </Box>
        <Box className="pt-8 flex lg:block space-x-8">
          <Button
            type="button"
            variant="outlined"
            className="flex-1 max-lg:py-2"
          >
            Clear
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="flex-1 max-lg:py-2"
            disabled={
              !form.name ||
              !form.email ||
              !form.phone ||
              !form.message ||
              !form.hearAboutUs ||
              !form.company ||
              (!validatePhoneNumber(form.phone as string) && !!form.phone)
            }
          >
            Send
          </Button>
        </Box>
      </form>
    </div>
  )
}
