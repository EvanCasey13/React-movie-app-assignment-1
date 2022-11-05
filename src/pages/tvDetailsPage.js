import React, { useContext } from "react";
import { useParams, Navigate } from 'react-router-dom';
import ShowDetails from "../components/showDetails/";
import PageTemplate from "../components/templateShowPage";
import useShow from "../hooks/useShow";

const ShowPage = (props) => {
  const { id } = useParams();
  const [show] = useShow(id);

  return (
    <>
      {show ? (
        <>
          <PageTemplate show={show}>
            <ShowDetails show={show} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for show details</p>
      )}
    </>
  );
};

export default ShowPage;