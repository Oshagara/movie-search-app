const MovieModal = ({ movie, onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">&times;</button>
          <img 
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200"} 
            alt={movie.Title} 
            className="w-full h-64 object-cover rounded-md"
          />
          <h2 className="text-xl font-bold mt-2">{movie.Title} ({movie.Year})</h2>
          <p className="text-sm text-gray-600 mt-2">IMDb ID: {movie.imdbID}</p>
        </div>
      </div>
    );
  };
  
  export default MovieModal;
  