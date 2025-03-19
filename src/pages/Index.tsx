
import React, { useState } from 'react';
import Header from '@/components/Header';
import SearchForm from '@/components/SearchForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import LoadingState from '@/components/LoadingState';
import { searchGeneticData, ResearchResult, SearchParams } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ResearchResult | null>(null);

  const handleSearch = async (params: SearchParams) => {
    setIsLoading(true);
    setResult(null);
    
    try {
      const data = await searchGeneticData(params);
      setResult(data);
      
      // Show a success message
      const totalResults = data.genes.length + data.qtls.length + data.markers.length;
      if (totalResults > 0) {
        toast({
          title: "Search completed",
          description: `Found ${totalResults} results related to your query.`,
        });
      } else {
        toast({
          title: "No results found",
          description: "Try adjusting your search parameters.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container max-w-6xl px-4 py-8 mx-auto">
        <Header />
        
        <div className="mt-8">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </div>
        
        <div className="mt-8 pb-16">
          {isLoading ? (
            <LoadingState />
          ) : result ? (
            <ResultsDisplay result={result} />
          ) : (
            <div className="w-full max-w-xl mx-auto mt-16 text-center opacity-70 delayed-fade-in" style={{ '--delay': '500ms' } as React.CSSProperties}>
              <p className="text-lg text-muted-foreground">
                Enter search parameters above to explore genes, QTLs and markers.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
