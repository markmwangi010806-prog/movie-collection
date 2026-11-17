function MovieCard({ title, genre, year, onDelete }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>Genre: {genre}</p>
      <p>Year: {year}</p>

      <button onClick={onDelete}>
        Delete Movie
      </button>
    </div>
  );
}

export default MovieCard;