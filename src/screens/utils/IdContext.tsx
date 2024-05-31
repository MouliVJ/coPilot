// IdContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface IdContextType {
  id: string | null;
  setId: (id: string | null) => void;
}

const IdContext = createContext<IdContextType | undefined>(undefined);

export const IdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [id, setId] = useState<string | null>(null);

  return <IdContext.Provider value={{ id, setId }}>{children}</IdContext.Provider>;
};

export const useId = (): IdContextType => {
  const context = useContext(IdContext);
  if (!context) {
    throw new Error('useId must be used within an IdProvider');
  }
  return context;
};
