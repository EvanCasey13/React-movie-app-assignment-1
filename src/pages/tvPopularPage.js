import React from "react";
import PageTemplate from '../components/templateShowListPage'
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { getPopularTV } from "../api/tmdb-api";

const TvPopularPage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('person/popular', getPopularTV)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const shows = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = shows.filter(s => s.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (showId) => true 
  
  return (
    <PageTemplate
      title="Discover TV Shows"
      shows={shows}
    />
    );
};
export default TvPopularPage;