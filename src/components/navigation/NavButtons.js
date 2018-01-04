import React from 'react';
import IconButton from 'material-ui/IconButton';
import Menu, {MenuItem} from 'material-ui/Menu';
import Notifications from 'material-ui-icons/Notifications';
import PowerSettingsNew from 'material-ui-icons/PowerSettingsNew';
import Settings from 'material-ui-icons/Settings';
import Person from 'material-ui-icons/Person';
import Divider from 'material-ui/Divider';

const ITEM_HEIGHT = 48;

class NavButton extends React.Component {
    state = {
        account: null
    };

    handleAccountOpen = event => this.setState({account: event.currentTarget});

    handleAccountClose = () => this.setState({account: null});

    render() {
        const open = Boolean(this.state.account);

        return (
            <div>
                <IconButton
                    aria-label="Account"
                    aria-owns={open
                    ? 'account-menu'
                    : null}
                    aria-haspopup="true"
                    onClick={this.handleAccountOpen}>
                    <Person/>
                </IconButton>
                <Menu
                    id="account-menu"
                    anchorEl={this.state.account}
                    open={open}
                    onClose={this.handleAccountClose}
                    PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 200
                    }
                }}>
                    <MenuItem style={{display: "none"}} /> {/* <-this is a workaround for autoselect on open*/}
                    <MenuItem onClick={this.handleAccountClose}>
                        <Notifications/>&emsp;Notifications
                    </MenuItem>
                    <MenuItem onClick={this.handleAccountClose}>
                        <Settings/>&emsp;Profile
                    </MenuItem>
                    <Divider light />
                    <MenuItem onClick={this.handleAccountClose}>
                        <PowerSettingsNew/>&emsp;Sign Out
                    </MenuItem>
                </Menu>

            </div>
        );
    }
}

export default NavButton;