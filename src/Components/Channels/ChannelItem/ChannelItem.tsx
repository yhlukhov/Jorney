import { Redirect } from 'react-router'
import styled from 'styled-components'
import { TChannel } from '../../../Common/Types/TChannel'
import { NavLink } from 'react-router-dom'

type PropsType = {
  channel: TChannel
}

const ChannelItem = ({channel}:PropsType) => {
  return(
    <ChannelArticle>
      <div>{channel.name}</div>
      <div>{channel.userName}</div>
      {/* <div>{channel.userEmail}</div> */}
      {/* <div>{channel.description}</div> */}
      <div>{channel.country.native}</div>
      <div>{channel.language.native}</div>
      <NavLink to={{ pathname: `/channel/${channel.id}`}}>Open Channel Page</NavLink>
    </ChannelArticle>
  )
}

export default ChannelItem

const ChannelArticle = styled.article`
  width: 350px;
  min-height: 450px;
  margin: 10px;
  padding: 5px;
  border: 1px solid lightcoral;
  border-radius: 8px;
  display:flex;
  flex-direction:column;
  align-items:center;
`