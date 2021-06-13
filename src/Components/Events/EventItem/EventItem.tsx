import { FC, useState, useEffect } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import history from "../../../Common/Utils/history"
import { TEvent } from "../../../Common/Types/TEvent"
import { TLanguage } from "../../../Common/Types/TLanguage"
import heart from "../../../Assets/Images/heart.png"
import heartBookmarked from "../../../Assets/Images/heart_bookmarked.png"
import { setBookmark, deleteEvent } from "../../../Store/eventListReducer"
import { getChannelEvents, setEventToEdit } from "../../../Store/myChannelReducer"
import { storageAPI } from "../../../API/storageAPI"
import AlertDialog from "../../../Common/Components/AlertDialog"
import EditEventDialog from "./EditEventDialog"

type TProps = {
  event: TEvent
  deleteEvent: any
  setEventToEdit: any
  setBookmark: any
  getChannelEvents: any
  own: boolean // this is to indicate wether event relates to MyAccount page or to any other place (for further improvements)
}

export const renderLangs = (langs: Array<TLanguage>) => langs.reduce((acc, lang) => acc + lang.native + " ,", "").slice(0, -1)

const EventItem: FC<TProps> = ({ event, setEventToEdit, deleteEvent, getChannelEvents, setBookmark, own }) => {
  const [img, setImg] = useState("")
  const [openAlert, setOpenAlert] = useState(false)
  const [openEditEventModal, setOpenEditEventModal] = useState(false)
  useEffect(() => {
    storageAPI.getImageUrl(event.image).then(setImg)
  }, [])

  const onEditEvent = () => {
    setOpenEditEventModal(true)
    setEventToEdit(event)
  }

  const onCloseEditEventModal = () => {
    setOpenEditEventModal(false)
    setEventToEdit(null)
  }

  const onDeleteEvent = async () => {
    const channelId = event.channelId
    await deleteEvent(event.id)
    setOpenAlert(false)
    getChannelEvents(channelId)
  }

  return (
    <EventDiv>
      <EventImage
        style={{ backgroundImage: `url(${img})` }}
        onClick={() => {
          history.push(`channel/${event.channelId}`)
        }}
      />
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
        <EventText value={event.details} disabled />
      </EventInfo>
      <Buttons>
        <Link>
          <A href={event.link} target="_blank">
            Go To Event
          </A>
        </Link>
        {own && <Btn onClick={onEditEvent} style={{backgroundColor:"#9bbeff", borderColor: "cornflowerblue"}}>Edit</Btn>}
        {own && (
          <Btn
            onClick={() => {
              setOpenAlert(true)
            }}
            style={{backgroundColor:"#ff858d"}}
          >
            Delete
          </Btn>
        )}
      </Buttons>
      <EditEventDialog openModal={openEditEventModal} setOpenModal={setOpenEditEventModal} onCloseModal={onCloseEditEventModal} />
      <AlertDialog
        open={openAlert}
        setOpen={setOpenAlert}
        agree={onDeleteEvent}
        message={`Sure you want to delete event "${event.name}"?`}
      />
    </EventDiv>
  )
}

export default connect(null, { setEventToEdit, deleteEvent, getChannelEvents, setBookmark })(EventItem)

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
    transform: scale(101.5%);
  }
`
export const EventImage = styled.div`
  position: absolute;
  top: -40px;
  left: -40px;
  width: 100px;
  height: 100px;
  border: 1px solid lightskyblue;
  border-radius: 50%;
  background-size: 100% 100%;
  background-color: antiquewhite;
  transition-duration: 100ms;
  &:hover {
    border-width: 2px;
    cursor: pointer;
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
  &:hover {
    cursor: pointer;
  }
`
export const Title = styled.h3`
  font-weight: bold;
  padding: 0 0 20px 23px;
  &:hover {
    cursor: pointer;
    text-shadow: 1px 1px 1px #00000055;
  }
`
export const EventText = styled.textarea`
  width: 100%;
  background-color: transparent;
  border: none;
  resize: none;
`
const Buttons = styled.div`
  width: 80%;
  display: flex;
  margin-bottom: 10px;
`
const Link = styled.div`
  height: 40px;
  border: 1px solid lightskyblue;
  border-radius: 25px;
  flex-grow: 2;
`
const A = styled.a`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #70b5e0;
  border-radius: 25px;
  text-decoration: none;
  transition-duration: 200ms;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`
const Btn = styled.button`
  height: 40px;
  border: 1px solid lightskyblue;
  border-radius: 25px;
  flex-grow: 1;
`
