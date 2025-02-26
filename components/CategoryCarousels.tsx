// components/CategoryCarousels.tsx
import React, { useEffect, useRef } from "react";
import Carousel from "./Carousel";
import type { CategoryRow } from "../lib/movies"; // Se removió el import de 'Movie'

interface CategoryCarouselsProps {
  categoryRows: CategoryRow[];
  activeCategoryIndex: number;
  activeMovieIndex: number;
  onSelect: (category: string, index: number) => void;
}

/**
 * Componente que renderiza los carouseles de cada categoría y realiza el scroll vertical
 * automático hacia la categoría activa. Además, sobre cada carrusel se muestra el nombre de la categoría.
 */
const CategoryCarousels: React.FC<CategoryCarouselsProps> = ({
  categoryRows,
  activeCategoryIndex,
  activeMovieIndex,
  onSelect,
}) => {
  // Referencias para cada fila de categoría
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    // Scroll automático a la categoría activa
    rowRefs.current[activeCategoryIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [activeCategoryIndex]);

  return (
    <div className="absolute top-[60vh] bottom-0 left-0 right-0 overflow-y-auto pt-4">
      {categoryRows.map((row, index) => (
        <div
          key={row.category}
          ref={(el) => {
            rowRefs.current[index] = el;
          }}
          className="mb-4"
        >
          <h2 className="relative top-6 text-white text-2xl font-bold px-12">
            {row.category}
          </h2>
          <Carousel
            movies={row.movies}
            selectedMovieIndex={
              index === activeCategoryIndex ? activeMovieIndex : -1
            }
            onSelect={(indexSelected) => onSelect(row.category, indexSelected)}
          />
        </div>
      ))}
    </div>
  );
};

export default CategoryCarousels;
