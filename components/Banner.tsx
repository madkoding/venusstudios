// components/Banner.ts
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Movie } from "../types/movie";
import VideoModal from "./VideoModal";

interface BannerProps {
  movie: Movie;
}

/**
 * Componente Banner que muestra el background del banner y separa el mainTitle (arriba)
 * del resto del contenido (abajo). Además, si se dispone de movie.subtitle, se muestra
 * debajo del mainTitle.
 */
const Banner: React.FC<BannerProps> = ({ movie }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // mainTitle se muestra en la parte superior: si existe logoImage se usa como imagen,
  // sino se muestra el título. Debajo se muestra, opcionalmente, el subtitle.
  const mainTitle = () => {
    if (movie.logoImage) {
      return (
        <>
          <img src={movie.logoImage} alt={movie.title} className="w-1/3" />
          {movie.subtitle && <p className="text-2xl mt-2">{movie.subtitle}</p>}
        </>
      );
    } else {
      return (
        <>
          <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
          {movie.subtitle && <p className="text-2xl mt-2">{movie.subtitle}</p>}
        </>
      );
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          className="relative w-full h-[50vh] text-white"
          style={{
            backgroundImage: `url(${movie.banner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Overlay vertical */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          {/* Overlay horizontal en la mitad izquierda */}
          <div className="absolute inset-y-0 left-0 w-3/4 bg-gradient-to-r from-black to-transparent" />
          {/* Main title y subtítulo en la parte superior */}
          <motion.div
            className="absolute top-10 left-10 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            {mainTitle()}
          </motion.div>
          {/* Resto del contenido en la parte inferior */}
          <motion.div
            className="absolute bottom-10 left-10 max-w-xl z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
          >
            <p className="mb-4 text-lg">{movie.description}</p>
            <div className="flex items-center space-x-2 mb-4">
              {movie.rating && (
                <span className="border border-gray-300 px-2 py-1 text-sm">
                  {movie.rating}
                </span>
              )}
              {movie.year && <span className="text-sm">{movie.year}</span>}
            </div>
            <button
              onClick={openModal}
              className="bg-netflixRed px-6 py-2 rounded text-lg font-medium hover:bg-red-700 transition duration-300"
            >
              Reproducir
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {isModalOpen && (
        <VideoModal
          youtubeId={movie.youtube}
          title={movie.title}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default Banner;
