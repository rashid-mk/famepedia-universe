
import { useState, useEffect } from 'react';
import { Person, Category, Platform, Country, Region } from '@/data/people';
import PersonCard from './PersonCard';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PersonGridProps {
  people: Person[];
  selectedCategory: Category;
  selectedPlatform: Platform;
  selectedCountry: Country;
  selectedRegion: Region;
}

// Define types for the data from Supabase
interface Influencer {
  id: string;
  name: string;
  handle: string;
  followers: number;
  image_url: string;
  category: string;
  platform: string;
  country: string;
  region: string;
  description: string;
  rank: number;
  last_updated: string;
}

const PersonGrid = ({ 
  people: initialPeople, 
  selectedCategory, 
  selectedPlatform,
  selectedCountry,
  selectedRegion
}: PersonGridProps) => {
  const [people, setPeople] = useState<Person[]>(initialPeople);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  // Fetch influencers from Supabase
  const fetchInfluencers = async () => {
    try {
      const { data, error } = await supabase
        .from('influencers')
        .select('*')
        .order('rank', { ascending: true });
      
      if (error) {
        throw error;
      }
      
      if (data) {
        // Convert Supabase data to our Person type
        const convertedData: Person[] = data.map((influencer: Influencer) => ({
          id: influencer.id,
          name: influencer.name,
          handle: influencer.handle,
          followers: influencer.followers,
          imageUrl: influencer.image_url || 'https://i.pravatar.cc/300',
          category: influencer.category as Category,
          platform: influencer.platform as Platform,
          country: influencer.country as Country,
          region: influencer.region as Region,
          description: influencer.description || '',
        }));
        
        setPeople(convertedData);
        return convertedData;
      }
      
      return initialPeople;
    } catch (error) {
      console.error('Error fetching influencers:', error);
      toast({
        title: "Failed to load data",
        description: "Could not retrieve influencer data. Using offline data instead.",
        variant: "destructive"
      });
      return initialPeople;
    }
  };

  // Trigger update from edge function
  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      // Call the edge function to update data
      const { error } = await supabase.functions.invoke('update-influencers');
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Update triggered",
        description: "The system is fetching fresh data from social platforms.",
      });
      
      // Fetch the updated data after a short delay to allow the edge function to complete
      setTimeout(async () => {
        await fetchInfluencers();
        setIsRefreshing(false);
        toast({
          title: "Data refreshed",
          description: "Latest influencer data has been loaded.",
        });
      }, 3000);
    } catch (error) {
      console.error('Error refreshing data:', error);
      toast({
        title: "Update failed",
        description: "Could not refresh influencer data. Please try again later.",
        variant: "destructive"
      });
      setIsRefreshing(false);
    }
  };

  // Subscribe to realtime changes
  useEffect(() => {
    const channel = supabase
      .channel('influencers-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'influencers' 
        }, 
        (payload) => {
          console.log('Real-time update received:', payload);
          // Refresh our data when changes are detected
          fetchInfluencers();
          toast({
            title: "Data updated",
            description: "The influencer rankings have been updated in real-time.",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  // Initial data loading
  useEffect(() => {
    setIsLoading(true);
    fetchInfluencers().then(() => {
      setIsLoading(false);
    });
  }, []);

  // Filter the data whenever the filters or data changes
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading time for better UX with the filter animation
    setTimeout(() => {
      const filtered = people.filter(person => {
        const categoryMatch = selectedCategory === 'all' || person.category === selectedCategory;
        const platformMatch = selectedPlatform === 'all' || person.platform === selectedPlatform;
        const countryMatch = selectedCountry === 'all' || person.country === selectedCountry;
        const regionMatch = selectedRegion === 'all' || person.region === selectedRegion;
        return categoryMatch && platformMatch && countryMatch && regionMatch;
      });
      
      setFilteredPeople(filtered);
      setIsLoading(false);
    }, 300);
  }, [people, selectedCategory, selectedPlatform, selectedCountry, selectedRegion]);

  return (
    <section id="people" className="py-16 px-6 bg-famepedia-gray">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block category-chip bg-famepedia-light-blue text-famepedia-blue mb-2">
            Discover
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            The Most Followed <span className="text-gradient">People</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Explore our comprehensive database of the world's most influential personalities
            based on their social media following.
          </p>
          
          <button 
            onClick={refreshData}
            disabled={isRefreshing}
            className={`px-4 py-2 rounded-full text-white font-medium transition-all ${
              isRefreshing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-famepedia-blue hover:bg-blue-600'
            }`}
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="rounded-2xl overflow-hidden">
                  <div className="bg-gray-200 h-64 w-full"></div>
                  <div className="p-5 bg-gray-100">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredPeople.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPeople.map((person, index) => (
              <PersonCard key={person.id} person={person} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-medium text-gray-700 mb-4">No results found</h3>
            <p className="text-gray-500">
              Try adjusting your filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PersonGrid;
