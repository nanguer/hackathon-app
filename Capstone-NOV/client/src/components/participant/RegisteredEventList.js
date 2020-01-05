import React from 'react';
import RegisterdEvent from './RegisterdEvent';

export default class RegisteredEventList extends React.Component {
  render() {
    var eventNodes = this.props.events.map((event, i) => (
      <RegisterdEvent
        key={i}
        id={event._id}
        eventName={event.event.title}
        teamName={event.teamName}
        teamSize={event.teamSize}
        ideaSubject={event.ideaSubject}
        ideaSummary={event.ideaSummary}
        participant={event.participant}
      />
    ));
    return (
      <div>
        <table className="table table-borderless">
          <thead>
            <tr>
              <th>Event</th>
              <th>Team Name</th>
              <th>Team Size</th>
              <th>Idea</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{eventNodes}</tbody>
        </table>
      </div>
    );
  }
}
