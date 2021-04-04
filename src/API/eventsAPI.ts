import { db } from "./APIConfig"
import { TEvent } from '../Common/Types/TEvent'

export const eventsAPI = {
  loadEvents: () => {
    return db.collection("events")
  },
  createEvent: async(eventData:TEvent) => {
    const event = { ...eventData, bookmark:false, approved: false}
    db.collection('events').add(event)
  },
}
