import React from 'react';
import { Route, Switch,Redirect } from 'react-router-dom';
import Kelolaantrian from './pages/Kelolaantrian';
import LoginPage from '../Login';
import NotFoundPage from './pages/NotFoundPage';
class RoutesPuskesmas extends React.Component {
  constructor(props){
    super(props);
    this.state ={
     token:'',
    }
  }  


  render() {
    return (
       <Switch>
        <Redirect exact from='/' to='/kelolaantrian'/>
        <Route exact path='/kelolaantrian' component={()=> <Kelolaantrian ipus={this.props.idpuskes}/>}/> 
        <Route component={NotFoundPage} />   
        <Route path='/' component={LoginPage} />
        
      </Switch>
    );
  }
}

export default RoutesPuskesmas;