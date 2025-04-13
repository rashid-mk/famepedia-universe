
import { useState, useEffect } from 'react';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Search } from 'lucide-react';
import { Person } from '@/data/people';
import { useNavigate } from 'react-router-dom';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  people: Person[];
}

const SearchDialog = ({ open, onOpenChange, people }: SearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = people.filter(
      person => 
        person.name.toLowerCase().includes(query) || 
        person.category.toLowerCase().includes(query) ||
        person.country.toLowerCase().includes(query) ||
        person.platform.toLowerCase().includes(query)
    );
    
    setSearchResults(results);
  }, [searchQuery, people]);

  const handleSelectPerson = (id: string) => {
    onOpenChange(false);
    navigate(`/profile/${id}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-2xl mx-auto overflow-hidden">
        <DialogTitle className="sr-only">Search People</DialogTitle>
        <Command className="rounded-lg border shadow-md">
          <CommandInput 
            placeholder="Search famous people..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="h-12"
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="People">
              {searchResults.map(person => (
                <CommandItem 
                  key={person.id}
                  onSelect={() => handleSelectPerson(person.id.toString())}
                  className="flex items-center gap-2 py-3 px-2 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img src={person.imageUrl} alt={person.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{person.name}</span>
                    <span className="text-sm text-gray-500">
                      {person.category} • {person.followers.toLocaleString()} followers
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
