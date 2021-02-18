import { FC } from 'react';
import { NavLink } from "react-router-dom"

type TProps = {
  loggedIn:boolean,
  role: string|undefined
}

const NavItems: FC<TProps> = ({loggedIn, role}) => {
  return (
    <nav style={{display:'flex', justifyContent:'space-around'}}>
      <NavLink to=''>Home</NavLink>
      <NavLink to='/channels'>Channels</NavLink>
      <NavLink to='/bookmarks'>Bookmarks</NavLink>
      {!loggedIn && <NavLink to='/login'>Login</NavLink>}
      {loggedIn && <NavLink to='/mychannel'>My Channel</NavLink>}
      {loggedIn && role==="admin2311" && <NavLink to='/admin'>Admin</NavLink>}
    </nav>
  )
}

export default NavItems