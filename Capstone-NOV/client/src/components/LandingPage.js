import React from 'react';
import UserLogin from '../components/login/UserLogin';
import BackgroundImage from '../assets/bg-min.jpg';

const LandingPage = () => {
  const style = {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: 'cover',
    height: '100vh'
  };
  return (
    <div
      className="container-fluid d-flex justify-content-end align-items-center"
      style={style}
    >
      <UserLogin />
    </div>
  );
};

export default LandingPage;
