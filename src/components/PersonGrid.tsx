
import { useState, useEffect } from 'react';
import { Person, Category, Platform } from '@/data/people';
import PersonCard from './PersonCard';

interface PersonGridProps {
  people: Person[];
  selectedCategory: Category;
  selectedPlatform: Platform;
}

const PersonGrid = ({ people, selectedCategory, selectedPlatform }: PersonGridProps) => {
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading time for better UX with the filter animation
    setTimeout(() => {
      const filtered = people.filter(person => {
        const categoryMatch = selectedCategory === 'all' || person.category === selectedCategory;
        const platformMatch = selectedPlatform === 'all' || person.platform === selectedPlatform;
        return categoryMatch && platformMatch;
      });
      
      setFilteredPeople(filtered);
      setIsLoading(false);
    }, 300);
  }, [people, selectedCategory, selectedPlatform]);

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
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive database of the world's most influential personalities
            based on their social media following.
          </p>
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
