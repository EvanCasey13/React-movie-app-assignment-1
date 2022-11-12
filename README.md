# Assignment 1 - ReactJS app.

Name: Evan Casey

## Overview.

This is a web application, that displays movies, with additional information regarding actors & tv shows. A user can view details about particular movies, actors or tv shows by clicking on the "More Info" button located on each card. A user can favourite movies which will be available in their favourite list, where they can then write a review for that film. A user can also search for a particular actor, film or show by using the search located in the navigation bar. A user can register or login to the application using firebase authentication.

### Features.

+ Firebase Authentication
+ Firestore cloud storage
+ Pagination
+ Searching
+ Favourite movies
+ Popular Actors page
+ Actor details page
+ Popular TV Shows page
+ Show details page
+ Popular Movies page
+ Upcoming movies page
+ Movie details page
+ Check movie reviews feature
+ Write review for a movie

## Setup requirements.

To use this application you will first need to create a .env file in the src folder of the project and add your api key from [TMDB](https://developers.themoviedb.org/3/getting-started/introduction).

To add your api you can include it in the .env like so:
```
REACT_APP_TMDB_KEY=<YOUR_TMDB_API_KEY>
FAST_REFRESH=false
```

## API endpoints.

e.g.
+ Search for a movie - search/movie
+ Search for a actor - search/person
+ Search for a show - search/tv
+ Discover list of upcoming movies - movie/upcoming
+ Discover list of popular actors - person/popular
+ Discover list of popular shows - tv/popular
+ Discover actor details - /person/:id
+ Discover show details - /tv/:id

## Routing.

+ /shows/popular - Displays currently popular TV Shows
+ /actors/popular - Displays currently popular actors
+ /actors/:id - Displays details of a particular actor
+ /shows/:id - Displays details of a particular show
+ /movies/upcoming - Displays list of upcoming movies
+ /movies/search - Allows for searching of TMDB API to return movies
+ /shows/search - Allows for searching of TMDB API to return shows
+ /actors/search - Allows for searching of TMDB API to return actors
+ /login - Allows for a user to login to the application
+ /register - Allows for a user to register to the application
+ /reset - Allows for a user to reset their password if forgotten

## Protected & Unprotected routes.

The aspects of the application which are not protected are the login, register and reset routes, everything else in this application is protected and requires a user to register or login to utilize its functionality.

## Independent learning (If relevant).

The first technology I researched and implemented independently was [Firebase authentication](https://firebase.google.com/products/auth?gclid=CjwKCAiAvK2bBhB8EiwAZUbP1M3_dgZzyEXCRWf7P7mFiGI2qgXYE7DoybWXqw-lWjBeIUYCofbmLBoCun0QAvD_BwE&gclsrc=aw.ds) and [Firestore](https://firebase.google.com/products/firestore?gclid=CjwKCAiAvK2bBhB8EiwAZUbP1BDLaSvIjziXAY4aOtzxy09N1qn66dT04WVy2JC4voMInb-aBBULdRoCXdIQAvD_BwE&gclsrc=aw.ds) to allow for users to register & once they are registered that information is saved to firestore which is queried and the users email is displayed in the navigation bar.
+ firebase.js

I also implemented searching and pagination using react query which required me to learn much more about how react query works and how to apply it to achieve the functionality I wished to implement.
+ searchMoviePage.js
+ searchActorPage.js
+ searchTVShowPage.js
+ tmdb-api.js

I had to understand how to protect routes using auth context to allow for only users that are logged in to utilize the functionality of the application.
+ AuthContext.js
+ AuthProvider.js
+ index.js

## References.

+ [Pagination](https://blog.logrocket.com/pagination-infinite-scroll-react-query-v3/#pagination-usequery-keeppreviousdata)
+ [Firebase Authentication](https://blog.logrocket.com/user-authentication-firebase-react-apps/)
+ [Responsiveness](https://javascript.plainenglish.io/responsive-styling-for-mobile-and-web-with-react-material-ui-6984205ac65e)
