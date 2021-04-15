import { FC, useState } from "react"
import { connect } from "react-redux"
import { TEvent } from "../../Common/Types/TEvent"
import { EventDiv, EventText, renderLangs } from '../Events/Event/Event'
import AlertDialog from "../../Common/Components/AlertDialog"
import { deleteEvent } from '../../Store/eventListReducer'
import { getChannelEvents } from "../../Store/myChannelReducer"


type TProps = {
  event: TEvent
  deleteEvent: any
  getChannelEvents: any
}

const MyEvent: FC<TProps> = ({ event, deleteEvent, getChannelEvents }) => {
  const [openAlert, setOpenAlert] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const onEditEvent = () => {
    console.log('edit event: ', event.id)
  }
  const onDeleteEvent = async () => {
    const channelId = event.channelId
    await deleteEvent(event.id)
    setOpenAlert(false)
    getChannelEvents(channelId)
  }
  
  return (
    <EventDiv>
      <div>{event.name}</div>
      <div>{event.author}</div>
      <div>{event.datetime.toLocaleString()} </div>
      <div>{event.duration}</div>
      <EventText value={event.details} disabled />
      <div>{event.country.native}</div>
      <div>{event.channelName}</div>
      <div>{renderLangs(event.languages)}</div>
      <div>{event.link}</div>
      <button
        onClick={onEditEvent}
      >
        Edit
      </button>
      <button
        onClick={() => {
          setOpenAlert(true)
        }}
      >
        Delete
      </button>
      <AlertDialog open={openAlert} setOpen={setOpenAlert} agree={onDeleteEvent} message={`Sure you want to delete event "${event.name}"?`} />
    </EventDiv>
  )
}

export default connect(null, {deleteEvent, getChannelEvents})(MyEvent)
