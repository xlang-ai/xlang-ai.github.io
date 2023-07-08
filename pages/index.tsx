import Demo from './components/Demo';
import Hero from './components/Hero';
import RoadMap from './components/RoadMap';
import Highlights from './components/Highlights';
import Acknowledgments from './components/Acknowledgement';

const Home = () => {
  return (
    <div>
      <Hero />
      <Demo />
      <Highlights />
      <RoadMap />
      <Acknowledgments />
      {/* <Members /> */}
    </div>
  );
};

export default Home;
