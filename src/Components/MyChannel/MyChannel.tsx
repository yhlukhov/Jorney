import { FC, useEffect, useState } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { TState } from "../../Store/store"
import { signOut, getChannelImgUrl } from "../../Store/authReducer"
import { TChannel } from "../../Common/Types/TChannel"
import { getChannelEvents } from "../../Store/myChannelReducer"
import { TEvent } from "../../Common/Types/TEvent"
import { EventsList } from "../Events/Events"
import CreateEventDialog from "./CreateEventDialog"
import MyEvent from "./MyEvent"

type TProps = {
  channel: TChannel | undefined
  getChannelEvents: any
  events: Array<TEvent>
  imgUrl: string | undefined
  getChannelImgUrl: any
  signOut: any
  loggedIn: boolean
}

const MyChannel: FC<TProps> = ({ channel, getChannelEvents, events, getChannelImgUrl, imgUrl, signOut, loggedIn }) => {
  const [openModal, setOpenModal] = useState(false)
  useEffect(() => { //* init
    if (channel) {
      getChannelImgUrl(channel.image)
      getChannelEvents(channel.id)
    }
    AOS.init({
      duration: 800
    })
  }, [])

  if (!loggedIn) return <Redirect to="login" /> //! use history object instead

  const onCreateEvent = () => {
    setOpenModal(true)
  }
  const onCloseModal = () => {
    setOpenModal(false)
  }
  if (!channel) return <div style={{fontSize: "40px"}}>Loading...</div>
  return (
    <>
      <div style={{ display: "flex", margin: "10px" }}>
        <div>
          <img src={imgUrl} alt="avatar" width="200px" />
          <div>{channel.image}</div>
        </div>
        <div style={{ marginLeft: "10px" }}>
          <div>{channel.name}</div>
          <div>{channel.country.native}</div>
          <div>{channel.author}</div>
          <div>{channel.email}</div>
          <div>
            {channel.languages.reduce((accum, val) => {
              return accum + val.native + " ,"
            }, "").slice(0, -1)}
          </div>
          <div>{channel.info}</div>
          <div>{channel.id}</div>
          <button onClick={signOut}>Sign out</button>
        </div>
      </div>
      <div>
        <button onClick={onCreateEvent}>Create Event</button>
      </div>
      {events.length ? <EventsList data-aos="fade-up">
        {events.map((event) => {
          return <MyEvent event={event}  key={event.id} /> 
        })}
      </EventsList> : null}
      <CreateEventDialog openModal={openModal} setOpenModal={setOpenModal} onCloseModal={onCloseModal} />
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
  signOut,
}

export default connect(mapStateToProps, ActionCreators)(MyChannel)

//* STYLED COMPONENTS
