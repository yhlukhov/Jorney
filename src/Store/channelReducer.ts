import { ThunkAction } from "redux-thunk"
import { channelsAPI } from "../API/channelsAPI"
import { storageAPI } from '../API/storageAPI'
import { InferTActions } from "./store"
import { TChannel } from "../Common/Types/TChannel"
import { TEvent } from "../Common/Types/TEvent"

const SET_CHANNEL_DATA = "SET_CHANNEL_DATA"
const SET_CHANNEL_EVENTS = "SET_CHANNEL_EVENTS"
const SET_IMAGE_URL = "CHANNEL/SET_IMAGE_URL"

const initialState = {
  channel: {} as TChannel,
  events: [] as Array<TEvent>,
  channelImage: undefined as undefined | string
}

type TState = typeof initialState
type TActions = InferTActions<typeof actions>

//* REDUCER
export const channelReducer = (state = initialState, action: TActions): TState => {
  switch (action.type) {
    case SET_CHANNEL_DATA:
      return {
        ...state,
        //@ts-ignore
        channel: action.data.channel,
      }
    case SET_CHANNEL_EVENTS:
      return {
        ...state,
        //@ts-ignore
        events: action.data.events,
      }
    case SET_IMAGE_URL:
      return {
        ...state,
        //@ts-ignore
        channelImage: action.data.imageUrl
      }
    default:
      return state
  }
}

//* ACTION CREATORS

export const setChannelData = (channel: TChannel) => {
  return {
    type: SET_CHANNEL_DATA,
    data: {
      channel
    }
  }
}

export const setChannelEvents = (events: Array<TEvent>) => {
  return {
    type: SET_CHANNEL_EVENTS,
    data: {
      events
    }
  }
}

export const setImageUrl = (imageUrl:string) => {
  return {
    type: SET_IMAGE_URL,
    data: {
      imageUrl
    }
  }
}

//* ACTIONS
const actions = {
  setChannelData,
  setChannelEvents,
  setImageUrl
}

//* THUNK CREATORS
export const getChannel = (id: string): ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch) => {
  const res = await channelsAPI.getChannel(id)
  const channel = {...res.data(), id:res.id} as TChannel
  dispatch(actions.setChannelData(channel))
  dispatch(getChannelImage(channel.image))
}

export const getChannelImage = (path:string): ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch) => {
  const imageUrl = await storageAPI.getImageUrl(path)
  dispatch(setImageUrl(imageUrl))
}