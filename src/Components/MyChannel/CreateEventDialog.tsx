import { Dialog } from "@material-ui/core"
import { FC } from "react"
import CreateEventForm from "./CreateEventForm"
import { TState } from "../../Store/store"
import { connect } from "react-redux"
import { TChannel } from "../../Common/Types/TChannel"

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
      <div style={{margin:"15px"}}>
        <CreateEventForm channel={channel} setOpenModal={setOpenModal} imageUrl={imageUrl} />
      </div> 
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