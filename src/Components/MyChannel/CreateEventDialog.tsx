import { Dialog } from "@material-ui/core"
import { FC } from "react"
import { CreateEventForm } from "./CreateEventForm"
import { TState } from "../../Store/store"
import { connect } from "react-redux"
import { TChannel } from "../../Common/Types/TChannel"
import styled from 'styled-components'
import { createEvent } from '../../Store/myChannelReducer'

type TProps = {
  openModal: boolean
  setOpenModal:any
  onCloseModal: any
  createEvent:any
  channel: TChannel | undefined
  imageUrl: string|undefined
}

const CreateEventDialog: FC<TProps> = ({ openModal, setOpenModal, onCloseModal, createEvent, channel, imageUrl }) => {
  return (
    <Dialog open={openModal} onClose={onCloseModal} maxWidth="xl">
      <EventFormDiv>
        <CreateEventForm createEvent={createEvent} channel={channel} setOpenModal={setOpenModal} imageUrl={imageUrl} />
      </EventFormDiv> 
    </Dialog>
  )
}

const mapStateToProps = (state: TState) => {
  return {
    channel: state.auth.channel,
    imageUrl: state.auth.imgUrl,
    eventImageUrl: state.myChannel.eventImgUrl
  }
}

const actionCreators = {
  createEvent
}

export default connect(mapStateToProps, actionCreators)(CreateEventDialog)

//* Styled Components

const EventFormDiv = styled.div`
  margin: 15px;
`