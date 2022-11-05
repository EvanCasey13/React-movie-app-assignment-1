import React, { useState, useEffect, useContext } from "react";
import PageTemplate from '../components/templateActorListPage'
import TextField from "@mui/material/TextField";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getPopularActors } from "../api/tmdb-api";

const ActorPopularPage = (props) => {
  const [actors, setActors] = useState([]);
  const favorites = actors.filter(a => a.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
      setPage(value);
      console.log(value)
    };

  const addToFavorites = (actorId) => {
    const updatedActors = actors.map((a) =>
      a.id === actorId ? { ...a, favorite: true } : a
    );
    setActors(updatedActors);
  };

  useEffect(() => {
    getPopularActors().then(actors => {
      setActors(actors);
    });
  }, []);

  const pagination = async () => {
    const data = await fetch( `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=${page}`);
    const actors = await data.json();
    setActors(actors?.results);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const [searchTerm, setSearchTerm] = useState("")
  const onSubmit = async (e) => {
    e.preventDefault()
    let slug = searchTerm.split(' ').join('-').toLowerCase()
    const url = `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=1&query=${slug}`;
    const data = await fetch(url);
    const actors = await data.json();
    setActors(actors.results);
    console.log(actors.results)
}

  return (
    <div className="actors">
    <form onSubmit={onSubmit}>
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
      selectFavorite={addToFavorites}
    />
    <Link to={`/actor/${page}`}>
    <Stack spacing={2}>
      <Pagination variant="outlined" shape="rounded" showFirstButton showLastButton count={100} page={page} onChange={handleChange} onClick={pagination} />
    </Stack>
    </Link>
    </div>
  );
};
export default ActorPopularPage;