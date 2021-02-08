import { InferTActions } from "./store"
import { authAPI } from '../API/authAPI'
import { Dispatch } from "react"
import { ThunkAction } from "redux-thunk"

const initialState = {
  email: undefined as string | null | undefined,
  uid: undefined as string | undefined,
  emailVerified: undefined as boolean | undefined,
}

type TState = typeof initialState
type TActions = InferTActions<typeof actions>

export type TUser = {
  email: string|null|undefined
  uid: string|undefined
  emailVerified: boolean|undefined
}

export const authReducer = (state = initialState, action: TActions): TState => {
  switch (action.type) {
    case "SET_USER":
      const {email, uid, emailVerified} = {...action.data}
      return {
        ...state,
        email,
        uid,
        emailVerified
      }
    default:
      return state
  }
}

const actions = {
  setUser: (email:string|null|undefined, uid:string|undefined, emailVerified:boolean|undefined) => {
    return {
      type: "SET_USER",
      data: {
        email,
        uid,
        emailVerified
      },
    }
  },
}

export const signIn = (email:string, password:string):ThunkAction<void, TState, unknown, TActions> => (dispatch) => {
  authAPI.signIn(email, password).then((userCredentials) => {
    const {email, uid, emailVerified} = {...userCredentials.user}
    dispatch(actions.setUser(email, uid, emailVerified))
  }).catch(console.log)
}

export const signUp = (email: string, password: string):ThunkAction<void, TState, unknown, TActions> => (dispatch) => {
  authAPI.signUp(email, password).then((userCredentials) => {
    const {email, uid, emailVerified} = {...userCredentials.user}
    dispatch(actions.setUser(email, uid, emailVerified))
  }).catch(console.log)
}

export const signOut = ():ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch) => {
  let res = await authAPI.signOut()
  dispatch(actions.setUser(undefined, undefined, undefined))
}