import { InferTActions } from "./store"
import { authAPI } from "../API/authAPI"
import { ThunkAction } from "redux-thunk"
import { TCountry } from "../Common/Types/TCountry"
import { TLanguage } from "../Common/Types/TLanguage"
import { TChannel } from "../Common/Types/TChannel"
import { storage } from "../API/APIConfig"
import history from '../Common/Utils/history'

const initialState = {
  loggedIn: false,
  channel: undefined as TChannel | undefined,
  imgUrl: undefined as string | undefined,
  error: {
    code: "",
    message: "",
  },
}
type TState = typeof initialState
type TActions = InferTActions<typeof actions>

//* AUTH REDUCER
export const authReducer = (state = initialState, action: TActions): TState => {
  switch (action.type) {
    case "SET_CHANNEL":
      return {
        ...state,
        //@ts-ignore
        channel: action.data.channel
      }

    case "SET_IMG_URL":
      return {
        ...state,
        //@ts-ignore
        imgUrl: action.data.imgUrl,
      }

    case "SET_LOGGED_IN":
      return {
        ...state,
        //@ts-ignore
        loggedIn: action.data.status,
      }

    case "SET_ERROR":
      const { code, message } = { ...action.data }
      return {
        ...state,
        error: { code: code || "", message: message || "" },
      }

    default:
      return state
  }
}

//* ACTION CREATORS
const setChannel = (channel: TChannel) => {
  return {
    type: "SET_CHANNEL",
    data: { channel },
  }
}

const setImgUrl = (imgUrl: string) => {
  return {
    type: "SET_IMG_URL",
    data: { imgUrl },
  }
}

const setLoggedIn = (status: boolean) => {
  return {
    type: "SET_LOGGED_IN",
    data: { status },
  }
}

const setError = (code: string, message: string) => {
  return {
    type: "SET_ERROR",
    data: {
      code: code,
      message: message,
    },
  }
}

//* ACTIONS
const actions = {
  setChannel,
  setImgUrl,
  setLoggedIn,
  setError,
}

//* THUNK CREATORS

export const signIn = (email: string, password: string): ThunkAction<void, TState, unknown, TActions> => (dispatch) => {
  authAPI
    .signIn(email, password)
    .then((userCredentials) => {
      const { uid } = { ...userCredentials.user }
      authAPI.getChannelSnapshot(uid).onSnapshot((snap) => {
        let channel = { ...snap.data(), id: snap.id } as TChannel
        localStorage.setItem("channel", JSON.stringify(channel))
        dispatch(setChannel(channel))
        dispatch(setLoggedIn(true))
        dispatch(getChannelImgUrl(channel.image)) //! do i need to use dispatch(getChannelImgUrl(channel.image)) instead ???
      })
    })
    .catch(console.log)
}

export const signUp = (
  name: string,
  email: string,
  password: string,
  author: string,
  info: string,
  images: FileList,
  country: TCountry,
  language: Array<TLanguage>
): ThunkAction<void, TState, unknown, TActions> => async (dispatch) => {
  const image = images[0]
  authAPI
    .signUp(email, password)
    .then((userCredentials) => {
      const { email, uid } = { ...userCredentials.user }
      authAPI
        .registerChannel(uid || "", name, email || "", author, info, image, country, language)
        .then(() => {
          authAPI.getChannelSnapshot(uid).onSnapshot((snap) => {
            if (snap.exists) {
              const channel = {...snap.data(), id:snap.id} as TChannel
              dispatch(setChannel(channel))
              dispatch(getChannelImgUrl(channel.image))
              dispatch(setLoggedIn(true))
              localStorage.setItem("channel", JSON.stringify(channel))
            }
          })
        })
        .catch(console.log)
    })
    .catch((err) => {
      dispatch(setError(err.code, err.message))
    })
}

export const signOut = (): ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch) => {
  await authAPI.signOut()
  dispatch(setLoggedIn(false))
  localStorage.removeItem("channel")
}

export const getChannelImgUrl = (image: string): ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch) => {
  const url = await storage.child(image).getDownloadURL()
  dispatch(setImgUrl(url))
}

export const getLocalstorageChannel = (): ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch) => {
  const channelLS = localStorage.getItem("channel")
  if (channelLS) {
    const channel = JSON.parse(channelLS) as TChannel
    dispatch(setChannel(channel))
    getChannelImgUrl(channel.image)
    dispatch(setLoggedIn(true))
  }
}
