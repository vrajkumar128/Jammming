import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

export const SearchBar = props => {
  return (
    <div className="SearchBar">
      <input type="search" placeholder="Enter A Song, Album, or Artist" onkeypress={props.onKeyPress} />
      <a id="search">SEARCH</a>
    </div>
  );
};

SearchBar.propTypes = {
  onKeyPress: PropTypes.func.isRequired
}
