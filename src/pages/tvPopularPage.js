import React, { useState, useEffect, useContext } from "react";
import PageTemplate from '../components/templateShowListPage'
import TextField from "@mui/material/TextField";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getPopularTV } from "../api/tmdb-api";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'

const TvPopularPage = (props) => {
  const [shows, setShows] = useState([]);
  const favorites = shows.filter(s => s.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
      setPage(value);
      console.log(value)
    };

  const addToFavorites = (showId) => {
    const updatedShows = shows.map((s) =>
      s.id === showId ? { ...s, favorite: true } : s
    );
    setShows(updatedShows);
  };

  useEffect(() => {
    getPopularTV().then(shows => {
      setShows(shows);
    });
  }, []);

  const pagination = async () => {
    const data = await fetch( `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=${page}`);
    const shows = await data.json();
    setShows(shows?.results);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const [searchTerm, setSearchTerm] = useState("")
  const onSubmit = async (e) => {
    e.preventDefault()
    let slug = searchTerm.split(' ').join('-').toLowerCase()
    const url = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=1&query=${slug}`;
    const data = await fetch(url);
    const shows = await data.json();
    setShows(shows.results);
    console.log(shows.results)
}
  
  return (
    <div className="shows">
    <form onSubmit={onSubmit}>
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
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
    <Link to={`/show/${page}`}>
    <Stack spacing={2}>
      <Pagination variant="outlined" shape="rounded" showFirstButton showLastButton count={100} page={page} onChange={handleChange} onClick={pagination} />
    </Stack>
    </Link>
    </div>
  );
};
export default TvPopularPage;