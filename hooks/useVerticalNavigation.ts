import { useEffect, useRef } from "react";

export const useVerticalNavigation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Forzamos el focus sin outline para capturar eventos globales
    containerRef.current?.focus();
  }, []);

  return { containerRef };
};
