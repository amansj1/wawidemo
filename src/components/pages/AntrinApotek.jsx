import React from 'react';
import axios from 'axios';
import MTable from 'material-table';
import NativeSelect from '@material-ui/core/NativeSelect';
import { OutlinedInput } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import './Kelolaantrian.css';
import { Button} from 'reactstrap';

export default class AntrinApotek extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            rowKlik:false,

            colAntrian:[
            {title:'Id Antrian Apotek', field:'id_mst_antrian_apotek'},
            {title:'Id Resep Obat', field:'fk_mst_resep_obat'},
            {title:'Status', field:'status'}
            ],
            dataAntrian:[],

            colSelesai:[
            {title:'Id Antrian Apotek', field:'id_mst_antrian_apotek'},
            {title:'Id Resep Obat', field:'fk_mst_resep_obat'},
            {title:'Status', field:'status'}
            ],
            dataSelesai:[],

            idAntrianApotek:'',
            idApotek:1
        }
    }
    fetchdata = () =>{

        const url ='https://zav-wawi.herokuapp.com/api/antrian_apotek/hasprocessed/apotekid=';
        axios.get(url + this.state.idApotek)
        .then(response => {
          this.setState({
            dataAntrian: response.data.data,
            loading: false
          });
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    
    
        const url1 ='https://zav-wawi.herokuapp.com/api/antrian_apotek/haspicked/apotekid=';
        axios.get(url1 + this.state.idApotek)
        .then(response => {
          this.setState({
            dataSelesai: response.data.data,
            loading: false
          });
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }

    componentDidMount(){
        this.fetchdata();
        this._interval = window.setInterval(this.fetchdata(), 10000);
     
     
     }
     componentWillUnmount() {
       this._interval && window.clearInterval(this._interval);
     }

    render(){
        let content;
        if(this.state.loading){
            content=<div>Loading data..</div>
        }else{
            content=
            <div className="row">
            <div className="col-md-6">
                <MTable 
                title="Antrian Resep (Proses Antri)"
                columns={this.state.colAntrian}
                data={this.state.dataAntrian}
                onRowClick={this.rowClik1}
                />
            </div>
            <div className="col-md-6">
            <MTable 
                title="Antrian Resep (Sudah Diproses)"
                columns={this.state.colSelesai}
                data={this.state.dataSelesai}
                />
            </div>
        </div>

        }
        return(
        <div>{content}</div>
        )
    }
}