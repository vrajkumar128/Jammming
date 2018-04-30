import React from 'react';
import PropTypes from 'prop-types';
import './Playlist.css';
import { TrackList } from '../TrackList/TrackList';

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  // Update parent's state with new playlist name
  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input type="text"
          value={this.props.playlistName}
          placeholder={this.props.playlistPlaceholder}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          onChange={this.handleChange}
        />
        <div className="Playlist-tracks">
            <TrackList
              tracks={this.props.playlistTracks}
              onRemove={this.props.onRemove}
              isRemoval={true}
            />
        </div>
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

Playlist.propTypes = {
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  playlistName: PropTypes.string.isRequired,
  playlistTracks: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}
