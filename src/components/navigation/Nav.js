import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import NavButtons from './NavButtons';
import SearchInput from './SearchInput';
import SideNav from './SideNav';
import navStyle from '../../styles/Nav';

class Navigation extends React.Component {
    state = {
        open: false,
        anchorEl: null,
        anchorOpen: false,
    };

    toggleDrawer = () => this.setState({open: !this.state.open});

    menuOpen = event => this.setState({ anchorOpen: true, anchorEl: event.currentTarget });
    
    menuClose = () => this.setState({ anchorOpen: false });

    render() {
        const {classes, content} = this.props;
        const {open} = this.state;

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar
                        color="default"
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: open,
                            [classes[`appBarShift-left`]]: open})}>
                        <Toolbar disableGutters={!open}>
                            <IconButton
                                color="default"
                                aria-label="open drawer"
                                onClick={this.toggleDrawer}
                                className={classNames(classes.menuButton)}>
                                <MenuIcon/>
                            </IconButton>
                            <Typography type="title" color="inherit" className={classes.flex}>
                            </Typography>
                            <SearchInput />
                            <NavButtons />
                        </Toolbar>
                    </AppBar>
                    <SideNav open={open} />
                    <main className={classNames(classes.content, classes[`content-left`], {
                        [classes.contentShift]: open,
                        [classes[`contentShift-left`]]: open})}>
                        <div>
                            {content}
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(navStyle, {withTheme: true})(Navigation);