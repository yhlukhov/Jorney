import { TChannel } from "../Common/Types/TChannel"
import { TCountry } from "../Common/Types/TCountry"
import { db } from "./APIConfig"
import { TLanguage } from "../Common/Types/TLanguage"

const CHANNELS = 'channels'

export const channelsAPI = {
  // For Channels list:
  getChannels: (countries:TCountry[], languages:TLanguage[]) => {
    if (countries.length) {
      return db.collection(CHANNELS).where('country', 'in', countries).where('approved', '==', true).get()
    } else if (languages.length) {
      return db.collection(CHANNELS).where('languages', 'array-contains-any' , languages).where('approved', '==', true).get()
    } else {
      return db.collection(CHANNELS).where('approved', '==', true).get()
    }
  },
  // For Admin Page list:
  getAllChannels: async (): Promise<Array<TChannel>> => {
    const channels: Array<TChannel> = []
    let snapshot = await db.collection(CHANNELS).get()
    snapshot.forEach((res) => {
      channels.push({ ...res.data(), id: res.id } as TChannel)
    })
    return channels
  },
  // For Bookmarks page
  getBookmarkChannels: (ids:string[]) => {
    return db.collection(CHANNELS).where('id', 'in', ids).get()
  },
  // For Channel Details page
  getChannel: async(id:string) => {
    return await db.collection(CHANNELS).doc(id).get()
  },
  // Approve channel
  approveChannel: async(id:string) => {
    return await db.collection(CHANNELS).doc(id).update({approved:true})
  },
  // Lock channel
  lockChannel: async(id:string) => {
    return await db.collection(CHANNELS).doc(id).update({approved:false})
  }
}
