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
import DashApotek from './pages/DashApotek';
import InputObat from './pages/InputObat';
import AntriApotek from './pages/AntrinApotek';


class Routes extends React.Component {
constructor(props){
  super(props)
  this.state=({
    judul:''
  })
}



  render()
  
   {console.log(this.state.judul);
    return (
      <Switch>
        <Route path='/' exact component={NotFoundPage}/>
        {/*   <Route path='/dashboard' component={DashboardPage} /> */}


        {/* AntrianRoute */}
        <Route exact path='/kelolaantrian' component={()=> <Kelolaantrian ipus={this.props.id_pengguna}/>}/> 

        {/* MonikRoute */}
        <Route path='/monik' component={DashMonik} />
        <Route path='/jadwalmonik' component={TabelMonikTest} />
        <Route path='/pasienmonik' component={InputPasienMonik} />
        <Route path='/inputdiagnosadanobat' component={InputDiagnosaObat}/>

        {/* ArtikelRoute */}
        <Route path='/artikel' component={()=> <TabelArtikel id_pengguna={this.props.id_pengguna}/>} />

        {/* Apotek */}
        <Route path='/apotek' component={DashApotek} />
        <Route path='/inputobat' component={()=> <InputObat id_pengguna={this.props.id_pengguna}/>} />
        <Route path='/apotekantri' component={()=><AntriApotek id_pengguna={this.props.id_pengguna} />}/>
        </Switch>
    );
  }
}

export default Routes;
