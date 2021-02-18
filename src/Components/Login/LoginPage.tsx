import { FC } from "react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import { Redirect } from 'react-router'

type TProps = {
  signUp: any
  signIn: any
  loggedIn: boolean
  error: any
}

const LoginPage: FC<TProps> = ({ signUp, signIn, loggedIn, error }) => {
  if(loggedIn) return <Redirect to="/mychannel" />
  return (
    <>
      <div>{error.code}</div>
      <div>{error.message}</div>
      <div style={{display:"flex", justifyContent:"center"}}>
        <RegisterForm signUp={signUp} />
        <LoginForm signIn={signIn} />
      </div>
    </>
  )
}

export default LoginPage
