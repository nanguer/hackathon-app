import React from 'react';

class AddUserLoader extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      AddUser: null
    };
  }

  componentDidMount() {
    import('../AddUser').then(module => {
      this.setState({ AddUser: module.default });
    });
  }

  render() {
    const { AddUser } = this.state;

    return AddUser ? <AddUser {...this.props} /> : <div>Loading...</div>;
  }
}

export default AddUserLoader;
