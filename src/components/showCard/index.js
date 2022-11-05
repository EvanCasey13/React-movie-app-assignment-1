import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';

export default function ShowCard(props) {
  const show = props.show;

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    props.selectFavorite(show.id);
  };

  return (

<Card sx={{ maxWidth: 345, height: '100%' }}>
<CardMedia
  sx={{ height: 500 }}
  image={
    show.poster_path
      ? `https://image.tmdb.org/t/p/w500/${show.poster_path}`
      : img
  }
/>
<CardContent>
  <Grid container >
    <Grid item xs={20}>
      <Typography variant="h6" component="p">
        {show.name}
      </Typography>
      <Typography variant="h6" component="p">
        <CalendarIcon fontSize="small" />
        {show.first_air_date}
      </Typography>
      <Typography variant="h6" component="p">
        <StarRateIcon fontSize="small" />
        {"  "} {show.vote_average}{" "}
      </Typography>
    </Grid>
  </Grid>
</CardContent>
<CardActions disableSpacing>
  <IconButton aria-label="add to favorites" onClick={handleAddToFavorite}>
    <FavoriteIcon color="primary" fontSize="large" />
  </IconButton>
  <Link to={`/shows/${show.id}`}>
    <Button variant="outlined" size="medium" color="primary">
      More Info ...
    </Button>
  </Link>
</CardActions>
</Card>
  );
}