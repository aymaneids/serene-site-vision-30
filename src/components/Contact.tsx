
import { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Contact = () => {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you shortly.",
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
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
      id="contact" 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-cream opacity-0"
    >
      {/* Background decorative element */}
      <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-gradient-radial from-taupe/10 to-transparent opacity-50" aria-hidden="true"></div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-sm text-gold uppercase tracking-wider font-medium mb-2">Get In Touch</span>
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">
            Contact Us
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-charcoal/80">
            Have questions or special requests? Our dedicated team is here to assist you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-md shadow-sm">
              <h3 className="text-xl font-serif font-medium mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 mr-4">
                    <MapPin size={20} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Address</h4>
                    <p className="text-charcoal/80 text-sm">Kärntner Ring 16, 1010 Vienna, Austria</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4">
                    <Phone size={20} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Phone</h4>
                    <p className="text-charcoal/80 text-sm">+43 1 23456789</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4">
                    <Mail size={20} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-charcoal/80 text-sm">info@viennasuites.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4">
                    <Clock size={20} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Reception Hours</h4>
                    <p className="text-charcoal/80 text-sm">24/7 - Our front desk is always available</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="rounded-md overflow-hidden shadow-sm h-64 lg:h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2658.9954913060694!2d16.3694793!3d48.2037487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d079f271c551f%3A0x3057b0571016133d!2sK%C3%A4rntner%20Ring%2016%2C%201010%20Wien%2C%20Austria!5e0!3m2!1sen!2sus!4v1653889721154!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title="Vienna Suites Location Map"
              ></iframe>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-md shadow-sm">
            <h3 className="text-xl font-serif font-medium mb-6">Send Us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-taupe/30 rounded focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-taupe/30 rounded focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-taupe/30 rounded focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50"
                  required
                >
                  <option value="" disabled>Select a subject</option>
                  <option value="booking">Booking Inquiry</option>
                  <option value="information">General Information</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-taupe/30 rounded focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-hover-slide px-8 py-3 bg-gold text-white font-medium tracking-wide uppercase rounded transition-all hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
