import React, { useState } from "react";
import PageTemplate from '../components/templateShowListPage';
import TextField from "@mui/material/TextField";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { searchTVShows } from "../api/tmdb-api";
import useDebounce from "../hooks/useDebounce"

const SearchTVShowPage = (props) => {

  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const {  data, error, isLoading, isError }  = useQuery(['search/shows', { debouncedSearchTerm }], () => searchTVShows(debouncedSearchTerm), { enabled: !!debouncedSearchTerm})

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const shows = data?.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = shows?.filter(s => s?.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (showId) => true 
  
  return (
    <div className="shows">
    <form>
        <TextField
    id="filled-search"
    fullWidth 
    label="Search for a show"
    type="searchTMDB"
    variant="filled"
    value={searchTerm}
    onChange={handleSearchChange}
        />
        <br></br>
        </form>

    <PageTemplate
      title='Discover TV Shows'
      shows={shows}
    />
    </div>
  );
};

export default SearchTVShowPage;