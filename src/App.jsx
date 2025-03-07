import { useState } from "react";
import Search from "./Search";
import MovieModal from "./MovieModal"; // Import Modal Component
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //API Function
  const searchMovies = async (query) => {
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;

    if (!apiKey) {
      setError("Missing API Key! Make sure it's set in the .env file.");
      return;
    }

    setLoading(true);
    setError("");
    setSearchTerm(query);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.Response === "False") {
        setError("No movies found.");
        setMovies([]);
      } else {
        setMovies(data.Search || []);
      }
    } catch (error) {
      setError("Error fetching movies: " + error.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    setError("");
    setSearchTerm(query);

    const results = await searchMovies(query);

    if (results.length === 0) {
      setError("No movies found.");
    }

    setMovies(results);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[url('/bg1.jpg')] lg:bg-cover bg-center flex flex-col items-center justify-center">
      <h1 className="lg:text-4xl text-lg font-bold mt-6 text-white">
        Movie Search
      </h1>
      <Search onSearch={handleSearch} />
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="bg-red-800 p-2 text-sm rounded-full text-white">{error}</p>}
      <div className="grid grid-cols-2 p-6 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:p-12">
        {movies.map((movie) => (
          <div key={movie.imdbID} onClick={() => setSelectedMovie(movie)} className="bg-white shadow-md p-2 lg:p-6 py-6 rounded-tr-full hover:shadow-xl cursor-pointer transition">
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200"}
              alt={movie.Title}
              className="w-full lg:h-64 h-44 object-cover rounded-md mb-4"
            />
            <p className="mt-2 font-semibold text-xs lg:text-sm text-center">
              {movie.Title} <br/> ({movie.Year})
            </p>
          </div>
        ))}
      </div>

      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default App;
