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

    this.setState({ accessToken, user }, () => {
      if (!accessToken) {
        document.body.classList.add('disconnected');
      } else {
        document.body.classList.remove('disconnected');
      }
    });

    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    document.body.classList.remove('disconnected');
    window.removeEventListener('resize', this.handleResize);
  }

  // Handle switching between mobile and desktop views
  handleResize = () => {
    const isMobileView = window.innerWidth <= 1020;
    const wasInMobileView = this._lastViewportWidth && this._lastViewportWidth <= 1020;

    if (isMobileView !== wasInMobileView) {
      window.scrollTo(0, 0);

      if (isMobileView) {
        document.body.style.overflow = 'auto';
      } else {
        if (this.state.accessToken) {
          document.body.style.overflow = 'hidden';
        }
      }
    }

    this._lastViewportWidth = window.innerWidth;
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
    let playlistTracks = [...this.state.playlistTracks];

    if (!playlistTracks.find(playlistTrack => playlistTrack.id === track.id)) {
      playlistTracks.push(track);
      this.setState({
        playlistTracks: playlistTracks
      });
    }
  }

  // Update state to reflect removing a track from playlist
  removeTrack = (track) => {
    let filteredPlaylistTracks = this.state.playlistTracks.filter(
      playlistTrack => playlistTrack.id !== track.id
    );
    this.setState({
      playlistTracks: filteredPlaylistTracks
    });
  }

  // Handle track drag-and-drop reordering in playlist
  reorderPlaylistTracks = (startIndex, endIndex) => {
    const result = Array.from(this.state.playlistTracks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    this.setState({
      playlistTracks: result
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
    const appClassName = accessToken ? 'App connected' : 'App disconnected';

    return (
      <React.Fragment>
        <Header user={user} />
        <div className={appClassName}>
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
                    onReorder={this.reorderPlaylistTracks}
                  />
                </div>
              </div>
            )
          }
        </div>
      </React.Fragment>
    );
  }
}

export default App;