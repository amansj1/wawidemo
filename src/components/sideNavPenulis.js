import React from 'react';
import logo from "../assets/Logo.jpg";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import './sideNavigation.css';

const SideNavPenulis = (props) => {
    return (
        <div className="sidebar-fixed position-fixed">
             <a href="#!" className="logo-wrapper waves-effect">
                <img alt="WAWI React Logo" className="img-fluid" src={logo}/>

                <div className="page">
                <h3 className="judul1">Admin<b>Artikel</b></h3>
                <br/>
                <p className="sub">Selamat Datang, <br/> <b>{props.nama}</b></p>
                </div>
            </a>
            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/artikel" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="far fa-newspaper" className="mr-3"/>
                        Admin Artikel
                    </MDBListGroupItem>
                </NavLink>
              
            </MDBListGroup>
        </div>
    );
}

export default SideNavPenulis;