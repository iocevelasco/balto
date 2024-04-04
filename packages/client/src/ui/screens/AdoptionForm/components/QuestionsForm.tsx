import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RadioGroup, TextField } from '@radix-ui/themes'

interface FormData {
  [key: string]: string
}

interface Props {
  questions: Question[]
}

const Form: React.FC<Props> = ({ questions }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {questions.map((question) => (
        <div key={question.id} className="question">
          <label>{question.question}</label>
          {question.element === 'radio' ? (
            <Controller
              control={control}
              name={question.key}
              render={({ field }) => (
                <RadioGroup {...field} defaultValue="no">
                  <RadioGroup.Item value="yes">Yes</RadioGroup.Item>
                  <RadioGroup.Item value="no">No</RadioGroup.Item>
                </RadioGroup>
              )}
            />
          ) : (
            <Controller
              control={control}
              name={question.key}
              render={({ field }) => <TextField {...field} type={question.element} />}
            />
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  )
}

export default Form
