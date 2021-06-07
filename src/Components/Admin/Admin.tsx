import { FC } from "react";
import { connect } from 'react-redux'
import { Redirect } from "react-router";
import { TState } from "../../Store/store";
import ChannelList from "./ChannelListAdm";

type TProps = {
  loggedIn: boolean,
  role: string|undefined
}

const Admin: FC<TProps> = ({loggedIn, role}) => {
  if(!loggedIn || role !== "admin2311") return <Redirect to="login" />
  return (
    <div>
      <ChannelList />
    </div>
  )
}

const mapStateToProps = (state:TState) => {
  return {
    loggedIn: state.auth.loggedIn,
    role: state.auth.channel?.role
  }
}

export default connect(mapStateToProps)(Admin)