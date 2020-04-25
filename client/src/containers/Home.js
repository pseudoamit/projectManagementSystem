import React from 'react';
import { Redirect } from 'react-router-dom';
import Projects from './projects/Projects';

const Home = () => {
  if (localStorage.getItem('jwtToken') === null) {
    return <Redirect to='/login' />;
  }
  return (
    <div>
      <Projects />
    </div>
  );
};

export default Home;
