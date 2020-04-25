import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { addProject } from '../../store/actions/authActions';

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const userId = this.props.user.id;
    const { title, description } = this.state;
    const projectDetails = { title, description, userId };
    this.props.addProject(projectDetails, this.props.history);
  };
  render() {
    const { classes } = this.props;
    return (
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={this.handleSubmit}
      >
        <div>
          <TextField
            id='standard-search'
            name='title'
            label='Project Title'
            type='search'
            value={this.state.title}
            onChange={this.handleChange}
          />
        </div>
        <div className={classes.description}>
          <TextField
            id='outlined-multiline-static'
            name='description'
            label='Description'
            multiline
            rows={4}
            variant='outlined'
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            size='large'
            className={classes.button}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </div>
      </form>
    );
  }
}

const styles = (theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    textAlign: 'center',
  },
  description: {
    marginTop: '15px',
    marginBottom: '10px',
  },
  button: {
    margin: theme.spacing(1),
  },
});

function mapStateToProps({ auth }) {
  return auth;
}
export default connect(mapStateToProps, { addProject })(
  withStyles(styles)(AddProject)
);
