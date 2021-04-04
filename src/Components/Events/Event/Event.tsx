import { FC } from 'react'
import { TEvent } from '../../../Common/Types/TEvent';
import styled from 'styled-components'

type TProps = {
  event:TEvent
}

const Event: FC<TProps> = ({event}) => {
  return <EventDiv>
    <div>{event.name}</div>
    <div>{event.author}</div>
    <div>{event.datetime.toLocaleString()} </div>
    <div>{event.duration}</div>
    <Textarea value={event.details} disabled />
    <div>{event.country}</div>
    <div>{event.channelName}</div>
    <div>{event.language}</div>
    <div>{event.link}</div>
  </EventDiv>;
};

export default Event;


//Styled Components

const EventDiv = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  margin: 10px;
  border: 1px solid salmon;
  border-radius: 8px;
`
const Textarea = styled.textarea`
  background-color: transparent;
  border-radius:5px;
  resize:none;
`