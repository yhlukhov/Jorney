import { TEvent } from "../Common/Types/TEvent"
import { InferTActions } from "./store"
import { eventsAPI } from "../API/eventsAPI"
import { ThunkAction } from "redux-thunk"

type TState = typeof initialState
type TActions = InferTActions<typeof actions>

const initialState = {
  events: [] as Array<TEvent>,
}

//* REDUCER
export const eventListReducer = (state = initialState, action: TActions) => {
  switch (action.type) {
    case "SET_EVENTS":
      return {
        ...state,
        events: action.data.events,
      }
    default:
      return state
  }
}

//* ACTION CREATORS
export const setEvents = (events: Array<TEvent>) => {
  return {
    type: "SET_EVENTS",
    data: {
      events,
    },
  }
}

//* ACTIONS
const actions = {
  setEvents,
}

//* THUNK CREATORS

export const loadEvents = (countries: string[], languages: string[]): ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch) => {
  let snapshot = await eventsAPI.loadEvents(countries, languages)
  let events = [] as Array<TEvent>
  snapshot.forEach((event) => {
    const data = event.data()
    events.push({ ...(data as TEvent), datetime: data.datetime.toDate(), id: event.id })
  })
  dispatch(actions.setEvents(events))
}

export const deleteEvent = (id: string): ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch) => {
  return await eventsAPI.deleteEvent(id)
}
