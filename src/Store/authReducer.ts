import { InferTActions } from "./store"
import { authAPI } from "../API/authAPI"
import { ThunkAction } from "redux-thunk"
import { TCountry } from "../Common/Types/TCountry"
import { TLanguage } from "../Common/Types/TLanguage"
import { TChannel } from "../Common/Types/TChannel"
import { storage } from '../API/APIConfig'

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

export const authReducer = (state = initialState, action: TActions): TState => {
  switch (action.type) {
    case "SET_CHANNEL":
      return {
        ...state,
        //@ts-ignore
        channel: action.data.channel,
        loggedIn: true,
      }

    case "SET_IMG_URL":
      return {
        ...state,
        //@ts-ignore
        imgUrl: action.data.imgUrl
      }

    case "SET_LOGOUT":
      return {
        ...state,
        loggedIn: false,
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

const actions = {
  setChannel: (channel: TChannel) => {
    return {
      type: "SET_CHANNEL",
      data: {
        channel,
      },
    }
  },

  setImgUrl: (imgUrl: string) => {
    return {
      type: "SET_IMG_URL",
      data: {
        imgUrl
      }
    }
  },

  setLogout: () => {
    return {
      type: "SET_LOGOUT",
      data: {}
    }
  },

  setError: (code: string, message: string) => {
    return {
      type: "SET_ERROR",
      data: {
        code: code,
        message: message,
      },
    }
  },
}

export const signIn = (email: string, password: string): ThunkAction<void, TState, unknown, TActions> => (dispatch) => {
  authAPI
    .signIn(email, password)
    .then((userCredentials) => {
      const { email, uid, emailVerified } = { ...userCredentials.user }
      authAPI.getChannelSnapshot(uid).onSnapshot((snap) => {
        let channel = { ...snap.data(), id: snap.id } as TChannel
        localStorage.setItem("channel", JSON.stringify(channel))
        dispatch(actions.setChannel(channel))
        storage.child(channel.image).getDownloadURL().then(url => {
          dispatch(actions.setImgUrl(url))
          console.log(url)
        })
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
  language: TLanguage
): ThunkAction<void, TState, unknown, TActions> => async (dispatch) => {
  const image = images[0]
  authAPI
    .signUp(email, password)
    .then((userCredentials) => {
      const { email, uid, emailVerified } = { ...userCredentials.user }
      authAPI
        .registerChannel(uid || '', name, email || '', author, info, image, country, language)
        .then(() => {
          authAPI.getChannelSnapshot(uid).onSnapshot((snap) => {
            if (snap.exists) {
              let channel = snap.data() as TChannel
              channel.id = snap.id
              localStorage.setItem("channel", JSON.stringify(channel))
              dispatch(actions.setChannel(channel))
              storage.child(channel.image).getDownloadURL().then(url => dispatch(actions.setImgUrl(url)))
            }
          })
        })
        .catch(console.log)
    })
    .catch((err) => {
      dispatch(actions.setError(err.code, err.message))
    })
}

export const signOut = (): ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch) => {
  let res = await authAPI.signOut()
  dispatch(actions.setLogout())
  localStorage.removeItem("channel")
}
