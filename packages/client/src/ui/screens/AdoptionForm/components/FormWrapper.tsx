import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller, Resolver } from 'react-hook-form'
import { Flex, RadioGroup, TextField } from '@radix-ui/themes'
import { schema } from '../AdoptionForm.utils'
import type { FormDataType } from '../AdoptionForm.utils'
import quizList from 'mocks/adoption-form-question.json'

const FormWrapper = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: yupResolver<Resolver<FormDataType, any>>(schema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data) // Handle form submission here
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="3">
        {quizList.questions.map((question) => (
          <div key={question.id} className="question">
            <label>{question.question}</label>
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
                render={({ field }) => (
                  <TextField.Input type={question.element} variant="soft" size="3" {...field} />
                )}
              />
            )}
            {errors[question.key] && <p className="error">This field is required</p>}
          </div>
        ))}
        <button type="submit">Submit</button>
      </Flex>
    </form>
  )
}

export { FormWrapper }
