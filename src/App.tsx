import { Route, Routes } from 'react-router-dom'
import { SiteProvider } from './lib/site'
import Header from './components/Header'
import FullscreenNav from './components/FullscreenNav'
import CursorLabel from './components/CursorLabel'
import Preloader from './components/Preloader'
import Home from './pages/Home'
import Work from './pages/Work'
import Project from './pages/Project'
import About from './pages/About'
import Experience from './pages/Experience'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <SiteProvider>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <FullscreenNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<Project />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CursorLabel />
      <Preloader />
    </SiteProvider>
  )
}
