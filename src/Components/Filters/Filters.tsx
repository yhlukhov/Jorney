import { FC } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { TState } from "../../Store/store"
import CountryFilter from "./CountryFilter"
import LanguageFilter from "./LanugageFilter"

type TProps = {}

const Filters: FC<TProps> = () => {
  return (
    <FiltersDiv>
      <CountryFilter />
      <LanguageFilter />
    </FiltersDiv>
  )
}

export default Filters

const FiltersDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`