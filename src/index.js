import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import { MuiThemeProvider } from 'material-ui/styles';
import theme from './styles/_theme';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App/>
    </MuiThemeProvider>
    , document.getElementById('root'));
registerServiceWorker();
