import { channelsAPI } from '../API/channelsAPI'
//* 1 - Channels Reducer   //

import { TChannel } from '../Common/Types/TChannel';
import { InferTActions } from './store'
import { ThunkAction } from 'redux-thunk'

const initialState = {
  channelsList: [] as Array<TChannel>
}

type TState = typeof initialState
type TActions = InferTActions<typeof actions>

export default function channelsReducer (state=initialState, action:TActions):TState {
  switch(action.type) {
    case 'SET_CHANNELS':
      return {
        ...initialState,
        channelsList: action.data.channels
      }
    default: return state
  }
}


//* 2 - *actions* object
export const actions = {

  setChannels: (channels:Array<TChannel>) => {
    return {
      type: 'SET_CHANNELS',
      data: {
        channels
      }
    }
  },
  
}

export const getChannels = ():ThunkAction<Promise<void>, TState, unknown, TActions> => async (dispatch) => {
  const channels = await channelsAPI.getChannels()
  dispatch(actions.setChannels(channels))
}




//* 3 - Channels Selectors //