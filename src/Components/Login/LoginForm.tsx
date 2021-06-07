import { FC } from "react"
import { Field, Form } from "react-final-form"
import { composeValidators, required, minLength } from "../../Common/validators"
import css from './form.module.css'
import { FieldErr } from '../../Common/StyledComponents/index'
import { signIn } from '../../Store/authReducer'
import { connect } from "react-redux"
import { TState } from "../../Store/store"

type TProps = {
  signIn: any
  error: any
}
type TLogin = {
  email: string
  password: string
}

const LoginForm: FC<TProps> = ({ signIn, error }) => {  
  const onSignIn = (values: TLogin) => {
    const { email, password } = { ...values }
    signIn(email, password)
  }

  return (
    <Form
      onSubmit={onSignIn}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit} className={css.form}>
          <Field name="email" validate={composeValidators(required, minLength(3))}>
            {({ input, meta }) => (
              <div className={css.field}>
                <label>Email</label>
                <input {...input} type="text" />
                {meta.error && meta.touched && <FieldErr>{meta.error}</FieldErr>}
              </div>
            )}
          </Field>
          <Field name="password" validate={required}>
            {({ input, meta }) => (
              <div className={css.field}>
                <label>Password</label>
                <input {...input} type="password" />
                {meta.error && meta.touched && <FieldErr>{meta.error}</FieldErr>}
              </div>
            )}
          </Field>
          <button type="submit" className={css.field}>Sign In</button>
          <div>{error.message}</div> 
        </form>
      )}
    />
  )
}

const mapStateToProps = (state:TState) => {
  return {
    error: state.auth.loginError
  }
}

export default connect(mapStateToProps, {signIn})(LoginForm)
