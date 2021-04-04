import { InputLabel, ListItemText, MenuItem, Select } from "@material-ui/core"
import { FC, useEffect } from 'react'
import {connect} from 'react-redux'
import FormControl from "@material-ui/core/FormControl"
import Checkbox from "@material-ui/core/Checkbox"
import { countries } from "../../Common/Data/Countries"
import { getCountryFilter, setCountryFilter } from '../../Store/appReducer'

type TProps = {
  countryFilter:Array<string>
  getCountryFilter:any
  setCountryFilter:any
}

const CountryFilter: FC<TProps> = ({countryFilter, getCountryFilter, setCountryFilter}) => {
  useEffect(()=>{
    getCountryFilter()
  },[])
  const onCountrySelect = (e: React.ChangeEvent<{ value: unknown }>) => {
    const coutryList = e.target.value as Array<string>
    setCountryFilter(coutryList)
    localStorage.setItem('countryFilter', JSON.stringify(coutryList))
  }
  return (
    <>
    <FormControl>
      <InputLabel id="select-country">Filter by Country</InputLabel>
      <Select
        labelId="select-country"
        multiple
        value={countryFilter}
        onChange={onCountrySelect}
        renderValue={(selected) => (selected as string[]).join(", ")}
      >
        {countries.map((country) => (
          <MenuItem key={country.code} value={country.name}>
            <Checkbox checked={countryFilter.indexOf(country.name) > -1} />
            <ListItemText primary={`${country.name} ${country.name === country.native ? '' : country.native}`} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <div>{JSON.stringify(countryFilter, undefined, 2)}</div>
    </>
  )
}

const mapStateToProps = (state:any) => {
  return {
    countryFilter: state.app.countryFilter
  }
}

export default connect(mapStateToProps, {getCountryFilter, setCountryFilter})(CountryFilter)