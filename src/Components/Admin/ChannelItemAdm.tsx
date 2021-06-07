import { FC, useState, useEffect } from 'react'
import { connect } from "react-redux"
import { TChannelAdm } from "../../Common/Types/TChannelAdm"
import { TState } from "../../Store/store"
import { getEventsByChannelId, hideEvents, approveChannel, lockChannel, approveEvent, lockEvent } from '../../Store/adminReducer'
import { storageAPI } from '../../API/storageAPI'
import { Route, NavLink } from 'react-router-dom'

type TProps = {
  channel: TChannelAdm
  getEventsByChannelId:any
  hideEvents:any 
  approveChannel:any 
  lockChannel:any 
  approveEvent:any 
  lockEvent:any
  channels: Array<TChannelAdm>
}

const ChannelItemAdm: FC<TProps> = ({ channel, getEventsByChannelId, hideEvents, approveChannel, lockChannel, approveEvent, lockEvent, channels  }) => {
  const [image, setImage] = useState('')
  useEffect(() => {
    storageAPI.getImageUrl(channel.channel.image).then(setImage)
  }, [])
  return (
    <div style={{ border: "1px solid lightcoral" }} key={channel.channel.id}>
      <NavLink to={`/channel/${channel.channel.id}`}>{channel.channel.name}</NavLink>
      
      <img src={image} alt="img" style={{display:"inline-block", width:"40px"}} />
      {!channel.expanded && <button onClick={() => getEventsByChannelId(channel.channel.id)}>Show events</button>}
      {channel.expanded && <button onClick={() => hideEvents(channel)}>Hide events</button>}
      {!channel.channel.approved && <button onClick={() => approveChannel(channel.channel.id)}>Approve</button>}
      {channel.channel.approved && <button onClick={() => lockChannel(channel.channel.id)}>Lock</button>}
      <button onClick={() => console.log('remove channel: ', channel.channel.id)}>Remove</button>
      {channel.expanded && (
        <div>
          {channel.events.map((event) => (
            <div key={event.id}>
              <NavLink to={`/events/${event.id}`}>{event.name}</NavLink>
              {!event.approved && <button onClick={() => approveEvent(event.id)}>Approve</button>}
              {event.approved && <button onClick={() => lockEvent(event.id)}>Lock</button>}
              <button>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state:TState) => {
  return {
    channels: state.admin.channels
  }
}

export default connect(mapStateToProps, {getEventsByChannelId, hideEvents, approveChannel, lockChannel, approveEvent, lockEvent})(ChannelItemAdm) 