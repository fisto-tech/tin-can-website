import { useMediaQuery } from "react-responsive";

const FooterSection = () => {
  return (
    <footer 
      className="relative z-50 bg-[#050505] text-white py-12 px-8 md:px-16 mt-85 rounded-t-[30px] border-t border-white/10" 
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: 'normal' }}
    >
      <div className="max-w-[1400px] mx-auto">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          
          {/* Logo & Description Column */}
          <div className="md:col-span-5 flex flex-col">
            <img 
              src="/images/zestra-transparent-logo.webp" 
              alt="Zestra Logo" 
              className="w-36 md:w-48 object-contain mb-6 drop-shadow-xl" 
            />
            <p className="text-gray-300 text-base font-normal leading-relaxed max-w-sm">
              Bringing you the ultimate taste experience. Sip, share, and stay refreshed anywhere you go.
            </p>
          </div>

          {/* Contact Info Column */}
          <div className="md:col-span-4">
            <h3 className="text-white text-base font-bold mb-5 tracking-wider uppercase">Contact Us</h3>
            <div className="space-y-5 text-gray-300 text-base font-normal">
              <div>
                <p className="font-bold text-white mb-1">Address</p>
                <p className="leading-snug">123 Flavor Street, Suite 400<br/>New York, NY 10001</p>
              </div>
              <div>
                <p className="font-bold text-white mb-1">Email</p>
                <a href="mailto:hello@zestra.com" className="hover:text-white transition-colors block">hello@zestra.com</a>
              </div>
              <div>
                <p className="font-bold text-white mb-1">Phone</p>
                <a href="tel:+1234567890" className="hover:text-white transition-colors block">+1 (234) 567-890</a>
              </div>
            </div>
          </div>

          {/* Links Column */}
          <div className="md:col-span-3">
            <h3 className="text-white text-base font-bold mb-5 tracking-wider uppercase">Explore</h3>
            <ul className="space-y-4 text-gray-300 text-base font-normal">
              <li><a href="#" className="hover:text-white hover:pl-1 transition-all duration-300">Home</a></li>
              <li><a href="#" className="hover:text-white hover:pl-1 transition-all duration-300">All Flavors</a></li>
              <li><a href="#" className="hover:text-white hover:pl-1 transition-all duration-300">About Us</a></li>
              <li><a href="#" className="hover:text-white hover:pl-1 transition-all duration-300">Chug Club</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Socials & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-white/20">
          
          {/* Socials */}
          <div className="flex gap-6">
            <a href="#" className="flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all opacity-80 hover:opacity-100">
              <img src="./images/insta.svg" alt="Instagram" className="w-6 h-6 invert" />
            </a>
            <a href="#" className="flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all opacity-80 hover:opacity-100">
              <img src="./images/tiktok.svg" alt="TikTok" className="w-6 h-6 invert" />
            </a>
            <a href="#" className="flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all opacity-80 hover:opacity-100">
              <img src="./images/yt.svg" alt="YouTube" className="w-6 h-6 invert" />
            </a>
          </div>
          
          {/* Copyright & Legal */}
          <div className="text-gray-400 text-sm flex flex-col sm:flex-row items-center gap-4 sm:gap-6 font-normal">
            <p>© {new Date().getFullYear()} Zestra. All Rights Reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
