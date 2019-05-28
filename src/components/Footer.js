import React from 'react';
import { MDBFooter, MDBIcon} from 'mdbreact';
import './Footer.css';

const Footer = () => {
    return (
        <MDBFooter className="text-center footer">
            
            <p className="footer-copyright mb-0 py-3 text-center">
             &copy; {new Date().getFullYear()} Copyright: <a href="#"> KandangKoding </a>
            </p>
        </MDBFooter>
    );
}

export default Footer;