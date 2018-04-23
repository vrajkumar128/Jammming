import React from 'react';
import PropTypes from 'prop-types';
import './Track.css';

export class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  // Add track to playlist
  addTrack() {
    this.props.onAdd(this.props.track);
  }

  // Remove track from playlist
  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  // Use isRemoval prop to determine whether to render a + or -
  plusMinus() {
    return this.props.isRemoval ? <a className="Track-action" onClick={this.removeTrack}>-</a> : <a className="Track-action" onClick={this.addTrack}>+</a>;
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.plusMinus()}
      </div>
    );
  }
}

Track.propTypes = {
  track: PropTypes.object.isRequired,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  isRemoval: PropTypes.bool.isRequired
};
