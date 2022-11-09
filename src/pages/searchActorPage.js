import React, { useState } from "react";
import PageTemplate from '../components/templateActorListPage';
import TextField from "@mui/material/TextField";
import { searchActors } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import useDebounce from "../hooks/useDebounce"
import Spinner from '../components/spinner';

const SearchActorPage = (props) => {

  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const {  data, error, isLoading, isError }  = useQuery(['search/actors', { debouncedSearchTerm }], () => searchActors(debouncedSearchTerm), { enabled: !!debouncedSearchTerm})

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const actors = data?.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = actors?.filter(a => a?.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (actorId) => true 
  
  return (
    <div className="actors">
    <form>
        <TextField
    id="filled-search"
    fullWidth 
    label="Search for a actor"
    type="searchTMDB"
    variant="filled"
    value={searchTerm}
    onChange={handleSearchChange}
        />
        <br></br>
        </form>

        <PageTemplate
      title='Discover Actors'
      actors={actors}
    />
    </div>
  );
};

export default SearchActorPage;