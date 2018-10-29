import React from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar/SearchBar';
import { SearchResults } from './components/SearchResults/SearchResults';
import { Playlist } from './components/Playlist/Playlist';
import { Spotify } from './util/Spotify';
import Header from './components/Header/Header';

class App extends React.PureComponent {
  state = {
    searchPlaceholder: "Enter A Song, Album, or Artist",
    searchInput: '',
    searchResults: [],
    playlistNamePlaceholder: "Playlist name",
    playlistName: "",
    playlistTracks: [],
    accessToken: null,
    user: null,
    loading: true
  }

  // Retrieve Spotify access token and user info
  async componentDidMount() {
    const [accessToken, user] = await Promise.all([
      Spotify.getAccessToken(),
      Spotify.getUserInfo()
    ]);

    this.setState({ accessToken, user });
  }

  // Update state to reflect search input
  updateSearchInput = (newInput) => {
    this.setState({
      searchInput: newInput
    });
  }

  // Query the Spotify API and update state with results
  search = async (term) => {
    this.setState({
      searchResults: []
    });

    let searchResults = await Spotify.search(term);
    console.log(searchResults);
    this.setState({
      searchResults: searchResults
    });
  }

  // Update state to reflect adding a new track to playlist
  addTrack = (track) => {
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
  removeTrack = (track) => {
    let filteredPlaylistTracks = this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id);
    this.setState({
      playlistTracks: filteredPlaylistTracks
    });
  }

  // Update state to reflect clearing search results
  clearSearchResults = () => {
    this.setState({
      searchResults: [],
      searchInput: ''
    });
  }

  // Update state to reflect focusing playlist name field
  clearPlaylistNamePlaceholder = () => {
    this.setState({
      playlistNamePlaceholder: ""
    });
  }

  // Update state to reflect blurring playlist name field
  restorePlaylistNamePlaceholder = () => {
    this.setState({
      playlistNamePlaceholder: "Playlist name"
    });
  }

  // Update state to reflect new playlist name
  updatePlaylistName = (newName) => {
    this.setState({
      playlistName: newName
    });
  }

  // Save playlist to Spotify account and reset state
  savePlaylist = () => {
    let trackUris = [];
    this.state.playlistTracks.forEach(track => {
      trackUris.push(track.uri);
    });
    if (!this.state.playlistName.length) {
      Spotify.savePlaylist("New Playlist", trackUris);
      this.setState({
        searchInput: '',
        searchResults: [],
        playlistTracks: []
      });
    } else {
      Spotify.savePlaylist(this.state.playlistName, trackUris);
      this.setState({
        searchInput: '',
        searchResults: [],
        playlistName: "",
        playlistTracks: []
      });
    }
  }

  render() {
    const { accessToken, user } = this.state;

    return (
      <div>
        <Header user={user} />
        <div className="App">
          {!accessToken
            ? <a className="Connect" role="button" onClick={() => Spotify.connect()}>CONNECT TO SPOTIFY</a>
            : (
                <div>
                  <SearchBar
                    searchPlaceholder={this.state.searchPlaceholder}
                    searchInput={this.state.searchInput}
                    onChange={this.updateSearchInput}
                    onSearch={this.search}
                  />
                  <div className="App-playlist">
                    <SearchResults
                      searchResults={this.state.searchResults}
                      onClear={this.clearSearchResults}
                      onAdd={this.addTrack}
                    />
                    <Playlist
                      playlistPlaceholder={this.state.playlistNamePlaceholder}
                      onFocus={this.clearPlaylistNamePlaceholder}
                      onBlur={this.restorePlaylistNamePlaceholder}
                      playlistName={this.state.playlistName}
                      onChange={this.updatePlaylistName}
                      playlistTracks={this.state.playlistTracks}
                      onRemove={this.removeTrack}
                      onSave={this.savePlaylist}
                    />
                  </div>
                </div>
              )
            }
        </div>
      </div>
    );
  }
}

export default App;
