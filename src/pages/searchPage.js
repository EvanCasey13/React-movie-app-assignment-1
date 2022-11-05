import React, { useState, useEffect } from "react";
import { getMoviesSearch } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import TextField from "@mui/material/TextField";


const SearchPage = (props) => {

const [movies, setMovies] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const [searchTerm, setSearchTerm] = useState("")
  const onSubmit = async (e) => {
    e.preventDefault()
    let slug = searchTerm.split(' ').join('-').toLowerCase()
    const url = `https://api.themoviedb.org/3/search/movie?api_key=7a15a517bd41f7a7bc491bce0ba12dd4&language=en-US&include_adult=false&page=1&query=${slug}`;
    const data = await fetch(url);
    const movies = await data.json();
    setMovies(movies.results);
    console.log(movies.results)
}

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 
  
  return (
    <div className="movies">
    <form onSubmit={onSubmit}>
    <TextField
    id="filled-search"
    fullWidth 
    label="Search for a movie"
    type="searchTMDB"
    variant="filled"
    value={searchTerm}
    onChange={handleSearchChange}
        />
        <br></br>
        </form>

    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
</div>
);


};
export default SearchPage;