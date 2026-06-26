import { useState } from 'react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[70] flex justify-between items-center md:px-10 px-5 py-6 pointer-events-none">
        <a href="#" className="pointer-events-auto">
          <img 
            src="/images/zestra-transparent-logo.webp" 
            alt="nav-logo" 
            className="md:w-32 w-24 object-contain drop-shadow-md" 
          />
        </a>

        {/* Hamburger Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="pointer-events-auto w-12 h-12 flex flex-col justify-center items-center gap-1.5 focus:outline-none bg-black/20 rounded-full hover:bg-black/40 transition-all backdrop-blur-md"
          aria-label="Toggle Menu"
        >
          <span className={`h-0.5 w-6 bg-white transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`h-0.5 w-6 bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`h-0.5 w-6 bg-white transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </nav>

      {/* Fullscreen Overlay Menu */}
      <div 
        className={`fixed inset-0 z-[60] bg-[#0a0a0a]/95 backdrop-blur-lg flex flex-col items-center justify-center transition-all duration-500 origin-top ${
          isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8 text-[#ffffff] font-sans font-bold text-3xl md:text-5xl uppercase tracking-widest mt-10">
          <a href="#home" onClick={() => setIsOpen(false)} className="hover:text-gray-400 hover:scale-105 transition-all">Home</a>
          <a href="#about-us" onClick={() => setIsOpen(false)} className="hover:text-gray-400 hover:scale-105 transition-all">About Us</a>
          <a href="#flavors" onClick={() => setIsOpen(false)} className="hover:text-gray-400 hover:scale-105 transition-all">All Flavors</a>
          <a href="#nutrition" onClick={() => setIsOpen(false)} className="hover:text-gray-400 hover:scale-105 transition-all">Nutrition</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="hover:text-gray-400 hover:scale-105 transition-all">Contact Us</a>
        </div>
        
        {/* Footer info inside menu */}
        <div className="absolute bottom-10 flex gap-6 text-[#888]">
          <a href="#" className="hover:text-white transition-colors"><img src="/images/insta.svg" alt="IG" className="w-6 h-6  opacity-60 hover:opacity-100" /></a>
          <a href="#" className="hover:text-white transition-colors"><img src="/images/tiktok.svg" alt="TK" className="w-6 h-6  opacity-60 hover:opacity-100" /></a>
          <a href="#" className="hover:text-white transition-colors"><img src="/images/yt.svg" alt="YT" className="w-6 h-6  opacity-60 hover:opacity-100" /></a>
        </div>
      </div>
    </>
  );
};

export default NavBar;
