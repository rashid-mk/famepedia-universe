
import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const { clientX, clientY } = e;
      const { width, height } = heroRef.current.getBoundingClientRect();
      
      // Calculate mouse position percentage
      const x = (clientX / width - 0.5) * 2;
      const y = (clientY / height - 0.5) * 2;
      
      // Apply subtle parallax effect to the hero content
      const content = heroRef.current.querySelector('.hero-content') as HTMLElement;
      if (content) {
        content.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
      }
      
      // Apply more pronounced effect to the orbs
      const orbs = heroRef.current.querySelectorAll('.orb') as NodeListOf<HTMLElement>;
      orbs.forEach((orb, index) => {
        const factor = (index + 1) * 4;
        orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-b from-famepedia-blue/5 to-white"
    >
      {/* Background orbs */}
      <div className="orb absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-famepedia-blue/10 blur-3xl animate-float"></div>
      <div className="orb absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="orb absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-blue-300/10 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="hero-content relative z-10 max-w-4xl mx-auto transition-transform duration-200 ease-out">
        <div className="animate-fadeInUp">
          <span className="inline-block category-chip bg-famepedia-light-blue text-famepedia-blue mb-6">
            The World's Most Famous People
          </span>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Explore the <span className="text-gradient">Icons</span> of Our Time
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Discover the most followed individuals across social media platforms, 
            driving culture and shaping our digital landscape.
          </p>
          
          <div className="inline-flex relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-famepedia-blue to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <a
              href="#people"
              className="relative px-8 py-4 bg-white rounded-full shadow-sm text-gray-900 font-medium group-hover:text-famepedia-blue transition-all duration-200"
            >
              Explore Top Profiles
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-10 h-10 text-gray-400" />
      </div>
    </section>
  );
};

export default HeroSection;
