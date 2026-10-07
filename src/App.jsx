import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import UpcomingBanner from './components/UpcomingBanner.jsx';
import Particles from './components/Particles.jsx';
import VerseBanner from './components/VerseBanner.jsx';
import About from './components/About.jsx';
import Activities from './components/Activities.jsx';
import Gallery from './components/Gallery.jsx';
import LiveStream from './components/LiveStream.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import { useReveal } from './hooks.js';

export default function App() {
  useReveal();

  return (
    <>
      <Particles />
      <UpcomingBanner />
      <Header />
      <main>
        <Hero />
        <VerseBanner />
        <About />
        <Activities />
        <LiveStream />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
