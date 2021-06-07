import { FC } from "react"
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { signUp } from '../../Store/authReducer'
import { TState } from "../../Store/store";
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import styled from "styled-components";
import loginImg from '../../Assets/Images/login.jpg'
import signupImg from '../../Assets/Images/signup.jpg'

type TProps = {
  loggedIn: boolean
}

const Login: FC<TProps> = ({ loggedIn }) => {
  if(loggedIn) return <Redirect to="/mychannel" />
  return (
    
      <FormDiv>
        <RegDiv>
          <h1>Sign Up</h1>
          <RegisterForm />
        </RegDiv>
        <LoginDiv>
          <h1>Sign In</h1>
          <LoginForm />
        </LoginDiv>
      </FormDiv>
    
  )
}

const mapStateToProps = (state:TState) => {
  return {
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps)(Login)


// Styled Components //

const FormDiv = styled.div`
  display: flex;
  justify-content: center;
`

const RegDiv = styled.div`
  padding: 20px;
  background-image: url(${signupImg});
  background-size: cover;
  box-shadow: -2px 2px 2px #e7e07b81;
`

const LoginDiv = styled.div`
  padding: 25px;
  background-image: url(${loginImg});
  background-size: cover;
  box-shadow: 2px 2px 2px #78e6e188;
`