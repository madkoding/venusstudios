import type { NextPage, GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import { useState, useEffect, KeyboardEvent } from "react";
import NavBar from "../components/NavBar";
import Banner from "../components/Banner";
import CategoryCarousels from "../components/CategoryCarousels";
import { groupMoviesByCategory } from "../lib/movies";
import type { Movie } from "../types/movie";
import { useVerticalNavigation } from "../hooks/useVerticalNavigation";

interface HomeProps {
  movies: Movie[];
}

const Home: NextPage<HomeProps> = ({ movies }) => {
  const categoryRows = groupMoviesByCategory(movies);

  // Estado para la categoría activa (vertical) y para la película activa (índice)
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [activeMovieIndex, setActiveMovieIndex] = useState(0);

  const { containerRef } = useVerticalNavigation();

  // Manejo global de teclas
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowUp" && activeCategoryIndex > 0) {
      setActiveCategoryIndex((prev) => prev - 1);
      setActiveMovieIndex(0);
    } else if (
      e.key === "ArrowDown" &&
      activeCategoryIndex < categoryRows.length - 1
    ) {
      setActiveCategoryIndex((prev) => prev + 1);
      setActiveMovieIndex(0);
    } else if (e.key === "ArrowLeft") {
      const moviesInCategory = categoryRows[activeCategoryIndex].movies;
      setActiveMovieIndex((prev) =>
        prev === 0 ? moviesInCategory.length - 1 : prev - 1
      );
    } else if (e.key === "ArrowRight") {
      const moviesInCategory = categoryRows[activeCategoryIndex].movies;
      setActiveMovieIndex((prev) =>
        prev === moviesInCategory.length - 1 ? 0 : prev + 1
      );
    }
  };

  // Listener global para la rueda del mouse (vertical)
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.deltaY > 0 && activeCategoryIndex < categoryRows.length - 1) {
      setActiveCategoryIndex((prev) => prev + 1);
      setActiveMovieIndex(0);
    } else if (e.deltaY < 0 && activeCategoryIndex > 0) {
      setActiveCategoryIndex((prev) => prev - 1);
      setActiveMovieIndex(0);
    }
  };

  useEffect(() => {
    containerRef.current?.focus();
  }, [containerRef]);

  const activeCategory = categoryRows[activeCategoryIndex] || categoryRows[0];
  const activeMovie =
    activeCategory.movies[activeMovieIndex] || activeCategory.movies[0];

  return (
    <div
      ref={containerRef}
      className="relative bg-netflixBlack min-h-screen overflow-hidden focus:outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onWheel={handleWheel}
    >
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </div>
      <div className="fixed top-[80px] left-0 right-0 z-40">
        <Banner key={activeMovie.id} movie={activeMovie} />
      </div>
      <CategoryCarousels
        categoryRows={categoryRows}
        activeCategoryIndex={activeCategoryIndex}
        activeMovieIndex={activeMovieIndex}
        onSelect={(category, index) => setActiveMovieIndex(index)}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), "public", "movies.json");
  const jsonData = fs.readFileSync(filePath, "utf8");
  const movies: Movie[] = JSON.parse(jsonData);
  return {
    props: { movies },
  };
};

export default Home;
