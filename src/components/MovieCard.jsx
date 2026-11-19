
function MovieCard({ title, genre, year, onDelete }) {
  return (
    <div className="movie-card">
      <h2>{title}</h2>

      <p>Genre: {genre}</p>
      <p>Year: {year}</p>

      <button
        type="button"
        className="delete-button"
        onClick={onDelete}
      >
        Delete Movie
      </button>
    </div>
  );
}

export default MovieCard;
