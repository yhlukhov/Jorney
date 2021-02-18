import { connect } from 'react-redux'
import { TState } from '../../Store/store'
import NavItems from './NavItems'

const mapStateToProps = (state:TState) => {
  return{
    loggedIn: state.auth.loggedIn,
    role: state.auth.channel?.role
  }
}

export default connect(mapStateToProps)(NavItems)