import React, { useState } from 'react';
import { useInputContext } from '../context/InputContext';

const SharedInput: React.FC = () => {
  const { setInputValue } = useInputContext(); // Atualiza o contexto
  const [localValue, setLocalValue] = useState<string>(''); // Gerencia o valor localmente

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value); // Atualiza o estado local
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previne comportamento padrão do formulário
    setInputValue(localValue); // Envia o valor para o contexto
    setLocalValue(''); // Limpa o campo de input
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="shared-input">Shared Input:</label>
      <input
        id="shared-input"
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder="Digite algo..."
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SharedInput;
