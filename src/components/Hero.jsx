import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './Hero.module.css';

const Hero = ({ isDarkMode, toggleTheme, isLoading = false }) => {
  const themeBtnRef = useRef(null);
  const [btnCoords, setBtnCoords] = useState({ x: 0, y: 0 });

  const handleThemeToggle = () => {
    if (themeBtnRef.current) {
      const rect = themeBtnRef.current.getBoundingClientRect();
      setBtnCoords({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    toggleTheme();
  };

  const scrollToProjects = () => {
    const projectElement = document.getElementById("projects");
    if (projectElement) {
      projectElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const scrollToContact = () => {
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      className={`relative min-h-[100dvh] w-full flex flex-col justify-between px-4 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-6 lg:py-8 transition-colors duration-500 overflow-hidden ${
        isDarkMode ? 'bg-[#111111] text-white' : 'bg-[#FFFFFF] text-[#111111]'
      }`}
    >
      {/* Expanding & Shrinking Dark Circle Bubble */}
      <AnimatePresence>
        {isDarkMode && (
          <motion.div
            initial={{
              clipPath: `circle(0px at ${btnCoords.x || '90%'}px ${btnCoords.y || '40px'}px)`,
            }}
            animate={{
              clipPath: `circle(150vmax at ${btnCoords.x || '90%'}px ${btnCoords.y || '40px'}px)`,
            }}
            exit={{
              clipPath: `circle(0px at ${btnCoords.x || '90%'}px ${btnCoords.y || '40px'}px)`,
            }}
            transition={{
              duration: 0.65,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="fixed inset-0 bg-[#111111] z-0 pointer-events-none"
          />
        )}
      </AnimatePresence>
      
      {/* Top Navbar */}
      <header className={`w-full flex justify-between items-center z-20 ${!isLoading ? styles.animateFadeInDown : 'opacity-0'}`}>
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div 
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-colors duration-300 ${
              isDarkMode ? 'bg-white text-black' : 'bg-neutral-900 text-white'
            }`}
          >
            S
          </div>
          <span className="font-bold tracking-wider text-xs sm:text-sm uppercase">SOHIL.</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Half Moon / Sun Button */}
          <button 
            ref={themeBtnRef}
            onClick={handleThemeToggle}
            aria-label="Toggle Theme"
            className={`relative flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 shadow-sm min-h-[40px] sm:min-h-[42px] cursor-pointer overflow-hidden active:scale-95 z-30 ${
              isDarkMode 
                ? 'bg-[#222222] text-white border border-gray-700 hover:bg-[#2b2b2b]' 
                : 'bg-[#F0F0F0] text-[#111111] border border-gray-200 hover:bg-[#E4E4E4]'
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDarkMode ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, scale: 0.2, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.2, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex items-center gap-1.5"
                >
                  <span className="text-xs sm:text-sm">☀️</span>
                  <span className="hidden xs:inline text-[11px] sm:text-xs tracking-wider font-semibold">LIGHT</span>
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, scale: 0.2, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: -90, scale: 0.2, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                  </svg>
                  <span className="hidden xs:inline text-[11px] sm:text-xs tracking-wider font-semibold">DARK</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* LET'S TALK Button */}
          <button
            type="button"
            onClick={scrollToContact}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm min-h-[40px] sm:min-h-[42px] flex items-center justify-center cursor-pointer z-20 ${
              isDarkMode 
                ? 'bg-white text-black border border-white hover:bg-gray-200' 
                : 'bg-black text-white border border-black hover:opacity-90'
            }`}
          > 
            LET'S TALK
          </button>
        </div>
      </header>

      {/* Main Hero Content */}
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center my-auto py-4 sm:py-6 lg:py-10 z-10">
        
        {/* Right Side / Portrait Image */}
        <div 
          className={`lg:col-span-5 relative w-full max-w-[240px] xs:max-w-[270px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[460px] aspect-[4/5] mx-auto rounded-3xl overflow-hidden shadow-xl border group order-1 lg:order-2 ${
            !isLoading ? styles.animateHeroImage : 'opacity-0'
          } ${styles.profileCardHover} ${
            isDarkMode ? 'border-gray-800 bg-[#1a1a1a]' : 'border-gray-200 bg-neutral-100'
          }`}
        >
          <img 
            src="/sohil.png" 
            alt="Sohil - Creative Designer & Full Stack Developer" 
            className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
          />

          {/* Floating Availability Pill */}
          <div 
            className={`absolute bottom-3 right-3 sm:bottom-5 sm:right-5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-medium flex items-center gap-1.5 sm:gap-2 shadow-lg z-10 ${
              isDarkMode ? 'bg-white text-black' : 'bg-black text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Available for Hire
          </div>
        </div>

        {/* Left Side / Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col z-10 order-2 lg:order-1 text-center lg:text-left items-center lg:items-start">
          <p className={`text-[11px] sm:text-xs tracking-[0.25em] uppercase text-gray-400 font-semibold mb-2 sm:mb-4 ${!isLoading ? styles.animateFadeInDown : 'opacity-0'}`}>
            HELLO, I'M SOHIL
          </p>
          
          {/* Main Heading with Interactive Character-Lift Hover Animation */}
          <h1 className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.12] tracking-tight mb-3 sm:mb-5 uppercase select-none transition-colors duration-300 ${!isLoading ? styles.animateHeroText : 'opacity-0'} ${isDarkMode ? 'text-white' : 'text-[#111111]'}`}>
            {/* Line 1: CREATIVE DESIGNER */}
            <span className="font-black inline-block">
              {"CREATIVE DESIGNER".split(" ").map((word, wIdx) => (
                <span key={wIdx} className="inline-block mr-2 sm:mr-3">
                  {word.split("").map((char, cIdx) => (
                    <motion.span
                      key={cIdx}
                      className="inline-block cursor-default will-change-transform transition-colors duration-200 hover:text-neutral-400"
                      whileHover={{
                        y: -8,
                        scale: 1.15,
                      }}
                      transition={{ type: "spring", stiffness: 450, damping: 12 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </span>

            <br className="hidden sm:inline" />

            {/* Line 2: & FULL STACK */}
            <span className="font-black inline-block">
              {"& FULL STACK".split(" ").map((word, wIdx) => (
                <span key={wIdx} className="inline-block mr-2 sm:mr-3">
                  {word.split("").map((char, cIdx) => (
                    <motion.span
                      key={cIdx}
                      className="inline-block cursor-default will-change-transform transition-colors duration-200 hover:text-neutral-400"
                      whileHover={{
                        y: -8,
                        scale: 1.15,
                      }}
                      transition={{ type: "spring", stiffness: 450, damping: 12 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </span>

            <br className="hidden sm:inline" />

            {/* Line 3: WEB DEVELOPER */}
            <span className="font-normal inline-block opacity-90">
              {"WEB DEVELOPER".split(" ").map((word, wIdx) => (
                <span key={wIdx} className="inline-block mr-2 sm:mr-3">
                  {word.split("").map((char, cIdx) => (
                    <motion.span
                      key={cIdx}
                      className="inline-block cursor-default will-change-transform transition-colors duration-200 hover:opacity-100"
                      whileHover={{
                        y: -6,
                        scale: 1.12,
                      }}
                      transition={{ type: "spring", stiffness: 450, damping: 14 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </span>
          </h1>
          
          <p className={`text-xs sm:text-sm md:text-base max-w-lg mb-5 sm:mb-7 leading-relaxed font-light ${!isLoading ? styles.animateHeroDesc : 'opacity-0'} ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Turning Ideas Into Meaningful Digital Experiences.
          </p>

          {/* Action Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-5 sm:mb-8 w-full sm:w-auto ${!isLoading ? styles.animateHeroBtns : 'opacity-0'}`}>
            <button 
              type="button"
              onClick={scrollToProjects}
              className={`w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-sm hover:scale-105 min-h-[44px] cursor-pointer ${
                isDarkMode 
                  ? 'bg-white text-black hover:opacity-90' 
                  : 'bg-black text-white hover:opacity-90'
              }`}
            >
              View My Work <span className="text-base sm:text-lg">↗</span>
            </button>

            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`w-full sm:w-auto border px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 transition-all hover:scale-105 min-h-[44px] cursor-pointer ${
                isDarkMode 
                  ? 'border-gray-700 text-white hover:bg-gray-800' 
                  : 'border-black text-black hover:bg-neutral-100'
              }`}
            >
              View CV <span className="text-base sm:text-lg">↗</span>
            </a>
          </div>

          {/* Social Links */}
          <div className={`flex items-center justify-center lg:justify-start gap-3 ${!isLoading ? styles.animateHeroBtns : 'opacity-0'}`}>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub"
              className={`p-2.5 sm:p-3 rounded-full border transition-all hover:scale-110 min-w-[42px] min-h-[42px] flex items-center justify-center ${isDarkMode ? 'border-gray-700 bg-[#222222] text-white hover:bg-[#333333]' : 'border-gray-200 bg-[#F0F0F0] text-black hover:bg-[#E4E4E4]'}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            <a 
              href="https://www.linkedin.com/in/sohel-13a5a4195/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className={`p-2.5 sm:p-3 rounded-full border transition-all hover:scale-110 min-w-[42px] min-h-[42px] flex items-center justify-center ${isDarkMode ? 'border-gray-700 bg-[#222222] text-white hover:bg-[#333333]' : 'border-gray-200 bg-[#F0F0F0] text-black hover:bg-[#E4E4E4]'}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2v-8.37H6.46M7.83 6.3a1.59 1.59 0 0 0-1.59 1.59c0 .88.71 1.6 1.59 1.6a1.59 1.59 0 0 0 1.59-1.6c0-.88-.71-1.59-1.59-1.59z" />
              </svg>
            </a>

            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              className={`p-2.5 sm:p-3 rounded-full border transition-all hover:scale-110 min-w-[42px] min-h-[42px] flex items-center justify-center ${isDarkMode ? 'border-gray-700 bg-[#222222] text-white hover:bg-[#333333]' : 'border-gray-200 bg-[#F0F0F0] text-black hover:bg-[#E4E4E4]'}`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* SCROLL Down Indicator */}
      <div className={`w-full flex flex-col items-center justify-center my-3 sm:my-4 pointer-events-none select-none z-10 ${!isLoading ? 'transition-opacity duration-700 opacity-100' : 'opacity-0'}`}>
        <a 
          href="#about"
          className="pointer-events-auto flex flex-col items-center gap-1 group transition-opacity duration-300 hover:opacity-100 opacity-70 cursor-pointer"
          aria-label="Scroll to about section"
        >
          <span className={`text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase transition-colors duration-300 ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
            SCROLL
          </span>
          <svg 
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce transition-colors duration-300 ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`} 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>

    </section>
  );
};

export default Hero;