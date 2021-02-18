import { FunctionComponent } from "react";

import Event from '../Events/Event/Event';
import { EventType } from '../../Common/Types/EventType'


const eventIurii:EventType = {
  name: 'Event111',
  organizer: 'Iurii',
  startDate: new Date(),
  duration: '2h',
  description: 'description',
  language: 'en',
  link: 'link',
  image: 'img',
  channelId: '2384774',
  bookmark: false,
  approved: true,
  id: '1',
}

const Events: FunctionComponent = () => {
  return (
    <div style={{border:"1px solid lightgreen"}}>
      <div>Events</div>
      <Event {...eventIurii} />
    </div>
  )
}

export default Events