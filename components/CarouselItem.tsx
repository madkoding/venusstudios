/**
 * @file CarouselItem.tsx
 * @description Componente atómico que representa un ítem del carousel.
 */

import React from "react";
import { motion } from "framer-motion";
import type { Movie } from "../types/movie";

export interface CarouselItemProps {
  /** Objeto de película a mostrar */
  movie: Movie;
  /** Indica si el ítem está activo */
  isActive: boolean;
  /** Callback al hacer clic en el ítem */
  onClick: () => void;
}

/**
 * Componente que renderiza un ítem individual del carousel.
 * Resalta el ítem activo (por ejemplo, con un borde).
 */
const CarouselItem: React.FC<CarouselItemProps> = ({
  movie,
  isActive,
  onClick,
}) => {
  return (
    <motion.div
      className="min-w-[420px] h-[240px] cursor-pointer relative rounded-lg transition-transform"
      animate={{
        scale: isActive ? 0.95 : 0.9,
        borderWidth: isActive ? 4 : 0,
        borderColor: isActive ? "#e50914" : "transparent",
      }}
      transition={{ duration: 0, ease: "easeInOut" }}
      onClick={onClick}
      whileHover={{ scale: 1 }}
    >
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full h-full object-cover rounded-lg"
      />
      {/* <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center text-sm p-1 rounded-b-lg">
        {movie.title}
      </div> */}
    </motion.div>
  );
};

export default CarouselItem;
