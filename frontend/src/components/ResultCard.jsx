import React from 'react'
import { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const ResultCard = ({ movie, clearSearch }) => {
  const {
    addMovieToWatched, watched, user
  } = useContext(GlobalContext)

  const [modal, setModal] = useState(false)
  const [grade, setGrade] = useState(0);

  const toggleModal = () => setModal(!modal)

  const handleGradeChange = (event) => {
    const newGrade = parseInt(event.target.value);
    setGrade(newGrade);
  };

  const handleAddClick = async () => {
    // do something with the grade value (e.g. save it to a database)
    addMovieToWatched(movie)
    setModal(false);
    clearSearch()

    console.log(movie)
    movie["rating"] = grade
    

    const response = await fetch("/api/movies", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${user.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "user": user.id,
        "title": movie.title,
        "rating": grade
      })
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data);
    } else {
      console.error(data.message);
    }
  };

  let storedMovie = watched.find(o => o.id === movie.id)
  const watchDisabled = storedMovie ? true : false

  return (
    <div className="result-card">
      <div className="poster-wrapper">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={`${movie.title} Poster`}
          />
        ) : (
          <div className="filler-poster" />
        )}
      </div>

      <div className="info">
        <div className="header">
          <h3 className="title">{movie.title}</h3>
          <h4 className="release-date">
            {movie.release_date}
          </h4>
        </div>

        <div className="controls">
          <button
            onClick={toggleModal}
            className="btn"
            disabled={watchDisabled}
          >
            Add to Movies
          </button>

        </div>
      </div>

      {modal && (
        <div className='modal'>
          <div className='modal-content'>
            <div style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }} className='modal-img'>
              <h1>{movie.title}</h1>
            </div>
            <div className='modal-details'>
              <h2>Synopsis</h2>
              <p>{movie.overview}</p>
              <div className='modal-input'>
                <label htmlFor='grade-input'>Grade:</label>
                <input type='number' name='grade-input' id='grade-input' min='0' max='10' value={grade} onChange={handleGradeChange} />
              </div>
            </div>
            <div className='modal-buttons'>
              <button className='add-button' disabled={watchDisabled} onClick={handleAddClick}>Add</button>
              <button className='close-button' onClick={toggleModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResultCard