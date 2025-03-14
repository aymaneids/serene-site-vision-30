
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Suite {
  id: number;
  name: string;
  description: string;
  size: string;
  price: string;
  image: string;
  features: string[];
}

const suites: Suite[] = [
  {
    id: 1,
    name: "Mozart Suite",
    description: "Experience the grandeur of old Vienna in our signature suite with stunning views of the city center.",
    size: "65 m²",
    price: "€450",
    image: "https://images.unsplash.com/photo-1631049035182-249067d7618e?q=80&w=2070&auto=format&fit=crop",
    features: ["King-size bed", "Separate living area", "Marble bathroom", "City view", "Complimentary minibar"]
  },
  {
    id: 2,
    name: "Klimt Suite",
    description: "Inspired by Vienna's art nouveau movement, this luxurious suite combines artistic elegance with modern comfort.",
    size: "55 m²",
    price: "€380",
    image: "https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?q=80&w=1887&auto=format&fit=crop",
    features: ["Queen-size bed", "Work desk", "Rainfall shower", "Garden view", "Nespresso machine"]
  },
  {
    id: 3,
    name: "Strauss Suite",
    description: "Waltz into luxury in our musically-inspired suite featuring refined details and harmonious design.",
    size: "60 m²",
    price: "€420",
    image: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=1974&auto=format&fit=crop",
    features: ["King-size bed", "Balcony", "Freestanding bathtub", "Sound system", "Evening turndown service"]
  }
];

export const Suites = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const goToSuite = (index: number) => {
    if (animating) return;
    
    setAnimating(true);
    setActiveIndex(index);
    
    setTimeout(() => {
      setAnimating(false);
    }, 600);
  };

  const goToPrev = () => {
    const newIndex = activeIndex === 0 ? suites.length - 1 : activeIndex - 1;
    goToSuite(newIndex);
  };

  const goToNext = () => {
    const newIndex = activeIndex === suites.length - 1 ? 0 : activeIndex + 1;
    goToSuite(newIndex);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const section = sectionRef.current;
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
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
        <div className="text-center mb-12 md:mb-20">
          <span className="inline-block text-sm text-gold uppercase tracking-wider font-medium mb-2">Accommodation</span>
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">
            Our Exclusive Suites
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-charcoal/80">
            Each of our suites has been individually designed to provide a perfect blend of historic Viennese elegance and modern comfort.
          </p>
        </div>
        
        <div className="relative">
          {/* Suite Carousel */}
          <div className="relative overflow-hidden rounded-lg shadow-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out h-[500px] md:h-[600px]"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {suites.map((suite) => (
                <div 
                  key={suite.id}
                  className="relative w-full flex-shrink-0"
                >
                  <div className="absolute inset-0">
                    <img 
                      src={suite.image} 
                      alt={`${suite.name} - Vienna Suites`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10"></div>
                  </div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-10">
                    <div className="max-w-lg">
                      <h3 className="text-2xl md:text-3xl font-serif font-medium text-white mb-2">
                        {suite.name}
                      </h3>
                      <p className="text-white/90 mb-4">
                        {suite.description}
                      </p>
                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded text-white text-sm">
                          {suite.size}
                        </div>
                        <div className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded text-white text-sm">
                          From {suite.price} per night
                        </div>
                      </div>
                      <div className="mb-6">
                        <h4 className="text-white font-medium mb-2">Features:</h4>
                        <div className="flex flex-wrap gap-2">
                          {suite.features.map((feature, index) => (
                            <span 
                              key={index}
                              className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      <a 
                        href="#book" 
                        className="inline-block btn-hover-slide px-6 py-2 bg-gold text-white text-sm font-medium uppercase tracking-wide rounded transition-all hover:shadow-lg"
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
              onClick={goToPrev}
              className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
              aria-label="Previous suite"
              disabled={animating}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={goToNext}
              className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
              aria-label="Next suite"
              disabled={animating}
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Suite Pagination */}
          <div className="flex justify-center mt-6">
            {suites.map((suite, index) => (
              <button
                key={suite.id}
                onClick={() => goToSuite(index)}
                className={`w-3 h-3 mx-1 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-gold' : 'bg-taupe/40 hover:bg-taupe'
                }`}
                aria-label={`Go to ${suite.name}`}
                disabled={animating}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Suites;
