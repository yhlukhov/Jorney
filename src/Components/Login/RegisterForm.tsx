import { FC, useState, InputHTMLAttributes } from "react"
import { Form, Field } from "react-final-form"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Checkbox from "@material-ui/core/Checkbox"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { composeValidators, required, minLength, maxImgSize } from "../../Common/validators"
import eyeOpen from "../../Assets/Images/eye_open.png"
import eyeClose from "../../Assets/Images/eye_close.png"
import { EyeIco, FieldErr } from "../../Common/StyledComponents/index"
import css from "./form.module.css"
import { countries, international } from "../../Common/Data/Countries"
import { languages } from "../../Common/Data/Languages"
import { TCountry } from "../../Common/Types/TCountry"
import { TLanguage } from "../../Common/Types/TLanguage"
import { signUp } from '../../Store/authReducer'
import { TState } from "../../Store/store"
import { connect } from "react-redux"

type TProps = {
  signUp: any
  error: any
}
export type TSignUp = {
  name: string
  email: string
  password: string
  author: string
  info: string
  images: FileList
  country: TCountry
  language: Array<TLanguage>
}
interface IFile extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
      maxWidth: 400,
    },
    countryFirst: {
      position: "relative",
      "&::before": {
        position: "absolute",
        content: '"Select country first"',
        width: "fit-content",
        top: "-5px",
        left: "50px",
        color: "red",
        fontSize: "small",
        opacity: "0",
        transition: "0.2s",
      },
      "&:hover:before": {
        visibility: "visible",
        top: "-17px",
        left: "50px",
        opacity: "1",
        transition: "0.2s",
      },
    },
  })
)

const FileField = ({ name }: IFile) => (
  <Field<FileList> name={name} validate={composeValidators(required, maxImgSize(2000000))}>
    {({ input: { value, onChange, ...input }, meta }) => (
      <div>
        <input
          {...input}
          type="file"
          accept="image/*"
          onChange={({ target }) => onChange(target.files)} // instead of the default target.value
        />
        {meta.error && meta.touched && <FieldErr>{meta.error}</FieldErr>}
      </div>
    )}
  </Field>
)

const RegisterForm: FC<TProps> = ({ signUp, error }) => {
  const [pwType, setPwType] = useState("password")
  const switchPwType = () => setPwType(pwType === "text" ? "password" : "text")
  const classes = useStyles()
  const onSignUp = (values: TSignUp) => {
    const { name, email, password, author, info, images, country, language } = { ...values }
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
                  <label>Channel Name</label>
                  <input {...input} type="text" />
                  {meta.error && meta.touched && <FieldErr>{meta.error}</FieldErr>}
                </div>
              )
            }}
          </Field>
          <Field name="email" validate={composeValidators(required, minLength(3))}>
            {({ input, meta }) => (
              <div className={css.field}>
                <label>Email</label>
                <input {...input} type="text" />
                {meta.error && meta.touched && <FieldErr>{meta.error}</FieldErr>}
              </div>
            )}
          </Field>
          <Field name="password" validate={composeValidators(required, minLength(6))}>
            {({ input, meta }) => (
              <div className={css.field}>
                <label>Password</label>
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
                <label>Channel Author</label>
                <input {...input} type="text" />
                {meta.error && meta.touched && <FieldErr>{meta.error}</FieldErr>}
              </div>
            )}
          </Field>
          <Field name="info" validate={composeValidators(required, minLength(2))}>
            {({ input, meta }) => (
              <div className={css.field}>
                <label>Channel Information</label>
                <textarea {...input}></textarea>
                {meta.error && meta.touched && <FieldErr>{meta.error}</FieldErr>}
              </div>
            )}
          </Field>

          <Field name="country" validate={composeValidators(required)}>
            {({ input, meta }) => (
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel>Select Country</InputLabel>
                <Select {...input}>
                  {/* @ts-ignore */}
                  <MenuItem value={international}>
                    <span style={{ fontWeight: "bold" }}>{international.name}</span>
                  </MenuItem>
                  {countries.map((country) => (
                    // @ts-ignore
                    <MenuItem value={country} key={country.code}>
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
              <FormControl
                variant="filled"
                required
                disabled={!values.country}
                className={`${classes.formControl} ${!values.country && classes.countryFirst}`}
              >
                <InputLabel>Select languages</InputLabel>
                <Select
                  {...input}
                  value={values.language || ([] as Array<TLanguage>)}
                  renderValue={(selected) =>
                    (selected as Array<TLanguage>).reduce((stack, curr) => {
                      return stack + ` ${curr.native}, `
                    }, "")
                  }
                  multiple
                >
                  {values.country?.languages.map((langCode) => {
                    const lang = languages.find((language) => language.code === langCode)
                    return (
                      //@ts-ignore
                      <MenuItem key={lang?.code} value={lang || {}}>
                        <Checkbox checked={values.language ? (lang ? values.language.indexOf(lang) > -1 : false) : false} />
                        <span style={{ fontWeight: "bold" }}>
                          {lang?.name}
                          {lang?.name !== lang?.native && <span style={{ color: "grey", fontSize: "small" }}>({lang?.native})</span>}
                        </span>
                      </MenuItem>
                    )
                  })}
                  {languages
                    .filter((lang) => values.country && values.country.languages.indexOf(lang.code) === -1)
                    .map((lang) => (
                      //@ts-ignore
                      <MenuItem key={lang.code} value={lang}>
                        <Checkbox checked={values.language ? (lang ? values.language.indexOf(lang) > -1 : false) : false} />
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
          <div>{error.message}</div>
        </form>
      )}
    />
  )
}

const mapStateToProps = (state: TState) => {
  return {
    error: state.auth.signUpError
  }
}

export default connect(mapStateToProps, {signUp})(RegisterForm)
