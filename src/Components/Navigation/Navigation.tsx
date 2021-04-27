import { FC } from 'react';
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import { TState } from '../../Store/store'

type TProps = {
  loggedIn:boolean,
  role: string|undefined
}

const NavItems: FC<TProps> = ({loggedIn, role}) => {
  return (
    <nav style={{display:'flex', justifyContent:'space-around', marginBottom: "10px"}}>
      <NavLink to=''>Home</NavLink>
      <NavLink to='/channels'>Channels</NavLink>
      <NavLink to='/bookmarks'>Bookmarks</NavLink>
      {!loggedIn && <NavLink to='/login'>Login</NavLink>}
      {loggedIn && <NavLink to='/mychannel'>My Channel</NavLink>}
      {loggedIn && role==="admin2311" && <NavLink to='/admin'>Admin</NavLink>}
    </nav>
  )
}

const mapStateToProps = (state:TState) => {
  return{
    loggedIn: state.auth.loggedIn,
    role: state.auth.channel?.role
  }
}

export default connect(mapStateToProps)(NavItems)