import { FC } from 'react'

import Event from '../Events/Event/Event';
import { TEvent } from '../../Common/Types/TEvent'
import styled from 'styled-components';

type TProps = {
  events:Array<TEvent>
}

const Events: FC<TProps> = ({events}) => {
  return (
    <EventsList>
      {/* {events.filter(e => countryFilter.indexOf(e.country) > -1 ).map(e => <Event event={e} key={e.id}></Event>)} */}
      {events.map(event=><Event event={event} key={event.id} />)}
    </EventsList>
  )
}

export default Events


//Styled Components

const EventsList = styled.div`
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
`