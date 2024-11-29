import React from "react";
import { useInputContext } from "../../context/InputContext";

const ExtraInfo: React.FC = () => {
  const { inputValue } = useInputContext(); // Obtém o valor do input do contexto

  return (
    <div className="container mt-5 text-center">
      <h1>Target Page</h1>
      <p>
        <strong>Input Value:</strong> {inputValue || "No input provided"}
      </p>
    </div>
  );
};

export default ExtraInfo;
