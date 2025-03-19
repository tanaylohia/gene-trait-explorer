
import React from 'react';
import { Search } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-8 flex flex-col items-center justify-center animate-fade-in">
      <div className="max-w-4xl w-full flex flex-col items-center gap-2">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
          <Search className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-medium text-center tracking-tight">
          Gene Trait Explorer
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mt-2">
          Discover genes, QTLs, and markers associated with specific traits across various crops and geographies
        </p>
      </div>
    </header>
  );
};

export default Header;
