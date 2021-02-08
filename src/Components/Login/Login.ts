import { TState } from "../../Store/store";
import { connect } from 'react-redux'
import { signUp, signIn } from '../../Store/authReducer'
import LoginPage from "./LoginPage";

const mapStateToProps = (state:TState) => {
  return {

  }
}

const ActionCreators = {
  signUp,
  signIn
}

export default connect(mapStateToProps, ActionCreators)(LoginPage)