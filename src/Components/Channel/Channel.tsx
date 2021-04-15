import { FC, useEffect } from "react"
import { connect } from "react-redux"
import { getChannel } from "../../Store/channelReducer"
import { TChannel } from "../../Common/Types/TChannel"
import { TState } from "../../Store/store"
import { useRouteMatch } from "react-router-dom"

type TProps = {
  channel: TChannel
  imgUrl: undefined | string
  getChannel: any
}
type TParams = {
  id: string
}

const ChannelPage: FC<TProps> = ({ channel, imgUrl, getChannel }) => {
  const match = useRouteMatch()
  const { id } = match.params as TParams
  useEffect(() => {
    getChannel(id)
  }, [])

  return (
    <div style={{display:"flex"}}>
      <img src={imgUrl} alt="loading..." style={{ height: "400px" }} />
      <div>
        <div>{channel.name}</div>
        <div>{channel.id}</div>
        <div>{channel.author}</div>
        <div>{channel.email}</div>
        <div>{channel.approved}</div>
        <div>{channel.country?.native}</div>
        <div>{channel.info}</div>
        <div>{channel.languages?.reduce((acc, val) => acc + val.native + ",", "").slice(0, -1)}</div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: TState) => {
  return {
    channel: state.channel.channel,
    imgUrl: state.channel.channelImage,
  }
}

export default connect(mapStateToProps, { getChannel })(ChannelPage)
