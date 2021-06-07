import { FC, useEffect, useState } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router"
import AOS from "aos"
import "aos/dist/aos.css"
import { TState } from "../../Store/store"
import { signOut, getChannelImgUrl } from "../../Store/authReducer"
import { TChannel } from "../../Common/Types/TChannel"
import { getChannelEvents, setEventToEdit } from "../../Store/myChannelReducer"
import { TEvent } from "../../Common/Types/TEvent"
import { EventsList } from "../Events/Events"
import MyEvent from "./MyEvent"
import CreateEventDialog from "./CreateEventDialog"
import EditEventDialog from "./EditEventDialog"
import img from "../../Assets/Images/profile.jpg"
import styled from "styled-components"

type TProps = {
  channel: TChannel | undefined
  getChannelEvents: any
  events: Array<TEvent>
  imgUrl: string | undefined
  getChannelImgUrl: any
  setEventToEdit: any
  signOut: any
  loggedIn: boolean
}

const MyChannel: FC<TProps> = ({ channel, getChannelEvents, events, getChannelImgUrl, imgUrl, setEventToEdit, signOut, loggedIn }) => {
  const [openNewEventModal, setOpenNewEventModal] = useState(false)
  const [openEditEventModal, setOpenEditEventModal] = useState(false)
  useEffect(() => {
    //* init
    if (channel) {
      getChannelImgUrl(channel.image)
      getChannelEvents(channel.id)
    }
    AOS.init({
      duration: 800,
    })
  }, [])

  if (!loggedIn) return <Redirect to="login" /> //! use history object instead

  const onCreateEvent = () => {
    setOpenNewEventModal(true)
  }
  const onEditEvent = (event: TEvent) => {
    setOpenEditEventModal(true)
    setEventToEdit(event)
  }
  const onCloseNewEventModal = () => {
    setOpenNewEventModal(false)
  }
  const onCloseEditEventModal = () => {
    setOpenEditEventModal(false)
    setEventToEdit(null)
  }

  if (!channel) return <div style={{ fontSize: "40px" }}>Loading...</div>
  return (
    <>
      <Banner>
        <ProfileImg src={imgUrl} alt="avatar" width="200px" />
      </Banner>
      <div style={{ display: "flex", margin: "10px" }}>
        <div style={{ marginLeft: "10px" }}>
          <div>{channel.name}</div>
          <div>{channel.country.native}</div>
          <div>{channel.author}</div>
          <div>{channel.email}</div>
          <div>
            {channel.languages
              .reduce((accum, val) => {
                return accum + val.native + " ,"
              }, "")
              .slice(0, -1)}
          </div>
          <div>{channel.info}</div>
          <div>{channel.id}</div>
          <button onClick={signOut}>Sign out</button>
        </div>
      </div>
      <div>
        <button onClick={onCreateEvent}>Create Event</button>
      </div>
      {events.length ? (
        <EventsList data-aos="fade-up">
          {events.map((event) => {
            return <MyEvent event={event} onEditEvent={() => onEditEvent(event)} key={event.id} />
          })}
        </EventsList>
      ) : null}

      <CreateEventDialog openModal={openNewEventModal} setOpenModal={setOpenNewEventModal} onCloseModal={onCloseNewEventModal} />
      <EditEventDialog openModal={openEditEventModal} setOpenModal={setOpenEditEventModal} onCloseModal={onCloseEditEventModal} />
    </>
  )
}

const mapStateToProps = (state: TState) => {
  return {
    loggedIn: state.auth.loggedIn,
    channel: state.auth.channel,
    events: state.myChannel.events,
    imgUrl: state.auth.imgUrl,
  }
}

const ActionCreators = {
  getChannelEvents,
  getChannelImgUrl,
  setEventToEdit,
  signOut,
}

export default connect(mapStateToProps, ActionCreators)(MyChannel)

//* STYLED COMPONENTS

const Banner = styled.div`
  width: 100%;
  height: 350px;
  background-image: url(${img});
  background-size: cover;
  background-position: left;
  position: relative;
`

const ProfileImg = styled.img`
  padding: 3px;
  box-shadow: -3px 3px 3px #925a34c1;
  border: 1px solid blanchedalmond;
  border-radius: 7px;
  position: absolute;
  bottom: -50px;
  left: 50px;
`
