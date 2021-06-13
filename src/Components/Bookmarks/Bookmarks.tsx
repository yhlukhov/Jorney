import { FC } from "react";
import BookmarkEvents from './BookmarkEvents'
import BookmarkChannels from './BookmarkChannels'
import styled from 'styled-components'
//images:
import bookmarkEv from '../../Assets/Images/bookmark_ev.png'
import bookmarkCh from '../../Assets/Images/bookmark_ch.png'

type TProps = {}

const Bookmarks: FC<TProps> = () => {
  return (
    <div>
      <h3 id="Events" style={{paddingBottom: "20px"}}>Event Bookmarks</h3>
      <BookmarkEvents /> 
      <h3 id="Channels" style={{paddingBottom: "20px"}}>Channel Bookmarks</h3>
      <BookmarkChannels />
        <BookmarkEv><A href="#Events">Event</A></BookmarkEv>
        <BookmarkCh><A href="#Channels">Channel</A></BookmarkCh>
    </div>
  )
}

export default Bookmarks


const BookmarkEv = styled.div`
  position: fixed;
  top: 75px;
  right: -40px;
  width: 80px;
  height: 39px;
  display: flex;
  justify-content: flex-start;
  background-image: url(${bookmarkEv});
  &:hover{
    right: -3px;
  }
`
const BookmarkCh = styled.div`
  position: fixed;
  top: 115px;
  right: -40px;
  width: 80px;
  height: 39px;
  display: flex;
  justify-content: flex-start;
  background-image: url(${bookmarkCh});
  &:hover{
    right: -3px;
  }
`
const A = styled.a`
  height: 100%;
  padding-top: 12px;
  margin-left: 20px;
  font-size: 15px;
  text-decoration: none;
  color: saddlebrown;
`