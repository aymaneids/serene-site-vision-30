
import { useRef, useEffect } from 'react';
import { Wifi, Coffee, Bath, Map, UtensilsCrossed, Dumbbell } from 'lucide-react';

interface Amenity {
  icon: JSX.Element;
  title: string;
  description: string;
}

export const Amenities = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  
  const amenities: Amenity[] = [
    {
      icon: <Wifi className="w-6 h-6 text-gold" />,
      title: "High-Speed WiFi",
      description: "Stay connected with complimentary high-speed wireless internet throughout your stay."
    },
    {
      icon: <Coffee className="w-6 h-6 text-gold" />,
      title: "Breakfast Service",
      description: "Start your day with our gourmet breakfast featuring local Austrian specialties."
    },
    {
      icon: <Bath className="w-6 h-6 text-gold" />,
      title: "Luxury Bathrooms",
      description: "Indulge in marble bathrooms with premium toiletries and plush towels."
    },
    {
      icon: <Map className="w-6 h-6 text-gold" />,
      title: "Concierge Service",
      description: "Our knowledgeable concierge team is available to help plan your perfect Vienna experience."
    },
    {
      icon: <UtensilsCrossed className="w-6 h-6 text-gold" />,
      title: "In-Room Dining",
      description: "Enjoy gourmet meals in the comfort of your suite with our in-room dining service."
    },
    {
      icon: <Dumbbell className="w-6 h-6 text-gold" />,
      title: "Fitness Center",
      description: "Maintain your fitness routine in our modern, well-equipped fitness center."
    }
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !itemsRef.current) return;
      
      const section = sectionRef.current;
      const items = Array.from(itemsRef.current.children);
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      // Start animations when the section is 30% in viewport
      if (sectionTop < windowHeight * 0.7) {
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('animate-fade-up');
            item.classList.remove('opacity-0');
          }, index * 100);
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
      id="amenities" 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-secondary"
    >
      {/* Background decorative elements */}
      <div className="absolute left-0 top-0 w-32 h-32 md:w-64 md:h-64 bg-taupe/5 rounded-full -translate-x-1/2 -translate-y-1/2" aria-hidden="true"></div>
      <div className="absolute right-0 bottom-0 w-40 h-40 md:w-80 md:h-80 bg-gold/5 rounded-full translate-x-1/3 translate-y-1/3" aria-hidden="true"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sm text-gold uppercase tracking-wider font-medium mb-2">Luxury Details</span>
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">
            Amenities & Services
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-charcoal/80">
            We've thought of every detail to make your stay exceptionally comfortable and memorable.
          </p>
        </div>
        
        <div 
          ref={itemsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {amenities.map((amenity, index) => (
            <div 
              key={index}
              className="bg-white p-6 md:p-8 rounded-md shadow-sm transition-all duration-300 hover:shadow-md opacity-0"
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">{amenity.icon}</div>
                <h3 className="text-xl font-serif font-medium mb-2">{amenity.title}</h3>
                <p className="text-charcoal/80 text-sm flex-grow">{amenity.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="#book" 
            className="inline-block btn-hover-slide px-8 py-3 bg-gold text-white text-sm font-medium uppercase tracking-wide rounded transition-all hover:shadow-md"
          >
            Reserve Your Stay
          </a>
        </div>
      </div>
    </section>
  );
};

export default Amenities;
