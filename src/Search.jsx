import { useState } from "react";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="flex justify-center w-2/3 items-center my-6">
      <form 
        onSubmit={handleSubmit} 
        className="flex w-full bg-white shadow-lg rounded-full overflow-hidden"
      >
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 px-4 text-gray-700 outline-none"
          required
        />
        <button 
          type="submit" 
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-r-full hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
