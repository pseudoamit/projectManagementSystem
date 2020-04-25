import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import blue from '@material-ui/core/colors/blue';

import { getProject } from '../../store/actions/authActions';

class Projects extends Component {
  componentDidMount() {
    this.props.getProject(this.props.user.id);
  }

  renderProject = (project) => {
    const { classes } = this.props;
    return (
      <Grid key={project._id} item xs={3}>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color='textSecondary'
              gutterBottom
            >
              {project.title}
            </Typography>
            <Typography
              className={classes.title}
              color='textSecondary'
              gutterBottom
            >
              {project.description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={3} className={classes.grid}>
          {this.props.user.projects.map(this.renderProject)}
        </Grid>
        <div className={classes.float}>
          <Fab color='primary' aria-label='add'>
            <Link to='/add-project'>
              <AddIcon />
            </Link>
          </Fab>
        </div>
      </div>
    );
  }
}

const bgColor = blue[300];

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
    fontSize: 14,
  },
  float: {
    marginTop: '10px',
    textAlign: 'right',
  },
  grid: {
    marginTop: '15px',
  },
  card: {
    background: bgColor,
  },
});
function mapStateToProps({ auth }) {
  return auth;
}
export default connect(mapStateToProps, { getProject })(
  withStyles(styles)(Projects)
);
