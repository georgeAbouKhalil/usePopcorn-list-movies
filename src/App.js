import { useState } from "react";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import NavBar from "./components/NavBar/NavBar";
import Search from "./components/Search/Search";
import Main from "./components/Main/Main";
import NumResults from "./components/NumResults/NumResults";
import Box from "./components/Box/Box";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import WatchedSummary from "./components/WatchedSummary/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList/WatchedMoviesList";
import MovieList from "./components/MovieList/MovieList";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isloading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isloading && <Loader />}
          {!isloading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} queryLength={query.length} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
