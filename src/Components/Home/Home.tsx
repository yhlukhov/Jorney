import Events from "../Events/Events";
import Filters from "../Filters/Filters";
import Teachings from "../Teachings/Teachings";
import { FC } from 'react'

const Home:FC = () => {
  
  return (
    <div>
      <div style={{display:'flex'}}>
        <Filters />
        <Teachings />
      </div>
      <Events />
    </div>
  );
};

export default Home;