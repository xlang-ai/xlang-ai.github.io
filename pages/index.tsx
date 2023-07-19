import Hero from './components/Hero';
import Highlight from './components/Highlight';
import ResearchDirections from './components/ResearchDirections';
import Acknowledgments from './components/Acknowledgement';

const Home = () => {
  return (
    <div>
      <Hero />
      <ResearchDirections />
      <Highlight />
    </div>
  );
};

export default Home;
