import { TChannel } from "../Common/Types/TChannel"
import { db } from "./APIConfig"

const CHANNELS = "channels"

export const channelsAPI = {

  getChannels: async (): Promise<Array<TChannel>> => {
    const channels: Array<TChannel> = []
    let snapshot = await db.collection(CHANNELS).get()
    snapshot.forEach((res) => {
      channels.push({ ...(res.data() as TChannel), id: res.id })
    })
    return channels
  },

  getChannel: async(id:string) => {
    let channel = await db.collection('channels').doc(id).get()
    return channel
  },
  
}
