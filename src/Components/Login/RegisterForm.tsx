import { Form, Field } from "react-final-form"
import { FC, useState, InputHTMLAttributes } from "react"
import { composeValidators, required, minLength } from "./validators"
import { ReqStar } from "../../Common/StyledComponents"
import eyeOpen from "../../Assets/Images/eye_open.png"
import eyeClose from "../../Assets/Images/eye_close.png"
import { EyeIco, FieldErr } from '../../Common/StyledComponents/index'
import css from "./form.module.css"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { countries } from '../../Common/Data/Countries'
import { languages } from '../../Common/Data/Languages'
import { TCountry } from '../../Common/Types/TCountry'
import { TLanguage } from '../../Common/Types/TLanguage'

type TProps = {
  signUp:any
}
export type TSignUp = {
  name: string
  email: string
  password: string
  author: string
  info: string
  images: FileList
  country: TCountry
  language: TLanguage
}
interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}
const FileField = ({ name, ...props }: Props) => (
  <Field<FileList> name={name} validate={composeValidators(required)}>
    {({ input: { value, onChange, ...input } }) => (
      <input
        {...input}
        type="file"
        accept="image/*"
        onChange={({ target }) => onChange(target.files)} // instead of the default target.value
        {...props}
      />
    )}
  </Field>
)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    countryFirst: {
      position: "relative",
      '&::before': {
        position: 'absolute',
        content: '"Select country first"',
        width: 'fit-content',
        top: "-5px",
        left: "50px",
        fontSize: 'small',
        opacity: '0',
        transition: '0.2s'
      },
      '&:hover:before': {
        visibility: 'visible',
        top: "-17px",
        left: "50px",
        opacity: '1',
        transition: '0.2s'
      }
    }
  })
)

const RegisterForm: FC<TProps> = ({ signUp }) => {
  const [pwType, setPwType] = useState("password")
  const switchPwType = () => setPwType(pwType === "text" ? "password" : "text")
  const classes = useStyles()

  const onSignUp = (values: TSignUp) => {
    const { name, email, password, author, info, images, country, language } = {...values}
    signUp(name, email, password, author, info, images, country, language)
  }

  return (
    <Form
      onSubmit={onSignUp}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form className={css.form} onSubmit={handleSubmit}>
          <Field name="name" validate={composeValidators(required, minLength(2))}>
            {({ input, meta }) => {
              return (
                <div className={css.field}>
                  <label>
                    Channel Name<ReqStar>*</ReqStar>
                  </label>
                  <input {...input} type="text" />
                  {meta.error && meta.touched && <FieldErr>{meta.error}</FieldErr>}
                </div>
              )
            }}
          </Field>
          <Field name="email" validate={composeValidators(required, minLength(3))}>
            {({ input, meta }) => (
              <div className={css.field}>
                <label>
                  Email<ReqStar>*</ReqStar>
                </label>
                <input {...input} type="text" />
                {meta.error && meta.touched && <FieldErr>{meta.error}</FieldErr>}
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
                {meta.error && meta.touched && <FieldErr>{meta.error}</FieldErr>}
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
                {meta.error && meta.touched && <FieldErr>{meta.error}</FieldErr>}
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
                {meta.error && meta.touched && <FieldErr>{meta.error}</FieldErr>}
              </div>
            )}
          </Field>

          <Field name="country" validate={composeValidators(required)}>
            {({ input, meta }) => (
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel>
                  Select Country<ReqStar>*</ReqStar>
                </InputLabel>
                <Select {...input} value={values.country || ""}>
                  {countries.map((country) => (
                    // @ts-ignore
                    <MenuItem key={country.code} value={country}>
                      {country.name}
                      {country.name !== country.native && <span style={{ color: "grey", fontSize: "small" }}>({country.native})</span>}
                    </MenuItem>
                  ))}
                </Select>
                {meta.error && meta.touched && <FieldErr>{meta.error}</FieldErr>}
              </FormControl>
            )}
          </Field>

          <Field name="language" validate={composeValidators(required)}>
            {({ input, meta }) => (
              <FormControl variant="filled" className={classes.formControl} disabled={!values.country}>
                <InputLabel>Select language<ReqStar>*</ReqStar></InputLabel>
                <Select className={values.country ? undefined : classes.countryFirst}
                  {...input}
                  value={values.language || ''}
                >
                  {values.country?.languages.map((lan) => {
                    const lang = languages.find(language => language.code === lan )
                    return (
                    //@ts-ignore
                    <MenuItem key={lang?.code} value={lang}>
                      {lang?.name}
                      {lang?.name !== lang?.native && <span style={{ color: "grey", fontSize: "small" }}>({lang?.native})</span>}
                    </MenuItem>
                  )})}
                  {languages.map((lang) => (
                    //@ts-ignore
                    <MenuItem key={lang.code} value={lang}>
                      {lang.name}
                      {lang.name !== lang.native && <span style={{ color: "grey", fontSize: "small" }}>({lang.native})</span>}
                    </MenuItem>
                  ))}
                </Select>
                {meta.error && meta.touched && <FieldErr>{meta.error}</FieldErr>}
              </FormControl>
            )}
          </Field>
          <FileField name="images" />
          <button type="submit">Sign Up</button>
        </form>
      )}
    />
  )
}

export default RegisterForm