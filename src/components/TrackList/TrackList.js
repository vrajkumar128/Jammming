import React from 'react';
import PropTypes from 'prop-types';
import './TrackList.css';
import { Track } from '../Track/Track';
import { DragDropContext } from 'react-beautiful-dnd';

export class TrackList extends React.Component {
  onDragEnd = () => {
    // the only one that is required
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <ul className="TrackList">
          <li>{this.props.tracks.map(track => <Track
            track={track}
            key={track.id}
            onAdd={this.props.onAdd}
            onRemove={this.props.onRemove}
            isRemoval={this.props.isRemoval} />)}</li>
        </ul>
      </DragDropContext>
    );
  }
};

TrackList.propTypes = {
  tracks: PropTypes.array.isRequired,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  isRemoval: PropTypes.bool.isRequired
};
