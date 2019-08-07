import React from 'react';
import { Button} from 'reactstrap';
import logo from "./assets/Logo.jpg";
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import axios from 'axios';
import TopNavigation from './components/topNavigation';
// import SideNavigation from './components/sideNavigation';
import SideNavPuskesmas from './components/sideNavPuskesmas';
import SideNavAdmin from './components/sideNavAdmin';
import SideNavPenulis from './components/sideNavPenulis';

// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Redirect,
//   withRouter
// } from 'react-router-dom';
// import App from './App';
import RoutesPuskesmas from './components/RoutesPuskesmas';
import RoutesAdmin from './components/RoutesAdmin';
import RoutesPenulis from './components/RoutesPenulis';

// import Footer from './components/Footer';
import './index.css';
import './App.css';
import './Login.css';



class Login extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      //variable untuk diisi
     email:'',
     pass:'',
     provider:'',
     token:'',
     nama:'',
     id_pengguna:'',
     redirectToReferrer: false,
     loading: false
    }
  }
  
    handleChangeAdd = event =>{
      this.setState({
        [event.target.name]: event.target.value
    })
    };
    handleSubmitLogin (e){
      e.preventDefault();
      this.setState({
        loading:true
      })
      const apiurl = 'https://zav-wawi.herokuapp.com/api/login'
      const put ={
        email : this.state.email,
        password : this.state.pass,
        provider : this.state.provider,
        device_id: ""
      };
      axios.post(apiurl, put)
      .then(res => {
        console.log(res.data);
        if(this.state.provider==='puskesmases'){
          this.setState({
            token:res.data.access_token,
            nama:res.data.login_data.nama_puskesmas,
            id_pengguna:res.data.login_data.id_mst_puskesmas,
            redirectToReferrer: true,
            loading:false
          });

        }else if(this.state.provider==='admins'){
          this.setState({
            token:res.data.access_token,
            nama:res.data.login_data.name,
            redirectToReferrer: true,
            loading:false
          });

        }else if (this.state.provider==='penulises'){
          this.setState({
            token:res.data.access_token,
            nama:res.data.login_data.name,
            id_pengguna:res.data.login_data.id,
            redirectToReferrer: true,
            loading:false
          });

        }else{

        }
       
   
      }).catch(error =>{
        alert('Masukan email, password dan provider yang sesuai..',error);
        this.setState({
        
          loading:false
        });
        
      })       
    }
    handleLogoutChange = (newvalue)=>{
      this.setState({
        email:'',
        pass:'',
        provider:'',
        token:'',
        nama:'',
        redirectToReferrer: newvalue
      })
    }

  
 render(){
  let content;
 
    if(this.state.redirectToReferrer===true&&this.state.provider==='puskesmases'){
      content =  
      <div className="flexible-content">
          <TopNavigation onLogout = {(value)=> this.handleLogoutChange(value)} />
          <SideNavPuskesmas nama={this.state.nama}/>
          <main id="content" className="p-5">
            <RoutesPuskesmas
            idpuskes={this.state.id_pengguna}
            />
          </main>
        </div>
  
    }else if(this.state.redirectToReferrer===true&&this.state.provider==='admins'){
      content =   <div className="flexible-content">
      <TopNavigation onLogout = {(value)=> this.handleLogoutChange(value)} />
      <SideNavAdmin nama={this.state.nama} />
      <main id="content" className="p-5">
        <RoutesAdmin
        />
      </main>
    </div>
    }else if(this.state.redirectToReferrer===true&&this.state.provider==='penulises'){
      content =  <div className="flexible-content">
      <TopNavigation onLogout = {(value)=> this.handleLogoutChange(value)}/>
      <SideNavPenulis nama={this.state.nama} />
      <main id="content" className="p-5">
        <RoutesPenulis
        id_pengguna={this.state.id_pengguna}
        />
      </main>
    </div>
    }
    else if(this.state.loading===true){
      content = <div>loading page....</div>
    }else{
      content =  
    <div className="flexible-content">
      <div className="kotak_login">
        <form method="post" onSubmit ={(e) => this.handleSubmitLogin(e)} >
        <a href="#!" className="logo-wrapper waves-effect">
          <img alt="WAWI React Logo" className="img-fluid" src={logo}/></a>
          <label>Email</label>
          <TextField
          type="text" 
          name="email" 
          className="form_login" 
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={this.handleChangeAdd}/>
  
          <label>Password</label>
          <TextField
          type="password" 
          name="pass" 
          className="form_login" 
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={this.handleChangeAdd}/>
  
            <NativeSelect
                      value={this.state.provider}
                      onChange={this.handleChangeAdd}
                      variant="outlined"
                      fullWidth
                      input={<Input name="provider" value={this.state.provider} id="age-native-helper" />}
                    >
                      <option value="">- Pilih Peran -</option>
                      <option value="puskesmases">Puskesmas</option>
                      <option value="admins">Admin Monik</option>
                      <option value="penulises">Penulis</option>
                      
                    </NativeSelect>
                    &emsp; &emsp; &emsp;
  
          <Button type="submit" className="tombol_login" color="grey">LOGIN</Button>
  
          <br/>
          <br/>
          <br/>
          <br/>
        </form>
    </div>  
  </div>
    }

  


  


    return (
      <div>
        {content}
      </div>
    )
  }
}

export default Login;