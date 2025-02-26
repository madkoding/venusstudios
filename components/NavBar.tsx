import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 px-8 py-4 transition-colors duration-300 ${
        scrolled ? "bg-black" : "bg-transparent"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <img
          src="/venus_studios_white.png"
          alt="VENUS STUDIOS"
          className="h-12"
        />
        <nav className="hidden md:flex space-x-6">
          {/* <a href="#" className="text-white hover:text-gray-300">
            Inicio
          </a> */}
          <a href="#" className="text-white hover:text-gray-300">
            Series
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Películas
          </a>
          <a href="#" className="text-white hover:text-gray-300">
            Novedades
          </a>
          {/* <a href="#" className="text-white hover:text-gray-300">
            Mi lista
          </a> */}
        </nav>
        {/* <button className="bg-netflixRed text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300">
          Iniciar Sesión
        </button> */}
      </div>
    </motion.nav>
  );
};

export default NavBar;
