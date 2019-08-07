import React from 'react';
import { Route, Switch,Redirect } from 'react-router-dom';
import DashMonik from './pages/DashMonik';
import TabelMonikTest from './pages/TabelMonikTest';
import InputPasienMonik from './pages/InputPasienMonik';
import InputDiagnosaObat from './pages/InputDiagObat';
import LoginPage from '../Login';
import NotFoundPage from './pages/NotFoundPage';

class RoutesAdmin extends React.Component {
  constructor(props){
    super(props);
    this.state ={
     token:''
    }
  }  


  render() {
    return (
       <Switch>
        <Redirect exact from='/' to='/monik'/>
        <Route exact path='/monik' component={DashMonik} />
        <Route path='/jadwalmonik' component={TabelMonikTest} />
        <Route path='/pasienmonik' component={InputPasienMonik} />
        <Route path='/inputdiagnosadanobat' component={InputDiagnosaObat}/>
        <Route component={NotFoundPage} />   
        <Route path='/' component={LoginPage} />
      </Switch>
    );
  }
}

export default RoutesAdmin;