import { useEffect } from "react";

const MovieModal = ({ movie, onClose }) => {
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/90 transition-opacity duration-800"
      onClick={onClose} // Close when clicking outside modal
    >

          {/* Close Button */}
          <button
          onClick={onClose}
          className="absolute top-5 right-5 lg:top-10 lg:right-10 text-gray-300 hover:text-white text-2xl"
        >
          &times;
        </button>
      <div
        className="bg-white p-6 rounded-lg w-64 lg:w-96 shadow-lg relative transform lg:scale-100 scale-90 transition-transform duration-300"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >

        {/* Movie Poster */}
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200"}
          alt={movie.Title}
          className="w-full lg:h-96 h-64 object-cover rounded-md"
        />

        {/* Movie Details */}
        <h2 className="text-sm lg:text-lg font-bold mt-2 text-center">
          {movie.Title} <br/> ({movie.Year})
        </h2>
        <p className="text-xs lg:text-sm text-red-600 mt-2 text-center">IMDb ID: {movie.imdbID}</p>
      </div>
    </div>
  );
};

export default MovieModal;