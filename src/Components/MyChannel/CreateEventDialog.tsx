import { Dialog } from "@material-ui/core"
import { FC } from "react"
import CreateEventForm from "./CreateEventForm"
import { TState } from "../../Store/store"
import { connect } from "react-redux"
import { TChannel } from "../../Common/Types/TChannel"
import styled from 'styled-components'

type TProps = {
  openModal: boolean
  setOpenModal:any
  onCloseModal: any
  channel: TChannel | undefined
  imageUrl: string|undefined
}

const CreateEventDialog: FC<TProps> = ({ openModal, setOpenModal, onCloseModal, channel, imageUrl }) => {
  return (
    <Dialog open={openModal} onClose={onCloseModal} maxWidth="xl">
      <EventFormDiv>
        <CreateEventForm channel={channel} setOpenModal={setOpenModal} imageUrl={imageUrl} />
      </EventFormDiv> 
    </Dialog>
  )
}

const mapStateToProps = (state: TState) => {
  return {
    channel: state.auth.channel,
    imageUrl: state.auth.imgUrl
  }
}

export default connect(mapStateToProps)(CreateEventDialog)

//* Styled Components

const EventFormDiv = styled.div`
  margin: 15px;
`