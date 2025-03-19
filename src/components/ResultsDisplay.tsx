
import React from 'react';
import { ResearchResult, Gene, QTL, Marker } from '@/services/api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Database, FileSearch, MapPin } from 'lucide-react';

interface ResultsDisplayProps {
  result: ResearchResult;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  const { genes, qtls, markers, query } = result;
  
  const getTotalResults = () => {
    return genes.length + qtls.length + markers.length;
  };
  
  // Dynamically build search summary
  const buildSearchSummary = () => {
    const queryParts = [];
    if (query.trait) queryParts.push(`trait "${query.trait}"`);
    if (query.crop) queryParts.push(`crop "${query.crop}"`);
    if (query.variety) queryParts.push(`variety "${query.variety}"`);
    if (query.geography) queryParts.push(`geography "${query.geography}"`);
    
    if (queryParts.length === 0) return "all genetic data";
    
    return queryParts.join(", ");
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 animate-fade-in">
      <div className="mb-6 text-center">
        <div className="flex justify-center">
          <Badge variant="outline" className="px-3 py-1 text-xs bg-secondary/50">
            {getTotalResults()} results found
          </Badge>
        </div>
        <h2 className="text-xl font-medium mt-3">
          Results for {buildSearchSummary()}
        </h2>
      </div>
      
      <Tabs defaultValue="genes" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="genes" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Genes ({genes.length})
          </TabsTrigger>
          <TabsTrigger value="qtls" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            QTLs ({qtls.length})
          </TabsTrigger>
          <TabsTrigger value="markers" className="flex items-center gap-2">
            <FileSearch className="w-4 h-4" />
            Markers ({markers.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="genes" className="space-y-4">
          {genes.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No genes found for the given search parameters.
              </CardContent>
            </Card>
          ) : (
            genes.map((gene) => (
              <GeneCard key={gene.id} gene={gene} />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="qtls" className="space-y-4">
          {qtls.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No QTLs found for the given search parameters.
              </CardContent>
            </Card>
          ) : (
            qtls.map((qtl) => (
              <QTLCard key={qtl.id} qtl={qtl} />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="markers" className="space-y-4">
          {markers.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No markers found for the given search parameters.
              </CardContent>
            </Card>
          ) : (
            markers.map((marker) => (
              <MarkerCard key={marker.id} marker={marker} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const GeneCard: React.FC<{ gene: Gene }> = ({ gene }) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-medium">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {gene.name}
            </CardTitle>
            <CardDescription className="mt-1">{gene.description}</CardDescription>
          </div>
          <Badge className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20">Gene</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {gene.function && (
            <div className="space-y-1">
              <div className="text-sm font-medium text-foreground/70">Function</div>
              <div className="text-sm">{gene.function}</div>
            </div>
          )}
          
          {gene.source && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-4">
              <BookOpen className="w-3 h-3" />
              <span>Source: {gene.source}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const QTLCard: React.FC<{ qtl: QTL }> = ({ qtl }) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-medium">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {qtl.name}
            </CardTitle>
            <CardDescription className="mt-1">{qtl.description}</CardDescription>
          </div>
          <Badge className="bg-accent hover:bg-accent/70 text-accent-foreground border-accent/20">QTL</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {qtl.location && (
            <div className="space-y-1">
              <div className="text-sm font-medium text-foreground/70">Location</div>
              <div className="text-sm">{qtl.location}</div>
            </div>
          )}
          
          {qtl.associatedTraits && qtl.associatedTraits.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-foreground/70">Associated Traits</div>
              <div className="flex flex-wrap gap-2">
                {qtl.associatedTraits.map((trait, index) => (
                  <Badge key={index} variant="outline" className="bg-secondary/50">
                    {trait}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const MarkerCard: React.FC<{ marker: Marker }> = ({ marker }) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-medium">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {marker.name}
            </CardTitle>
            <CardDescription className="mt-1">Type: {marker.type}</CardDescription>
          </div>
          <Badge className="bg-secondary hover:bg-secondary/70 text-secondary-foreground">Marker</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {marker.position && (
            <div className="space-y-1">
              <div className="text-sm font-medium text-foreground/70">Position</div>
              <div className="text-sm">{marker.position}</div>
            </div>
          )}
          
          {marker.associatedWith && marker.associatedWith.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-foreground/70">Associated With</div>
              <div className="flex flex-wrap gap-2">
                {marker.associatedWith.map((association, index) => (
                  <Badge key={index} variant="outline" className="bg-secondary/50">
                    {association}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
