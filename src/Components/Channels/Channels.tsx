import { connect } from 'react-redux'
import { getChannels } from '../../Store/channelListReducer'
import ChannelsList from './ChannelsList'
import { TState } from '../../Store/store'

const mapStateToProps = (state:TState) => {
  return {
    channels: state.channels.channelsList
  }
}

const actionCreators = {
  getChannels
}

export default connect(mapStateToProps, actionCreators)(ChannelsList)