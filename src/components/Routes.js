import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
// import ProfilePage from './pages/ProfilePage';
// import TablesPage from './pages/TablesPage';
// import MapsPage from './pages/MapsPage';
import NotFoundPage from './pages/NotFoundPage';
// import TabelMonik from './pages/TabelMonik';
import TabelArtikel from './pages/TabelArtikel';
// import Tabeltest from './pages/Tabeltest';
import Kelolaantrian from './pages/Kelolaantrian';
// import TabelMonikTest from './pages/TabelMonikTest';
// import Test from './pages/Test';
import DashMonik from './pages/DashMonik';
import TabelMonikTest from './pages/TabelMonikTest';
import InputPasienMonik from './pages/InputPasienMonik';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={NotFoundPage} />
        
        <Route path='/dashboard' component={DashboardPage} />

        <Route path='/kelolaantrian' exact component={Kelolaantrian} />


        <Route path='/monik' component={DashMonik} />
        <Route path='/jadwalmonik' component={TabelMonikTest} />
        <Route path='/pasienmonik' component={InputPasienMonik} />

        <Route path='/artikel' component={TabelArtikel} />
        
        
        <Route path='/maps' component={NotFoundPage} />
        <Route path='/404' component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;
