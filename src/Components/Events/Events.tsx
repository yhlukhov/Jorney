import { FC, useEffect } from 'react'
import { connect } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styled from 'styled-components';
import Event from './EventItem/EventItem';
import { TEvent } from '../../Common/Types/TEvent'
import { TState } from '../../Store/store'
import { loadEvents } from '../../Store/eventListReducer'

type TProps = {
  events:Array<TEvent>,
  countries: string[],
  languages: string[],
  loadEvents:any
}

const Events: FC<TProps> = ({events, countries, languages, loadEvents}) => {
  useEffect(()=>{
    AOS.init({
      duration : 800
    })
  }, [])
  useEffect(()=>{
    countries && languages && loadEvents(countries, languages)
  },[countries, languages])

  if (!events.length) return <div style={{fontSize:"40px"}}>Loading...</div>

  return (
    <EventsList data-aos="fade-up" >
      {events.map(event=><Event event={event} own={false} key={event.id} />)}
    </EventsList>
  )
}

const mapStateToProps = (state:TState) => {
  return {
    events: state.events.events,
    countries: state.app.countryFilter,
    languages:state.app.languageFilter
  }
}

export default connect(mapStateToProps, {loadEvents})(Events)


//Styled Components

export const EventsList = styled.div`
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
`