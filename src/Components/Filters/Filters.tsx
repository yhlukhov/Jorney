import { FunctionComponent } from "react";
import CountryFilter from "./CountryFilter";
import LanguageFilter from './LanugageFilter';

const Filters: FunctionComponent = () => {
  return (
    <div style={{border:"1px solid lightblue"}}>
      <CountryFilter />
      <LanguageFilter />
    </div>
  )
}

export default Filters