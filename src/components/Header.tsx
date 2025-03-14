
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled 
        ? "py-3 backdrop-blur-md bg-background/90 shadow-sm" 
        : "py-6 bg-transparent"
    )}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a 
          href="/" 
          className="relative group"
          aria-label="Vienna Suites - Home"
        >
          <h1 className="text-2xl font-serif tracking-wide text-charcoal">
            <span className="font-medium">VIENNA</span>
            <span className="text-gold italic ml-1">Suites</span>
          </h1>
          <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {['Home', 'Suites', 'Amenities', 'Gallery', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="nav-link text-sm font-medium tracking-wide uppercase text-charcoal transition-colors hover:text-gold"
            >
              {item}
            </a>
          ))}
          <a 
            href="#book" 
            className="btn-hover-slide px-5 py-2 bg-gold/90 text-white text-sm font-medium tracking-wide uppercase rounded transition-all hover:bg-gold"
          >
            Book Now
          </a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex md:hidden text-charcoal"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/98 pt-20 pb-6 px-6 md:hidden overflow-auto"
          onClick={() => setMobileMenuOpen(false)}
        >
          <nav className="flex flex-col items-center space-y-6 animate-fade-down">
            {['Home', 'Suites', 'Amenities', 'Gallery', 'Contact'].map((item, index) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-lg font-medium tracking-wide uppercase text-charcoal transition-colors hover:text-gold"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item}
              </a>
            ))}
            <a 
              href="#book" 
              className="mt-4 px-8 py-3 bg-gold/90 text-white text-base font-medium tracking-wide uppercase rounded transition-all hover:bg-gold"
            >
              Book Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
