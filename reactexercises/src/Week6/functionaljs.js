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
import FunctionalNonJSX from './Week6/functionalnonjsx'
ReactDOM.render(
    React.createElement(FunctionalNonJSX, {somedata: 'stuff for non jsx component'}), document.getElementById('root')
)