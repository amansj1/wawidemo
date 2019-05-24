import React from 'react';
import logo from "../assets/Logo.jpg";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

const TopNavigation = () => {
    return (
        <div className="sidebar-fixed position-fixed">
            <a href="#!" className="logo-wrapper waves-effect">
                <img alt="WAWI React Logo" className="img-fluid" src={logo}/>
                <h4><strong>[Nama Puskesmas]</strong></h4>
            </a>
            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/" activeClassName="activeClass">
                    <MDBListGroupItem>
                     <MDBIcon icon="fas fa-user-friends" className="mr-3"/> 
                        Antrian 
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/monik" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="fas fa-ambulance" className="mr-3"/>
                        Admin Monik
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/artikel" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="far fa-newspaper" className="mr-3"/>
                        Admin Artikel
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/maps" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="fas fa-capsules" className="mr-3"/>
                        Admin Apotik
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/404" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="exclamation" className="mr-3"/>
                        404
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </div>
    );
}

export default TopNavigation;