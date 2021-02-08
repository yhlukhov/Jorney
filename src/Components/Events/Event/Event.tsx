import { FunctionComponent } from "react";
import { EventType } from '../../../Common/Types/EventType';



const Event: FunctionComponent<EventType> = (props:EventType) => {
  return <div>
    {props.name}
    {props.organizer}
    {props.startDate.toLocaleString()}
  </div>;
};

export default Event;
