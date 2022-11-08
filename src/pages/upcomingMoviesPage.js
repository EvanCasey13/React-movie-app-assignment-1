import React, { useState } from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import Pagination from '@mui/material/Pagination';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

const UpcomingMoviesPage = (props) => {

  const [activePage, setActivePage] = useState(1);

  const handleChange = (event, value) => {
    setActivePage(value);
    console.log(value)
  };

  const {  data, error, isLoading, isError }  = useQuery(['upcoming', activePage], () => getUpcomingMovies(activePage), { keepPreviousData: true })

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const mustwatch = movies.filter(m => m.watch)
  localStorage.setItem('mustwatch', JSON.stringify(mustwatch))
  const addToMustWatch = (movieId) => true 
  console.log(mustwatch)

  return (
    <div className="upcomingpage">
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
    <Pagination
    count="100"
    variant='outlined'
    color='primary'
    shape="rounded"
    showFirstButton 
    showLastButton
    className='pagination'
    page={activePage}
    onChange={handleChange}
  />
  </div>
);

};
export default UpcomingMoviesPage;