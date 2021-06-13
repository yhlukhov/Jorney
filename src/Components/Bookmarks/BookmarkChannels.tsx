import { FC, useState, useEffect } from 'react'
import { connect } from "react-redux"
import { TChannel } from "../../Common/Types/TChannel"
import AOS from "aos"
import "aos/dist/aos.css"
import { TState } from "../../Store/store"
import ChannelItem from "../Channels/ChannelItem/ChannelItem"
import styled from "styled-components"
import { loadBookmarkChannels } from '../../Store/bookmarksReducer'

type TProps = {
  channels: Array<TChannel>
  loadBookmarkChannels: any
}

const BookmarkChannels: FC<TProps> = ({ channels, loadBookmarkChannels }) => {

  useEffect(()=>{
    loadBookmarkChannels()
    AOS.init({ duration: 800 })
  }, [])

  return (
    <Content>
      <Channels data-aos="fade-up"> 
        {channels?.map((channel) => (
          <ChannelItem channel={channel} key={channel.id} />
        ))}
      </Channels>
    </Content>
  )
}

const mapStateToProps = (state: TState) => {
  return {
    channels: state.bookmarks.channels,
  }
}

export default connect(mapStateToProps, {loadBookmarkChannels})(BookmarkChannels)

const Content = styled.div`
  margin: 15px 25px 10px 15px;
`

const Channels = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`