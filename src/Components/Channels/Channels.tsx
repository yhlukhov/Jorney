import { useEffect } from "react"
import { connect } from 'react-redux'
import styled from "styled-components"
import AOS from 'aos'
import 'aos/dist/aos.css'
import ChannelItem from "./ChannelItem/ChannelItem"
import { TChannel } from "../../Common/Types/TChannel"
import { getChannels } from '../../Store/channelListReducer'
import { TState } from '../../Store/store'

type PropsType = {
  channels: Array<TChannel>
  getChannels: any
}

const Channels = ({ channels, getChannels }: PropsType) => {
  const channelsListJSX = channels.map((channel) => <ChannelItem channel={channel} key={channel.id} />)
  useEffect(() => {
    getChannels()
    AOS.init({duration:800})
  }, [])
  if(!channels.length) return <div style={{fontSize:"40px"}}>Loading...</div>
  return <ChannelsSection data-aos="fade-up">{channelsListJSX}</ChannelsSection>
}

const mapStateToProps = (state:TState) => {
  return {
    channels: state.channels.channelsList
  }
}

const actionCreators = {
  getChannels
}

export default connect(mapStateToProps, actionCreators)(Channels)

//* STYLED COMPONENTS
const ChannelsSection = styled.section`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`
