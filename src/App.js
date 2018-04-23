import React from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar/SearchBar';
import { SearchResults } from './components/SearchResults/SearchResults';
import { Playlist } from './components/Playlist/Playlist';
import { Spotify } from './util/Spotify';

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
        name: "Empty Apartment",
        artist: "Yellowcard",
        album: "Ocean Avenue",
        id: 4
      }]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  // Update state to reflect adding a new track to playlist
  addTrack(track) {
    let playlistTracks = this.state.playlistTracks;
    if (playlistTracks.find(playlistTrack => playlistTrack.id === track.id)) {
      return;
    } else {
      playlistTracks.push(track);
      this.setState({
        playlistTracks: playlistTracks
      });
    }
  }

  // Update state to reflect removing a track from playlist
  removeTrack(track) {
    let filteredPlaylistTracks = this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id);
    this.setState({
      playlistTracks: filteredPlaylistTracks
    });
  }

  // Update state to reflect new playlist name
  updatePlaylistName(newName) {
    this.setState({
      playlistName: newName
    })
  }

  // Save playlist to Spotify account
  savePlaylist() {
    let trackUris = [];
    this.state.playlistTracks.forEach(track => {
      trackUris.push(track.uri);
    });
    return trackUris;
  }

  // Query the Spotify API and update state with results
  search(term) {
    let searchResults = Spotify.search(term);
    this.setState({
      searchResults: searchResults
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
