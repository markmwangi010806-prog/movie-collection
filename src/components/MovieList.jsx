
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "../App.css";

function MovieList() {
  // Load saved movies from localStorage
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem("movies");

    if (savedMovies) {
      try {
        return JSON.parse(savedMovies);
      } catch (error) {
        console.error("Could not load saved movies:", error);
      }
    }

    return [
      { id: 1, title: "Inception", genre: "Science Fiction", year: 2010 },
      { id: 2, title: "Interstellar", genre: "Adventure", year: 2014 },
      { id: 3, title: "The Dark Knight", genre: "Action", year: 2008 },
      { id: 4, title: "Avatar", genre: "Science Fiction", year: 2009 },
      { id: 5, title: "Titanic", genre: "Romance", year: 1997 },
      { id: 6, title: "Black Panther", genre: "Action", year: 2018 },
    ];
  });

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");

  // Save movies whenever the collection changes
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

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
  const sortedMovies = [...filteredMovies].sort(
    (a, b) => b.year - a.year
  );

  // Add a new movie
  function handleAddMovie(event) {
    event.preventDefault();

    if (!title.trim() || !genre.trim() || !year) {
      alert("Please fill in all fields!");
      return;
    }

    // Prevent duplicate movie titles
    const movieExists = movies.some(
      (movie) =>
        movie.title.trim().toLowerCase() === title.trim().toLowerCase()
    );

    if (movieExists) {
      alert("This movie already exists in your collection!");
      return;
    }

    // Validate release year
    const currentYear = new Date().getFullYear();
    const movieYear = Number(year);

    if (
      !Number.isInteger(movieYear) ||
      movieYear < 1888 ||
      movieYear > currentYear
    ) {
      alert(
        `Please enter a valid release year between 1888 and ${currentYear}.`
      );
      return;
    }

    const newMovie = {
      id: Date.now(),
      title: title.trim(),
      genre: genre.trim(),
      year: movieYear,
    };

    setMovies((previousMovies) => [...previousMovies, newMovie]);

    setTitle("");
    setGenre("");
    setYear("");
  }

  // Delete a movie
  function handleDeleteMovie(id) {
    setMovies((previousMovies) =>
      previousMovies.filter((movie) => movie.id !== id)
    );
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
        aria-label="Search movies by title or genre"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {/* Genre filter */}
      <select
        className="genre-select"
        aria-label="Filter movies by genre"
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
        <div className="form-group">
          <label htmlFor="movie-title">Movie Title</label>
          <input
            id="movie-title"
            className="form-input"
            type="text"
            placeholder="e.g. Spider-Man"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="movie-genre">Movie Genre</label>
          <input
            id="movie-genre"
            className="form-input"
            type="text"
            placeholder="e.g. Action"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="movie-year">Release Year</label>
          <input
            id="movie-year"
            className="form-input"
            type="number"
            placeholder="e.g. 2021"
            min="1888"
            max={new Date().getFullYear()}
            value={year}
            onChange={(event) => setYear(event.target.value)}
            required
          />
        </div>

        <button className="add-button" type="submit">
          Add Movie
        </button>
      </form>
    </div>
  );
}

export default MovieList;
