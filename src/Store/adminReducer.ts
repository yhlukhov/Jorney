import { TChannel } from "../Common/Types/TChannel"
import { InferTActions } from './store'
import { ThunkAction } from 'redux-thunk'
import { channelsAPI } from '../API/channelsAPI'
import { TEvent } from "../Common/Types/TEvent"
import { eventsAPI } from "../API/eventsAPI"
import { TChannelAdm } from '../Common/Types/TChannelAdm'


const SET_ALL_CHANNELS = "SET_ALL_CHANNELS"
const SET_EVENTS_BY_CHANNEL_ID = "SET_EVENTS_BY_CHANNEL_ID"
const SET_APPROVE_CHANNEL = "SET_APPROVE_CHANNEL"
const SET_LOCK_CHANNEL = "SET_LOCK_CHANNEL"
const SET_APPROVE_EVENT = "SET_APPROVE_EVENT"
const SET_LOCK_EVENT = "SET_LOCK_EVENT"
const HIDE_EVENTS = "HIDE_EVENTS"

const initialState = {
  channels: [] as Array<TChannelAdm>
}

type TState = typeof initialState
type TActions = InferTActions<typeof actions>

//* REDUCER
export const adminReducer = (state = initialState, action:TActions):TState => {
  switch(action.type) {
    case SET_ALL_CHANNELS:
      //@ts-ignore
      return {...state, channels: action.data.channels}
    case SET_EVENTS_BY_CHANNEL_ID:
      let channels = [...state.channels]
      //@ts-ignore
      let channel = channels.find(channel => channel.channel.id === action.data.id)
      if(channel) {
        //@ts-ignore
        channel.events = action.data.events
        channel.expanded = true
      }
      return {...state, channels: channels }
    case SET_APPROVE_CHANNEL:
      //@ts-ignore
      let chn = state.channels.find(channel => channel.channel.id === action.data.id)
      if(chn) chn.channel.approved = true
      return {...state, channels: [...state.channels]}
    case SET_LOCK_CHANNEL:
      //@ts-ignore
      let ch = state.channels.find(channel => channel.channel.id === action.data.id)
      if(ch) ch.channel.approved = false
      return {...state, channels: [...state.channels]}
    case SET_APPROVE_EVENT:
      //@ts-ignore
      let chan = state.channels.find(channel => channel.events.find(event => event.id === action.data.id))
      if(chan) {
        //@ts-ignore
        let event = chan.events.find(event => event.id === action.data.id)
        if(event) event.approved = true
      }
      return {...state, channels: [...state.channels]}
    case SET_LOCK_EVENT:
      //@ts-ignore
      let chann = state.channels.find(channel => channel.events.find(event => event.id === action.data.id))
      if(chann) {
        //@ts-ignore
        let ev = chann.events.find(event => event.id === action.data.id)
        if(ev) ev.approved = false
      }
      return {...state, channels: [...state.channels]}
    case HIDE_EVENTS:
      //@ts-ignore
      action.data.channel.expanded = false
      return {...state, channels: [...state.channels]}
    default: return state
  }
}

//* ACTION CREATORS
const setAllChannels = (channels: Array<TChannelAdm>) => {
  return {
    type: SET_ALL_CHANNELS,
    data: {
      channels
    }
  }
}

const setEventsByChannelId = (events: Array<TEvent>, id:string) => {
  return {
    type: SET_EVENTS_BY_CHANNEL_ID,
    data: { events, id }
  }
}

const setApproveChannel = (id:string) => {
  return {
    type: SET_APPROVE_CHANNEL,
    data: {id}
  }
}

const setLockChannel = (id:string) => {
  return {
    type: SET_LOCK_CHANNEL,
    data: {id}
  }
}

const setApproveEvent = (id:string) => {
  return {
    type: SET_APPROVE_EVENT,
    data: {id}
  }
}

const setLockEvent = (id:string) => {
  return {
    type: SET_LOCK_EVENT,
    data: {id}
  }
}

export const hideEvents = (channel:TChannelAdm) => {
  return {
    type: HIDE_EVENTS,
    data: {channel}
  }
}

//* ACTIONS
export const actions = {
  setAllChannels,
  setEventsByChannelId,
  setApproveChannel,
  setLockChannel,
  hideEvents
}

//* THUNK CREATORS
export const getAllChannels = ():ThunkAction<Promise<void>, TState, unknown, TActions> => async dispatch => {
  let channels = await channelsAPI.getAllChannels()
  let channelsAdm = [] as Array<TChannelAdm>
  channels.forEach(channel => {
    channelsAdm.push({channel, events:[], expanded:false})
  })
  dispatch(setAllChannels(channelsAdm)) 
}

export const getEventsByChannelId = (id:string):ThunkAction<Promise<void>, TState, unknown, TActions> => async dispatch => {
  const events = [] as Array<TEvent>
  const eventsData = await eventsAPI.loadChannelEventsAdmin(id)
  eventsData.forEach((event) => {
    const data = event.data()
    events.push({ ...(data as TEvent), datetime: data.datetime.toDate(), id: event.id })
  })
  dispatch(setEventsByChannelId(events, id))
}

export const getAllEvents = ():ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch, getState) => {
  //@ts-ignore
  getState().admin.channels.forEach(channel => {
    dispatch (getEventsByChannelId(channel.channel.id))
  })
}

export const approveChannel = (id:string):ThunkAction<Promise<void>, TState, unknown, TActions> => async dispatch => {
  let res = await channelsAPI.approveChannel(id)
  dispatch(setApproveChannel(id))
  const eventsSnapshot = await eventsAPI.loadChannelEventsAdmin(id)
  eventsSnapshot.forEach(event => dispatch(approveEvent(event.id)))
}
export const lockChannel = (id:string):ThunkAction<Promise<void>, TState, unknown, TActions> => async dispatch => {
  await channelsAPI.lockChannel(id)
  dispatch(setLockChannel(id))
  const eventsSnapshot = await eventsAPI.loadChannelEventsAdmin(id)
  eventsSnapshot.forEach(event => dispatch(lockEvent(event.id)))
}

export const approveEvent = (id:string):ThunkAction<Promise<void>, TState, unknown, TActions> => async dispatch => {
  let res = await eventsAPI.approveEvent(id)
  dispatch(setApproveEvent(id))
}
export const lockEvent = (id:string):ThunkAction<Promise<void>, TState, unknown, TActions> => async dispatch => {
  await eventsAPI.lockEvent(id)
  dispatch(setLockEvent(id))
}