// components/VideoModal.tsx
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface VideoModalProps {
  youtubeId: string;
  title: string;
  onClose: () => void;
}

/**
 * VideoModal abre el video en pantalla completa. Cuando se sale del modo
 * fullscreen, el modal se redimensiona a un tamaño más pequeño (50% de la ventana)
 * como un modal simple.
 */
const VideoModal: React.FC<VideoModalProps> = ({
  youtubeId,
  title,
  onClose,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (document.fullscreenElement) {
          document
            .exitFullscreen()
            .catch((err) =>
              console.error("Error al salir de pantalla completa:", err)
            );
        } else {
          // Si ya no está en fullscreen, cerramos el modal.
          onClose();
        }
      }
    };

    const handleFullscreenChange = () => {
      // Si ya no hay elemento en fullscreen, actualizamos el estado.
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      } else {
        setIsFullscreen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    // Solicitar pantalla completa en el contenedor cuando se abre el modal.
    if (containerRef.current && containerRef.current.requestFullscreen) {
      containerRef.current
        .requestFullscreen()
        .catch((err) =>
          console.error("Error al activar pantalla completa:", err)
        );
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      if (document.fullscreenElement) {
        document
          .exitFullscreen()
          .catch((err) =>
            console.error("Error al salir de pantalla completa:", err)
          );
      }
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black ${
          isFullscreen ? "bg-opacity-90" : "bg-opacity-75"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={onClose}
      >
        <motion.div
          className={`relative ${
            isFullscreen ? "w-full h-full" : "w-1/2 h-1/2"
          }`}
          initial={{ scale: isFullscreen ? 0.95 : 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: isFullscreen ? 0.95 : 0.8, opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&controls=1&vq=hd1080`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white text-4xl"
          >
            &times;
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoModal;
