import { useState } from "react";
import MovieCard from "./MovieCard";
import "../App.css";

function MovieList() {
  const [movies, setMovies] = useState([
    { id: 1, title: "Inception", genre: "Science Fiction", year: 2010 },
    { id: 2, title: "Interstellar", genre: "Adventure", year: 2014 },
    { id: 3, title: "The Dark Knight", genre: "Action", year: 2008 },
    { id: 4, title: "Avatar", genre: "Science Fiction", year: 2009 },
    { id: 5, title: "Titanic", genre: "Romance", year: 1997 },
    { id: 6, title: "Black Panther", genre: "Action", year: 2018 },
  ]);

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");

  // Search and filter movies
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(search.toLowerCase()) ||
      movie.genre.toLowerCase().includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "All Genres" || movie.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  // Sort movies by release year (newest first)
  const sortedMovies = [...filteredMovies].sort((a, b) => b.year - a.year);

  // Add a new movie
  function handleAddMovie(event) {
    event.preventDefault();

    if (!title.trim() || !genre.trim() || !year) {
      alert("Please fill in all fields!");
      return;
    }

    const currentYear = new Date().getFullYear();
    const movieYear = Number(year);

    if (
      !Number.isInteger(movieYear) ||
      movieYear < 1888 ||
      movieYear > currentYear
    ) {
      alert(
        `Please enter a valid release year between 1888 and ${currentYear}.`,
      );
      return;
    }

    const newMovie = {
      id: Date.now(),
      title: title.trim(),
      genre: genre.trim(),
      year: Number(year),
    };

    setMovies([...movies, newMovie]);

    setTitle("");
    setGenre("");
    setYear("");
  }

  // Delete a movie
  function handleDeleteMovie(id) {
    setMovies(movies.filter((movie) => movie.id !== id));
  }

  return (
    <div className="app-container">
      {/* Dashboard header */}
      <div className="dashboard-header">
        <h1>My Movie Collection</h1>
        <p>Manage and explore your favorite movies.</p>
      </div>

      {/* Movie statistics */}
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Movies</h3>
          <p>{movies.length}</p>
        </div>

        <div className="stat-card">
          <h3>Search Results</h3>
          <p>{filteredMovies.length}</p>
        </div>
      </div>

      {/* Search bar */}
      <input
        className="search-input"
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {/* Genre filter */}
      <select
        className="genre-select"
        value={selectedGenre}
        onChange={(event) => setSelectedGenre(event.target.value)}
      >
        <option value="All Genres">All Genres</option>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Romance">Romance</option>
        <option value="Science Fiction">Science Fiction</option>
      </select>

      {/* Empty search message */}
      {filteredMovies.length === 0 && <p>No movies found!</p>}

      {/* Movie collection */}
      <div className="movie-grid">
        {sortedMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            genre={movie.genre}
            year={movie.year}
            onDelete={() => handleDeleteMovie(movie.id)}
          />
        ))}
      </div>

      {/* Add movie form */}
      <form className="movie-form" onSubmit={handleAddMovie}>
        <input
          className="form-input"
          type="text"
          placeholder="Movie title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          className="form-input"
          type="text"
          placeholder="Movie genre"
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
        />

        <input
          className="form-input"
          type="number"
          placeholder="Release year"
          value={year}
          onChange={(event) => setYear(event.target.value)}
        />

        <button className="add-button" type="submit">
          Add Movie
        </button>
      </form>
    </div>
  );
}

export default MovieList;
