import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import BottomNavigation from 'material-ui/BottomNavigation';
import BottomNavigationButton from 'material-ui/BottomNavigation/BottomNavigationButton';
import AlertDialog from '../elements/AlertDialog';
import Close from 'material-ui-icons/Close';
import Add from 'material-ui-icons/Add';
import ZoomIn from 'material-ui-icons/ZoomIn';
import ZoomOut from 'material-ui-icons/ZoomOut';
import ZoomOutMap from 'material-ui-icons/ZoomOutMap';
import HelpOutline from 'material-ui-icons/HelpOutline';

const styles = {
  root: {
        position:'absolute',
        bottom:0,
        zIndex:100,
        width: 500,
        left:"50% !important",
        transform:"translateX(-50%)"
  },
};

class GraphToolbar extends Component {
  state = {
    value: false,
    help: false,
  };

  handleChange = (event, value) => {
    this.setState({ value });
    setTimeout(()=>{
        this.setState({value:false})
    }, 350);
  };

  handleHelp = () => {
      this.setState({help:!this.state.help});
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        showLabels
        className={classes.root}>
        <BottomNavigationButton onClick={this.props.addNew} label="Add" icon={<Add />} />
        <BottomNavigationButton onClick={this.props.deleteElement} label="Delete" icon={<Close />} />
        <BottomNavigationButton label="Zoom In" icon={<ZoomIn />} />
        <BottomNavigationButton label="Zoom Out" icon={<ZoomOut />} />
        <BottomNavigationButton onclick={this.props.zoomToFit} label="Center" icon={<ZoomOutMap />} />
        <BottomNavigationButton onClick={this.handleHelp} label="Help" icon={<HelpOutline />} />
        <AlertDialog 
            open={this.state.help}
            title="Workflow Help" 
            closeHelp={this.handleHelp.bind(this)}
            text={`To add nodes, hold shift and click on the grid. 
                For connections, hold shift and click and drag between nodes. 
                To delete a node or connection, click on it and press delete. 
                Click and drag nodes to change their position.`} />
      </BottomNavigation>
    );
  }
}

GraphToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GraphToolbar);