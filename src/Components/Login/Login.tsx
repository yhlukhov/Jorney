import { FC } from "react"
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { signUp, signIn } from '../../Store/authReducer'
import { TState } from "../../Store/store";
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"

type TProps = {
  signUp: any
  signIn: any
  loggedIn: boolean
  error: any
}

const Login: FC<TProps> = ({ signUp, signIn, loggedIn, error }) => {
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

const mapStateToProps = (state:TState) => {
  return {
    loggedIn: state.auth.loggedIn,
    error: state.auth.error
  }
}

const ActionCreators = {
  signUp,
  signIn
}

export default connect(mapStateToProps, ActionCreators)(Login)

