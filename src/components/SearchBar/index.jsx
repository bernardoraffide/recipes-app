import React, { useState } from 'react';

import { useSearch } from '../../context/SearchBarContext';

import SearchRadioBtn from '../SearchRadioBtn';

import './SearchBar.css';

function SearchBar() {
  const { handleSearch } = useSearch();
  const [searchTerm, setSearchTerm] = useState();
  const [searchOption, setSearchOption] = useState();

  return (
    <div className="search-bar-inputs">
      <input
        className="text-input"
        data-testid="search-input"
        type="text "
        placeholder="Buscar receita"
        onChange={ (e) => setSearchTerm(e.target.value) }
      />
      <div className="radio-btns">
        <SearchRadioBtn
          label="Ingrediente"
          searchType="ingredient"
          setSearchOption={ setSearchOption }
        />
        <SearchRadioBtn
          label="Nome"
          searchType="name"
          setSearchOption={ setSearchOption }
        />
        <SearchRadioBtn
          label="Primeira letra"
          searchType="first-letter"
          setSearchOption={ setSearchOption }
        />
      </div>
      <button
        className="search-btn"
        data-testid="exec-search-btn"
        type="button"
        onClick={ () => handleSearch(searchTerm, searchOption) }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
