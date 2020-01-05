import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEventIdeas, eraseIdea } from '../../actions/event';
import EventIdea from './EventIdea';

export class EventIdeas extends Component {
  constructor(props) {
    super(props);
    this.onBackClick = this.onBackClick.bind(this);
  }
  componentDidMount() {
    this.props.getEventIdeas(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.eraseIdea();
  }
  onBackClick() {
    this.props.history.goBack();
  }
  render() {
    const { ideas, name } = this.props.event;
    const ideasNodes = ideas.map((idea, i) => {
      return (
        <div key={i} className="col-12 col-md-12 col-l-6 mb-3">
          <EventIdea idea={idea} />
        </div>
      );
    });

    return (
      <div className="container justify-content-center align-content-center">
        <h1 className="text-center mb-2" style={{ marginTop: '5vh' }}>
          Event Evaluation Page
        </h1>
        <h3 className="text-center mb-2">Ideas submited for event:</h3>
        <br />
        <h3 className="text-center mb-2">{name}</h3>
        <div
          className="container"
          style={{ maxWidth: '400px', marginTop: '50px' }}
        >
          {ideas.length > 0 ? (
            ideasNodes
          ) : (
            <p style={{ textAlign: 'center' }}>No ideas submitted yet...</p>
          )}
        </div>
        <div
          className="justify-content-start"
          style={{ marginTop: '5%', marginBottom: '2vh' }}
        >
          <button className="btn btn-dark" onClick={this.onBackClick}>
            Back
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  event: state.event
});

export default connect(
  mapStateToProps,
  { getEventIdeas, eraseIdea }
)(EventIdeas);
