
import { useState } from 'react';
import { Category, Platform, Country, Region, categories, platforms, countries, regions } from '@/data/people';
import { motion } from 'framer-motion';
import { Filter, Globe, MapPin } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: Category;
  selectedPlatform: Platform;
  selectedCountry: Country;
  selectedRegion: Region;
  onCategoryChange: (category: Category) => void;
  onPlatformChange: (platform: Platform) => void;
  onCountryChange: (country: Country) => void;
  onRegionChange: (region: Region) => void;
}

const CategoryFilter = ({ 
  selectedCategory, 
  selectedPlatform,
  selectedCountry,
  selectedRegion,
  onCategoryChange, 
  onPlatformChange,
  onCountryChange,
  onRegionChange
}: CategoryFilterProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <section id="categories" className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <span className="inline-block category-chip bg-famepedia-light-blue text-famepedia-blue mb-2">
              Filter By
            </span>
            <h2 className="text-3xl font-bold text-gray-900">
              Explore Different <span className="text-gradient">Categories</span>
            </h2>
          </div>
          
          <button 
            className="mt-4 md:mt-0 flex items-center text-sm font-medium text-gray-600 hover:text-famepedia-blue transition-colors md:hidden"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <Filter className="w-4 h-4 mr-2" />
            {isFiltersOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className={`md:block ${isFiltersOpen ? 'block' : 'hidden'}`}>
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Categories</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => onCategoryChange(category.value)}
                  className={`category-chip relative overflow-hidden ${
                    selectedCategory === category.value
                      ? 'bg-famepedia-blue text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedCategory === category.value && (
                    <motion.span
                      layoutId="categoryHighlight"
                      className="absolute inset-0 bg-famepedia-blue"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <span className="relative z-10">{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Platforms</h3>
            <div className="flex flex-wrap gap-3">
              {platforms.map((platform) => {
                const isSelected = selectedPlatform === platform.value;
                return (
                  <button
                    key={platform.value}
                    onClick={() => onPlatformChange(platform.value)}
                    className={`category-chip relative overflow-hidden ${
                      isSelected
                        ? platform.color
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="platformHighlight"
                        className={`absolute inset-0 ${platform.color}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <span className="relative z-10">{platform.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              Regions
            </h3>
            <div className="flex flex-wrap gap-3">
              {regions.map((region) => {
                const isSelected = selectedRegion === region.value;
                return (
                  <button
                    key={region.value}
                    onClick={() => onRegionChange(region.value)}
                    className={`category-chip relative overflow-hidden ${
                      isSelected
                        ? 'bg-google-green text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="regionHighlight"
                        className="absolute inset-0 bg-google-green"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <span className="relative z-10">{region.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Countries
            </h3>
            <div className="flex flex-wrap gap-3">
              {countries.map((country) => {
                const isSelected = selectedCountry === country.value;
                return (
                  <button
                    key={country.value}
                    onClick={() => onCountryChange(country.value)}
                    className={`category-chip relative overflow-hidden ${
                      isSelected
                        ? 'bg-google-red text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="countryHighlight"
                        className="absolute inset-0 bg-google-red"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <span className="relative z-10">{country.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;
