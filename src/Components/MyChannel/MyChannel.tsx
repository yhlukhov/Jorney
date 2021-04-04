import { TState } from "../../Store/store";
import { signOut, getChannelImgUrl } from '../../Store/authReducer'
import { connect } from 'react-redux'
import { FC, useEffect, useState } from 'react'
import src from "*.avif";
import { Create } from "@material-ui/icons";
import { Redirect } from "react-router";
import { TChannel } from "../../Common/Types/TChannel";
import CreateEventDialog from "./CreateEventDialog";

type TProps = {
  channel: TChannel | undefined
  imgUrl: string | undefined
  getChannelImgUrl:any
  signOut: any
  loggedIn: boolean
}

const MyChannel:FC<TProps> = ({ channel, getChannelImgUrl, imgUrl, signOut, loggedIn }) => {
  const [openModal, setOpenModal] = useState(false)
  useEffect(()=>{
    getChannelImgUrl(channel?.image)
  },[])
  if (!loggedIn) return <Redirect to="login" />
  const onCreateEvent = ()=>{
    setOpenModal(true)
  }
  const onCloseModal = () => {
    setOpenModal(false)
  }
  return (
    <>
      <div style={{ display: "flex", margin: "10px" }}>
        <div>
          <img src={imgUrl} alt="avatar" width="200px" />
          <div>{channel?.image}</div>
        </div>
        <div style={{ marginLeft: "10px" }}>
          <div>{channel?.name}</div>
          <div>{channel?.country.native}</div>
          <div>{channel?.author}</div>
          <div>{channel?.email}</div>
          <div>{channel?.language[0].native}</div>
          <div>{channel?.info}</div>
          <div>{channel?.id}</div>
          <button onClick={signOut}>Sign out</button>
        </div>
      </div>
      <div>
        <button onClick={onCreateEvent}>Create Event</button>
      </div>
      <CreateEventDialog openModal={openModal} setOpenModal={setOpenModal} onCloseModal={onCloseModal} />
    </>
  )
}


const mapStateToProps = (state:TState)=>{
  return {
    loggedIn: state.auth.loggedIn,
    channel: state.auth.channel,
    imgUrl: state.auth.imgUrl
  }
}

const ActionCreators = {
  getChannelImgUrl,
  signOut
}

export default connect(mapStateToProps, ActionCreators)(MyChannel)