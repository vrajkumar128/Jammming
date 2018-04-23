import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: ''
    }
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search() {
    this.props.onSearch(this.state.searchInput);
  }

  // Updates state to reflect search input
  handleTermChange(e) {
    this.setState(e.target.value);
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
