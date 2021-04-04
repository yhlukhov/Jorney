import Events from "../Events/Events";
import Filters from "../Filters/Filters";
import Teachings from "../Teachings/Teachings";
import { loadEvents } from '../../Store/eventListReducer'
import { connect } from 'react-redux'
import { FC, useEffect, useState } from 'react'
import { compose } from 'redux'
import { TState } from "../../Store/store";
import { TEvent } from "../../Common/Types/TEvent";
import { TCountry } from "../../Common/Types/TCountry";

type TProps = {
  events: Array<TEvent>
  loadEvents: any
}

const Home:FC<TProps> = ({events, loadEvents}) => {
  useEffect(()=>{
    loadEvents()
  },[])
  
  return (
    <div>
      <div style={{display:'flex'}}>
        <Filters />
        <Teachings />
      </div>
      <Events events={events} />
    </div>
  );
};

const mapStateToProps = (state:TState) => {
  return {
    events: state.events.events
  }
}

export default compose(connect(mapStateToProps, {loadEvents}))(Home);