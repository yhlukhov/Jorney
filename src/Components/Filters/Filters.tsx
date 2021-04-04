import { FC } from 'react'
import { TState } from '../../Store/store';
import CountryFilter from "./CountryFilter";
import LanguageFilter from './LanugageFilter';
import { connect } from 'react-redux'

type TProps = {}

const Filters: FC<TProps> = () => {
  return (
    <div style={{border:"1px solid lightblue"}}>
      <CountryFilter />
      <LanguageFilter />
    </div>
  )
}

export default Filters