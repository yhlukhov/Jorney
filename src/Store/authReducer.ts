import { InferTActions } from "./store"
import { authAPI } from "../API/authAPI"
import { ThunkAction } from "redux-thunk"
import { TCountry } from "../Common/Types/TCountry"
import { TLanguage } from "../Common/Types/TLanguage"
import { TChannel } from "../Common/Types/TChannel"
import { storage } from "../API/APIConfig"
import history from "../Common/Utils/history"

const SET_CHANNEL = "SET_CHANNEL"
const SET_IMG_URL = "SET_IMG_URL"
const SET_LOGGED_IN = "SET_LOGGED_IN"
const SET_SIGN_UP_ERROR = "SET_SIGN_UP_ERROR"
const SET_LOGIN_ERROR = "SET_LOGIN_ERROR"

const initialState = {
  loggedIn: false,
  channel: undefined as TChannel | undefined,
  imgUrl: undefined as string | undefined,
  signUpError: {
    code: "",
    message: "",
  },
  loginError: {
    code: "",
    message: "",
  },
}
type TState = typeof initialState
type TActions = InferTActions<typeof actions>

//* AUTH REDUCER
export const authReducer = (state = initialState, action: TActions): TState => {
  switch (action.type) {
    case SET_CHANNEL:
      return {
        ...state,
        //@ts-ignore
        channel: action.data.channel,
      }

    case SET_IMG_URL:
      return {
        ...state,
        //@ts-ignore
        imgUrl: action.data.imgUrl,
      }

    case SET_LOGGED_IN:
      return {
        ...state,
        //@ts-ignore
        loggedIn: action.data.status,
      }

    case SET_SIGN_UP_ERROR:
      return {
        ...state,
        //@ts-ignore
        signUpError: { code: action.data.code || "", message: action.data.message || "" },
      }

    case SET_LOGIN_ERROR:
      return {
        ...state,
        //@ts-ignore
        loginError: { code: action.data.code || "", message: action.data.message || "" },
      }

    default:
      return state
  }
}

//* ACTION CREATORS
const setChannel = (channel: TChannel) => {
  return {
    type: SET_CHANNEL,
    data: { channel },
  }
}

const setImgUrl = (imgUrl: string) => {
  return {
    type: SET_IMG_URL,
    data: { imgUrl },
  }
}

const setLoggedIn = (status: boolean) => {
  return {
    type: SET_LOGGED_IN,
    data: { status },
  }
}

const setSignUpError = (code: string, message: string) => {
  return {
    type: SET_SIGN_UP_ERROR,
    data: {
      code: code,
      message: message,
    },
  }
}

const setLoginError = (code: string, message: string) => {
  return {
    type: SET_LOGIN_ERROR,
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
  setSignUpError,
}

//* THUNK CREATORS

export const signIn =
  (email: string, password: string): ThunkAction<void, TState, unknown, TActions> =>
  (dispatch) => {
    authAPI
      .signIn(email, password)
      .then((userCredentials) => {
        const { uid } = { ...userCredentials.user }
        authAPI.getChannelSnapshot(uid).onSnapshot((snap) => {
          let channel = { ...snap.data(), id: snap.id } as TChannel
          localStorage.setItem("channel", JSON.stringify(channel))
          dispatch(setChannel(channel))
          dispatch(setLoggedIn(true))
          dispatch(getChannelImgUrl(channel.image))
          dispatch(setLoginError('', ''))
        })
      })
      .catch((err)=>{
        console.log(err.code, err.message)
        dispatch(setLoginError(err.code, err.message))
      })
  }

export const signUp =
  (
    name: string,
    email: string,
    password: string,
    author: string,
    info: string,
    images: FileList,
    country: TCountry,
    language: Array<TLanguage>
  ): ThunkAction<void, TState, unknown, TActions> =>
  async (dispatch) => {
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
                const channel = { ...snap.data(), id: snap.id } as TChannel
                dispatch(setChannel(channel))
                dispatch(getChannelImgUrl(channel.image))
                dispatch(setLoggedIn(true))
                dispatch(setSignUpError('', ''))
                localStorage.setItem("channel", JSON.stringify(channel))
              }
            })
          })
          .catch(console.log)
      })
      .catch((err) => {
        dispatch(setSignUpError(err.code, err.message))
      })
  }

export const signOut = (): ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch) => {
  await authAPI.signOut()
  dispatch(setLoggedIn(false))
  localStorage.removeItem("channel")
}

export const getChannelImgUrl =
  (image: string): ThunkAction<Promise<void>, TState, unknown, TActions> =>
  async (dispatch) => {
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
