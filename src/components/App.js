import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Nav from './navigation/Nav';
import Routes from './Routes';

const App = (props) => {
    return(
        <div>
            <BrowserRouter className="App">
                <Nav content={<Routes />}/>
            </BrowserRouter>
        </div>
    )
}

export default App;