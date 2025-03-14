
import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

const images: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop",
    alt: "Elegant suite bedroom with king-sized bed and luxury linens",
    category: "suites"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop",
    alt: "Modern bathroom with marble fixtures and freestanding bathtub",
    category: "bathrooms"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=1971&auto=format&fit=crop",
    alt: "Luxurious living area with classic Viennese design elements",
    category: "suites"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1594143407452-d461fcd0c753?q=80&w=1974&auto=format&fit=crop",
    alt: "Breakfast service with fresh pastries and coffee",
    category: "dining"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1606046604972-77cc76aee944?q=80&w=1935&auto=format&fit=crop",
    alt: "Vienna city view from suite balcony",
    category: "views"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop",
    alt: "Elegant desk area with writing materials",
    category: "suites"
  }
];

export const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const filteredImages = filter === 'all' 
    ? images 
    : images.filter(img => img.category === filter);
    
  const categories = ['all', ...new Set(images.map(img => img.category))];
  
  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!galleryRef.current) return;
      
      const gallery = galleryRef.current;
      const galleryTop = gallery.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (galleryTop < windowHeight * 0.75) {
        gallery.classList.add('animate-fade-in');
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
      id="gallery" 
      className="relative py-20 md:py-32 bg-cream"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-sm text-gold uppercase tracking-wider font-medium mb-2">Visual Tour</span>
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">
            Gallery
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-charcoal/80 mb-8">
            Experience Vienna Suites through our carefully curated gallery showcasing our elegant spaces.
          </p>
          
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 text-sm capitalize rounded-full transition-colors ${
                  filter === category 
                    ? 'bg-gold text-white' 
                    : 'bg-white/80 text-charcoal hover:bg-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Gallery Grid */}
        <div 
          ref={galleryRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-0"
        >
          {filteredImages.map((image) => (
            <div 
              key={image.id}
              className="image-reveal overflow-hidden rounded-md shadow-md cursor-pointer transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
              onClick={() => openLightbox(image)}
            >
              <div className="image-container">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-gold transition-colors"
            aria-label="Close gallery lightbox"
          >
            <X size={30} />
          </button>
          
          <div 
            className="relative max-w-5xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt}
              className="max-h-[80vh] max-w-full object-contain"
            />
            <div className="mt-4 text-center">
              <p className="text-white text-sm md:text-base">{selectedImage.alt}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
