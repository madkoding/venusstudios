import type { Movie } from "../types/movie";

export interface CategoryRow {
  category: string;
  movies: Movie[];
}

export const groupMoviesByCategory = (movies: Movie[]): CategoryRow[] => {
  // Usamos un Map para almacenar el nombre original (formateado) según la versión normalizada
  const categoryMap = new Map<string, string>();

  movies.forEach(movie => {
    movie.categories.forEach(cat => {
      const norm = cat.trim().toLowerCase();
      if (!categoryMap.has(norm)) {
        categoryMap.set(norm, cat.trim());
      }
    });
  });

  // Obtenemos las categorías únicas normalizadas
  const uniqueNormalized = Array.from(categoryMap.keys());

  return uniqueNormalized.map(norm => {
    const originalCategory = categoryMap.get(norm)!;
    return {
      category: originalCategory,
      movies: movies.filter(movie =>
        movie.categories.some(cat => cat.trim().toLowerCase() === norm)
      )
    };
  });
};
