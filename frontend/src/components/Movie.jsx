import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { faStar } from '@fortawesome/free-solid-svg-icons';


const Movie = ({ movie }) => {
  const {
    removeFromWatched, user, watched
  } = useContext(GlobalContext)

  const [modal, setModal] = useState(false)

  const toggleModal = () => setModal(!modal)

  const handleAddClick = async () => {
    removeFromWatched(movie.id)
    setModal(false);

    const found = watched.find(({title}) => title === movie.title)
    console.log(found)

    const response = await fetch(`/api/movies/${movie.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${user.token}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data);
    } else {
      console.error(data.message);
    }
  };

  return (
    <div>
      <div className='movie' onClick={toggleModal}>
        <img src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path} alt={movie.path} />
        <div className='movie-brand'>
          <div className='movie-title'>{movie.title}</div>
        </div>
      </div>

      {modal && (
        <div className='modal' onClick={toggleModal}>
          <div className='modal-content'>
            <div style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }} className='modal-img'>
              <h1>{movie.title}</h1>
            </div>
            <div className='modal-details'>
              <h2>Synopsis</h2>
              <p>{movie.overview}</p>
              <div className='modal-input'>
                <p>{movie.rating} <FontAwesomeIcon className='star' icon={faStar} /></p>
              </div>
            </div>
            <div className='modal-buttons'>
              <button className='add-button' onClick={handleAddClick}>Remove</button>
              <button className='close-button' onClick={toggleModal}>Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Movie
