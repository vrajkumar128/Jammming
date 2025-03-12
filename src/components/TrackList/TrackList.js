import React from 'react';
import PropTypes from 'prop-types';
import './TrackList.css';
import { Track } from '../Track/Track';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export class TrackList extends React.Component {

  // Handle drag-and-drop
  onDragEnd = (result) => {
    if (!result.destination) { // Dropped outside the droppable area
      return;
    }

    if (this.props.onReorder && typeof this.props.onReorder === 'function') {
      this.props.onReorder(result.source.index, result.destination.index);
    }
  }

  render() {
    const tracks = this.props.tracks || [];

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <ul className="TrackList">
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tracks.map((track, index) => (
                  <Draggable
                    key={track.id}
                    draggableId={track.id}
                    index={index}
                    isDragDisabled={!this.props.onReorder}
                  >
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
                {provided.placeholder}
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
  onReorder: PropTypes.func,
  isRemoval: PropTypes.bool.isRequired
};