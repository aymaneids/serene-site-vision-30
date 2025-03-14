
import { useEffect, useRef } from 'react';

export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !elementsRef.current) return;
      
      const section = sectionRef.current;
      const elements = elementsRef.current.children;
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      // Start animations when the section is 20% in viewport
      if (sectionTop < windowHeight * 0.8) {
        section.classList.add('in-view');
        Array.from(elements).forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('animate-fade-up');
          }, index * 150);
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden bg-cream"
    >
      {/* Background decorative element */}
      <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-gradient-radial from-taupe/10 to-transparent opacity-50" aria-hidden="true"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div className="order-2 lg:order-1">
            <div className="relative image-reveal rounded-md overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1551105378-78e609e1d468?q=80&w=1887&auto=format&fit=crop" 
                alt="Vienna Suites elegant interior with classic furniture and natural light" 
                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent py-6 px-4">
                <p className="text-white text-sm font-light">
                  The Motzart Suite - Elegant living room with classic Viennese design elements
                </p>
              </div>
            </div>
          </div>
          
          {/* Content Column */}
          <div ref={elementsRef} className="order-1 lg:order-2 opacity-0">
            <div className="mb-2 opacity-0">
              <span className="inline-block text-sm text-gold uppercase tracking-wider font-medium">About Vienna Suites</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6 opacity-0">
              A Blend of Historic Charm <br />& Modern Luxury
            </h2>
            <div className="w-20 h-1 bg-gold mb-8 opacity-0"></div>
            <p className="text-base md:text-lg mb-6 text-charcoal/90 opacity-0">
              Located in a meticulously restored 19th-century building in Vienna's historic 1st district, Vienna Suites offers an exceptional accommodation experience where timeless elegance meets contemporary comfort.
            </p>
            <p className="text-base md:text-lg mb-8 text-charcoal/90 opacity-0">
              Each of our suites has been individually designed to preserve the building's historic character while providing all the modern amenities you expect from luxury accommodation. From high ceilings with original moldings to designer furniture and state-of-the-art technology, every detail has been carefully considered.
            </p>
            <a 
              href="#amenities" 
              className="inline-block btn-hover-slide px-8 py-3 bg-charcoal text-white text-sm font-medium uppercase tracking-wide rounded transition-all hover:shadow-md opacity-0"
            >
              Discover Amenities
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
