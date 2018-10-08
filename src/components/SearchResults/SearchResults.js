import React from 'react';
import PropTypes from 'prop-types';
import './SearchResults.css';
import { TrackList } from '../TrackList/TrackList';

export const SearchResults = props => {
  return (
    <div className="SearchResults">
      <h2>Search Results</h2>
      {props.searchResults.length > 0 && <span onClick={props.onClear}>Clear</span>}
      <div className="Results">
        <TrackList tracks={props.searchResults} onAdd={props.onAdd} isRemoval={false} />
      </div>
    </div>
  );
};

SearchResults.propTypes = {
  searchResults: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired
};
