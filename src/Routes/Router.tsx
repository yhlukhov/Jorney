import { FC } from "react"
import { Route, Switch } from "react-router-dom"
import Channels from "../Components/Channels/Channels"
import Home from "../Components/Home/Home"
import Bookmarks from "../Components/Bookmarks/Bookmarks"
import Login from "../Components/Login/Login"
import MyChannel from "../Components/MyChannel/MyChannel"
import Admin from "../Components/Admin/Admin"
import Channel from "../Components/Channel/Channel"
import Event from "../Components/Event/Event"
import EventItem from "../Components/Events/EventItem/EventItem"
import { NotFound } from "../Common/Components/NotFound"

const Routes: FC = () => { 
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/event/:id" component={Event} /> 
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

export default Routes