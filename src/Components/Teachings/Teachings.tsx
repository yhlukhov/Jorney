import { FunctionComponent } from "react";
import {teachings, count} from '../../Common/Data/teachings'
import { random } from '../../Common/functions'

const Teachings: FunctionComponent = () => {
  const id = random(count)
  return (
    <div style={{width:"70%", textAlign:"center", margin: "10px"}}>
      <div>{teachings[id].ru}</div>
      <div>{teachings[id].en}</div>
    </div>
  )
}

export default Teachings