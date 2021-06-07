import { FC, useEffect } from "react"
import { connect } from "react-redux"
import { getChannel } from "../../Store/channelReducer"
import { TChannel } from "../../Common/Types/TChannel"
import { TState } from "../../Store/store"
import { useRouteMatch } from "react-router-dom"
import { getChannelEvents } from '../../Store/channelReducer'
import { TEvent } from '../../Common/Types/TEvent'
import EventItem from '../Events/EventItem/EventItem'

type TProps = {
  channel: TChannel
  events: TEvent[]
  imgUrl: undefined | string
  getChannel: any
  getChannelEvents: any
}
type TParams = {
  id: string
}

const ChannelPage: FC<TProps> = ({ channel, events, imgUrl, getChannel, getChannelEvents }) => {
  const match = useRouteMatch()
  const { id } = match.params as TParams

  useEffect(() => {
    getChannel(id)
  }, [])

  useEffect(()=>{
    getChannelEvents(id)
  },[events])

  if (!channel) return <div>Loading...</div>

  return (
    <div>
      <div style={{ display: "flex" }}>
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
      <div style={{display:"flex", flexWrap:'wrap'}}>
        {events.map(event => <EventItem event={event} own={false} key={event.id}/>)}
      </div>
    </div>
  )
}

const mapStateToProps = (state: TState) => {
  return {
    channel: state.channel.channel,
    events: state.channel.events,
    imgUrl: state.channel.channelImage,
  }
}

export default connect(mapStateToProps, { getChannel, getChannelEvents })(ChannelPage)
