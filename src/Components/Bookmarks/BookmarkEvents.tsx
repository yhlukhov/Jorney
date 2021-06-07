import { FC } from 'react'
import { connect } from "react-redux"
import { TEvent } from "../../Common/Types/TEvent"
import { TState } from "../../Store/store"
import AOS from "aos"
import "aos/dist/aos.css"
import EventItem from '../Events/EventItem/EventItem'

type TProps = {
  events: Array<TEvent>
}

const BookmarkEvents:FC<TProps> = ({events}) => {

  return(
    <div>
      Event Bookmarks
      <div data-aos="fade-up" style={{display:'flex'}}>
        {events.map(event => <EventItem event={event} key={event.id} own={false} /> )}
      </div>
    </div>
  )
}

const mapStateToProps = (state:TState) => {
  return {
    events: state.bookmarks.events
  }
}

export default connect(mapStateToProps)(BookmarkEvents)