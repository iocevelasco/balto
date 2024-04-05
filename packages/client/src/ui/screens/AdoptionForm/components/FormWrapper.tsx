import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller, Resolver, SubmitHandler } from 'react-hook-form'
import { Flex, RadioGroup } from '@radix-ui/themes'
import { Input } from 'src/ui/components/Input'
import { schema } from '../AdoptionForm.utils'
import type { FormDataType } from '../AdoptionForm.utils'
import quizList from 'src/mocks/adoption-form-question.json'

const FormWrapper = () => {
  const { handleSubmit, control, formState } = useForm<FormDataType>({
    resolver: yupResolver<Resolver<FormDataType, any>>(schema),
  })

  const onSubmit: SubmitHandler<FormDataType> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="3">
        {quizList.questions.map((question) => (
          <div key={question.id} className="question">
            {question.element === 'radio' ? (
              <Controller
                control={control}
                name={question.key}
                render={({ field }) => (
                  <RadioGroup.Root {...field} defaultValue="no">
                    <RadioGroup.Item value="yes">Yes</RadioGroup.Item>
                    <RadioGroup.Item value="no">No</RadioGroup.Item>
                  </RadioGroup.Root>
                )}
              />
            ) : (
              <Controller
                control={control}
                name={question.key}
                render={({ field }) => {
                  return (
                    <Input
                      label={question.question}
                      id={question.key}
                      type={question.element}
                      formState={formState}
                      required={question.required}
                      {...field}
                    />
                  )
                }}
              />
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </Flex>
    </form>
  )
}

export { FormWrapper }
