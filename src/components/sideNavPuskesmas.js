import React from 'react';
import logo from "../assets/Logo.jpg";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import './sideNavigation.css';

const SideNavPuskesmas= (props) => {
    return (
        <div className="sidebar-fixed position-fixed">
             <a href="#!" className="logo-wrapper waves-effect">
                <img alt="WAWI React Logo" className="img-fluid" src={logo}/>

                <div className="page">
                <h3 className="judul1">Admin<b>Puskesmas</b></h3>
                <br/>
                <p className="sub">Selamat Datang, <br/> <b>{props.nama}</b></p>
                </div>
            </a>
            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/kelolaAntrian" activeClassName="activeClass">
                    <MDBListGroupItem>
                     <MDBIcon icon="fas fa-user-friends" className="mr-3"/> 
                        Antrian 
                    </MDBListGroupItem>
                </NavLink>              
            </MDBListGroup>
        </div>
    );
}

export default SideNavPuskesmas;