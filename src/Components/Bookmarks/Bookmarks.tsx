import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { loadBookmarkChannels, loadBookmarkEvents } from '../../Store/bookmarksReducer'
import EventBookmarks from './BookmarkEvents'
import BookmarkChannels from './BookmarkChannels'
import { TState } from '../../Store/store'
import { TEvent } from '../../Common/Types/TEvent'
import { TChannel } from '../../Common/Types/TChannel'

type TProps = {
  events: Array<TEvent>
  channels: Array<TChannel>
  loadBookmarkEvents:any
  loadBookmarkChannels:any
}

const Bookmarks: FC<TProps> = ({events, channels, loadBookmarkEvents, loadBookmarkChannels }) => {
  const loadData = async () => {
    await loadBookmarkEvents()
    await loadBookmarkChannels()
  }
  useEffect(() => {
    loadData()
  }, [events, channels])
  return (
    <div>
      <EventBookmarks />
      <BookmarkChannels />
    </div>
  )
}

const mapStateToProps = (state: TState) => {
  return {
    events: state.events.events,
    channels: state.channels.channelList
  }
}

export default connect(mapStateToProps, {loadBookmarkEvents, loadBookmarkChannels})(Bookmarks)