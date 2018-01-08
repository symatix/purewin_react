import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Graph from './Graph';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        width: '100%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    }
});

function SimpleExpansionPanel(props) {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <Graph/>
        </div>
    );
}

SimpleExpansionPanel.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleExpansionPanel);