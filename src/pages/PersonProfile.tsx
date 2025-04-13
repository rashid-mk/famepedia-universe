
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { people, Person, platforms } from '@/data/people';
import { ChevronLeft, MapPin, Users, Calendar, Globe, ExternalLink, Instagram, Twitter, Youtube, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';

const PersonProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for better UX
    setIsLoading(true);
    
    setTimeout(() => {
      const foundPerson = people.find(p => p.id === id);
      setPerson(foundPerson || null);
      setIsLoading(false);
    }, 500);
  }, [id]);

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

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="pt-24 px-6 min-h-screen bg-google-gray/5">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>
              <div className="h-80 w-full bg-gray-200 rounded-2xl mb-8"></div>
              <div className="h-10 w-64 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-8"></div>
              <div className="flex gap-4">
                <div className="h-12 w-32 bg-gray-200 rounded"></div>
                <div className="h-12 w-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!person) {
    return (
      <>
        <Header />
        <div className="pt-24 px-6 min-h-screen bg-google-gray/5 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Person Not Found</h1>
            <p className="text-gray-600 mb-6">The person you're looking for doesn't exist or has been removed.</p>
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  const platformColor = platforms.find(p => p.value === person.platform)?.color || '';

  return (
    <>
      <Header />
      <div className="pt-24 px-6 pb-16 min-h-screen bg-google-gray/5">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center text-google-blue hover:text-google-dark-blue mb-8 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="relative h-80">
              <img 
                src={person.imageUrl} 
                alt={person.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex items-center mb-4">
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${platformColor} flex items-center`}>
                    {getPlatformIcon(person.platform)}
                    <span className="ml-1">{person.platform.charAt(0).toUpperCase() + person.platform.slice(1)}</span>
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-white mb-2">{person.name}</h1>
                <div className="flex items-center text-white/80">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{person.country}, {person.region}</span>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-google-blue" />
                  <div>
                    <div className="text-2xl font-bold">{person.followers.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Followers</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-google-red" />
                  <div>
                    <div className="text-2xl font-bold">2014</div>
                    <div className="text-sm text-gray-500">Joined</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-google-green" />
                  <div>
                    <div className="text-2xl font-bold">{person.category.charAt(0).toUpperCase() + person.category.slice(1)}</div>
                    <div className="text-sm text-gray-500">Category</div>
                  </div>
                </div>
              </div>
              
              <Separator className="mb-6" />
              
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">About</h2>
                <p className="text-gray-700 leading-relaxed">
                  {person.description}
                  {/* Adding more content for a better profile page */}
                  {` ${person.name} has garnered a significant following on ${person.platform} 
                  through consistent and engaging content. Known for their expertise in ${person.category}, 
                  they've built a loyal audience primarily from ${person.country} and the surrounding ${person.region} region. 
                  Their influence extends beyond social media, with various collaborations and projects 
                  that have cemented their status as a prominent figure in their field.`}
                </p>
              </div>
              
              <Separator className="mb-6" />
              
              <div>
                <h2 className="text-xl font-bold mb-4">Social Profiles</h2>
                <div className="flex flex-wrap gap-4">
                  <Button className="flex items-center gap-2" variant="outline">
                    {getPlatformIcon(person.platform)}
                    <span>@{person.handle}</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  
                  <Button className="flex items-center gap-2" variant="outline">
                    <Globe className="w-4 h-4" />
                    <span>Official Website</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonProfile;
