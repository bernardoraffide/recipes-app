import React from 'react';
import PropTypes from 'prop-types';

function SearchRadioBtn({ label, searchType, setSearchOption }) {
  return (
    <label htmlFor={ `${searchType}-search-radio` }>
      <input
        data-testid={ `${searchType}-search-radio` }
        id={ `${searchType}-search-radio` }
        type="radio"
        name="radio-search"
        value={ searchType }
        onClick={ (e) => setSearchOption(e.target.value) }
      />
      {label}
    </label>
  );
}

SearchRadioBtn.propTypes = {
  label: PropTypes.string.isRequired,
  searchType: PropTypes.string.isRequired,
  setSearchOption: PropTypes.func.isRequired,
};

export default SearchRadioBtn;
