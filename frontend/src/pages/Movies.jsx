import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import Movie from "../components/Movie";
import ResultCard from "../components/ResultCard";
import { useEffect, useState, useContext, useRef } from "react";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GlobalContext } from "../context/GlobalState";


const Movies = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const { watched, user, addMovieToWatched } = useContext(GlobalContext)

  const isMountedRef = useRef(false);
  useEffect(() => {
    const fetchMovies = async () => {
      console.log(user.token)
      const response = await fetch("http://localhost:5000/api/movies", {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data)
        data.forEach(m => {
          const movie_id = m["_id"]
          fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=69b2faeba1e9b8ea0840b179d490c477&language=en-US&page=1&include_adult=false&query=${m.title}`
          )
            .then((res) => res.json())
            .then((data) => {
              data.results[0]["id"] = movie_id
              data.results[0]["rating"] = m["rating"]
              addMovieToWatched(data.results[0])
            })
        }

        )
      } else {
        console.error(data.message);
      }
    };

    if (user && !isMountedRef.current) {
      isMountedRef.current = true;
      fetchMovies();
    }


  }, [user]);


  const onChange = (e) => {
    e.preventDefault()

    setQuery(e.target.value)

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=69b2faeba1e9b8ea0840b179d490c477&language=en-US&page=1&include_adult=false&query=${e.target.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setResults(data.results)
        } else {
          setResults([])
        }
      });
  }

  const clearSearch = () => {
    setQuery("");
    setResults([])
  };

  const notMany = watched.length < 4



  return (
    <div id="movies">
      <Header />
      <div id='search-bar'>
        <input value={query} onChange={onChange} type="text" id='search' name='search' placeholder='MOVIE NAME' />
        <button><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></button>
      </div>

      {results.length > 0 && (
        <ul className="results">
          {results.map((movie) => (
            <li key={movie.id}>
              <ResultCard clearSearch={clearSearch} movie={movie} />
            </li>
          ))}
        </ul>
      )}

      <div id="movie-container" style={notMany ? { gridTemplateColumns: 'repeat(auto-fit, minmax(250px, calc(100%/4 - 1rem)))' } : {}}>
        {watched.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;