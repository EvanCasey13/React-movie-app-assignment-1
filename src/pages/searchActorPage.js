import React, { useState } from "react";
import PageTemplate from '../components/templateActorListPage';
import TextField from "@mui/material/TextField";

const SearchActorPage = (props) => {

const [actors, setActors] = useState([]);

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

  // Redundant, but necessary to avoid app crashing.
  const favorites = actors.filter(a => a.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (actorId) => true 
  
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
    />
    </div>
  );
};

export default SearchActorPage;