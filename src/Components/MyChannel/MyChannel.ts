import { TState } from "../../Store/store";
import { signOut } from '../../Store/authReducer'
import { connect } from 'react-redux'
import MyChannelPage from './MyChannelPage'

const mapStateToProps = (state:TState)=>{
  return {
    loggedIn: state.auth.loggedIn,
    channel: state.auth.channel,
    imgUrl: state.auth.imgUrl
  }
}

const ActionCreators = {
  signOut
}

export default connect(mapStateToProps, ActionCreators)(MyChannelPage)