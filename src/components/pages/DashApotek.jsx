import React from 'react';
import {Link} from "react-router-dom";
import './DashApotek.css';


export default class DashApotek extends React.Component{
    render(){
        return(
            <div className="grid">
            <figure className="effect-ruby">
				<img src="https://3a09223b3cd53870eeaa-7f75e5eb51943043279413a54aaa858a.ssl.cf3.rackcdn.com/7d5bb860ceb361002c4e049986d69532fa272c0f-1562933491-5d2878f3-960x640.jpg" alt="img13"/>
				<figcaption>
					<h2>Input <span>Obat</span></h2>
					<p>Menambahkan data obat kedalam administrasi apotek.</p>
					<Link to="/inputobat"></Link>
				</figcaption>			
			</figure>
            <figure className="effect-ruby">
				<img src="https://flameanalytics.com/wp-content/uploads/2017/06/Que-es-gestion-de-colas.jpg" alt="img13"/>
				<figcaption>
					<h2>Kelola <span>Antrian</span></h2>
					<p>Mengelola antrian pengambilan obat di Apotek.</p>
					<Link to="/apotekantri"></Link>
				</figcaption>			
			</figure>
            </div>
        )
    }
}