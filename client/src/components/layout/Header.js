import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import AdbIcon from '@material-ui/icons/Adb';
import { withStyles } from '@material-ui/core/styles';
import { logoutUser } from '../../store/actions/authActions';

class Header extends Component {
  clickLoginHandler = (jwtToken) => {
    if (jwtToken === null) {
      this.props.history.push('/login');
    } else {
      this.props.logoutUser(this.props.history);
    }
  };

  clickRegisterHandler = (jwtToken) => {
    if (jwtToken === null) {
      this.props.history.push('/register');
    } else {
      this.props.history.push('/home');
    }
  };

  render() {
    const { btnStyle } = this.props.classes;
    const jwtToken = localStorage.getItem('jwtToken');
    return (
      <div className='navbar-fixed  right-align'>
        <nav className='z-depth-0'>
          <div className='nav-wrapper white'>
            <Link
              to={jwtToken === null ? '/' : '/home'}
              style={{
                fontFamily: 'monospace',
              }}
              className='col s5 brand-logo center black-text'
            >
              <AdbIcon />
              JIRA
            </Link>
            <Button
              className={btnStyle}
              type='button'
              variant='contained'
              color='primary'
              onClick={() => this.clickLoginHandler(jwtToken)}
            >
              {jwtToken !== null ? 'Logout' : 'Login'}
            </Button>
            <Button
              className={btnStyle}
              type='button'
              variant='contained'
              color='primary'
              onClick={() => this.clickRegisterHandler(jwtToken)}
            >
              {jwtToken !== null ? 'Home' : 'Register'}
            </Button>
          </div>
        </nav>
      </div>
    );
  }
}
const styles = (theme) => ({
  btnStyle: {
    marginRight: '5px',
    marginLeft: '5px',
  },
});
export default connect(null, { logoutUser })(withStyles(styles)(Header));
