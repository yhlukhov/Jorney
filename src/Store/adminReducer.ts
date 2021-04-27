import { TChannel } from "../Common/Types/TChannel"
import { InferTActions } from './store'
import { ThunkAction } from 'redux-thunk'
import { channelsAPI } from '../API/channelsAPI'

const SET_ALL_CHANNELS = "SET_ALL_CHANNELS"

const initialState = {
  channels: [] as Array<TChannel>
}

type TState = typeof initialState
type TActions = InferTActions<typeof actions>

//* REDUCER
export const adminReducer = (state = initialState, action:TActions):TState => {
  switch(action.type) {
    case SET_ALL_CHANNELS:
      return {...state, channels: action.data.channels}
    default: return state
  }
}

//* ACTION CREATORS
const setAllChannels = (channels: Array<TChannel>) => {
  return {
    type: SET_ALL_CHANNELS,
    data: {
      channels
    }
  }
}

//* ACTIONS
const actions = {
  setAllChannels
}

//* THUNK CREATORS
export const getAllChannels = ():ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch) => {
  let channels = await channelsAPI.getAllChannels()
  dispatch(setAllChannels(channels))
}