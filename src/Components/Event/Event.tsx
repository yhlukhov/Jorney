import { FC, useEffect } from 'react'
import {connect} from 'react-redux'
import { TState } from "../../Store/store";
import { getEvent } from '../../Store/eventReducer'
import { TEvent } from '../../Common/Types/TEvent'

type TProps = {
  match:any,
  event:TEvent|null,
  getEvent:any
}

const Event:FC<TProps> = ({match, event, getEvent}) => {

  useEffect(()=>{
    getEvent(match.params.id)
  },[])

  if(!event) return <div>'Loading...'</div>

  return(
    <div>
      <div>{event.name}</div> 
      <div>{event.details}</div> 
      <div>{event.author}</div> 
      <div>{event.channelName}</div> 
      <div>{event.country.native}</div> 
      <div>{event.datetime.toLocaleString()}</div>
      <div>{event.languages[0].native}</div> 
      <div>{event.duration}</div> 
    </div>
  )
}

const mapStateToProps = (state:TState) => {
  return {
    event:state.event.event
  }
}

export default connect(mapStateToProps, {getEvent})(Event)