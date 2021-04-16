import {FC} from 'react'
import { connect } from "react-redux"
import { Dialog } from "@material-ui/core"
import CreateEventForm from "./CreateEventForm"
import EditEventForm from './EditEventForm'
import { TChannel } from '../../Common/Types/TChannel'
import { TState } from '../../Store/store'

type TProps = {
  openModal: boolean
  setOpenModal:any
  onCloseModal: any
  channel: TChannel | undefined
  imageUrl: string|undefined
}

const EditEventDialog:FC<TProps> = ({openModal, setOpenModal, onCloseModal, channel, imageUrl}) => {
  return(
    <Dialog open={openModal} onClose={onCloseModal} maxWidth="xl">
      <div style={{margin:"15px"}}>
        <EditEventForm channel={channel} imageUrl={imageUrl} setOpenModal={setOpenModal} />
      </div>
    </Dialog>
  )
}

const mapStateToProps = (state:TState) => {
  return {
    channel: state.auth.channel,
    imageUrl: state.auth.imgUrl
  }
}

export default connect(mapStateToProps)(EditEventDialog)