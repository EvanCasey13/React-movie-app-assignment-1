import React from "react";
import PageTemplate from '../components/templateActorListPage'
import { getPopularActors } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import { useQuery } from 'react-query';

const ActorPopularPage = (props) => {
  const {  data, error, isLoading, isError }  = useQuery('popular', getPopularActors)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const actors = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = actors.filter(a => a.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (actorId) => true 
  
  return (
    <PageTemplate
      title="Discover Actors"
      actors={actors}
    />
    );
};
export default ActorPopularPage;