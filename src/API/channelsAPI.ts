import { TChannel } from "../Common/Types/TChannel"
import { TCountry } from "../Common/Types/TCountry"
import { db } from "./APIConfig"
import { TLanguage } from "../Common/Types/TLanguage"

export const channelsAPI = {

  getChannels: async (countries:TCountry[], languages:TLanguage[]): Promise<Array<TChannel>> => {
    const channels: Array<TChannel> = []
    let snapshot
    if (countries.length && languages.length) {
      snapshot = await db.collection('channels').where('country', 'in', countries).where('languages', 'array-contains-any' , languages).get()
    } else if (countries.length) {
      snapshot = await db.collection('channels').where('country', 'in', countries).get()
    } else if (languages.length) {
      snapshot = await db.collection('channels').where('languages', 'array-contains-any' , languages).get()
    } else {
      snapshot = await db.collection('channels').get()
    }
    snapshot.forEach((channel) => {
      channels.push({ ...channel.data(), id: channel.id } as TChannel)
    })
    return channels
  },

  getAllChannels: async (): Promise<Array<TChannel>> => {
    const channels: Array<TChannel> = []
    let snapshot = await db.collection('channels').get()
    snapshot.forEach((res) => {
      channels.push({ ...res.data(), id: res.id } as TChannel)
    })
    return channels
  },

  getChannel: async(id:string) => {
    let channel = await db.collection('channels').doc(id).get()
    return channel
  },
  
}
