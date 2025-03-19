
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';
import { SearchParams } from '@/services/api';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<SearchParams>({
    crop: '',
    variety: '',
    trait: '',
    geography: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if at least one field has content
    if (!formData.crop && !formData.variety && !formData.trait && !formData.geography) {
      toast({
        title: "Empty search",
        description: "Please enter at least one search parameter",
        variant: "destructive"
      });
      return;
    }
    
    onSearch(formData);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto p-6 rounded-xl bg-white shadow-soft border border-border/50 animate-slide-up"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <label htmlFor="crop" className="text-sm font-medium text-foreground/80">
            Crop
          </label>
          <Input
            id="crop"
            name="crop"
            placeholder="e.g., Rice, Wheat, Maize"
            value={formData.crop}
            onChange={handleChange}
            className="h-12 bg-background"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="variety" className="text-sm font-medium text-foreground/80">
            Variety
          </label>
          <Input
            id="variety"
            name="variety"
            placeholder="e.g., IR64, Basmati, Japonica"
            value={formData.variety}
            onChange={handleChange}
            className="h-12 bg-background"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="trait" className="text-sm font-medium text-foreground/80">
            Trait
          </label>
          <Input
            id="trait"
            name="trait"
            placeholder="e.g., Drought tolerance, Yield, Disease resistance"
            value={formData.trait}
            onChange={handleChange}
            className="h-12 bg-background"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="geography" className="text-sm font-medium text-foreground/80">
            Geography
          </label>
          <Input
            id="geography"
            name="geography"
            placeholder="e.g., South Asia, Mediterranean, Tropical"
            value={formData.geography}
            onChange={handleChange}
            className="h-12 bg-background"
          />
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button 
          type="submit" 
          className="h-12 px-8 gap-2 font-medium"
          disabled={isLoading}
        >
          {isLoading ? (
            <>Searching<span className="ml-2 animate-pulse">...</span></>
          ) : (
            <>
              <SearchIcon className="w-5 h-5" />
              Search Genetic Data
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
