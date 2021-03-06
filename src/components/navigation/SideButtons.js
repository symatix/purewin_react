import React, { Component } from 'react';
import {withStyles} from 'material-ui/styles';
import { Link } from 'react-router-dom';
import Collapse from 'material-ui/transitions/Collapse';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import MoreVert from 'material-ui-icons/MoreVert';
import menuStyle from '../../styles/MenuButton';
import sideNavData from '../../config/sideNav_data';




class SideButtons extends Component {
    constructor(props){
        super(props);

        this.state = {};
    }

    componentWillMount(){
        // create state for all sub menus
        sideNavData.map(({ subKey }) => {
            if (subKey){
                this.setState({[subKey] : false});
                return null;
            }
            return null;
        })
    }

    renderSideNav(){
        const { classes } = this.props;
        const location = window.location.pathname;
        
        return sideNavData.map(({label, url, subKey, sub}) => {

            if (!subKey) {
                // if simple url button
                return (
                        <ListItem 
                            className={location === url? classes.active : ''} 
                            key={label} 
                            button 
                            component={Link} 
                            to={url}
                            >
                            <ListItemText primary={label} />
                        </ListItem>
                )
            } else {
                // if submenu
                return (
                    <div key={label}>
                        <ListItem 
                            button 
                            onClick={() => this.toggleSub(subKey)} 
                            >
                            <ListItemText primary={label}/>
                            <ListItemIcon>
                                <MoreVert/>
                            </ListItemIcon>
                        </ListItem>
                        <Collapse 
                            in={this.state[subKey]} 
                            transitionduration="auto" 
                            unmountOnExit
                            >
                            {sub.map(({label, url}, i) => {
                                return(
                                    <ListItem 
                                        className={location === url? classes.active : ''} 
                                        key={label+i} 
                                        button 
                                        component={Link} 
                                        to={url}
                                        >
                                        <ListItemText 
                                            secondary={label} 
                                            className={classes.subNav} 
                                            />
                                    </ListItem>
                                )
                            })}
                        </Collapse>
                    </div>
                )
            }
        })
    }


    toggleSub = sub => {
        this.setState({[sub]: !this.state[sub]})
    }


    render(){
        return (
            <div>
                {this.renderSideNav()}
            </div>
        )
    }
}


export default withStyles(menuStyle, {withTheme: true})(SideButtons);