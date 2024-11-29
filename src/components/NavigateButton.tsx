import React from "react";
import { useNavigate } from "react-router-dom";

interface NavigateButtonProps {
  route: string; // Destination route
  label: string; // Button text
}

const NavigateButton: React.FC<NavigateButtonProps> = ({ route, label }) => {
  const navigate = useNavigate(); // React Router hook for navigation

  const handleNavigation = () => {
    navigate(route); // Navigate to the specified route
  };

  return (
    <div className="text-center mt-3">
      <button className="btn btn-primary" onClick={handleNavigation}>
        {label}
      </button>
    </div>
  );
};

export default NavigateButton;
