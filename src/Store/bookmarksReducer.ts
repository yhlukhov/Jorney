import { ThunkAction } from "redux-thunk"
import { channelsAPI } from "../API/channelsAPI"
import { eventsAPI } from "../API/eventsAPI"
import { TChannel } from "../Common/Types/TChannel"
import { TEvent } from "../Common/Types/TEvent"
import { InferTActions } from "./store"

const SET_BOOKMARK_EVENTS = "SET_BOOKMARK_EVENTS"
const SET_BOOKMARK_CHANNELS = "SET_BOOKMARK_CHANNELS"

type TState = typeof initialState
type TActions = InferTActions<typeof actions>

const initialState = {
  events: [] as Array<TEvent>,
  channels: [] as Array<TChannel>,
}
//* Reducer:
export const bookmarksReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_BOOKMARK_EVENTS:
      return {
        ...state,
        events: action.data.events,
      }
    case SET_BOOKMARK_CHANNELS:
      return {
        ...state,
        channels: action.data.channels,
      }
    default:
      return state
  }
}
//* Action creators:
const setBookmarkEvents = (events: TEvent[]) => {
  return {
    type: SET_BOOKMARK_EVENTS,
    data: { events },
  }
}
const setBookmarkChannels = (channels: TChannel[]) => {
  return {
    type: SET_BOOKMARK_CHANNELS,
    data: { channels },
  }
}
// Actions:
const actions = {
  setBookmarkEvents,
  setBookmarkChannels,
}

//* Thunk creators:
export const loadBookmarkEvents = (): ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch) => {
  const LS = localStorage.getItem("eventBookmarks")
  const ids = LS ? (JSON.parse(LS) as string[]) : ([] as string[])
  const bookmarks = [] as Array<TEvent>
  if (ids.length) {
    const snapshot = await eventsAPI.loadBookmarkEvents(ids)
    snapshot.forEach((event) => {
      bookmarks.push({ ...event.data(), bookmark: true, datetime: event.data().datetime.toDate(), id: event.id } as TEvent)
    })
    dispatch(setBookmarkEvents(bookmarks))
  }
}

export const loadBookmarkChannels = (): ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch) => {
  const LS = localStorage.getItem("channelBookmarks")
  const ids = LS ? (JSON.parse(LS) as Array<string>) : ([] as Array<string>)
  let bookmarks = [] as Array<TChannel>
  if (ids.length) {
    const snapshot = await channelsAPI.getBookmarkChannels(ids)
    snapshot.forEach((channel) => {
      bookmarks.push({ ...channel.data(), bookmark:true, id: channel.id } as TChannel)
    })
    dispatch(setBookmarkChannels(bookmarks))
  }
}
