import React from "react";
import { motion, useReducedMotion } from "motion/react";

export const Contact = ({ id = "contact" }) => {
  const shouldReduceMotion = useReducedMotion();

  const socialLinks = [
    { label: "INSTAGRAM" },
    { label: "LINKEDIN", href: "https://www.linkedin.com/in/sohel-13a5a4195/" },
    { label: "GITHUB", href: "https://github.com" },
  ];

  return (
    <footer
      id={id}
      className="relative w-full bg-[#0B0B0B] text-white overflow-hidden pt-24 sm:pt-32 md:pt-36 pb-8 sm:pb-10 px-4 sm:px-8 md:px-14 lg:px-20 select-none flex flex-col justify-between min-h-[560px]"
    >
      {/* Center Section: LET'S TALK + Centered Pill Row */}
      <div className="w-full max-w-[1400px] mx-auto flex flex-col items-center justify-center my-auto">
        
        {/* Main Heading */}
        <motion. div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center overflow-hidden w-full flex justify-center"
        >
          <h2
            className="text-[12.5vw] sm:text-[12vw] lg:text-[142px] uppercase leading-[0.88] text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#CCCCCC] to-[#454545]"
            style={{
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontWeight: 800,
              letterSpacing: "-0.035em",
            }}
          >
            LET'S TALK
          </h2>
        </motion.div>

        {/* Five Pill Buttons */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mt-10 sm:mt-14 max-w-full"
        >
          {socialLinks.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={shouldReduceMotion ? {} : { y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              className="inline-flex items-center justify-center h-10 px-6 sm:px-7 rounded-full border border-[#2B2B2B] bg-[#0E0E0E] text-[10px] sm:text-[11px] font-bold tracking-[0.14em] text-[#E0E0E0] uppercase transition-all duration-200 hover:border-[#4B4B4B] hover:text-white leading-none text-center"
              style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif' }}
            >
              <span className="translate-y-[0.5px] block">{item.label}</span>
            </motion.a>
          ))}

          {/* CONTACT ME Button */}
          <motion.a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=sohilkhan68977@gmail.com&su=Project%20Inquiry%20from%20Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={shouldReduceMotion ? {} : { y: -2 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            className="inline-flex items-center justify-center h-10 px-7 sm:px-8 rounded-full bg-white text-black text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase transition-all duration-200 hover:bg-[#EAEAEA] leading-none text-center shadow-[0_0_15px_rgba(255,255,255,0.08)]"
            style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif' }}
          >
            <span className="translate-y-[0.5px] block">CONTACT ME </span>
          </motion.a>
        </motion.div>

      </div>

      {/* Bottom Footer Meta Bar */}
      <div className="w-full max-w-[1400px] mx-auto mt-20">
        <div className="w-full h-[1px] bg-[#222222] mb-6 sm:mb-8" />
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-[#666666]">
          <span>PORTFOLIO. ALL RIGHTS RESERVED</span>
          <span>DESIGNED &amp; DEVELOPED BY SOHIL</span>
        </div>
      </div>
    </footer>
  );
};

export default Contact;