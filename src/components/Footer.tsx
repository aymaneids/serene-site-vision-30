
import { useEffect, useState } from 'react';
import { 
  Facebook, Instagram, Twitter, Mail, 
  ArrowUp 
} from 'lucide-react';

export const Footer = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 600);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white relative">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and About */}
          <div className="space-y-4">
            <h1 className="text-2xl font-serif tracking-wide">
              <span className="font-medium">VIENNA</span>
              <span className="text-gold italic ml-1">Suites</span>
            </h1>
            <p className="text-white/70 text-sm">
              Experience timeless elegance and luxury in the heart of Vienna's historic 1st district. Our meticulously designed suites offer the perfect blend of classic Viennese charm and modern comfort.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4 pb-2 border-b border-white/10">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Suites', 'Amenities', 'Gallery', 'Contact', 'Book Now'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="text-white/70 hover:text-gold transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4 pb-2 border-b border-white/10">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-gold mr-2">Address:</span>
                <span className="text-white/70 text-sm">Kärntner Ring 16, 1010 Vienna, Austria</span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-2">Phone:</span>
                <span className="text-white/70 text-sm">+43 1 23456789</span>
              </li>
              <li className="flex items-start">
                <span className="text-gold mr-2">Email:</span>
                <a 
                  href="mailto:info@viennasuites.com"
                  className="text-white/70 hover:text-gold transition-colors text-sm"
                >
                  info@viennasuites.com
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4 pb-2 border-b border-white/10">Stay Updated</h3>
            <p className="text-white/70 text-sm mb-4">
              Subscribe to our newsletter for special offers and updates.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-grow px-4 py-2 bg-white/10 border border-white/20 rounded-l text-white text-sm focus:outline-none focus:bg-white/15 focus:border-gold"
                required
              />
              <button 
                type="submit"
                className="px-4 py-2 bg-gold text-white rounded-r hover:bg-gold/90 transition-colors"
                aria-label="Subscribe to newsletter"
              >
                <Mail size={18} />
              </button>
            </form>
            
            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a 
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a 
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a 
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-gold transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>
        </div>
        
        <hr className="border-white/10 my-8" />
        
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-white/60 text-sm">
          <p>© {currentYear} Vienna Suites. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-gold transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 w-10 h-10 bg-gold text-white rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
          showScrollToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
