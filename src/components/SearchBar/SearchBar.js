import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  // Update parent's state with new search input
  handleTermChange(e) {
    this.props.onChange(e.target.value);
  }

  // Query Spotify API with value entered into search bar
  search() {
    this.props.onSearch(this.props.searchInput);
  }

  // Trigger search when user presses Enter
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      document.getElementById('search').click();
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input type="search"
          value={this.props.searchInput}
          placeholder={this.props.searchPlaceholder}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onChange={this.handleTermChange}
          onKeyPress={this.handleKeyPress}
        />
        <a id="search" onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,
  searchPlaceholder: PropTypes.string.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
}
