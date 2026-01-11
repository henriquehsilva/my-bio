import Navigation from './components/Navigation';
import Hero from './components/Hero';
import PythonCourse from './components/PythonCourse';
import LatestInstagram from './components/LatestInstagram';
import StatsStrip from './components/StatsStrip';
import LatestThoughts from './components/LatestThoughts';
import FeaturedProjects from './components/FeaturedProjects';
import LatestStudyNote from './components/LatestStudyNote';
import WatchingNow from './components/WatchingNow';
import { useScrollReveal } from './hooks/useScrollReveal';

function App() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main>
        <Hero />
        <PythonCourse />
        <LatestInstagram />
        <StatsStrip />
        <LatestThoughts />
        <FeaturedProjects />
        <LatestStudyNote />
        <WatchingNow />
      </main>
    </div>
  );
}

export default App;
