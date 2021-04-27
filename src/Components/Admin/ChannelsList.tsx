import { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { TChannel } from '../../Common/Types/TChannel'
import { TState } from '../../Store/store'
import { getAllChannels } from '../../Store/adminReducer'

type TProps = {
  channels: Array<TChannel>
  getAllChannels: any
}

const ChannelsList:FC<TProps> = ({channels, getAllChannels}) => {
  useEffect(()=>{
    getAllChannels()
  },[])
  return (
    <div>{channels.map(channel => (
      <div>{channel.name}</div>
    ))}</div>
  )
}

const mapStateToProps = (state:TState) => {
  return {
    channels: state.admin.channels
  }
}

export default connect(mapStateToProps, {getAllChannels})(ChannelsList)