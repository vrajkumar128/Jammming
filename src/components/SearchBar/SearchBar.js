import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  // Search Spotify API with value entered into search bar
  search() {
    this.props.onSearch(this.state.searchInput);
  }

  // Update state to reflect search input
  handleTermChange(e) {
    this.setState({
      searchInput: e.target.value
    });
  }

  // Trigger search when user presses Enter
  handleKeyPress(e) {
    if (e.keyCode === 13) {
      document.getElementById('search').click();
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input type="search" placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyPress={this.onKeyPress} />
        <a id="search" onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired
}
