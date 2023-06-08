import Demo from './components/Demo';
import Hero from './components/Hero';
import RoadMap from './components/RoadMap';
import Highlights from './components/Highlights';
import Members from './components/Members';

const Home = () => {
  return (
    <div>
      <Hero />
      <Demo />
      <Highlights />
      <RoadMap />
      <Members />
    </div>
  );
};

export default Home;
