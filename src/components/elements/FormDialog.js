import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {DialogActions, DialogContent} from 'material-ui/Dialog';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    form:{
        width:240
    },
    textField: {
        width: 240
    },
    menu: {
        width: 200
    }
});

class FormDialog extends React.Component {
    state = {
        open: false,
        title: '',
        node:''
    };

    handleClose = () => {
        this.setState({title: '', node: ''})
        this.props.newNode(false, false, true);
    };

    handleAdd = () => {
        const { title, node } = this.state;
        this.setState({title: '', node: ''})
        this.props.newNode(title, node);
    };
    handleChange = name => event => {
        this.setState({[name]:event.target.value})
      };

    render() {
        const { classes } = this.props;
        return (
            <Dialog
                className={classes.container}
                open={this.props.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title">
                <DialogContent className={classes.form}>
                    <TextField
                        value={this.state.title}
                        onChange={e => this.setState({title: e.target.value})}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Node Title"
                        type="text"
                        fullWidth/>
                    <TextField
                        className={classes.textField}
                        id="select-node"
                        select
                        label="Node Type"
                        value={this.state.node}
                        onChange={this.handleChange('node')}
                        SelectProps={{
                            MenuProps: {
                            className: classes.menu,
                            },
                        }}
                        >
                            <MenuItem value="node">Simple Node</MenuItem>
                            <MenuItem value="logic">Logic Node</MenuItem>
                        </TextField>

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleAdd} color="primary">
                        Add Node
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

FormDialog.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(FormDialog);