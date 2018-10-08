import React from 'react';
import PropTypes from 'prop-types';
import './TrackList.css';
import { Track } from '../Track/Track';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export class TrackList extends React.Component {
  state = {
    tracks: null
  }

  componentDidUpdate(nextProps) {
    if (nextProps !== this.props) {
      const { tracks } = this.props;
      this.setState({ tracks });
    }
  }

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const tracks = reorder(
      this.state.tracks,
      result.source.index,
      result.destination.index
    );

    this.setState({
      tracks
    });
  }

  render() {
    const { tracks } = this.state;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <ul className="TrackList">
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div ref={provided.innerRef}>
                {tracks && tracks.map((track, index) => (
                  <Draggable key={track.id} draggableId={track.id} index={index}>
                    {(provided, snapshot) => (
                        <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <li>
                          <Track
                            track={track}
                            onAdd={this.props.onAdd}
                            onRemove={this.props.onRemove}
                            isRemoval={this.props.isRemoval} 
                          />
                        </li>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </ul>
      </DragDropContext>
    );
  }
}

TrackList.propTypes = {
  tracks: PropTypes.array.isRequired,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  isRemoval: PropTypes.bool.isRequired
};
