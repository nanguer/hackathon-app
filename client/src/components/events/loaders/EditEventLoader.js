import React from 'react';

class EditEventLoader extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      EditEvent: null
    };
  }

  componentDidMount() {
    import('../EditEvent').then(module => {
      this.setState({ EditEvent: module.default });
    });
  }

  render() {
    const { EditEvent } = this.state;

    return EditEvent ? <EditEvent {...this.props} /> : <div>Loading...</div>;
  }
}

export default EditEventLoader;
