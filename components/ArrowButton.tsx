/**
 * @file ArrowButton.tsx
 * @description Componente atómico para el botón de flecha en el carousel.
 */

import React from "react";

export interface ArrowButtonProps {
  /** Callback a ejecutar al hacer clic */
  onClick: () => void;
  /** Dirección de la flecha: 'left' o 'right' */
  direction: "left" | "right";
}

/**
 * Componente atómico que renderiza un botón de flecha.
 * Se utiliza para navegar en el carousel.
 */
const ArrowButton: React.FC<ArrowButtonProps> = ({ onClick, direction }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute ${
        direction === "left" ? "left-0" : "right-0"
      } top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 z-10`}
    >
      {direction === "left" ? "❮" : "❯"}
    </button>
  );
};

export default ArrowButton;
