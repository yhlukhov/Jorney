import { FC, useEffect } from 'react'
import { connect } from "react-redux"
import { TEvent } from "../../Common/Types/TEvent"
import { TState } from "../../Store/store"
import AOS from "aos"
import "aos/dist/aos.css"
import EventItem from '../Events/EventItem/EventItem'
import styled from 'styled-components'
import { loadBookmarkEvents } from '../../Store/bookmarksReducer'

type TProps = {
  events: Array<TEvent>
  loadBookmarkEvents: any
}

const BookmarkEvents:FC<TProps> = ({events, loadBookmarkEvents}) => {

  useEffect(()=>{
    loadBookmarkEvents()
    AOS.init({ duration: 800 })
  }, [])

  return(
    <Content>
      
      <Events data-aos="fade-up">
        {events.map(event => <EventItem event={event} key={event.id} own={false} /> )}
      </Events>
    </Content>
  )
}

const mapStateToProps = (state:TState) => {
  return {
    events: state.bookmarks.events
  }
}

export default connect(mapStateToProps, {loadBookmarkEvents})(BookmarkEvents)

const Content = styled.div`
margin: 15px 25px 10px 15px;
`

const Events = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`