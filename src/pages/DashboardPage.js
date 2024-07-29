import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DashboardPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then(response => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching movies');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl my-4">Popular Movies</h1>
      <div className="grid grid-cols-4 gap-4">
        {movies.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="card card-compact w-full bg-base-100 shadow-xl">
            <figure><img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} /></figure>
            <div className="card-body">
              <h2 className="card-title">{movie.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
