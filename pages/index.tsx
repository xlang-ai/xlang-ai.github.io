import Demo from './components/Demo';
import Hero from './components/Hero';
import RoadMap from './components/RoadMap';
import Highlights from './components/Highlights';
// import Members from './components/Members';
import WaitUser from './components/Google/User';


type Props = {
  user: WaitUser;
};

const Home = ({ user }: Props) => {
  return (
    <div>
      <Hero />
      <Demo />
      <Highlights />
      <RoadMap />
      {/* <Members /> */}
    </div>
  );
};

export default Home;
