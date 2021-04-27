import { TChannel } from "../Common/Types/TChannel"
import { TCountry } from "../Common/Types/TCountry"
import { db } from "./APIConfig"
import { TLanguage } from "../Common/Types/TLanguage"

export const channelsAPI = {
  // For Channels list:
  getChannels: (countries:TCountry[], languages:TLanguage[]) => {
    if (countries.length) {
      return db.collection('channels').where('country', 'in', countries).get()
    } else if (languages.length) {
      return db.collection('channels').where('languages', 'array-contains-any' , languages).get()
    } else {
      return db.collection('channels').get()
    }
  },
  // For Admin Page list:
  getAllChannels: async (): Promise<Array<TChannel>> => {
    const channels: Array<TChannel> = []
    let snapshot = await db.collection('channels').get()
    snapshot.forEach((res) => {
      channels.push({ ...res.data(), id: res.id } as TChannel)
    })
    return channels
  },
  // For Channel Details page
  getChannel: async(id:string) => {
    return await db.collection('channels').doc(id).get()
  },
  
}
