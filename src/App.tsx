import Navigation from './components/Navigation';
import Hero from './components/Hero';
import StatsStrip from './components/StatsStrip';
import FeaturedProjects from './components/FeaturedProjects';
import WatchingNow from './components/WatchingNow';
import PythonCourse from './components/PythonCourse';
import LatestThoughts from './components/LatestThoughts';
import LatestStudyNote from './components/LatestStudyNote';
import LatestInstagram from './components/LatestInstagram';
import { useScrollReveal } from './hooks/useScrollReveal';

function App() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main>
        <Hero />
        <StatsStrip />
        <FeaturedProjects />
        <WatchingNow />
        <PythonCourse />
        <LatestThoughts />
        <LatestStudyNote />
        <LatestInstagram />
      </main>
      <footer className="border-t border-white/8 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <span>© {new Date().getFullYear()} Henrique Silva</span>
          <a
            href="mailto:henrique@henriquesilva.dev"
            className="hover:text-white transition-colors"
          >
            henrique@henriquesilva.dev
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
