import React from 'react';
import logo from "../assets/Logo.jpg";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import './sideNavigation.css';

const sideNavAdmin = (props) => {
    return (
        <div className="sidebar-fixed position-fixed">
             <a href="#!" className="logo-wrapper waves-effect">
                <img alt="WAWI React Logo" className="img-fluid" src={logo}/>

                <div className="page">
                <h3 className="judul1">Admin<b>Apotek</b></h3>
                <br/>
                <p className="sub">Selamat Datang, <br/> <b>{props.nama}</b></p>
                </div>
            </a>
            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/apotek" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="fas fa-comment-medical" className="mr-3"/>
                        Admin Apotek
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/inputobat" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="fas fa-capsules" className="mr-3"/>
                        Input Obat
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/apotekantri" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="fas fa-user-friends" className="mr-3"/>
                        Kelola Antrian
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </div>
    );
}

export default sideNavAdmin;