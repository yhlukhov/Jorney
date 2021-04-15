import { ThunkAction } from 'redux-thunk'
import { InferTActions } from './store'
import { TCountry } from '../Common/Types/TCountry'
import { TLanguage } from '../Common/Types/TLanguage'

const SET_COUNTRY_FILTER = 'SET_COUNTRY_FILTER'
const SET_LANGUAGE_FILTER = 'SET_LANGUAGE_FILTER'

const initialState = {
  countryFilter: null as null|Array<TCountry>,
  languageFilter: null as null|Array<TLanguage>
}

type TState = typeof initialState
type TActions = InferTActions<typeof actions>

//* REDUCER
export const appReducer = (state = initialState, action:TActions) => {
  switch (action.type) {
    case SET_COUNTRY_FILTER:
      return {
        ...state,
        //@ts-ignore
        countryFilter: action.data.countryList
      }
    case SET_LANGUAGE_FILTER:
      return {
        ...state,
        //@ts-ignore
        languageFilter: action.data.languageList
      }
    default: return state
  }
}

//* ACTION CREATORS
export const setCountryFilter = (countryList:Array<TCountry>) => {
  localStorage.setItem('countryFilter', JSON.stringify(countryList))
  return {
    type: SET_COUNTRY_FILTER,
    data: {
      countryList
    }
  }
}

export const setLanguageFilter = (languageList:Array<string>) => {
  localStorage.setItem('languageFilter', JSON.stringify(languageList))
  return {
    type: SET_LANGUAGE_FILTER,
    data: {
      languageList
    }
  }
}


const actions = {
  setCountryFilter,
  setLanguageFilter
}

//* THUNK CREATORS
export const getCountryFilter = (): ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch) => {
  let countryList = localStorage.getItem('countryFilter')
  dispatch(setCountryFilter(countryList ? JSON.parse(countryList) as Array<TCountry> : [] as Array<TCountry>))
}

export const getLanguageFilter = (): ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch) => {
  let languageList = localStorage.getItem('languageFilter')
  dispatch(setLanguageFilter(languageList ? JSON.parse(languageList) : [] as Array<TLanguage>))
}