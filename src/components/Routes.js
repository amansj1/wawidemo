import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
// import ProfilePage from './pages/ProfilePage';
// import TablesPage from './pages/TablesPage';
// import MapsPage from './pages/MapsPage';
import NotFoundPage from './pages/NotFoundPage';
import TabelMonik from './pages/TabelMonik';
import TabelArtikel from './pages/TabelArtikel';
import Tabeltest from './pages/Tabeltest';
import PageAntrian from './pages/PageAntrian';
// import Test from './pages/Test';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={Tabeltest} />
        <Route path='/PageAntrian' exact component={PageAntrian} />
        <Route path='/dashboard' component={DashboardPage} />
        <Route path='/Monik' component={TabelMonik} />
        <Route path='/artikel' component={TabelArtikel} />
        <Route path='/maps' component={NotFoundPage} />
        <Route path='/404' component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;
