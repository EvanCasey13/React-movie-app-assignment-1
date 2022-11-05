import React, { useContext }from "react";
import { useParams, Navigate } from 'react-router-dom';
import ActorDetails from "../components/actorDetails";
import PageTemplate from "../components/templateActorPage";
import useActor from "../hooks/useActor";
import AuthContext from "../AuthContext";

const ActorPage = (props) => {
  const { id } = useParams();
  const [actor] = useActor(id);
  
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