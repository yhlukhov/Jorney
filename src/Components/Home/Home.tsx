import Events from "../Events/Events";
import Filters from "../Filters/Filters";
import Teachings from "../Teachings/Teachings";
import { EventType } from '../../Common/Types/EventType';
import { auth } from '../../API/APIConfig';

const Home = () => {
  if(auth.currentUser) console.log(auth.currentUser)
  else console.log('not logged in!')
  return (
    <div>
      <div style={{display:'flex'}}>
        <Filters />
        <Teachings />
      </div>
      <Events/>
    </div>
  );
};

export default Home;
