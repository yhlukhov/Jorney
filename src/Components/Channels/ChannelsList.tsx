import { useEffect } from "react"
import { TChannel } from "../../Common/Types/TChannel"
import styled from "styled-components"
import ChannelItem from "./ChannelItem/ChannelItem"

type PropsType = {
  channels: Array<TChannel>
  getChannels: any
}

const ChannelsList = ({ channels, getChannels }: PropsType) => {
  const channelsListJSX = channels.map((channel) => <ChannelItem channel={channel} key={channel.id} />)
  useEffect(() => {
    getChannels()
  }, [])
  return <ChannelsSection>{channelsListJSX}</ChannelsSection>
}

export default ChannelsList

const ChannelsSection = styled.section`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`
