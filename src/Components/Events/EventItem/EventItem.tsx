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
    <EventDiv style={{ backgroundImage: `url(${img})`}}>
      <FavIcon src={event.bookmark ? heartBookmarked : heart} alt="bookmark" onClick={() => setBookmark(event.id)} />
      <EventInfo>
        <div
          onClick={() => {
            history.push(`events/${event.id}`)
          }}
        >
          {event.name}
        </div>
        <div>{event.author}</div>
        <div>{event.channelName}</div>
        <div>{event.datetime.toLocaleString()} </div>
        <div>{event.duration}</div>
        <EventText value={event.details} disabled />
        <div>{event.country.native}</div>
        <div>{event.channelName}</div>
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
  width: 250px;
  height: 350px;
  margin: 10px;
  border: 1px solid salmon;
  border-radius: 8px;
  background-size: 100% 100%;
  position: relative;
`
export const FavIcon = styled.img`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 12%;
`
export const EventInfo = styled.div`
  width: 98%;
  height: 99%;
  margin: 2px;
  padding: 5% 5%;
  border-radius: 7px;
  transition-duration: 200ms;
  &:hover {
    background-color: #fff6f1e8;
    box-shadow: -2px 2px 2px lightgrey;
  }
`
export const EventText = styled.textarea`
  background-color: transparent;
  border-radius: 5px;
  resize: none;
`
