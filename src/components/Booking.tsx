
import { useState, useRef, useEffect } from 'react';
import { CalendarIcon } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

export const Booking = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [suite, setSuite] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate booking check
    setTimeout(() => {
      toast({
        title: "Booking Request Received",
        description: "Thank you for your reservation request. We'll contact you shortly to confirm availability.",
        duration: 6000,
      });
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  // Calculate minimum check-out date (day after check-in)
  const minCheckOutDate = checkIn ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split('T')[0] : '';
  
  // Calculate today's date for min attribute
  const today = new Date().toISOString().split('T')[0];
  
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
      id="book" 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-secondary to-cream opacity-0"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596178060810-72c5b27ef5a5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-fixed opacity-10" aria-hidden="true"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-sm text-gold uppercase tracking-wider font-medium mb-2">Reserve Now</span>
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">
            Book Your Stay
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-charcoal/80">
            Experience the perfect blend of historic charm and modern luxury in the heart of Vienna.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Check-in Date */}
                <div className="relative">
                  <label htmlFor="check-in" className="block text-sm font-medium mb-1">
                    Check-in Date
                  </label>
                  <div className="relative">
                    <input 
                      type="date" 
                      id="check-in"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={today}
                      className="w-full px-4 py-2 pl-10 border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                      required
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/60">
                      <CalendarIcon size={16} />
                    </div>
                  </div>
                </div>
                
                {/* Check-out Date */}
                <div className="relative">
                  <label htmlFor="check-out" className="block text-sm font-medium mb-1">
                    Check-out Date
                  </label>
                  <div className="relative">
                    <input 
                      type="date" 
                      id="check-out"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={minCheckOutDate || today}
                      disabled={!checkIn}
                      className="w-full px-4 py-2 pl-10 border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold disabled:opacity-60 disabled:cursor-not-allowed"
                      required
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/60">
                      <CalendarIcon size={16} />
                    </div>
                  </div>
                </div>
                
                {/* Adults */}
                <div>
                  <label htmlFor="adults" className="block text-sm font-medium mb-1">
                    Adults
                  </label>
                  <select
                    id="adults"
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                    required
                  >
                    {[1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                
                {/* Children */}
                <div>
                  <label htmlFor="children" className="block text-sm font-medium mb-1">
                    Children
                  </label>
                  <select
                    id="children"
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                  >
                    {[0, 1, 2, 3].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                
                {/* Suite Selection */}
                <div className="md:col-span-2">
                  <label htmlFor="suite" className="block text-sm font-medium mb-1">
                    Select Suite
                  </label>
                  <select
                    id="suite"
                    value={suite}
                    onChange={(e) => setSuite(e.target.value)}
                    className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                    required
                  >
                    <option value="" disabled>Choose a suite</option>
                    <option value="mozart">Mozart Suite</option>
                    <option value="klimt">Klimt Suite</option>
                    <option value="strauss">Strauss Suite</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <button 
                  type="submit"
                  className="w-full btn-hover-slide px-6 py-3 bg-gold text-white text-sm font-medium uppercase tracking-wide rounded transition-all hover:shadow-md flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Check Availability"
                  )}
                </button>
              </div>
            </form>
            
            <div className="px-6 md:px-8 py-4 bg-cream/80">
              <p className="text-sm text-charcoal/70">
                By booking directly on our website, you receive the best rate guarantee and
                complimentary welcome amenities upon arrival.
              </p>
            </div>
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-sm text-charcoal/80 mb-3">
              For special requests or group bookings, please contact our reservations team:
            </p>
            <p className="text-charcoal font-medium">
              reservations@viennasuites.com | +43 1 23456789
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
