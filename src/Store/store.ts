import thunk from "redux-thunk"
import { combineReducers } from "@reduxjs/toolkit"
import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { channelListReducer } from "./channelListReducer"
import { eventListReducer } from './eventListReducer'
import { myChannelReducer } from "./myChannelReducer"
import { channelReducer } from "./channelReducer"
import { authReducer } from "./authReducer"
import { appReducer } from "./appReducer"
import { adminReducer } from "./adminReducer"
import { eventReducer } from "./eventReducer"
import { bookmarksReducer } from './bookmarksReducer'

const rootReducer = combineReducers({
  myChannel: myChannelReducer,
  channels: channelListReducer,
  channel: channelReducer,
  events: eventListReducer,
  event: eventReducer,
  bookmarks: bookmarksReducer,
  admin: adminReducer,
  auth: authReducer,
  app: appReducer,
})

export type TState = ReturnType<typeof rootReducer>

const composeEnhancers = composeWithDevTools(applyMiddleware(thunk))

const store = createStore(rootReducer, composeEnhancers)

export default store

// Type for Actions Object
type InferPropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferTActions<T extends { [key: string]: (...args: Array<any>) => { type: string; data?: any } }> = ReturnType<
  InferPropertiesTypes<T>
>