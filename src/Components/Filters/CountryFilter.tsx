import { InputLabel, ListItemText, MenuItem, Select } from "@material-ui/core"
import { FC, useEffect, useState } from 'react'
import {connect} from 'react-redux'
import FormControl from "@material-ui/core/FormControl"
import Checkbox from "@material-ui/core/Checkbox"
import { countries } from '../../Common/Data/Countries'
import { getCountryFilter, setCountryFilter, setLanguageFilter } from '../../Store/appReducer'
import { TCountry } from "../../Common/Types/TCountry"
import css from './filters.module.css'

type TProps = {
  countryFilter:Array<TCountry>
  getCountryFilter:any
  setCountryFilter:any
  setLanguageFilter:any
}

const CountryFilter: FC<TProps> = ({countryFilter, getCountryFilter, setCountryFilter, setLanguageFilter}) => {
  const [countryList, setCountryList] = useState([] as Array<string>)
  useEffect(()=>{
    getCountryFilter()
  },[])
  useEffect(()=>{
    countryFilter && setCountryList(countryFilter.map(country => country.native))
  },[countryFilter])
  const onCountrySelect = (e: React.ChangeEvent<{ value: unknown }>) => {
    setLanguageFilter([]) // clear language filter
    const countryFilterList = e.target.value as Array<string>
    const newCountryList = countryFilterList.map(native => countries.find(country => country.native === native))
    setCountryFilter(newCountryList)
  }
  if (!countryList) return <div>loading...</div>
  return (
    <FormControl variant="filled" className={css.filter}>
      <InputLabel id="select-country">Filter by Country</InputLabel>
      <Select
        labelId="select-country"
        multiple
        value={countryList}
        onChange={onCountrySelect}
        renderValue={(selected) => (selected as string[]).join(',')}
      >
        {countries.map((country) => (
          //@ts-ignore
          <MenuItem key={country.native} value={country.native} >
            <Checkbox checked={countryList.findIndex(item => item === country.native) > -1} />
            <ListItemText primary={`${country.name} ${country.name === country.native ? '' : country.native}`} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

const mapStateToProps = (state:any) => {
  return {
    countryFilter: state.app.countryFilter
  }
}

export default connect(mapStateToProps, {getCountryFilter, setCountryFilter, setLanguageFilter})(CountryFilter)