import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import ExpansionPanel, {ExpansionPanelSummary, ExpansionPanelDetails} from 'material-ui/ExpansionPanel';
import Graph from './Graph';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

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
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={< ExpandMoreIcon />}>
                    <Typography type="headline" component="h3">
                        Workflow
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography type="body1">
                        &#8227; To add nodes, hold shift and click on the grid.<br/>
                        &#8227; To add connections, hold shift and click/drag to between nodes.<br/>
                        &#8227; To delete a node or connection, click on it and press delete.<br/>
                        &#8227; Click and drag nodes to change their position.
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <Graph/>
        </div>
    );
}

SimpleExpansionPanel.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleExpansionPanel);