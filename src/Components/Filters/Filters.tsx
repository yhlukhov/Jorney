import { FunctionComponent } from "react";
import CountryFilter from "./CountryFilter";
import LanguageFilter from './LanugageFilter';

const Filters: FunctionComponent = () => {
  return (
    <div>
      <CountryFilter />
      <LanguageFilter />
    </div>
  )
}

export default Filters