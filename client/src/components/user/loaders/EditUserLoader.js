import React from 'react';

class EditUserLoader extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      EditUser: null
    };
  }

  componentDidMount() {
    import('../EditUser').then(module => {
      this.setState({ EditUser: module.default });
    });
  }

  render() {
    const { EditUser } = this.state;

    return EditUser ? <EditUser {...this.props} /> : <div>Loading...</div>;
  }
}

export default EditUserLoader;
