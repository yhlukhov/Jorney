import Routes from './Routes/Routes'
import Navigation from './Components/Navigation/Navigation';
import styled from 'styled-components'
import './App.css'
import ekam from './Assets/Images/ekam.jpg'
import Router from './Routes/Router';

export default function App() {
  return(
    <AppSection>
      <Navigation />
      <Router />
    </AppSection>
  )
}


/// Styled Components ///

const AppSection = styled.section`
  height: 100vh;
  background-image: url(${ekam});
  background-size: cover;
  background-position: center;
`