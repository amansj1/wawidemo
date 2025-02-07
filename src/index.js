import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';
// import App from './App';
import Login from './Login';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter  } from 'react-router-dom';


ReactDOM.render(<BrowserRouter><Login /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
