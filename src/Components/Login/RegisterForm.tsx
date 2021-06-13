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
import imgFile from "../../Assets/Images/picture.png"
import { EyeIco, FieldErr } from "../../Common/StyledComponents/index"
import css from "./form.module.css"
import { countries, international } from "../../Common/Data/Countries"
import { languages } from "../../Common/Data/Languages"
import { TCountry } from "../../Common/Types/TCountry"
import { TLanguage } from "../../Common/Types/TLanguage"
import { signUp } from "../../Store/authReducer"
import { TState } from "../../Store/store"
import { connect } from "react-redux"
import styled from "styled-components"

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
        left: "5px",
        color: "red",
        fontSize: "small",
        opacity: "0",
        transition: "0.2s", //? do i need it?
      },
      "&:hover:before": {
        visibility: "visible",
        top: "-12px",
        left: "5px",
        opacity: "1",
        transition: "0.2s", //? do i need it?
      },
    },
  })
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
                  <Input {...input} type="text" />
                  {meta.error && meta.touched && <FieldErr>{meta.error}</FieldErr>}
                </div>
              )
            }}
          </Field>
          <Field name="email" validate={composeValidators(required, minLength(3))}>
            {({ input, meta }) => (
              <div className={css.field}>
                <label>Email</label>
                <Input {...input} type="text" />
                {meta.error && meta.touched && <FieldErr>{meta.error}</FieldErr>}
              </div>
            )}
          </Field>
          <Field name="password" validate={composeValidators(required, minLength(6))}>
            {({ input, meta }) => (
              <div className={css.field}>
                <label>Password</label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Input {...input} type={pwType} />
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
                <Input {...input} type="text" />
                {meta.error && meta.touched && <FieldErr>{meta.error}</FieldErr>}
              </div>
            )}
          </Field>
          <Field name="info" validate={composeValidators(required, minLength(2))}>
            {({ input, meta }) => (
              <div className={css.field}>
                <label>Channel Information</label>
                <Textarea {...input}></Textarea>
                {meta.error && meta.touched && <FieldErr>{meta.error}</FieldErr>}
              </div>
            )}
          </Field>

          <Field name="country" validate={composeValidators(required)}>
            {({ input, meta }) => (
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel>Select Country</InputLabel>
                <Select {...input} style={selectCss}>
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
                  style={selectCss}
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
          {values.images && <Img src={URL.createObjectURL(values.images[0])} />}
          <FileField name="images" />
          <SignUp type="submit">Register Channel</SignUp>
          <div>{error.message}</div>
        </form>
      )}
    />
  )
}

const mapStateToProps = (state: TState) => {
  return {
    error: state.auth.signUpError,
  }
}

export default connect(mapStateToProps, { signUp })(RegisterForm)

//* Select File Field component:

const FileField = ({ name }: IFile) => (
  <Field<FileList> name={name} validate={composeValidators(required, maxImgSize(2000000))}>
    {({ input: { value, onChange, ...input }, meta }) => (
      <FileDiv>
        <ImgIco src={imgFile} alt="" />
        <FileText>Select Channel Picture (size:1x1)</FileText>
        <input
          {...input}
          type="file"
          accept="image/*"
          className={css.fileInput}
          onChange={({ target }) => {
            onChange(target.files)
          }}
        />
        {meta.error && meta.touched && <FieldErr>{meta.error}</FieldErr>}
      </FileDiv>
    )}
  </Field>
)

const Input = styled.input`
  width: 100%;
  height: 35px;
  border: 1px solid lightskyblue;
  border-radius: 8px;
`
const Textarea = styled.textarea`
  width: 100%;
  min-height: 70px;
  padding: 5px 10px;
  margin-bottom: 5px;
  border: 1px solid lightskyblue;
  border-radius: 8px;
  resize: vertical;
  &:focus {
    outline: none;
  }
`
const Img = styled.img`
  
  width: 325px;
  height: 325px;
  border: 1px solid lightskyblue;
  border-radius: 15px;
`
const FileDiv = styled.div`
  position: relative;
  width: 325px;
  height: 40px;
  margin: 10px auto;
  border: 1px solid lightskyblue;
  border-radius: 8px;
  background-color: #ffb38f7a;
`
const FileText = styled.div`
  position: absolute;
  width: 325px;
  height: 40px;
  left: 48px;
  padding-top: 8px;
`
const ImgIco = styled.img`
  position: absolute;
  height: 40px;
`
const SignUp = styled.button`
  width: 325px;
  height: 45px;
  margin-top: 10px;
  border: 1px solid lightskyblue;
  border-radius: 8px;
  background-color: #ffb38f7a;
`

const selectCss =  {backgroundColor: "#ffffffb0", width: "105%", marginTop: "5px", marginLeft: "-7px"}