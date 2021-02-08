import { FunctionComponent } from "react";

type TProps = {
  signOut:any
}

const MyChannelPage: FunctionComponent<TProps> = ({signOut}) => {
  return (
    <div>
      MyChannel
      <button onClick={signOut}>Sign out</button>
    </div>
  )
}

export default MyChannelPage