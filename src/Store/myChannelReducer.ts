import { ThunkAction } from "redux-thunk"
import { InferTActions } from "./store"
import { TEvent } from '../Common/Types/TEvent'
import { eventsAPI } from '../API/eventsAPI'

const SET_CHANNEL_EVENTS = "SET_CHANNEL_EVENTS"
const SET_EVENT_TO_EDIT = "SET_EVENT_TO_EDIT"

type TState = typeof initialState
type TActions = InferTActions<typeof actions>

const initialState = {
  events: [] as Array<TEvent>,
  eventToEdit: null as TEvent|null
}

//* REDUCER
export const myChannelReducer = (state = initialState, action: TActions): TState => {
  switch (action.type) {
    case SET_CHANNEL_EVENTS:
      return {
        ...state,
        //@ts-ignore
        events: action.data.events
      }
    case SET_EVENT_TO_EDIT:
      return {
        ...state,
        //@ts-ignore
        eventToEdit: action.data.event
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

export const setEventToEdit = (event:TEvent) => {
  return {
    type: SET_EVENT_TO_EDIT,
    data: {
      event
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

export const createEvent = (event:TEvent): ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch):Promise<any> => {
  return await eventsAPI.createEvent(event) //! do i need await in api and here?
}

export const editEvent = (event:TEvent): ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch):Promise<any> => {
  return await eventsAPI.editEvent(event) //! do i need await in api and here?
}

//* ACTIONS
const actions = {
  setEvents,
  setEventToEdit
}