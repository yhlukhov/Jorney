import { connect } from "react-redux";
import ChannelPage from "./ChannelPage";
import { getChannel } from '../../Store/channelReducer'
import { TState } from '../../Store/store'


const mapStateToProps = (state:TState) => {
  return {
    channel: state.channel.channel
  }
}

const actionCreators = {
  getChannel
}

export default connect(mapStateToProps, actionCreators)(ChannelPage)