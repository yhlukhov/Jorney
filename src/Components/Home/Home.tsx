import Events from "../Events/Events";
import Filters from "../Filters/Filters";
import Teachings from "../Teachings/Teachings";
import { EventType } from '../../Common/Types/EventType';
import Event from '../Events/Event/Event';

const eventIurii:EventType = {
  name: 'Event111',
  organizer: 'Iurii',
  startDate: new Date(),
  duration: '2h',
  description: 'description',
  language: 'en',
  link: 'link',
  image: 'img',
  channelId: '2384774',
  bookmark: false,
  approved: true,
  id: '1',
}

const Home = () => {
  return (
    <div>
      <div style={{display:'flex'}}>
        <Filters />
        <Teachings />
      </div>
      <Events />
      <Event {...eventIurii} />
    </div>
  );
};

export default Home;
