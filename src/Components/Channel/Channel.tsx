import { FC, useEffect } from 'react'
import { connect } from "react-redux";
import { getChannel } from '../../Store/channelReducer'
import { TChannel } from '../../Common/Types/TChannel'
import { TState } from '../../Store/store'

const ChannelPage: FC<any> = (props) => {

  useEffect(()=>{
    //? if(!id) id = getIdFromUrl() // need to test if this is required to open channel page by link
    console.log(props)
    
  },[])

  return (
    <div>
      {/* <div>{channel.name}</div>
      <div>{channel.id}</div>
      <div>{channel.author}</div>
      <div>{channel.email}</div> */}
    </div>
  )
}

const mapStateToProps = (state:TState) => {
  return {
    channel: state.channel.channel
  }
}

const actionCreators = {
  getChannel
}

export default connect(mapStateToProps, actionCreators)(ChannelPage)



type TProps = {
  channel: TChannel
  getChannel: any
}