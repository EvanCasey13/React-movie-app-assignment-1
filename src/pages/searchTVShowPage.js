import React, { useState } from "react";
import PageTemplate from '../components/templateShowListPage';
import TextField from "@mui/material/TextField";

const SearchTVShowPage = (props) => {

const [shows, setShows] = useState([]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
      }
    
      const [searchTerm, setSearchTerm] = useState("")
      const onSubmit = async (e) => {
        e.preventDefault()
        let slug = searchTerm.split(' ').join('-').toLowerCase()
        const url = `https://api.themoviedb.org/3/search/tv?api_key=7a15a517bd41f7a7bc491bce0ba12dd4&language=en-US&include_adult=false&page=1&query=${slug}`;
        const data = await fetch(url);
        const shows = await data.json();
        setShows(shows.results);
        console.log(shows.results)
    }

  // Redundant, but necessary to avoid app crashing.
  const favorites = shows.filter(s => s.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (showId) => true 
  
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
    />
    </div>
  );
};

export default SearchTVShowPage;