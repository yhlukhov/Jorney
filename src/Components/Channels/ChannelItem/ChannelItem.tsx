import { connect } from "react-redux"
import styled from "styled-components"
import { TChannel } from "../../../Common/Types/TChannel"
import { NavLink } from "react-router-dom"
import heart from "../../../Assets/Images/heart.png"
import heartBookmarked from "../../../Assets/Images/heart_bookmarked.png"
import { actions } from "../../../Store/channelListReducer"
import { useState, useEffect } from "react"
import { storageAPI } from "../../../API/storageAPI"

type PropsType = {
  channel: TChannel
  setBookmark: any
}

const ChannelItem = ({ channel, setBookmark }: PropsType) => {
  const [img, setImg] = useState("")
  useEffect(() => {
    storageAPI.getImageUrl(channel.image).then(setImg)
  }, [])
  return (
    <ChannelArticle style={{ backgroundImage: `url(${img})` }}>
      <FavIcon
        src={channel.bookmark ? heartBookmarked : heart}
        alt=""
        onClick={() => {
          setBookmark(channel.id)
        }}
      />
      <ChannelInfo>
        <div>{channel.name}</div>
        <div>{channel.author}</div>
        <div>{channel.email}</div>
        <div>{channel.info}</div>
        <div>{channel.country.native}</div>
        <div>{channel.languages[0].native}</div>
        <NavLink to={{ pathname: `/channel/${channel.id}` }}>Open Channel Page</NavLink>
      </ChannelInfo>
    </ChannelArticle>
  )
}

export default connect(null, { ...actions })(ChannelItem)

const ChannelArticle = styled.article`
  width: 300px;
  min-height: 400px;
  margin: 10px;
  border: 1px solid lightcoral;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: 100% 100%;
  position: relative;
`

const FavIcon = styled.img`
  position: absolute;
  top: 3px;
  right: 5px;
`
const ChannelInfo = styled.div`
  width: 98%;
  height: 60%;
  margin: 3px 0 0 2px;
  padding: 5% 5%;
  border-radius: 7px;
  &:hover {
    background-color: #fff6f1e8;
    box-shadow: -3px 3px 3px lightgrey;
  }
`
