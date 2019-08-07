import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import TabelArtikel from './pages/TabelArtikel';
import Kelolaantrian from './pages/Kelolaantrian';
import DashMonik from './pages/DashMonik';
import TabelMonikTest from './pages/TabelMonikTest';
import InputPasienMonik from './pages/InputPasienMonik';
import InputDiagnosaObat from './pages/InputDiagObat';


class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={NotFoundPage} />
        {/*   <Route path='/dashboard' component={DashboardPage} /> */}


        {/* AntrianRoute */}
        <Route path='/kelolaantrian' exact component={Kelolaantrian} />

        {/* MonikRoute */}
        <Route path='/monik' component={DashMonik} />
        <Route path='/jadwalmonik' component={TabelMonikTest} />
        <Route path='/pasienmonik' component={InputPasienMonik} />
        <Route path='/inputdiagnosadanobat' component={InputDiagnosaObat}/>

        {/* ArtikelRoute */}
        <Route path='/artikel' component={TabelArtikel} />

        </Switch>
    );
  }
}

export default Routes;
