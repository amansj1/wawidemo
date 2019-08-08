import React from 'react';
import logo from "../assets/Logo.jpg";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

const sideNavAdmin = (props) => {
    return (
        <div className="sidebar-fixed position-fixed">
            <a href="#!" className="logo-wrapper waves-effect">
                <img alt="WAWI React Logo" className="img-fluid" src={logo}/>
                <h5>Selamat Datang, </h5><b>{props.nama}</b>
            </a>
            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/apotek" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="fas fa-capsules" className="mr-3"/>
                        Admin Apotek
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </div>
    );
}

export default sideNavAdmin;