import React, { useState, useContext } from "react";
import AuthContext from "../AuthContext";
import { useParams, Navigate } from 'react-router-dom';
import ActorDetails from "../components/actorDetails";
import PageTemplate from "../components/templateActorPage";
import { getActor } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'

const ActorPage = (props) => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const { data: actor, error, isLoading, isError } = useQuery(
    ["actor", { id: id }],
    getActor
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (!user) {
    return <Navigate replace to="/login" />;
}

  return (
    <>
      {actor ? (
        <>
          <PageTemplate actor={actor}>
            <ActorDetails actor={actor} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for actor details</p>
      )}
    </>
  );
};

export default ActorPage;