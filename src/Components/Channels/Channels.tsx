import { useEffect } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import AOS from "aos"
import "aos/dist/aos.css"
import ChannelItem from "./ChannelItem/ChannelItem"
import { TChannel } from "../../Common/Types/TChannel"
import { getChannels } from "../../Store/channelListReducer"
import { TState } from "../../Store/store"
import Filters from "../Filters/Filters"
import Teachings from "../Teachings/Teachings"
import { TCountry } from "../../Common/Types/TCountry"
import { TLanguage } from "../../Common/Types/TLanguage"
import { getCountryFilter, getLanguageFilter } from '../../Store/appReducer'

type PropsType = {
  channels: Array<TChannel>
  getChannels: any
  countries: Array<TCountry>
  languages: Array<TLanguage>
  getCountryFilter: any
  getLanguageFilter: any
}

const Channels = ({ channels, getChannels, countries, languages, getCountryFilter, getLanguageFilter }: PropsType) => {
  
  useEffect(() => {
    getCountryFilter()
    getLanguageFilter()
    AOS.init({ duration: 800 })
  }, [])
  useEffect(()=>{
    countries && languages && getChannels(countries, languages)
  }, [countries, languages])
  if (!channels.length) return <div style={{ fontSize: "40px" }}>Loading...</div>
  const channelList = channels.map((channel) => <ChannelItem channel={channel} key={channel.id} />)
  return (
    <div>
      <div style={{display:'flex'}}>
        <Filters />
        <Teachings />
      </div>
      <ChannelsSection data-aos="fade-up">{channelList}</ChannelsSection>
    </div>
  )
}

const mapStateToProps = (state: TState) => {
  return {
    channels: state.channels.channelList,
    countries: state.app.countryFilter,
    languages: state.app.languageFilter
  }
}

const actionCreators = {
  getChannels,
  getCountryFilter,
  getLanguageFilter
}

export default connect(mapStateToProps, actionCreators)(Channels)

//* STYLED COMPONENTS
const ChannelsSection = styled.section`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`
