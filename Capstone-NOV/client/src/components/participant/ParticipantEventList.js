import React from 'react';
import ParticipantEvent from './ParticipantEvent';

export default class ParticipantEventList extends React.Component {
  render() {
    const { participant } = this.props;

    var eventNodes = this.props.events.map((event, i) => {
      return (
        <ParticipantEvent
          key={i}
          id={event._id}
          title={event.title}
          status={event.status}
          startDate={event.startDate}
          endDate={event.endDate}
          location={event.location}
          participant={participant}
          teams={event.teams}
          usersId={event.participants}
        />
      );
    });
    return (
      <div>
        <table className="table table-borderless">
          <thead>
            <tr>
              <th>Title</th>

              <th>Status</th>

              <th>Location</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{eventNodes}</tbody>
        </table>
      </div>
    );
  }
}
