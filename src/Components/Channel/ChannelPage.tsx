import {FC} from 'react'
import { useEffect } from 'react'
import { TChannel } from '../../Common/Types/TChannel'
import { getIdFromUrl } from '../../Common/Functions'

type TProps = {
  channel: TChannel
  getChannel: any
  id: string
}

const ChannelPage: FC<TProps> = ({channel, getChannel, id}) => {

  useEffect(()=>{
    // if(!id) id = getIdFromUrl() // need to test if this is required to open channel page by link
    getChannel(id)
  },[])

  return (
    <div>
      <div>{channel.name}</div>
      <div>{channel.id}</div>
      <div>{channel.userName}</div>
    </div>
  )
}

export default ChannelPage