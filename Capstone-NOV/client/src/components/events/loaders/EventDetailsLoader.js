import React from 'react';

class EventDetails extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      EventDetails: null
    };
  }

  componentDidMount() {
    import('../EventDetails').then(module => {
      this.setState({ EventDetails: module.default });
    });
  }

  render() {
    const { EventDetails } = this.state;

    return EventDetails ? (
      <EventDetails {...this.props} />
    ) : (
      <div>Loading...</div>
    );
  }
}

export default EventDetails;
