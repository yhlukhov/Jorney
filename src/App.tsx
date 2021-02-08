import Routes from './Routes/Routes'
import Navigation from './Components/Navigation/Navigation';
import styled from 'styled-components'
import ekam from './Assets/Images/ekam.jpg'

export default function App() {
  return(
    <AppSection>
      <Navigation />
      <Routes />
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