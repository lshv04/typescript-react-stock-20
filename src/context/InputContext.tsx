import React, { createContext, useState, useContext } from 'react';

interface InputContextType {
  inputValue: string;
  setInputValue: (value: string) => void;
}

const InputContext = createContext<InputContextType | undefined>(undefined);

export const InputProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <InputContext.Provider value={{ inputValue, setInputValue }}>
      {children}
    </InputContext.Provider>
  );
};

export const useInputContext = () => {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error('useInputContext deve ser usado dentro de um InputProvider');
  }
  return context;
};
