import { FC } from "react"
import { Field, Form } from "react-final-form"
import { composeValidators, required, minLength } from "./validators"

type TProps = {
  signIn: any
}
type TLogin = {
  email: string
  password: string
}

const LoginForm: FC<TProps> = ({ signIn }) => {
  const onSignIn = (values: TLogin) => {
    const { email, password } = { ...values }
    signIn(email, password)
  }
  return (
    <Form
      onSubmit={onSignIn}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Field name="email" validate={composeValidators(required, minLength(3))}>
            {({ input, meta }) => (
              <div>
                <label>Email</label>
                <input {...input} type="text" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="password" validate={required}>
            {({ input, meta }) => (
              <div>
                <label>Password</label>
                <input {...input} type="password" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <button type="submit">Sign In</button>
        </form>
      )}
    />
  )
}

export default LoginForm
