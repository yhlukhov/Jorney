import { ThunkAction } from "redux-thunk"
import { TEvent } from "../Common/Types/TEvent"
import { InferTActions } from "./store"
import { eventsAPI } from "../API/eventsAPI"

const SET_EVENT = "EVENT/SET_EVENT"

const initialState = {
  event: null as TEvent | null,
}

type TState = typeof initialState
type TActions = InferTActions<typeof actions>

//*Reducer
export const eventReducer = (state = initialState, action: TActions) => {
  switch (action.type) {
    case SET_EVENT:
      return {
        ...state,
        event: action.data.event,
      }
    default:
      return state
  }
}

//*Action Creators

const setEvent = (event: TEvent) => {
  return {
    type: SET_EVENT,
    data: {
      event,
    },
  }
}

const actions = {
  setEvent,
}

//*Thunk Creators

export const getEvent = (id: string): ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch) => {
  const event = await eventsAPI.loadEvent(id)
  if (event.exists) {
    const data = event.data()
    data && dispatch(setEvent({ id: event.id, ...event.data(), datetime: data.datetime.toDate() } as TEvent)) 
  }
}
