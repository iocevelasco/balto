'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from 'src/ui/design-system/Button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/ui/components/Form'
import { Input } from 'src/ui/design-system/Input'
import { RadioGroup, RadioGroupItem } from 'src/ui/design-system/RadioGroup'
import { FormSchema, defaultFormData, formData } from '../AdoptionForm.utils'

function FormWrapper() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultFormData,
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(`data`, data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-100 space-y-6">
        {formData.inputs.map((input, index) => (
          <FormField
            key={index}
            control={form.control}
            name={input.key}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{input.label}</FormLabel>
                <FormControl>
                  {input.inputType === 'radio' ? (
                    <RadioGroup {...field}>
                      <RadioGroupItem value="yes">Yes</RadioGroupItem>
                      <RadioGroupItem value="no">No</RadioGroupItem>
                    </RadioGroup>
                  ) : (
                    <Input type={input.inputType} {...field} value={field.value} />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export { FormWrapper }
