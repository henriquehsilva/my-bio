import Navigation from './components/Navigation';
import Hero from './components/Hero';
import LatestTweet from './components/LatestTweet';
import StatsStrip from './components/StatsStrip';
import LatestThoughts from './components/LatestThoughts';
import FeaturedProjects from './components/FeaturedProjects';
import LatestStudyNote from './components/LatestStudyNote';
import LatestGameplay from './components/LatestGameplay';
import { useScrollReveal } from './hooks/useScrollReveal';

function App() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main>
        <Hero />
        <LatestTweet />
        <StatsStrip />
        <LatestThoughts />
        <FeaturedProjects />
        <LatestStudyNote />
        <LatestGameplay />
      </main>
    </div>
  );
}

export default App;
