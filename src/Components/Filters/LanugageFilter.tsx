import { FC, useEffect, useState } from 'react'
import { connect } from "react-redux"
import { InputLabel, ListItemText, MenuItem, Select } from "@material-ui/core"
import FormControl from "@material-ui/core/FormControl"
import Checkbox from "@material-ui/core/Checkbox"
import { languages } from "../../Common/Data/Languages"
import { getLanguageFilter, setLanguageFilter, setCountryFilter } from '../../Store/appReducer'
import { TState } from "../../Store/store"
import { TLanguage } from "../../Common/Types/TLanguage"
import css from './filters.module.css'

type TProps = {
  languageFilter:Array<TLanguage>
  getLanguageFilter:any
  setLanguageFilter:any
  setCountryFilter:any
}

const LanguageFilter:FC<TProps> = ({languageFilter, getLanguageFilter, setLanguageFilter, setCountryFilter}) => {
  const [languageList, setLanguageList] = useState([] as Array<string>)
  useEffect(()=>{
    getLanguageFilter()
  },[])
  useEffect(()=>{
    languageFilter && setLanguageList(languageFilter.map(language => language.native))
  }, [languageFilter])
  const onLanguageSelect = (e:React.ChangeEvent<{ value: unknown }>) => {
    setCountryFilter([]) // clear country filter
    const languageFilterList = e.target.value as Array<string>
    const newLanguageList = languageFilterList.map(native => languages.find(lang => lang.native === native))
    setLanguageFilter(newLanguageList)
  }
  if (!languageList) return <div>loading...</div>
  return (
    <FormControl variant="filled" className={css.filter}>
      <InputLabel id="select-language">Filter by Language</InputLabel>
      <Select
        labelId="select-language"
        multiple
        value={languageList}
        onChange={onLanguageSelect}
        renderValue={(selected) => (selected as string[]).join(',')}
      >
        {languages.map((lang) => {
          return (
            //@ts-ignore
          <MenuItem key={lang.code} value={lang.native}>
            <Checkbox checked={languageList.findIndex(native => native === lang.native) > -1} />
            <ListItemText primary={`${lang.name} ${lang.name === lang.native ? '' : lang.native}`} />
          </MenuItem>
        )})}
      </Select>
    </FormControl>
  )
}

const mapStateToProps = (state:TState) => {
  return {
    languageFilter:state.app.languageFilter
  }
}

export default connect(mapStateToProps, {getLanguageFilter, setLanguageFilter, setCountryFilter})(LanguageFilter)