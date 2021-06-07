import { db } from "./APIConfig"
import { TEvent } from "../Common/Types/TEvent"
import { TCountry } from "../Common/Types/TCountry"
import { TLanguage } from "../Common/Types/TLanguage"

export const eventsAPI = {
  loadEvents: (countries: TCountry[], languages: TLanguage[]) => { 
    let now = new Date()
    now.setTime(now.getTime() - 60 * 60 * 1000) // time = now - 1hr
    if (countries.length == 0 && languages.length == 0) {
      return db.collection("events").where("approved", "==", true).where("datetime", ">=", now).get()
    } else if (countries.length == 0)
      return db.collection("events").where("languages", "array-contains-any", languages).where("approved", "==", true).where("datetime", ">=", now).get()
    else
      return db.collection("events").where("country", "in", countries).where("approved", "==", true).where("datetime", ">=", now).get()
  },
  loadEvent: (id:string)=>{
    return db.collection('events').doc(id).get()
  },
  loadChannelEvents: (id: string) => {
    return db.collection("events").where("channelId", "==", id).where("approved", "==", true).get()
  },
  loadChannelEventsAdmin: (id: string) => {
    return db.collection("events").where("channelId", "==", id).get()
  },
  loadBookmarkEvents: (ids:string[]) => {
    return db.collection('events').where('id', 'in', ids).where("approved", "==", true).get()
  },
  createEvent: async (event: TEvent) => {
    return await db.collection("events").add(event)
  },
  editEvent: async (event:TEvent) => {
    return await db.collection("events").doc(event.id).update(event)
  },
  deleteEvent: async (id: string) => {
    return db.collection("events").doc(id).delete()
  },
  approveEvent: async(id:string) => {
    return db.collection('events').doc(id).update({approved:true})
  },
  lockEvent: async(id:string) => {
    return db.collection('events').doc(id).update({approved:false})
  },
}
