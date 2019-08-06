import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TabelArtikel from './pages/TabelArtikel';
import Kelolaantrian from './pages/Kelolaantrian';
import DashMonik from './pages/DashMonik';
import TabelMonikTest from './pages/TabelMonikTest';
import InputPasienMonik from './pages/InputPasienMonik';

class RoutesLogin extends React.Component {
  constructor(props){
    super(props);
    this.state ={
     token:'',
     redirectToReferrer: false,

    }
  }  


  render() {
    return (
   
       <Switch>
        <Route path='/kelolaantrian' exact component={Kelolaantrian} />
     
 ]
        <Route path='/monik' component={DashMonik} />
        <Route path='/jadwalmonik' component={TabelMonikTest} />
        <Route path='/pasienmonik' component={InputPasienMonik} />
 
        <Route path='/artikel' component={TabelArtikel} />
      </Switch>


    );
  }
}

export default RoutesLogin;