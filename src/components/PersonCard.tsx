
import { useState, useRef, useEffect } from 'react';
import { Person, formatNumber, platforms } from '@/data/people';
import { ChevronRight, Instagram, Twitter, Youtube, Facebook, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PersonCardProps {
  person: Person;
  index: number;
}

const PersonCard = ({ person, index }: PersonCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsLoaded(true);
          }, index * 100); // Stagger the animations
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  const getPlatformIcon = (platform: Person['platform']) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'youtube':
        return <Youtube className="w-5 h-5" />;
      case 'facebook':
        return <Facebook className="w-5 h-5" />;
      case 'tiktok':
        return <span className="text-xs">TT</span>;
      default:
        return null;
    }
  };

  const handleViewProfile = () => {
    navigate(`/profile/${person.id}`);
  };

  const platformColor = platforms.find(p => p.value === person.platform)?.color || '';

  return (
    <div 
      ref={cardRef}
      className={`glass-card rounded-2xl overflow-hidden transform transition-all duration-500 cursor-pointer ${
        isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewProfile}
    >
      <div className="relative overflow-hidden h-64 w-full">
        <img
          src={person.imageUrl}
          alt={person.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-5 w-full">
          <div className="flex items-center mb-2">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${platformColor}`}>
              {getPlatformIcon(person.platform)}
            </span>
            <span className="ml-2 text-white text-sm opacity-80">{person.handle}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-1">{person.name}</h3>
          <div className="flex items-center">
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-white text-sm font-semibold">{formatNumber(person.followers)} followers</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-5 bg-white/70 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="inline-block category-chip bg-google-light-blue text-google-blue text-xs">
            {person.category.charAt(0).toUpperCase() + person.category.slice(1)}
          </span>
          <span className="text-sm text-gray-500">Rank #{index + 1}</span>
        </div>
        
        <div className="flex items-center mb-4 text-sm text-gray-600">
          <MapPin className="w-3 h-3 mr-1" />
          <span>{person.country}</span>
          <span className="mx-1">•</span>
          <span>{person.region}</span>
        </div>
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{person.description}</p>
        
        <button 
          className="flex items-center text-sm font-medium text-google-blue hover:text-blue-700 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            handleViewProfile();
          }}
        >
          View Profile <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default PersonCard;
