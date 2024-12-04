import React from "react";
import { useNavigate } from "react-router-dom";

interface NavigateButtonProps {
  route: string; 
  label: string; 
}

const NavigateButton: React.FC<NavigateButtonProps> = ({ route, label }) => {
  const navigate = useNavigate(); 

  const handleNavigation = () => {
    navigate(route); 
  };

  return (
    <div className="text-center ">
      <button className="btn btn-primary" onClick={handleNavigation}>
        {label}
      </button>
    </div>
  );
};

export default NavigateButton;
