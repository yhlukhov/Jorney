import { Route } from "react-router-dom";
import Channels from "../Components/Channels/Channels";
import Home from "../Components/Home/Home";
import Bookmarks from '../Components/Bookmarks/Bookmarks';
import Login from '../Components/Login/Login';
import MyChannel from '../Components/MyChannel/MyChannel';
import Admin from '../Components/Admin/Admin';
import Channel from "../Components/Channel/Channel";

const Routes = () => {
  return (
    <>
      <Route exact path='/' render={()=><Home /> } />
      <Route path='/home' render={()=><Home /> } />
      <Route path='/channels' render={()=><Channels /> } />
      <Route path='/channel/:id?' render={(props)=><Channel {...props.match.params} /> } />
      <Route path='/bookmarks' render={()=><Bookmarks /> } />
      <Route path='/login' render={()=><Login /> } />
      <Route path='/mychannel' render={()=><MyChannel /> } />
      <Route path='/admin' render={()=><Admin /> } />
    </>
  )
}

export default Routes