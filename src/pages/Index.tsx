
import { useState, useEffect } from 'react';
import { Category, Platform, Country, Region, people as staticPeople } from '@/data/people';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoryFilter from '@/components/CategoryFilter';
import PersonGrid from '@/components/PersonGrid';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('all');
  const [selectedCountry, setSelectedCountry] = useState<Country>('all');
  const [selectedRegion, setSelectedRegion] = useState<Region>('all');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Check if we have data in the database
    const checkData = async () => {
      try {
        const { count, error } = await supabase
          .from('influencers')
          .select('*', { count: 'exact', head: true });
        
        // If no data or error, initialize the database with our static data
        if (error || (count !== null && count === 0)) {
          if (user) {
            // Only initialize if user is logged in
            await initializeData();
          }
        }
      } catch (err) {
        console.error('Error checking database:', err);
      }
      
      // Simulate initial loading regardless
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };
    
    checkData();
  }, [user]);

  // Initialize database with static data if empty
  const initializeData = async () => {
    try {
      // Convert static people data to the format expected by our database
      const influencers = staticPeople.map((person, index) => ({
        name: person.name,
        handle: person.handle,
        followers: person.followers,
        image_url: person.imageUrl,
        category: person.category,
        platform: person.platform,
        country: person.country,
        region: person.region,
        description: person.description,
        rank: index + 1,
        last_updated: new Date().toISOString()
      }));
      
      // Insert the data
      const { error } = await supabase
        .from('influencers')
        .upsert(influencers);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Data initialized",
        description: "Initial influencer data has been loaded into the database.",
      });
    } catch (err) {
      console.error('Error initializing data:', err);
      toast({
        title: "Initialization failed",
        description: "Could not load initial data into the database.",
        variant: "destructive"
      });
    }
  };

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  const handlePlatformChange = (platform: Platform) => {
    setSelectedPlatform(platform);
  };

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
  };

  const handleRegionChange = (region: Region) => {
    setSelectedRegion(region);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block relative mb-6">
            <div className="w-16 h-16 rounded-full border-4 border-gray-200 animate-pulse"></div>
            <div className="w-16 h-16 rounded-full border-t-4 border-famepedia-blue absolute top-0 left-0 animate-spin"></div>
          </div>
          <h2 className="text-2xl font-semibold">
            <span className="text-gradient">Fame</span>
            <span>pedia</span>
          </h2>
          <p className="text-gray-500 mt-2">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-famepedia-soft-white"
      >
        <Header />
        <HeroSection />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <CategoryFilter
            selectedCategory={selectedCategory}
            selectedPlatform={selectedPlatform}
            selectedCountry={selectedCountry}
            selectedRegion={selectedRegion}
            onCategoryChange={handleCategoryChange}
            onPlatformChange={handlePlatformChange}
            onCountryChange={handleCountryChange}
            onRegionChange={handleRegionChange}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <PersonGrid
            people={staticPeople}
            selectedCategory={selectedCategory}
            selectedPlatform={selectedPlatform}
            selectedCountry={selectedCountry}
            selectedRegion={selectedRegion}
          />
        </motion.div>
        
        <section id="about" className="py-24 px-6 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-block category-chip bg-famepedia-light-blue text-famepedia-blue mb-2">
              About Famepedia
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              The Definitive Guide to <span className="text-gradient">Digital Influence</span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Famepedia is dedicated to tracking, analyzing, and understanding the phenomenon of digital fame
              and social media influence across all platforms and categories.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-8 rounded-2xl text-left">
                <h3 className="text-xl font-semibold mb-4">Comprehensive Data</h3>
                <p className="text-gray-600">
                  We collect and analyze follower counts, engagement metrics, and growth patterns across all major social platforms.
                </p>
              </div>
              
              <div className="glass-card p-8 rounded-2xl text-left">
                <h3 className="text-xl font-semibold mb-4">Cultural Impact</h3>
                <p className="text-gray-600">
                  We explore how these influential figures shape trends, consumer behavior, and cultural movements worldwide.
                </p>
              </div>
              
              <div className="glass-card p-8 rounded-2xl text-left">
                <h3 className="text-xl font-semibold mb-4">Regular Updates</h3>
                <p className="text-gray-600">
                  Our database is constantly updated to reflect the ever-changing landscape of social media influence.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
