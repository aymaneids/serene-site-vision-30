
import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Simple parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      const hero = heroRef.current;
      const heroImage = hero.querySelector('.hero-image') as HTMLElement;
      
      if (heroImage) {
        heroImage.style.transform = `translateY(${scrollPosition * 0.2}px) scale(${1 + scrollPosition * 0.0005})`;
        hero.style.opacity = `${1 - scrollPosition / 700}`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      ref={heroRef} 
      id="home" 
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Hero Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="hero-image w-full h-full bg-[url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
          aria-hidden="true"
        ></div>
        <div className="absolute inset-0 bg-black/30 z-10"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center text-white">
        <div className="max-w-3xl stagger-animation">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider uppercase bg-white/10 backdrop-blur-sm rounded">
            Luxury Accommodation in Vienna
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium mb-6 leading-tight text-balance">
            Experience Timeless Elegance in the Heart of Vienna
          </h1>
          <p className="text-base md:text-lg font-light mb-8 max-w-2xl mx-auto opacity-90">
            Discover our meticulously designed suites where classic Viennese charm meets modern luxury, 
            creating an unforgettable stay in Austria's historic capital.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#book" 
              className="btn-hover-slide px-8 py-3 bg-gold text-white text-sm md:text-base font-medium uppercase tracking-wide rounded transition-all hover:shadow-lg"
            >
              Book Your Stay
            </a>
            <a 
              href="#suites" 
              className="btn-hover-slide px-8 py-3 bg-white/10 backdrop-blur-sm text-white text-sm md:text-base font-medium uppercase tracking-wide rounded border border-white/30 transition-all hover:bg-white/20 hover:border-white/40"
            >
              Explore Suites
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-float">
        <a 
          href="#about" 
          className="flex flex-col items-center text-white/80 hover:text-white transition-colors"
          aria-label="Scroll to About section"
        >
          <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
          <ArrowDown size={20} className="animate-pulse-light" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
