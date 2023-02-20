import React, { useState } from 'react';
import Header from '../components/Header';

function Search() {
  const [searchInput, setsearchInput] = useState('');
  const searchLengthMin = 2;

  const handleChange = ({ target }) => {
    setsearchInput(target.value);
  };

  return (
    <div data-testid="page-search">
      <Header />
      <form>
        <input onChange={ handleChange } data-testid="search-artist-input" type="text" />
        <button
          disabled={ searchInput.length < searchLengthMin }
          data-testid="search-artist-button"
          type="button"
        >
          Pesquisar
        </button>
      </form>
    </div>
  );
}

export default Search;
