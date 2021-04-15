import { db } from "./APIConfig"
import { TEvent } from "../Common/Types/TEvent"

export const eventsAPI = {
  loadEvents: (countries: string[], languages: string[]) => {
    let now = new Date()
    now.setTime(now.getTime() - 60 * 60 * 1000) // time = now - 1hr
    if (countries.length == 0 && languages.length == 0) {
      return db.collection("events").where("approved", "==", true).where("datetime", ">=", now).get()
    } else if (countries.length == 0)
      return db.collection("events").where("languages", "array-contains-any", languages).where("approved", "==", true).where("datetime", ">=", now).get()
    else
      return db.collection("events").where("country", "in", countries).where("approved", "==", true).where("datetime", ">=", now).get()
  },

  loadChannelEvents: async (id: string) => {
    return db.collection("events").where("channelId", "==", id).get()
  },
  createEvent: async (eventData: TEvent) => {
    return db.collection("events").add(eventData)
  },
  deleteEvent: async (id: string) => {
    return db.collection("events").doc(id).delete()
  },
}
