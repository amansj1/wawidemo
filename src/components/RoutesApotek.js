import React from 'react';
import { Route, Switch,Redirect } from 'react-router-dom';
import DashApotek from './pages/DashApotek';
import InputObat from './pages/InputObat';
import AntriApotek from './pages/AntrinApotek';
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
        <Redirect exact from='/' to='/apotek'/>
        <Route exact path='/apotek' component={DashApotek} />
        <Route path='/inputobat' component={()=> <InputObat id_pengguna={this.props.id_pengguna}/>} />
        <Route path='/apotekantri' component={()=><AntriApotek id_pengguna={this.props.id_pengguna} />}/>
        <Route component={NotFoundPage} />   
        <Route path='/' component={LoginPage} />
      </Switch>
    );
  }
}

export default RoutesAdmin;