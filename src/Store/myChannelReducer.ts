import { ThunkAction } from "redux-thunk"
import { InferTActions } from "./store"
import { TEvent } from '../Common/Types/TEvent'
import { eventsAPI } from '../API/eventsAPI'

const SET_CHANNEL_EVENTS = "SET_CHANNEL_EVENTS"

type TState = typeof initialState
type TActions = InferTActions<typeof actions>

const initialState = {
  events: [] as Array<TEvent>
}

//* REDUCER
export const myChannelReducer = (state = initialState, action: TActions): TState => {
  switch (action.type) {
    case SET_CHANNEL_EVENTS:
      return {
        ...state,
        events: action.data.events
      }
    default:
      return state
  }
}

//* ACTION CREATORS
export const setEvents = (events: Array<TEvent>) => {
  return {
    type: SET_CHANNEL_EVENTS,
    data: {
      events
    }
  }
}

//* THUNK CREATORS
export const getChannelEvents = (id:string): ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch) => {
  eventsAPI.loadChannelEvents(id).then(snap => {
    let events = [] as Array<TEvent>
    snap.forEach(doc => { 
      let data = doc.data()
      events.push({ ...data as TEvent, datetime: data.datetime.toDate(), id:doc.id})
    })
    dispatch(setEvents(events))
  })
}

export const createEvent = (eventData:TEvent): ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch):Promise<any> => {
  return await eventsAPI.createEvent(eventData)
}

//* ACTIONS
const actions = {
  setEvents
}