import { combineReducers } from "@reduxjs/toolkit";
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import channelsReducer from './channelsReducer';
import { channelReducer } from './channelReducer'
import { authReducer } from './authReducer'

const rootReducer = combineReducers({
  channels: channelsReducer,
  channel: channelReducer,
  auth: authReducer
})
export type TState = ReturnType<typeof rootReducer>

const composeEnhancers = composeWithDevTools(applyMiddleware(thunk))

const store = createStore(rootReducer, composeEnhancers)

export default store

// Type for Actions Object
type InferPropertiesTypes<T> = T extends { [key:string]: infer U } ? U : never
export type InferTActions<T extends {[key:string]: (...args:Array<any>)=>{type:string, data?:any}}> = ReturnType<InferPropertiesTypes<T>>

//@ts-ignore
window.__store__ = store // for console usage