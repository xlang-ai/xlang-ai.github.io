import Highlight from './components/Highlight';
import ResearchDirections from './components/ResearchDirections';
import Acknowledgments from './components/Acknowledgement';
import Welcome from './components/Welcome';
import News from './components/News';

const Home = () => {
  return (
    <div>
      <Welcome />
      <News />
      <ResearchDirections />
      <Highlight />
    </div>
  );
};

export default Home;
