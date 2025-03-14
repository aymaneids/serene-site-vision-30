
import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Suite {
  id: number;
  name: string;
  size: string;
  price: string;
  description: string;
  features: string[];
  image: string;
}

export const Suites = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const suites: Suite[] = [
    {
      id: 1,
      name: "Mozart Suite",
      size: "65 m²",
      price: "€450",
      description: "Experience the elegance of old Vienna with our Mozart Suite, featuring high ceilings, a dedicated living area, and views of the historic city center.",
      features: ["King-sized bed", "Marble bathroom", "Living area", "City view", "Mini bar", "Smart TV"],
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Strauss Suite",
      size: "80 m²",
      price: "€590",
      description: "Our spacious Strauss Suite offers refined luxury with a separate bedroom and living room, decorated with authentic Viennese antiques and artwork.",
      features: ["King-sized bed", "Freestanding bathtub", "Separate living room", "Walk-in closet", "Espresso machine", "Balcony"],
      image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=1971&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Imperial Suite",
      size: "120 m²",
      price: "€890",
      description: "The ultimate luxury experience in the heart of Vienna, our Imperial Suite features panoramic views, a dining area, and premium amenities for distinguished guests.",
      features: ["King-sized bed", "Two bathrooms", "Dining area", "Panoramic view", "Complimentary minibar", "Butler service"],
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop"
    }
  ];
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % suites.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + suites.length) % suites.length);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const section = sectionRef.current;
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.7) {
        section.classList.add('animate-fade-in');
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
      id="suites" 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-white opacity-0"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm text-gold uppercase tracking-wider font-medium mb-2">Our Accommodations</span>
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">
            Luxury Suites
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-charcoal/80">
            Discover our meticulously designed suites that blend historic Viennese charm with modern luxury.
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {suites.map((suite) => (
              <div 
                key={suite.id}
                className="w-full flex-shrink-0 px-4"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                  {/* Suite Image */}
                  <div className="image-reveal rounded-md overflow-hidden shadow-lg order-1 lg:order-none">
                    <img 
                      src={suite.image} 
                      alt={`${suite.name} - Luxury accommodation at Vienna Suites`}
                      className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Suite Content */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-serif font-medium mb-2">{suite.name}</h3>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-charcoal/70">{suite.size}</span>
                        <span className="text-xl text-gold font-medium">{suite.price} <span className="text-sm">per night</span></span>
                      </div>
                      <p className="text-charcoal/80 mb-6">{suite.description}</p>
                    </div>
                    
                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3">
                      {suite.features.map((feature, index) => (
                        <div 
                          key={index}
                          className="flex items-center text-sm text-charcoal/70"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gold mr-2" aria-hidden="true"></span>
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <a 
                      href="#book" 
                      className="inline-block btn-hover-slide px-6 py-3 bg-charcoal text-white text-sm font-medium uppercase tracking-wide rounded transition-all hover:shadow-md mt-4"
                    >
                      Book This Suite
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 left-2 md:left-6 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors z-10"
            aria-label="Previous suite"
          >
            <ArrowLeft size={20} className="text-charcoal" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 right-2 md:right-6 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors z-10"
            aria-label="Next suite"
          >
            <ArrowRight size={20} className="text-charcoal" />
          </button>
          
          {/* Dots Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {suites.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-gold' : 'bg-gold/30'
                }`}
                aria-label={`Go to suite ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Suites;
