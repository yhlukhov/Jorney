import { channelsAPI } from "../API/channelsAPI"
//* 1 - Channels Reducer   //

import { TChannel } from "../Common/Types/TChannel"
import { InferTActions } from "./store"
import { ThunkAction } from "redux-thunk"
import { TCountry } from "../Common/Types/TCountry"
import { TLanguage } from "../Common/Types/TLanguage"

const SET_CHANNELS = 'CHANNEL_LIST/SET_CHANNELS'
const SET_BOOKMARK = 'CHANNEL_LIST/SET_BOOKMARK'

const initialState = {
  channelList: [] as Array<TChannel>,
}

type TState = typeof initialState
type TActions = InferTActions<typeof actions>

//* Reducer
export function channelListReducer(state = initialState, action: TActions): TState {
  switch (action.type) {
    case SET_CHANNELS:
      return {
        ...state,
        //@ts-ignore
        channelList: action.data.channels,
      }
    case SET_BOOKMARK:
      const channels = [] as Array<TChannel>
      state.channelList.forEach(channel => {
        channels.push({...channel})
      })
      //@ts-ignore
      const index = channels.findIndex(channel => channel.id === action.data.id)
      channels[index].bookmark = !channels[index].bookmark
      return {
        ...state,
        channelList: channels
      }
    default:
      return state
  }
}

//* Actions
export const actions = {
  setChannels: (channels: Array<TChannel>) => {
    return {
      type: SET_CHANNELS,
      data: {
        channels,
      },
    }
  },
  setBookmark: (id:string) => {
    const LS = localStorage.getItem('channelBookmarks')
    const bookmarks = LS ? JSON.parse(LS) as string[] : [] as string[]
    const index = bookmarks.findIndex(bookmark => bookmark === id)
    if (index > -1) bookmarks.splice(index, 1)
    else bookmarks.push(id)
    localStorage.setItem('channelBookmarks', JSON.stringify(bookmarks))
    return {
      type: SET_BOOKMARK,
      data: {id}
    }
  }
}

export const getChannels = (countries: TCountry[], languages: TLanguage[]): ThunkAction<Promise<void>, TState, unknown, TActions> => async (
  dispatch
) => {
    let channels = [] as Array<TChannel>
    let LS = localStorage.getItem('channelBookmarks')
    let bookmarks = LS ? JSON.parse(LS) as Array<string> : [] as Array<string>
    const snapshot = await channelsAPI.getChannels(countries, languages)
    snapshot.forEach((channel) => {
      channels.push({ ...channel.data(), id: channel.id } as TChannel)
    })
    bookmarks.length && channels.forEach(channel => {
      if (bookmarks.findIndex(id => id === channel.id) > -1) channel.bookmark = true
    })
    dispatch(actions.setChannels(channels))
}

//* 3 - Channels Selectors // 
