import React from 'react';
import PropTypes from 'prop-types';
import './TrackList.css';
import { Track } from '../Track/Track';

export const TrackList = props => {
  return (
    <div className="TrackList">
      {props.tracks.map(track => <Track track={track} key={track.id} />)}
    </div>
  );
};

TrackList.propTypes = {
  tracks: PropTypes.array.isRequired
};
