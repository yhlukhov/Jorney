import { FC } from "react"
import { connect } from 'react-redux'
import { Route, Switch } from "react-router-dom"
import { TState } from '../Store/store'
import Channels from "../Components/Channels/Channels"
import Home from "../Components/Home/Home"
import Bookmarks from "../Components/Bookmarks/Bookmarks"
import Login from "../Components/Login/Login"
import MyChannel from "../Components/MyChannel/MyChannel"
import Admin from "../Components/Admin/Admin"
import Channel from "../Components/Channel/Channel"
import { NotFound } from "../Common/Components/NotFound"

type TProps = {
  loggedIn: boolean
}

const Routes: FC<TProps> = ({ loggedIn }) => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route path="/home" render={() => <Home />} />
      <Route path="/channels" render={() => <Channels />} />
      <Route path="/channel/:id" render={() => <Channel />} />
      <Route path="/bookmarks" render={() => <Bookmarks />} />
      <Route path="/login" render={() => <Login />} />
      <Route path="/mychannel" render={() => <MyChannel />} />
      <Route path="/admin" render={() => <Admin />} />
      <Route component={NotFound} />
    </Switch>
  )
}

const mapStateToProps = (state:TState) => {
  return {
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps)(Routes)