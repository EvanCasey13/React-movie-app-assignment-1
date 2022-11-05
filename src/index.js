import React from "react";
import { BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import ShowPage from "./pages/tvDetailsPage";
import ActorPage from "./pages/actorDetailsPage";
import TvPopularPage from "./pages/tvPopularPage";
import SearchPage from "./pages/searchPage";
import ActorPopularPage from "./pages/actorsPage";
import SiteHeader from './components/siteHeader'
import AddMovieReviewPage from './pages/addMovieReviewPage'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import { createRoot } from "react-dom/client";
import MoviesContextProvider from "./contexts/moviesContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <SiteHeader />
    <MoviesContextProvider>
    <Routes>
    <Route path="/shows/popular" element={<TvPopularPage />} />
      <Route path="/actors/popular" element={<ActorPopularPage />} />
      <Route path="/actor/:page" element={<ActorPopularPage />} />
      <Route path="/actors/:id" element={<ActorPage />} />
      <Route path="/shows/:id" element={<ShowPage />} />
      <Route path="/show/:page" element={<TvPopularPage />} />
      <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
      <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
      <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
      <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
      <Route path="/movies/:id" element={<MoviePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={ <Navigate to="/" /> } />
    </Routes>
    </MoviesContextProvider>
  </BrowserRouter>
  <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  );
};
const rootElement = createRoot(  document.getElementById("root") )
rootElement.render(<App />);