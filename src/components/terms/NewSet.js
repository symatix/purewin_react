import React from 'react';
import Grid from 'material-ui/Grid';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';


const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
});

const NewSet = (props) => {
  const { classes } = props;
  return (
      <Grid container justify="center" direction="row">  
        <Grid item xs={11} md={11} lg={11}>
          <Paper className={classes.root} elevation={4}>
            <Typography type="headline" component="h3">
              New Set
            </Typography>
          </Paper>
        </Grid>
      </Grid>
  )
}

NewSet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewSet);