import React from 'react';
import PropTypes from 'prop-types';
import './Playlist.css';
import { TrackList } from '../TrackList/TrackList';

export const Playlist = props => {
  return (
    <div className="Playlist">
      <input value="New Playlist" />
      <TrackList tracks={props.playlistTracks}/>
      <a className="Playlist-save">SAVE TO SPOTIFY</a>
    </div>
  );
};

Playlist.propTypes = {
  tracks: PropTypes.array.isRequired
}
