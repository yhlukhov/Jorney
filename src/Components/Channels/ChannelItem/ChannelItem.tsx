import { connect } from "react-redux"
import styled from "styled-components"
import { TChannel } from "../../../Common/Types/TChannel"
import history from "../../../Common/Utils/history"
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
    <ChannelDiv>
      <ChannelImage style={{ backgroundImage: `url(${img})` }} onClick={()=>{history.push(`/channel/${channel.id}`)}} />
      <FavIcon
        src={channel.bookmark ? heartBookmarked : heart}
        alt=""
        onClick={() => {
          setBookmark(channel.id)
        }}
      />
      <ChannelInfo>
        <Title onClick={()=>{history.push(`/channel/${channel.id}`)}}>{channel.name}</Title>
        <div>Author: {channel.author}</div>
        <div>Email: {channel.email}</div>
        <div>Country: {channel.country.native}</div>
        <div>Language: {channel.languages[0].native}</div>
        <div>{channel.info}</div>
      </ChannelInfo>
      <Link onClick={()=>history.push(`/channel/${channel.id}`)}>Go To Channel Page</Link>
    </ChannelDiv>
  )
}

export default connect(null, { ...actions })(ChannelItem)

const ChannelDiv = styled.div`
  width: 350px;
  min-height: 350px;
  margin: 50px 10px 10px;
  border: 1px solid lightskyblue;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: whitesmoke;
  background-size: 100% 100%;
  position: relative;
  &:hover{
    transform: scale(101%);
  }
`

const ChannelImage = styled.div`
  position: absolute;
  top: -60px;
  left: 105px;
  width: 140px;
  height: 140px;
  border: 1px solid lightskyblue;
  border-radius: 50%;
  background-size: 100% 100%;
  background-color: antiquewhite;
  &:hover {
    border-width: 2px;
    cursor: pointer;
  }
`

const ChannelInfo = styled.div`
  width: 100%;
  height: 100%;
  padding: 90px 20px 10px 20px;
  border-radius: 8px;
`

const FavIcon = styled.img`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 12%;
  &:hover{
    cursor: pointer;
  }
`

const Title = styled.h3`
  font-weight: bold;
  padding-bottom: 25px;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`

const Link = styled.div`
  position: absolute;
  bottom: 10px;
  width: 80%;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightskyblue;
  border-radius: 25px;
  color: #70b5e0;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`