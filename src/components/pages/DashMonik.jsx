import React from 'react';
import {Link} from "react-router-dom";
import './DashMonik.css';


export default class DashMonik extends React.Component{
    
    
    render(){
        return (
            <div className="grid">
            <figure className="effect-ruby">
				<img src="https://image.freepik.com/foto-gratis/formulario-solicitud-llenado-aplicando-concepto_53876-34113.jpg" alt="img13"/>
				<figcaption>
					<h2>Pendaftaran <span>Pasien</span></h2>
					<p>Menambahkan data pasien pengujung Monik.</p>
					<Link to="/pasienmonik"></Link>
				</figcaption>			
			</figure>
            <figure className="effect-ruby">
				<img src="https://blog.hubspot.com/hs-fs/hub/53/file-357064447-jpg/map-location.jpg" alt="img13"/>
				<figcaption>
					<h2>Tambah <span>Jadwal</span></h2>
					<p>Menambahkan jadwal kegiatan monik.</p>
					<Link to="/jadwalmonik"></Link>
				</figcaption>			
			</figure>
			<figure className="effect-ruby">
				<img src="https://cdn2.tstatic.net/manado/foto/bank/images/ilustrasi-stetoskop_20180207_160250.jpg" alt="img13"/>
				<figcaption>
					<h2>Input <span>Diagnosa + Obat</span></h2>
					<p>Menambahkan Diagnosa dan Obat pasien dalam kegiatan monik.</p>
					<Link to="/inputdiagnosadanobat"></Link>
				</figcaption>			
			</figure>
            </div>
        )
    }
}