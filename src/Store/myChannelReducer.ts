import { ThunkAction } from "redux-thunk"
import { InferTActions } from "./store"
import { TEvent } from '../Common/Types/TEvent'
import { eventsAPI } from '../API/eventsAPI'

type TState = typeof initialState
type TActions = InferTActions<typeof actions>

const initialState = {
  eventImgUrl: undefined as string | undefined,
  eventImgPath: undefined as string | undefined
}

export const myChannelReducer = (state = initialState, action: TActions): TState => {
  switch (action.type) {
    default:
      return state
  }
}

const actions = {
  
}

export const createEvent = (eventData:TEvent): ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch) => {
  eventsAPI.createEvent(eventData)
}