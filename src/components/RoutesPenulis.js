import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import TabelArtikel from './pages/TabelArtikel';
import LoginPage from '../Login';
import NotFoundPage from './pages/NotFoundPage';

class RoutesPenulis extends React.Component {
  constructor(props){
    super(props);
    this.state ={
     token:''
    }
  }  


  render() {
    return (
       <Switch>
        
       <Redirect exact from='/' to='/artikel'/>
       <Route exact path='/artikel' component={()=> <TabelArtikel id_pengguna={this.props.id_pengguna}/>} />     
       <Route component={NotFoundPage} />          
       <Route path='/' component={LoginPage} />
        
      </Switch>
    );
  }
}

export default RoutesPenulis;