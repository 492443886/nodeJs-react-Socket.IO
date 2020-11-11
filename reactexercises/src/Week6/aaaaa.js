// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import FunctionalJSX from './Week6/functionaljsx'
ReactDOM.render(
    <FunctionalJSX somedata="stuff for jsx component in jsx" />,
    document.getElementById('root')
)