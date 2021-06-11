import { TEvent } from '../Common/Types/TEvent'

//* This is helper functions file (not a reducer) *//

export function setEventBookmarks(events:Array<TEvent>) {
  let LS = localStorage.getItem('eventBookmarks')
  const bookmarks = LS ? JSON.parse(LS) as Array<string> : [] as Array<string>
  bookmarks.length && events.forEach(event => {
    if (bookmarks.find(bookmark => bookmark === event.id)) event.bookmark = true 
  })
}