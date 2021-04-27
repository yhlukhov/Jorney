import { FC } from 'react'
import styled from 'styled-components'
import history from '../../../Common/Utils/history'
import { TEvent } from '../../../Common/Types/TEvent';
import { TLanguage } from '../../../Common/Types/TLanguage';

type TProps = {
  event:TEvent
}

export const renderLangs = (langs:Array<TLanguage>) => langs.reduce((acc, lang)=>acc + lang.native + ' ,', "").slice(0, -1)

const EventItem: FC<TProps> = ({event}) => {
  return <EventDiv>
    <div onClick={()=>{history.push(`events/${event.id}`)}}>{event.name}</div>
    <div>{event.author}</div>
    <div>{event.channelName}</div>
    <div>{event.datetime.toLocaleString()} </div>
    <div>{event.duration}</div>
    <EventText value={event.details} disabled />
    <div>{event.country.native}</div>
    <div>{event.channelName}</div>
    <div>{renderLangs(event.languages)}</div>
    <div>
      <a href={event.link} target='_blank'>LINK</a>
    </div>
  </EventDiv>;
};

export default EventItem;


//Styled Components

export const EventDiv = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  margin: 10px;
  border: 1px solid salmon;
  border-radius: 8px;
  background-color: #EDE0D8;
`
export const EventText = styled.textarea`
  background-color: transparent;
  border-radius:5px;
  resize:none;
`