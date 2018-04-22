import React from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar/SearchBar';
import { SearchResults } from './components/SearchResults/SearchResults';
import { Playlist } from './components/Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{
          name: "Breathing",
          artist: "Yellowcard",
          album: "Ocean Avenue",
          id: 2
        },
        {
          name: "Ocean Avenue",
          artist: "Yellowcard",
          album: "Ocean Avenue",
          id: 3
        }
      ],
      playlistName: "New Playlist",
      playlistTracks: [{
        name: "Miles Apart",
        artist: "Yellowcard",
        album: "Ocean Avenue",
        id: 4
      }]
    };
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
