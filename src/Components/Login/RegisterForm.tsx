import { Form, Field } from "react-final-form"
import { FC, useState } from "react"
import { composeValidators, required, minLength } from "./validators"
import { ReqStar } from "../../Common/StyledComponents"
import eyeOpen from "../../Assets/Images/eye_open.png"
import eyeClose from "../../Assets/Images/eye_close.png"
import { EyeIco } from "../../Common/StyledComponents/index"
import css from './form.module.css'

type TProps = {
  signUp: any
}
type TSignUp = {
  name: string
  email: string
  password: string
  author: string
  info: string
}

const RegisterForm: FC<TProps> = ({ signUp }) => {
  const [pwType, setPwType] = useState("password")
  const switchPwType = () => setPwType(pwType === "text" ? "password" : "text")
  const onSignUp = (values: TSignUp) => {
    // signUp(email, password)
    alert(JSON.stringify(values, null, 2))
  }

  return (
    <Form
      onSubmit={onSignUp}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form className={css.form} onSubmit={handleSubmit}>
          <Field name="name" validate={composeValidators(required, minLength(2))}>
            {({ input, meta }) => (
              <div className={css.field}>
                <label>
                  Channel Name<ReqStar>*</ReqStar>
                </label>
                <input {...input} type="text" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="email" validate={composeValidators(required, minLength(3))}>
            {({ input, meta }) => (
              <div className={css.field}>
                <label>
                  Email<ReqStar>*</ReqStar>
                </label>
                <input {...input} type="text" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="password" validate={composeValidators(required, minLength(6))}>
            {({ input, meta }) => (
              <div className={css.field}>
                <label>
                  Password<ReqStar>*</ReqStar>
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input {...input} type={pwType} />
                  <EyeIco src={pwType === "text" ? eyeClose : eyeOpen} alt="show/hide" onClick={switchPwType} />
                </div>
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="author" validate={composeValidators(required, minLength(2))}>
            {({ input, meta }) => (
              <div className={css.field}>
                <label>
                  Channel Author<ReqStar>*</ReqStar>
                </label>
                <input {...input} type="text" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="info" validate={composeValidators(required, minLength(2))}>
            {({ input, meta }) => (
              <div className={css.field}>
                <label>
                  Channel Information<ReqStar>*</ReqStar>
                </label>
                <textarea {...input}></textarea>
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="country" validate={composeValidators(required)}>
            {({ input, meta }) => (
              <div className={css.field}>
                <label>
                  Select Country<ReqStar>*</ReqStar>
                </label>
                <textarea {...input}></textarea>
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="language" validate={composeValidators(required)}>
            {({ input, meta }) => (
              <div className={css.field}>
                <label>
                  Select Language<ReqStar>*</ReqStar>
                </label>
                <textarea {...input}></textarea>
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <button type="submit">Sign Up</button>
        </form>
      )}
    />
  )
}

export default RegisterForm
