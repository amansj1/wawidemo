import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem} from 'mdbreact';
import { NavLink } from 'react-router-dom';
import './topNavigation.css';

class TopNavigation extends Component {
    constructor( props ){
		super( props );
		this.state =  ({
        collapse: false,
        login:false
    })
}

    onClick = () => {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    
    onLogout =() =>{
        this.props.onLogout(this.state.login);
        
    }

    render() {
        return (
            <MDBNavbar className="flexible-navbar" expand="md" scrolling>
                <MDBNavbarBrand href="/">
                  
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick = { this.onClick } />
                <MDBCollapse isOpen = { this.state.collapse } navbar>
                    
                    <MDBNavbarNav right>
                        <MDBNavItem onClick={this.onLogout}>
                        <NavLink exact={true} to="/" activeClassName="activeClass">
                            <p className="rounded mr-1 nav-link Ripple-parent" rel="noopener noreferrer"  target="_blank"><i className="fas fa-power-off"></i>Logout</p>
                        </NavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }
}

export default TopNavigation;