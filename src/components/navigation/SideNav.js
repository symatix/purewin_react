import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import SideButtons from './SideButtons';
import sideNavStyle from '../../styles/SideNav';

const SideNav = (props) => {
    const {classes, open} = props;
    return (
        <Drawer
            type="persistent"
            classes={{paper: classes.drawerPaper}}
            anchor='left'
            open={open}>
            <div className={classes.drawerInner}>
                <div className={classes.drawerHeader}>
                    <Typography type="headline">
                        PureWin
                    </Typography>
                </div>
                <Divider/>
                <List className={classes.list}>
                    <SideButtons />
                </List>
            </div>
        </Drawer>
    )
}

SideNav.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(sideNavStyle, {withTheme: true})(SideNav);