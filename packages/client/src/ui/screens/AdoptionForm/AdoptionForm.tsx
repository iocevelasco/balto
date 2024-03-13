import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { UnauthenticatedApp } from 'src/ui/layouts/UnauthenticatedApp'

const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
  })
  .required()

function AdoptionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data: any) => console.log(data)

  return (
    <UnauthenticatedApp>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('firstName')} />
        <p>{errors.firstName?.message}</p>

        <input {...register('age')} />
        <p>{errors.age?.message}</p>

        <input type="submit" />
      </form>
    </UnauthenticatedApp>
  )
}

export { AdoptionForm }
