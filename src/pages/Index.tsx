
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Suites from '@/components/Suites';
import Amenities from '@/components/Amenities';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import Booking from '@/components/Booking';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Suites />
        <Amenities />
        <Gallery />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
