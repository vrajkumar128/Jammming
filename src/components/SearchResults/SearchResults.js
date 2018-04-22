import React from 'react';
import PropTypes from 'prop-types';
import './SearchResults.css';
import { TrackList } from '../TrackList/TrackList';

export const SearchResults = props => {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <TrackList tracks={props.searchResults} onAdd={props.onAdd} isRemoval={false}/>
    </div>
  );
};

SearchResults.propTypes = {
  searchResults: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired
};
