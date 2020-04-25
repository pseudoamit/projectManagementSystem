import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Landing from './containers/Landing';
import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import Home from './containers/Home';
import Header from './components/layout/Header';
import { setInitialUser } from './store/actions/authActions';
import AddProject from './containers/projects/AddProject';
const Router = (props) => {
  props.setInitialUser();
  return (
    <BrowserRouter>
      <Route path='/' component={Header} />
      <Route exact path='/' component={Landing} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/add-project' component={AddProject} />
    </BrowserRouter>
  );
};

export default connect(null, { setInitialUser })(Router);
