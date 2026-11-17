import { useState } from "react";
import MovieCard from "./MovieCard";

function MovieList() {

  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Inception",
      genre: "Science Fiction",
      year: 2010
    },
    {
      id: 2,
      title: "Interstellar",
      genre: "Adventure",
      year: 2014
    },
    {
      id: 3,
      title: "The Dark Knight",
      genre: "Action",
      year: 2008
    },
    {
      id: 4,
      title: "Avatar",
      genre: "Science Fiction",
      year: 2009
    },
    {
      id: 5,
      title: "Titanic",
      genre: "Romance",
      year: 1997
    },
    {
      id: 6,
      title: "Black Panther",
      genre: "Action",
      year: 2018
    }
  ]);

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  function handleAddMovie(event) {
    event.preventDefault();

    if (!title.trim() || !genre.trim() || !year) {
      alert("Please fill in all fields!");
      return;
    }

    const newMovie = {
      id: Date.now(),
      title: title.trim(),
      genre: genre.trim(),
      year: Number(year)
    };

    setMovies([...movies, newMovie]);

    setTitle("");
    setGenre("");
    setYear("");
  }

  function handleDeleteMovie(id) {
    setMovies(movies.filter((movie) => movie.id !== id));
  }

  return (
    <div>
      <h1>My Movie Collection</h1>

      <form onSubmit={handleAddMovie}>
        <input
          type="text"
          placeholder="Movie title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          type="text"
          placeholder="Movie genre"
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
        />

        <input
          type="number"
          placeholder="Release year"
          value={year}
          onChange={(event) => setYear(event.target.value)}
        />

        <button type="submit">Add Movie</button>
      </form>

      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            genre={movie.genre}
            year={movie.year}
            onDelete={() => handleDeleteMovie(movie.id)}
          />
        ))}
      </div>

    </div>
  );
}

export default MovieList;