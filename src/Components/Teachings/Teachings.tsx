import { FunctionComponent } from "react";
import {teachings, count} from '../../Common/Data/teachings'
import { random } from '../../Common/functions'
import styled from 'styled-components'

const Teachings: FunctionComponent = () => {
  const id = random(count)
  return (
    <div style={{width: "100%", textAlign:"center", margin: "10px 10px 10px -210px"}}>
      {/* <Teaching>{teachings[id].ru}</Teaching> */}
      <Teaching>{teachings[id].en}</Teaching>
    </div>
  )
}

export default Teachings

const Teaching = styled.div`
  /* font-family: 'HangingLetters'; */
  font-size: 30px;
`