import React from 'react'

const SearchBar = () => {
  return (
    <div id='search-bar'>
      <input type="text" id='search' name='search' placeholder='MOVIE NAME' />
      <button>Add</button>
    </div>
  )
}

export default SearchBar