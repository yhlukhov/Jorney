import { TEvent } from "../Common/Types/TEvent"
import { InferTActions } from './store'
import { eventsAPI } from '../API/eventsAPI'
import { ThunkAction } from 'redux-thunk'

type TState = typeof initialState
type TActions = InferTActions<typeof actions>

const initialState = {
  events: [] as Array<TEvent>
}

export const eventListReducer = (state=initialState, action:TActions) => {
  switch(action.type) {
    case "SET_EVENTS":
      return {
        ...state,
        events: action.data.events
      }
    default: return state
  }
}

const actions = {
  setEvents: (events:Array<TEvent>) => {
    return {
      type: "SET_EVENTS",
      data: {
        events
      }
    }
  }
}

export const loadEvents = (): ThunkAction<Promise<void>, TState, unknown, TActions> => async(dispatch)=>{
  eventsAPI.loadEvents().onSnapshot(snap => {
    let events = [] as Array<TEvent>
    snap.forEach(event => {
      events.push({...event.data() as TEvent, datetime:event.data().datetime.toDate(), id: event.id})
    })
    dispatch(actions.setEvents(events))
  })
}