
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center p-8 max-w-md">
        <span className="inline-block text-sm text-gold uppercase tracking-wider font-medium mb-2">Error 404</span>
        <h1 className="text-5xl md:text-6xl font-serif font-medium mb-6 leading-tight">
          Page Not Found
        </h1>
        <div className="w-20 h-1 bg-gold mx-auto mb-6"></div>
        <p className="text-base md:text-lg mb-8 text-charcoal/80">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center btn-hover-slide px-6 py-3 bg-gold text-white text-sm font-medium uppercase tracking-wide rounded transition-all hover:shadow-lg"
        >
          <Home size={18} className="mr-2" />
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
