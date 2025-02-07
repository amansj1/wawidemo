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
                <h3 className="judul1">Admin<b>Monik</b></h3>
                <br/>
                <p className="sub">Selamat Datang, <br/> <b>{props.nama}</b></p>
                </div>
            </a>
            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/monik" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="fas fa-ambulance" className="mr-3"/>
                        Admin Monik
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/jadwalmonik" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="fas fa-map-marked-alt" className="mr-3"/>
                        Tambah Jadwal Monik
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/pasienmonik" activeClassName="activeClass">
                    <MDBListGroupItem>
                    <MDBIcon icon="far fa-address-card" className="mr-3"/>
                        Pendaftaran Pasien
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/inputdiagnosadanobat" activeClassName="activeClass">
                    <MDBListGroupItem>
                    <MDBIcon icon="fas fa-comment-medical" className="mr-3"/>
                        Input Diagnosa dan Obat
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </div>
    );
}

export default sideNavAdmin;