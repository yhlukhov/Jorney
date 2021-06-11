import { TEvent } from "../Common/Types/TEvent"
import { InferTActions } from "./store"
import { eventsAPI } from "../API/eventsAPI"
import { ThunkAction } from "redux-thunk"
import { TCountry } from "../Common/Types/TCountry"
import { TLanguage } from "../Common/Types/TLanguage"
import { setEventBookmarks } from './helperFunctions'

const SET_EVENTS = 'SET_EVENTS'
const SET_BOOKMARK = 'EVENT_LIST/SET_BOOKMARK'

type TState = typeof initialState
type TActions = InferTActions<typeof actions>

const initialState = {
  events: [] as Array<TEvent>,
}

//* REDUCER
export const eventListReducer = (state = initialState, action: TActions) => {
  switch (action.type) {
    case SET_EVENTS:
      return {
        ...state,
        //@ts-ignore
        events: action.data.events,
      }
    case SET_BOOKMARK:
      let events = [] as Array<TEvent>
      state.events.forEach(e => events.push({...e} as TEvent))
      //@ts-ignore
      let event = events.find(e=>e.id===action.data.id)
      if (event) event.bookmark = !event.bookmark
      return {
        ...state,
        events
      }
    default:
      return state
  }
}

//* ACTION CREATORS
export const setEvents = (events: Array<TEvent>) => {
  return {
    type: SET_EVENTS,
    data: {
      events,
    },
  }
}

export const setBookmark = (id:string) => {
  const LS = localStorage.getItem('eventBookmarks') // get localstorage value
  const bookmarks = LS ? JSON.parse(LS) as string[] : [] as string[] // get bookmarks from local storage if present, or set empty array
  const index = bookmarks.findIndex(bookmark => bookmark === id)
  if (index > -1) bookmarks.splice(index, 1) // if bookmark already exists - remove it
  else bookmarks.push(id) // if no bookmark - add it
  localStorage.setItem('eventBookmarks', JSON.stringify(bookmarks)) // update local storage
  return {
    type: SET_BOOKMARK, 
    data: {id}
  }
}

//* ACTIONS
const actions = {
  setEvents,
  setBookmark
}

//* THUNK CREATORS

export const loadEvents = (countries: TCountry[], languages: TLanguage[]): ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch) => {
  let snapshot = await eventsAPI.loadEvents(countries, languages)
  let events = [] as Array<TEvent>
  
  snapshot.forEach((event) => {
    const data = event.data()
    events.push({ ...(data as TEvent), datetime: data.datetime.toDate(), id: event.id })
  })
  
  setEventBookmarks(events)

  dispatch(actions.setEvents(events))
}

export const deleteEvent = (id: string): ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch) => {
  return await eventsAPI.deleteEvent(id)
}
