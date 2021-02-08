import { FC, useState } from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type TProps = {
  signUp:any
  signIn:any
}

const LoginPage: FC<TProps> = ({signUp, signIn}) => {
  const [switchView, setSwitchView] = useState(true)

  return (
    <>
      { switchView && <RegisterForm signUp={signUp} /> }
      { !switchView && <LoginForm signIn={signIn} /> }
      <SwitchLink onClick={()=>setSwitchView(!switchView)}>{`Switch to ${switchView ? 'Login' : 'Registration'}`}</SwitchLink>
    </>
  )
}

export default LoginPage


const SwitchLink = styled.div`
  border: 1px solid lightcoral;
  border-radius: 5px;
  width:fit-content;
  margin: 10px;
  cursor: pointer;
  background-color: rgba(240, 128, 128, 0.2);
`