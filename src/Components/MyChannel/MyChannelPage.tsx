import { FunctionComponent } from "react"
import { Redirect } from "react-router"
import { TChannel } from "../../Common/Types/TChannel"

type TProps = {
  channel: TChannel | undefined
  imgUrl: string | undefined
  signOut: any
  loggedIn: boolean
}

const MyChannelPage: FunctionComponent<TProps> = ({ channel, imgUrl, signOut, loggedIn }) => {
  if (!loggedIn) return <Redirect to="login" />
  return (
    <div style={{display:'flex'}}>
      <div>
        <img src={imgUrl} alt="avatar" width="200px" />
        <div>{channel?.image}</div>
      </div>
      <div>
        <div>{channel?.name}</div>
        <div>{channel?.country.native}</div>
        <div>{channel?.author}</div>
        <div>{channel?.email}</div>
        <div>{channel?.language.native}</div>
        <div>{channel?.info}</div>
        {/* <div>{channel.id}</div> */}
        <button onClick={signOut}>Sign out</button>
      </div>
    </div>
  )
}

export default MyChannelPage
