import React, { useState } from "react";
import PageTemplate from '../components/templateMovieListPage';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import TextField from "@mui/material/TextField";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { searchMovies } from "../api/tmdb-api";
import useDebounce from "../hooks/useDebounce"

const SearchMoviePage = (props) => {

  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const {  data, error, isLoading, isError }  = useQuery(['search/movies', { debouncedSearchTerm }], () => searchMovies(debouncedSearchTerm), { enabled: !!debouncedSearchTerm})

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data?.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = movies?.filter(m => m?.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 
  
  return (
    <div className="movies">
    <form >
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
export default SearchMoviePage;