import { FC } from "react"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { TState } from "../../Store/store"
import styled from "styled-components"

type TProps = {
  loggedIn: boolean
  role: string | undefined
}

const activeStyle = {
  backgroundColor: "#ffdbd6f8",
  textDecoration: "underline",
  transform: "scale(104%)"
}
const navItemStyle = {
  border: "1px solid lightskyblue",
  borderRadius: "25px",
  padding: "5px 15px 6px",
  margin: "10px", 
  fontFamily: "Caveat",
  fontSize: "x-large",
  color: "#3a3a3a",
  textDecoration: "none", 
  backgroundColor: "#e2fdff"
}

const NavItems: FC<TProps> = ({ loggedIn, role }) => {
  return (
    <Nav>
      <NavLink exact to="" style={navItemStyle} activeStyle={activeStyle}>
        Home
      </NavLink>
      <NavLink to="/channels" style={navItemStyle} activeStyle={activeStyle}>
        Channels
      </NavLink>
      <NavLink to="/bookmarks" style={navItemStyle} activeStyle={activeStyle}>
        Bookmarks
      </NavLink>
      {!loggedIn && (
        <NavLink to="/login" style={navItemStyle} activeStyle={activeStyle}>
          Login
        </NavLink>
      )}
      {loggedIn && (
        <NavLink to="/mychannel" style={navItemStyle} activeStyle={activeStyle}>
          My Channel
        </NavLink>
      )}
      {loggedIn && role === "admin2311" && (
        <NavLink to="/admin" style={navItemStyle} activeStyle={activeStyle}>
          Admin
        </NavLink>
      )}
    </Nav>
  )
}

const mapStateToProps = (state: TState) => {
  return {
    loggedIn: state.auth.loggedIn,
    role: state.auth.channel?.role,
  }
}

export default connect(mapStateToProps)(NavItems)

const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  border-bottom: 1px solid lightskyblue;
  /* background-color: #ff908150; */
  background-color: #98f8f876;
`
