import React, { Component } from 'react';
import Routes from './components/Routes';
import TopNavigation from './components/topNavigation';
import SideNavigation from './components/sideNavigation';
import Footer from './components/Footer';
import './index.css';
import './App.css';

class App extends Component {
  
  render() {
    return (
        <div className="flexible-content">
          <TopNavigation />
          <SideNavigation />
          <main id="content" className="p-5">
            <Routes />
          </main>
          {/* <div className="foot"><Footer /></div> */}
          
        </div>
    );
  }
}

export default App;
