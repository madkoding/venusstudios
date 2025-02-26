/**
 * @file Carousel.tsx
 * @description Componente principal del carousel.
 * Se encarga de mostrar los ítems en una fila horizontal, resaltar el ítem activo,
 * y hacer scroll suave para que el ítem activo (selectedMovieIndex) quede alineado a la izquierda.
 */

import React, { useEffect, useRef, useState } from "react";
import type { Movie } from "../types/movie";
import ArrowButton from "./ArrowButton";
import CarouselItem from "./CarouselItem";

export interface CarouselProps {
  /** Arreglo original de películas */
  movies: Movie[];
  /** Índice de la película activa (0 ... movies.length - 1) */
  selectedMovieIndex: number;
  /** Callback al seleccionar una película */
  onSelect: (index: number) => void;
}

/**
 * Componente principal del carousel.
 * - Muestra las películas en una fila horizontal.
 * - Al cambiar selectedMovieIndex, realiza un scroll suave para alinear el ítem activo.
 * - Las flechas actualizan el índice activo (avance/retroceso de película).
 */
const Carousel: React.FC<CarouselProps> = ({
  movies,
  selectedMovieIndex,
  onSelect,
}) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const firstItemRef = useRef<HTMLDivElement | null>(null);
  const [itemWidth, setItemWidth] = useState(0);

  // Medimos el ancho del primer ítem (asumiendo un gap fijo de 16px)
  useEffect(() => {
    if (firstItemRef.current) {
      setItemWidth(firstItemRef.current.offsetWidth + 16);
    }
  }, []);

  // Al montarse o al cambiar selectedMovieIndex, realizamos scroll suave para alinear el ítem activo a la izquierda.
  useEffect(() => {
    if (carouselRef.current && itemWidth) {
      carouselRef.current.scrollTo({
        left: selectedMovieIndex * itemWidth,
        behavior: "smooth",
      });
    }
  }, [selectedMovieIndex, itemWidth]);

  /**
   * Maneja el avance del carousel: actualiza el índice activo.
   */
  const handleNext = () => {
    const newIndex = (selectedMovieIndex + 1) % movies.length;
    onSelect(newIndex);
  };

  /**
   * Maneja el retroceso del carousel: actualiza el índice activo.
   */
  const handlePrev = () => {
    const newIndex = (selectedMovieIndex - 1 + movies.length) % movies.length;
    onSelect(newIndex);
  };

  return (
    <section className="relative mx-auto px-8 my-8" aria-label="Carousel">
      <div className="relative">
        <ArrowButton direction="left" onClick={handlePrev} />
        <div
          ref={carouselRef}
          className="flex overflow-x-auto scroll-smooth space-x-4 pb-4 scrollbar-hide"
        >
          {movies.map((movie, index) => (
            <div key={movie.id} ref={index === 0 ? firstItemRef : undefined}>
              <CarouselItem
                movie={movie}
                isActive={index === selectedMovieIndex}
                onClick={() => onSelect(index)}
              />
            </div>
          ))}
        </div>
        <ArrowButton direction="right" onClick={handleNext} />
      </div>
    </section>
  );
};

export default Carousel;
