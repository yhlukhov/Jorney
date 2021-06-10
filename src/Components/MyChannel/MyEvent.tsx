import { FC, useState } from "react"
import { connect } from "react-redux"
import history from "../../Common/Utils/history"
import { TEvent } from "../../Common/Types/TEvent"
import { EventDiv, EventInfo, renderLangs } from "../Events/EventItem/EventItem"
import AlertDialog from "../../Common/Components/AlertDialog"
import { deleteEvent } from "../../Store/eventListReducer"
import { getChannelEvents } from "../../Store/myChannelReducer"
import styled from 'styled-components'

type TProps = {
  event: TEvent
  deleteEvent: any
  onEditEvent: any
  getChannelEvents: any
}

const MyEvent: FC<TProps> = ({ event, deleteEvent, onEditEvent, getChannelEvents }) => {
  const [openAlert, setOpenAlert] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const onDeleteEvent = async () => {
    const channelId = event.channelId
    await deleteEvent(event.id)
    setOpenAlert(false)
    getChannelEvents(channelId)
  }

  return (
    <EventDiv>
      <EventInfo>
        <div
          onClick={() => {
            history.push(`/event/${event.id}`)
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
      <button onClick={onEditEvent}>Edit</button>
      <button
        onClick={() => {
          setOpenAlert(true)
        }}
      >
        Delete
      </button>
      <AlertDialog
        open={openAlert}
        setOpen={setOpenAlert}
        agree={onDeleteEvent}
        message={`Sure you want to delete event "${event.name}"?`}
      />
    </EventDiv>
  )
}

export default connect(null, { deleteEvent, getChannelEvents })(MyEvent)


export const EventText = styled.textarea`
  background-color: transparent;
  border-radius: 5px;
  resize: none;
`
