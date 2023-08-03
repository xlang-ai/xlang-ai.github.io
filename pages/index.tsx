import Highlight from './components/Highlight';
import ResearchDirections from './components/ResearchDirections';
import Acknowledgments from './components/Acknowledgement';
import Welcome from './components/Welcome';

const Home = () => {
  return (
    <div>
      <Welcome />
      <ResearchDirections />
      <Highlight />
    </div>
  );
};

export default Home;
