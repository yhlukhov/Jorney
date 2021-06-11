import { FC, useEffect, useState } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router"
import AOS from "aos"
import "aos/dist/aos.css"
import { TState } from "../../Store/store"
import { signOut, getChannelImgUrl } from "../../Store/authReducer"
import { TChannel } from "../../Common/Types/TChannel"
import { getChannelEvents } from "../../Store/myChannelReducer"
import { TEvent } from "../../Common/Types/TEvent"
import { EventsList } from "../Events/Events"
import CreateEventDialog from "./CreateEventDialog"
import img from "../../Assets/Images/profile.jpg"
import styled from "styled-components"
import EventItem from "../Events/EventItem/EventItem"

type TProps = {
  channel: TChannel | undefined
  getChannelEvents: any
  events: Array<TEvent>
  allEvents: Array<TEvent>
  imgUrl: string | undefined
  getChannelImgUrl: any
  signOut: any
  loggedIn: boolean
}

const MyChannel: FC<TProps> = ({ channel, getChannelEvents, events, allEvents, getChannelImgUrl, imgUrl, signOut, loggedIn }) => {
  const [openNewEventModal, setOpenNewEventModal] = useState(false)
  
  useEffect(() => {
    if (channel) {
      getChannelImgUrl(channel.image)
    }
    AOS.init({
      duration: 800,
    })
  }, [])
  useEffect(()=>{
    if(channel) getChannelEvents(channel.id)
  }, [allEvents])

  if (!loggedIn) return <Redirect to="login" />

  const onCreateEvent = () => {
    setOpenNewEventModal(true)
  }

  const onCloseNewEventModal = () => {
    setOpenNewEventModal(false)
  }

  if (!channel) return <div style={{ fontSize: "40px" }}>Loading...</div>
  return (
    <>
      <Banner>
        <ProfileImg src={imgUrl || ''} alt="avatar" width="200px" />
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
            return <EventItem event={event} own={true} key={event.id} />
          })}
        </EventsList>
      ) : null}

      <CreateEventDialog openModal={openNewEventModal} setOpenModal={setOpenNewEventModal} onCloseModal={onCloseNewEventModal} />
    </>
  )
}

const mapStateToProps = (state: TState) => {
  return {
    loggedIn: state.auth.loggedIn,
    channel: state.auth.channel,
    events: state.myChannel.events,
    allEvents: state.events.events,
    imgUrl: state.auth.imgUrl,
  }
}

const ActionCreators = {
  getChannelEvents,
  getChannelImgUrl,
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
