import React from 'react';
import { Route } from 'react-router-dom';
import Landing from './Landing';
import Terms from './terms';
import NewTerm from './terms/NewTerm';
import NewSet from './terms/NewSet';
import Workflow from './workflow';
import Campaigns from './campaigns';
import NewCampaign from './campaigns/NewCampaign';
import ActiveCampaigns from './campaigns/ActiveCampaigns';
import Users from './users';

const Routes = (props) => {
    return (
        <div className="content">
            <Route exact path="/" component={Landing} />
            <Route exact path="/terms/overview" component={Terms} />
            <Route exact path="/terms/term" component={NewTerm} />
            <Route exact path="/terms/set" component={NewSet} />
            <Route exact path="/workflow" component={Workflow} />
            <Route exact path="/campaigns/overview" component={Campaigns} />
            <Route exact path="/campaigns/new" component={NewCampaign} />
            <Route exact path="/campaigns/active" component={ActiveCampaigns} />
            <Route exact path="/users" component={Users} />
        </div>
    );
}

export default Routes;