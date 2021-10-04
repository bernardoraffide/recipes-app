import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import { useSearch } from '../../context';

import SearchIcon from '../SearchIcon/SearchIcon';
import SearchBar from '../SearchBar';

import profileIcon from '../../images/profileIcon.svg';

import './Header.css';

function Header({ pageTitle, showSearchIcon }) {
  const history = useHistory();
  const { toggleSearchBar, isOpen } = useSearch();

  return (
    <section>
      <header className="header">
        <button type="button" onClick={ () => history.push('/perfil') }>
          <img src={ profileIcon } data-testid="profile-top-btn" alt="profile-icon" />
        </button>
        <h1 data-testid="page-title" className="page-header">{pageTitle}</h1>
        {showSearchIcon && <SearchIcon onClick={ toggleSearchBar } />}
      </header>
      {isOpen && showSearchIcon && <SearchBar />}
    </section>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  showSearchIcon: PropTypes.bool.isRequired,
};

export default Header;
