import React from 'react';

class AddEventLoader extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      AddEvent: null
    };
  }

  componentDidMount() {
    import('../AddEvent').then(module => {
      this.setState({ AddEvent: module.default });
    });
  }

  render() {
    const { AddEvent } = this.state;

    return AddEvent ? <AddEvent {...this.props} /> : <div>Loading...</div>;
  }
}

export default AddEventLoader;
