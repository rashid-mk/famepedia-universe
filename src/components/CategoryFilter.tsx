
import { useState } from 'react';
import { Category, Platform, Country, Region, categories, platforms, countries, regions } from '@/data/people';
import { Filter, Globe, MapPin, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  ToggleGroup,
  ToggleGroupItem
} from "@/components/ui/toggle-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [activeFilter, setActiveFilter] = useState<'category' | 'platform' | 'region' | 'country' | null>(null);

  // Find the label for each selected value
  const selectedCategoryLabel = categories.find(c => c.value === selectedCategory)?.label || 'All Categories';
  const selectedPlatformLabel = platforms.find(p => p.value === selectedPlatform)?.label || 'All Platforms';
  const selectedCountryLabel = countries.find(c => c.value === selectedCountry)?.label || 'All Countries';
  const selectedRegionLabel = regions.find(r => r.value === selectedRegion)?.label || 'All Regions';

  return (
    <section id="categories" className="py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <span className="inline-block category-chip bg-famepedia-light-blue text-famepedia-blue mb-2">
              Filter By
            </span>
            <h2 className="text-2xl font-bold text-gray-900">
              Explore <span className="text-gradient">Categories</span>
            </h2>
          </div>

          {/* Mobile Filter Button */}
          <div className="mt-4 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex items-center text-sm font-medium text-gray-600 hover:text-famepedia-blue transition-colors bg-gray-100 px-4 py-2 rounded-lg">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Apply filters to discover influencers
                  </SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-full py-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-3">Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <button
                            key={category.value}
                            onClick={() => onCategoryChange(category.value)}
                            className={`category-chip ${
                              selectedCategory === category.value
                                ? 'bg-famepedia-blue text-white'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {category.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-3">Platforms</h3>
                      <div className="flex flex-wrap gap-2">
                        {platforms.map((platform) => (
                          <button
                            key={platform.value}
                            onClick={() => onPlatformChange(platform.value)}
                            className={`category-chip ${
                              selectedPlatform === platform.value
                                ? platform.color
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {platform.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-3">Regions</h3>
                      <div className="flex flex-wrap gap-2">
                        {regions.map((region) => (
                          <button
                            key={region.value}
                            onClick={() => onRegionChange(region.value)}
                            className={`category-chip ${
                              selectedRegion === region.value
                                ? 'bg-google-green text-white'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {region.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-3">Countries</h3>
                      <div className="flex flex-wrap gap-2">
                        {countries.map((country) => (
                          <button
                            key={country.value}
                            onClick={() => onCountryChange(country.value)}
                            className={`category-chip ${
                              selectedCountry === country.value
                                ? 'bg-google-red text-white'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {country.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Desktop Filter UI */}
        <div className="hidden md:block">
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
            <div className="flex flex-wrap items-center gap-3">
              {/* Categories Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center px-3 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <span className="text-sm font-medium mr-2">Category:</span>
                  <span className="text-sm text-gray-700">{selectedCategoryLabel}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel>Select Category</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {categories.map((category) => (
                    <DropdownMenuItem 
                      key={category.value}
                      onClick={() => onCategoryChange(category.value)}
                      className={selectedCategory === category.value ? "bg-gray-100" : ""}
                    >
                      {category.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Platforms Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center px-3 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <span className="text-sm font-medium mr-2">Platform:</span>
                  <span className="text-sm text-gray-700">{selectedPlatformLabel}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel>Select Platform</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {platforms.map((platform) => (
                    <DropdownMenuItem 
                      key={platform.value}
                      onClick={() => onPlatformChange(platform.value)}
                      className={selectedPlatform === platform.value ? "bg-gray-100" : ""}
                    >
                      {platform.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Regions Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center px-3 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <Globe className="w-3.5 h-3.5 mr-1.5" />
                  <span className="text-sm font-medium mr-2">Region:</span>
                  <span className="text-sm text-gray-700">{selectedRegionLabel}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel>Select Region</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {regions.map((region) => (
                    <DropdownMenuItem 
                      key={region.value}
                      onClick={() => onRegionChange(region.value)}
                      className={selectedRegion === region.value ? "bg-gray-100" : ""}
                    >
                      {region.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Countries Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center px-3 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <MapPin className="w-3.5 h-3.5 mr-1.5" />
                  <span className="text-sm font-medium mr-2">Country:</span>
                  <span className="text-sm text-gray-700">{selectedCountryLabel}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 max-h-[300px] overflow-auto">
                  <DropdownMenuLabel>Select Country</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {countries.map((country) => (
                    <DropdownMenuItem 
                      key={country.value}
                      onClick={() => onCountryChange(country.value)}
                      className={selectedCountry === country.value ? "bg-gray-100" : ""}
                    >
                      {country.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;
