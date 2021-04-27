import { channelsAPI } from "../API/channelsAPI"
//* 1 - Channels Reducer   //

import { TChannel } from "../Common/Types/TChannel"
import { InferTActions } from "./store"
import { ThunkAction } from "redux-thunk"
import { TCountry } from "../Common/Types/TCountry"
import { TLanguage } from "../Common/Types/TLanguage"

const initialState = {
  channelsList: [] as Array<TChannel>,
}

type TState = typeof initialState
type TActions = InferTActions<typeof actions>

export function channelListReducer(state = initialState, action: TActions): TState {
  switch (action.type) {
    case "SET_CHANNELS":
      return {
        ...state,
        channelsList: action.data.channels,
      }
    default:
      return state
  }
}

//* 2 - *actions* object
export const actions = {
  setChannels: (channels: Array<TChannel>) => {
    return {
      type: "SET_CHANNELS",
      data: {
        channels,
      },
    }
  },
}

export const getChannels = (countries: TCountry[], languages: TLanguage[]): ThunkAction<Promise<void>, TState, unknown, TActions> => async (
  dispatch
) => {
    let channels = [] as Array<TChannel>
    const snapshot = await channelsAPI.getChannels(countries, languages)
    snapshot.forEach((channel) => {
      channels.push({ ...channel.data(), id: channel.id } as TChannel)
    })
    dispatch(actions.setChannels(channels))
}

//* 3 - Channels Selectors // 
