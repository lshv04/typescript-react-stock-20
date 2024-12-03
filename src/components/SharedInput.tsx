import React, { useState, useEffect } from 'react';
import { useInputContext } from '../context/InputContext';
import styles from './SharedInput.module.css';

const SharedInput: React.FC = () => {
  const { inputValue, setInputValue } = useInputContext(); // Atualiza e obtém o contexto
  const [localValue, setLocalValue] = useState<string>(inputValue); // Inicializa com o valor do contexto

  useEffect(() => {
    setLocalValue(inputValue); // Sincroniza o localValue com o valor do contexto
  }, [inputValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value.toUpperCase()); // Converte para maiúsculas
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previne comportamento padrão do formulário
    setInputValue(localValue); // Envia o valor para o contexto
    setLocalValue(''); // Limpa o campo de input
  };

  return (
    <div className="container g-0 bord">
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          id="shared-input"
          type="text"
          value={localValue}
          onChange={handleChange}
          placeholder="Search symbols..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          <span>
            <i className="bi bi-search"></i>
          </span>
        </button>
      </form>
    </div>
  );
};

export default SharedInput;
