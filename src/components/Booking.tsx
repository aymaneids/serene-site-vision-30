
import { useState, useRef, useEffect } from 'react';
import { Calendar, Users, Bed } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Booking = () => {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    suiteType: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === 'adults' || name === 'children' ? parseInt(value) : value;
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validation
    const today = new Date();
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    
    if (checkInDate < today) {
      toast({
        title: "Invalid Check-in Date",
        description: "Check-in date cannot be in the past.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    if (checkOutDate <= checkInDate) {
      toast({
        title: "Invalid Check-out Date",
        description: "Check-out date must be after check-in date.",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Simulate booking request
    setTimeout(() => {
      toast({
        title: "Booking Request Received!",
        description: "We'll confirm your reservation shortly via email.",
      });
      
      setFormData({
        checkIn: '',
        checkOut: '',
        adults: 2,
        children: 0,
        suiteType: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
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
      id="book" 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-charcoal text-white opacity-0"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block text-sm text-gold uppercase tracking-wider font-medium mb-2">Reserve Your Stay</span>
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">
            Book Your Suite
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-white/80">
            Experience luxury in the heart of Vienna. Book your stay directly for the best rates and exclusive amenities.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="checkIn" className="text-sm font-medium flex items-center">
                  <Calendar size={18} className="mr-2 text-gold" />
                  Check-in Date
                </label>
                <input
                  type="date"
                  id="checkIn"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="checkOut" className="text-sm font-medium flex items-center">
                  <Calendar size={18} className="mr-2 text-gold" />
                  Check-out Date
                </label>
                <input
                  type="date"
                  id="checkOut"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label htmlFor="adults" className="text-sm font-medium flex items-center">
                  <Users size={18} className="mr-2 text-gold" />
                  Adults
                </label>
                <select
                  id="adults"
                  name="adults"
                  value={formData.adults}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded text-white focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50"
                  required
                >
                  {[1, 2, 3, 4].map(num => (
                    <option key={num} value={num} className="bg-charcoal text-white">
                      {num} {num === 1 ? 'Adult' : 'Adults'}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="children" className="text-sm font-medium flex items-center">
                  <Users size={18} className="mr-2 text-gold" />
                  Children
                </label>
                <select
                  id="children"
                  name="children"
                  value={formData.children}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded text-white focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50"
                >
                  {[0, 1, 2, 3].map(num => (
                    <option key={num} value={num} className="bg-charcoal text-white">
                      {num} {num === 1 ? 'Child' : 'Children'}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="suiteType" className="text-sm font-medium flex items-center">
                  <Bed size={18} className="mr-2 text-gold" />
                  Suite Type
                </label>
                <select
                  id="suiteType"
                  name="suiteType"
                  value={formData.suiteType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded text-white focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50"
                  required
                >
                  <option value="" disabled className="bg-charcoal text-white">Select a suite</option>
                  <option value="mozart" className="bg-charcoal text-white">Mozart Suite</option>
                  <option value="strauss" className="bg-charcoal text-white">Strauss Suite</option>
                  <option value="imperial" className="bg-charcoal text-white">Imperial Suite</option>
                </select>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-hover-slide px-8 py-3 bg-gold text-white font-medium tracking-wide uppercase rounded transition-all hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : 'Check Availability'}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-white/20 text-white/80 text-sm text-center">
            <p>For special requests or assistance with your booking, please contact us directly at:</p>
            <a href="tel:+4312345678" className="text-gold hover:underline">+43 1 234 5678</a> or 
            <a href="mailto:reservations@viennasuites.com" className="text-gold hover:underline ml-1">reservations@viennasuites.com</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
