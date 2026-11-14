
import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import Preloader from './components/Preloader';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';

// Lazy-loaded portfolio sections
const AboutSection = lazy(() => import('./components/AboutSection/AboutSection'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

gsap.registerPlugin(ScrollTrigger);

const PRELOADER_KEY = 'portfolioPreloaderCompleted';

function App() {
  const [isLoading, setIsLoading] = useState(() => {
    try {
      return sessionStorage.getItem(PRELOADER_KEY) !== 'true';
    } catch {
      return true;
    }
  });

  const [isDarkMode, setIsDarkMode] = useState(false);
  const lenisRef = useRef(null);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const handlePreloaderComplete = () => {
    try {
      sessionStorage.setItem(PRELOADER_KEY, 'true');
    } catch {
      // Continue if sessionStorage is unavailable
    }

    setIsLoading(false);
  };

  // Reset preloader on a genuine page refresh, but not on Back navigation
  useEffect(() => {
    try {
      const navigationEntry = performance.getEntriesByType('navigation')[0];
      const isRefresh = navigationEntry?.type === 'reload';

      if (isRefresh) {
        sessionStorage.removeItem(PRELOADER_KEY);
        setIsLoading(true);
      }
    } catch {
      // Keep the current loading state if browser APIs are unavailable
    }
  }, []);

  // Lenis smooth scrolling
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Stop and start Lenis according to preloader state
  useEffect(() => {
    if (!lenisRef.current) return;

    if (isLoading) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isLoading]);

  return (
    <div
      className={`relative w-full min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-[#111111]' : 'bg-[#FFFFFF]'
      }`}
    >
      {isLoading && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      <Hero
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        isLoading={isLoading}
      />

      <Suspense fallback={null}>
        <AboutSection isDarkMode={isDarkMode} />
        <Skills isDarkMode={isDarkMode} />
        <Projects isDarkMode={isDarkMode} />
        <Contact isDarkMode={isDarkMode} />
      </Suspense>
    </div>
  );
}

export default App;
