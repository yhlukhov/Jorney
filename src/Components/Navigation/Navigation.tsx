import React, { FunctionComponent } from 'react';
import { NavLink } from "react-router-dom"

const Navigation: FunctionComponent = () => {
  return (
    <nav style={{display:'flex', justifyContent:'space-around'}}>
      <NavLink to=''>Home</NavLink>
      <NavLink to='/channels'>Channels</NavLink>
      <NavLink to='/bookmarks'>Bookmarks</NavLink>
      <NavLink to='/login'>Login</NavLink>
      <NavLink to='/mychannel'>My Channel</NavLink>
      <NavLink to='/admin'>Admin</NavLink>
    </nav>
  )
}

export default Navigation