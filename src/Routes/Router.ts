import { connect } from 'react-redux'
import { TState } from '../Store/store'
import Routes from './Routes'

const mapStateToProps = (state:TState) => {
  return {
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps)(Routes)