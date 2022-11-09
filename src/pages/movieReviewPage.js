import React, { useState, useContext } from "react";
import AuthContext from "../AuthContext";
import { Navigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";

const MovieReviewPage = (props) => {
  const { user } = useContext(AuthContext);
  let location = useLocation();
  const {movie, review} = location.state;

  if (!user) {
    return <Navigate replace to="/login" />;
}

  return (
    <PageTemplate movie={movie}>
      <MovieReview review={review} />
    </PageTemplate>
  );
};

export default MovieReviewPage;