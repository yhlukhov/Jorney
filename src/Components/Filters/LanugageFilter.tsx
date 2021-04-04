import { FC, useEffect } from "react"
import { connect } from "react-redux"
import { InputLabel, ListItemText, MenuItem, Select } from "@material-ui/core"
import FormControl from "@material-ui/core/FormControl"
import Checkbox from "@material-ui/core/Checkbox"
import { languages } from "../../Common/Data/Languages"
import {getLanguageFilter, setLanguageFilter} from "../../Store/appReducer"
import { TState } from "../../Store/store"

type TProps = {
  languageFilter:Array<string>
  getLanguageFilter:any
  setLanguageFilter:any
}

const LanguageFilter:FC<TProps> = ({languageFilter, getLanguageFilter, setLanguageFilter}) => {
  useEffect(()=>{
    getLanguageFilter()
  },[])
  const onLanguageSelect = (e:React.ChangeEvent<{ value: unknown }>) => {
    const languageList = e.target.value as Array<string>
    setLanguageFilter(languageList)
    localStorage.setItem('languageFilter', JSON.stringify(languageList))
  }
  return (
    <>
    <FormControl>
      <InputLabel id="select-language">Filter by Language</InputLabel>
      <Select
        labelId="select-language"
        multiple
        value={languageFilter}
        onChange={onLanguageSelect}
        renderValue={(selected) => (selected as string[]).join(", ")}
      >
        {languages.map((lang) => {
          return (
          <MenuItem key={lang.code} value={lang.name}>
            <Checkbox checked={languageFilter.indexOf(lang.name) > -1} />
            <ListItemText primary={`${lang.name} ${lang.name === lang.native ? '' : lang.native}`} />
          </MenuItem>
        )})}
      </Select>
    </FormControl>
    <div>{JSON.stringify(languageFilter, undefined, 2)}</div>
    </>
  )
}

const mapStateToProps = (state:TState) => {
  return {
    languageFilter:state.app.languageFilter
  }
}

export default connect(mapStateToProps, {getLanguageFilter, setLanguageFilter})(LanguageFilter)