import { TChannel } from "../Common/Types/TChannel"
import { channelsAPI } from "../API/channelsAPI"
import { InferTActions } from './store'
import { ThunkAction } from "redux-thunk"

const initialState = {
  channel: {} as TChannel,
}

type TState = typeof initialState
type TActions = InferTActions<typeof actions>

export const channelReducer = (state = initialState, action: TActions):TState => {
  switch (action.type) {
    case "SET_CHANNEL_DATA":
      return {
        ...state,
        channel: action.data.channel
      }
    default:
      return state
  }
}

const actions = {
  setChannelDetails: (channel: TChannel) => {
    return {
      type: "SET_CHANNEL_DATA",
      data: {
        channel,
      }
    }
  },
}

export const getChannel = (id: string):ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch) => {
  const res = await channelsAPI.getChannel(id)
  const channel = {
    ...res.data() as TChannel,
    id: res.id
  }
  dispatch(actions.setChannelDetails(channel))
}