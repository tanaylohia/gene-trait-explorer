
import React from 'react';

interface LoadingStateProps {
  message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ message = "Analyzing genetic data..." }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-primary/20"></div>
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
      </div>
      
      <h3 className="text-lg font-medium mb-2">{message}</h3>
      
      <div className="mt-4 max-w-md w-full">
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary/40 via-primary to-primary/40 animate-shimmer" 
            style={{ backgroundSize: '400% 100%' }}
          ></div>
        </div>
        
        <div className="mt-6 space-y-3">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="h-10 bg-muted rounded-md animate-pulse-gentle"
              style={{ animationDelay: `${i * 150}ms` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
