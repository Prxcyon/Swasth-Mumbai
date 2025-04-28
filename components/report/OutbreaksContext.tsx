import React, { createContext, useContext, useState } from 'react';
import { DiseaseReport } from '@/types';

interface OutbreaksContextType {
  outbreaks: DiseaseReport[];
  addOutbreak: (report: DiseaseReport) => void;
}

const OutbreaksContext = createContext<OutbreaksContextType | undefined>(undefined);

export const OutbreaksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [outbreaks, setOutbreaks] = useState<DiseaseReport[]>([]);

  const addOutbreak = (report: DiseaseReport) => {
    setOutbreaks(prev => [report, ...prev]);
  };

  return (
    <OutbreaksContext.Provider value={{ outbreaks, addOutbreak }}>
      {children}
    </OutbreaksContext.Provider>
  );
};

export const useOutbreaks = () => {
  const ctx = useContext(OutbreaksContext);
  if (!ctx) throw new Error('useOutbreaks must be used within OutbreaksProvider');
  return ctx;
}; 