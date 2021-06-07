import { FC, useEffect, useState } from 'react'
import { connect } from "react-redux"
import { TState } from "../../Store/store"
import ChannelItem from "./ChannelItemAdm"
import {
  getAllChannels,
  getEventsByChannelId,
  approveChannel,
  lockChannel,
  approveEvent,
  lockEvent,
  hideEvents,
} from "../../Store/adminReducer"
import { TChannelAdm } from "../../Common/Types/TChannelAdm"
import { getAllEvents } from '../../Store/adminReducer'

type TProps = {
  channels: Array<TChannelAdm>
  getAllChannels: any
  getAllEvents:any
}

const ChannelList: FC<TProps> = ({channels, getAllChannels, getAllEvents}) => {
  const [searchTerm, setSearchTerm] = useState('') //!redo with redux and apply to ChannelItem events list filter
  useEffect(() => {
    getAllChannels()
  }, [])
  return (
    <div>
      <div>
        <span>Fiter</span>
        <span><input type="text" placeholder="Search..." onChange={(e)=>setSearchTerm(e.target.value)} /></span>
        <button onClick={getAllEvents} style={{border:"1px solid coral", borderRadius:"3px"}}>Load all events</button>
      </div>
      {channels.filter(channel => channel.channel.name.includes(searchTerm)).map(channel => { 
        return (
          <ChannelItem channel={channel} />
        )
      })}
    </div>
  )
}

const mapStateToProps = (state: TState) => {
  return {
    channels: state.admin.channels,
  }
}

export default connect(mapStateToProps, {getAllChannels, getAllEvents})(ChannelList)
