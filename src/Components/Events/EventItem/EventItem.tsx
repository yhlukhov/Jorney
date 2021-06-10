import { FC, useState, useEffect } from "react"
import styled from "styled-components"
import history from "../../../Common/Utils/history"
import { TEvent } from "../../../Common/Types/TEvent"
import { TLanguage } from "../../../Common/Types/TLanguage"
import heart from "../../../Assets/Images/heart.png"
import heartBookmarked from "../../../Assets/Images/heart_bookmarked.png"
import { setBookmark } from "../../../Store/eventListReducer"
import { connect } from "react-redux"
import { storageAPI } from "../../../API/storageAPI"

type TProps = {
  event: TEvent
  setBookmark: any
  own: boolean // this is to indicate wether event relates to MyAccount page or to any other place (for further improvements)
}

export const renderLangs = (langs: Array<TLanguage>) => langs.reduce((acc, lang) => acc + lang.native + " ,", "").slice(0, -1)

const EventItem: FC<TProps> = ({ event, setBookmark, own }) => {
  const [img, setImg] = useState("")
  useEffect(() => {
    storageAPI.getImageUrl(event.image).then(setImg)
  }, [])

  return (
    <EventDiv>
      <ImageDiv style={{ backgroundImage: `url(${img})`}} onClick={()=>{history.push(`channel/${event.channelId}`)}} />
      <FavIcon src={event.bookmark ? heartBookmarked : heart} alt="bookmark" onClick={() => setBookmark(event.id)} />
      <EventInfo>
        <Title
          onClick={() => {
            history.push(`/event/${event.id}`)
          }}
        >
          {event.name}
        </Title>
        <div>{event.author}</div>
        <div>{event.datetime.toLocaleString()} </div>
        <div>{renderLangs(event.languages)}</div>
        <div>
          <a href={event.link} target="_blank">
            LINK
          </a>
        </div>
      </EventInfo>
    </EventDiv>
  )
}

export default connect(null, { setBookmark })(EventItem)

//Styled Components

export const EventDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 300px;
  margin: 25px;
  border: 1px solid skyblue;
  border-radius: 5px;
  background-color: whitesmoke;
  position: relative;
  box-shadow: 2px 2px 2px #5b8ba852;
  &:hover {
    transform: scale(102%);
  }
`
export const ImageDiv = styled.div`
  position: absolute;
  top: -40px;
  left: -40px;
  width: 100px;
  height: 100px;
  border: 1px solid lightskyblue;
  border-radius: 50%;
  background-size: 100% 100%;
  background-color: antiquewhite;
  &:hover {
    border-width: 2px;
  }
`
export const EventInfo = styled.div`
  width: 100%;
  height: 100%;
  padding: 35px 10px 10px 30px;
  border-radius: 5px;
`
export const FavIcon = styled.img`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 12%;
`
export const Title = styled.h3`
  font-weight: bold;
  padding: 0 0 20px 23px;
  &:hover {
    cursor: pointer;
  }
`
