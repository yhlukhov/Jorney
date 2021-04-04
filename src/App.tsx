import { useEffect } from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components'
import Navigation from './Components/Navigation/Navigation';
import Router from './Routes/Router';
import { TState } from "./Store/store";
import { getLocalstorageChannel } from './Store/authReducer'
import ekam from './Assets/Images/ekam.jpg'
import './App.css'

type TProps = {
  loggedIn:boolean,
  getLocalstorageChannel:any
}

function App({loggedIn, getLocalstorageChannel}:TProps) {
  useEffect(()=>{
    getLocalstorageChannel()
  }, [])
  
  return(
    <AppSection>
      <Navigation />
      <Router />
    </AppSection>
  )
}

const mapStateToProps = (state:TState) => {
  return {
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps, {getLocalstorageChannel})(App)


/// Styled Components ///

const AppSection = styled.section`
  height: 100vh;
  background-image: url(${ekam});
  background-size: cover;
  background-position: center;
`