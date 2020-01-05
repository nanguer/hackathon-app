import React, { Component } from 'react';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { loginUserFb } from '../../actions/authentication';

export class FbLogin extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      name: '',
      email: '',
      picture: ''
    };
    this.responseFacebook = this.responseFacebook.bind(this);
    this.componentClicked = this.componentClicked.bind(this);
  }

  responseFacebook(response) {
    this.setState(
      {
        isLoggedIn: true,
        email: response.email,
        name: response.name,
        picture: response.picture.data.url
      },
      () => {
        const { name, email, picture } = this.state;
        const user = {
          name,
          email,
          picture
        };
        this.props.loginUserFb(user);
      }
    );
  }

  componentClicked() {
    console.log('clicked');
  }

  render() {
    let fbContent;
    if (this.state.isLoggedIn) {
      fbContent = null;
    } else {
      fbContent = (
        <FacebookLogin
          appId="775609699558412"
          autoLoad={false}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
          icon={'fab fa-facebook-f'}
          cssClass="btn btnFacebook"
          textButton="  Facebook"
        />
      );
    }
    return <div>{fbContent}</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUserFb }
)(FbLogin);
