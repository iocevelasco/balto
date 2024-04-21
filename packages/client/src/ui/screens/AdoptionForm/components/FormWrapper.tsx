'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from 'src/ui/design-system/Button'
import { Box, Text } from '@radix-ui/themes'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from 'src/ui/components/Form'
import { Input } from 'src/ui/design-system/Input'
import { RadioGroup, RadioGroupItem } from 'src/ui/design-system/RadioGroup'
import { defaultFormDataSchema, defaultFormData, formFields } from '../AdoptionForm.utils'
import { Label } from 'src/ui/design-system/Label'
import { PawPrint } from 'lucide-react'
import { Flex } from '@radix-ui/themes'

function FormWrapper() {
  const form = useForm<z.infer<typeof defaultFormDataSchema>>({
    resolver: zodResolver(defaultFormDataSchema),
    defaultValues: defaultFormData,
  })

  function onSubmit(data: z.infer<typeof defaultFormDataSchema>) {
    console.log(`data`, data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-100 space-y-6">
        {formFields.map((input) => (
          <FormField
            key={input.id}
            control={form.control}
            name={input.key}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{input.label}</FormLabel>
                <FormControl>
                  {input.inputType === 'radio' ? (
                    <RadioGroup
                      {...field}
                      onValueChange={field.onChange}
                      className="flex"
                      defaultValue="no"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="yes" />
                        <Label htmlFor="yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" />
                        <Label htmlFor="no">No</Label>
                      </div>
                    </RadioGroup>
                  ) : (
                    <Input type={input.inputType} {...field} />
                  )}
                </FormControl>
                {input.description && <FormDescription>{input.description}</FormDescription>}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Flex justify="center" className="px-8">
          <Button type="submit" className="w-full md:w-fit px-1 py-1 h-fit">
            <Flex gap="3" align="center" justify="between" className="w-full pl-4">
              <Text> Submit Adoption </Text>
              <Box className="bg-white p-2 rounded-full">
                <PawPrint size={20} color="hsl(var(--primary))" />
              </Box>
            </Flex>
          </Button>
        </Flex>
      </form>
    </Form>
  )
}

export { FormWrapper }
