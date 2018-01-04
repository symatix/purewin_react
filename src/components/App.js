import React from 'react';
import Nav from './navigation/Nav';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

const App = (props) => {
    return(
        <div>
            <Nav content={<KeyboardArrowRight />}/>
        </div>
    )
}

export default App;