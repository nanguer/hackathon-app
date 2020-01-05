import React from 'react';
import Event from './Event';

export default class EventList extends React.Component {


  render() {
    var eventNodes = this.props.events.map((event, i) => (
      <Event
        key={i}
        id={event._id}
        title={event.title}
        // description={event.description}
        status={event.status}
        startDate={event.startDate}
        endDate={event.endDate}
        location={event.location}
      />
    ));
    return (
      <div>
        <table className="table table-borderless">
          <thead>
            <tr>
              <th>Title</th>
              {/* <th>Description</th> */}
              <th>Status</th>
              {/* <th>Start Date</th>
              <th>End Date</th> */}
              <th>Location</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {eventNodes}
          </tbody>
        </table>
      </div>
    );
  }
}
