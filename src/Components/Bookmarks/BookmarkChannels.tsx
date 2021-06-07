import { FC } from "react"
import { connect } from "react-redux"
import { TChannel } from "../../Common/Types/TChannel"
import AOS from "aos"
import "aos/dist/aos.css"
import { TState } from "../../Store/store"
import ChannelItem from "../Channels/ChannelItem/ChannelItem"

type TProps = {
  channels: Array<TChannel>
}

const BookmarkChannels: FC<TProps> = ({ channels }) => {

  return (
    <div>
      Channel Bookmarks
      <div data-aos="fade-up" style={{display:'flex'}}>
        {channels?.map((channel) => (
          <ChannelItem channel={channel} key={channel.id} />
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state: TState) => {
  return {
    channels: state.bookmarks.channels,
  }
}

export default connect(mapStateToProps)(BookmarkChannels)
