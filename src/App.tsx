import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import BlogPage from './pages/BlogPage';
import PostPage from './pages/PostPage';

function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main>
        <Hero />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}
