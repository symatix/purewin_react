import React, { Component } from 'react';
import {withStyles} from 'material-ui/styles';
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

        return sideNavData.map(({label, url, subKey, sub}) => {

            if (!subKey) {
                // if simple url button
                return (
                    <ListItem key={label} button>
                        <ListItemText className={classes.menuStyle} primary={label}/>
                    </ListItem>
                )
            } else {
                // if submenu
                return (
                    <div key={label}>
                        <ListItem button onClick={() => this.toggleSub(subKey)} >
                            <ListItemText primary={label}/>
                            <ListItemIcon>
                                <MoreVert/>
                            </ListItemIcon>
                        </ListItem>
                        <Collapse in={this.state[subKey]} transitionduration="auto" unmountOnExit>
                            {sub.map(({label}, i) => {
                                return(
                                    <ListItem key={label+i} button>
                                        <ListItemText secondary={label} className={classes.subNav} />
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