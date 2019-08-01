import React from 'react';
import axios from 'axios';
import MTable from 'material-table';
import NativeSelect from '@material-ui/core/NativeSelect';
import { OutlinedInput } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import './Kelolaantrian.css';
import { Button} from 'reactstrap';



export default class Kelolaantrian extends React.Component{
constructor(props){
    super(props);
    this.state ={
        rowklik:false,
        loading:true,
        puskesmasid:3,
        poliid:4,
        dokterid:5,
        id_antrian:'',
        columns: [
            {title:'Id Antrian', field:'id_mst_antrian'},
            {title:'Nama Pasien', field:'mst_pasien.name'},
            {title:'Jenis Kelamin', field:'mst_pasien.gender'},
            {title:'Tanggal Lahir', field:'mst_pasien.tgl_lahir'},
            {title:'Spesialis / Poli', field:'mst_jenis_poli.nama_poli'},
            {title:'Dokter', field:'mst_dokter.name'},
            
          ],
          data:[],
          columnscon :[
            {title:'Id Antrian', field:'id_mst_antrian'},
            {title:'Nama Pasien', field:'mst_pasien.name'},
            {title:'Jenis Kelamin', field:'mst_pasien.gender'},
            
          ],
          columnspro :[
            {title:'Id Antrian', field:'id_mst_antrian'},
            {title:'Nama Pasien', field:'mst_pasien.name'},
            {title:'Jenis Kelamin', field:'mst_pasien.gender'},
            
          ],
          datacon:[],
          datapro:[],
    }
}
fetchdata = () =>{

    const url ='https://zav-wawi.herokuapp.com/api/antrian/puskesmasid=';
    axios.get(url + this.state.puskesmasid + '&&poliid=' + this.state.poliid + '&&dokterid=' + this.state.dokterid + '&&all=true' )
    .then(response => {
      this.setState({
        data: response.data.data,
        loading: false
      });
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });


    const url1 ='https://zav-wawi.herokuapp.com/api/antrian/hasconfirm/puskesmasid=';
    axios.get(url1 + this.state.puskesmasid + '&&poliid=' + this.state.poliid + '&&dokterid=' + this.state.dokterid )
    .then(response => {
      this.setState({
        datacon: response.data.data,
        loading: false
      });
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });


    const url2 ='https://zav-wawi.herokuapp.com/api/antrian/hasprocess/puskesmasid=';
    axios.get(url2 + this.state.puskesmasid + '&&poliid=' + this.state.poliid + '&&dokterid=' + this.state.dokterid )
    .then(response => {
      this.setState({
        datapro: response.data.data,
        loading: false
      });
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });




    
  }
  componentDidMount(){
      return this.fetchdata();
  }
  
  handleChangeAdd = event =>{
    this.setState({
      [event.target.name]: event.target.value
  })
  }

  rowClik = (e,rowData) => {
    e.preventDefault();
    this.setState({
      loading : true,
      id_antrian : rowData.id_mst_antrian });

      const url4 ='https://zav-wawi.herokuapp.com/api/antrian/confirm/antrianid=';
      axios.get(url4 + this.state.id_antrian )
      .then(response => {
        this.setState({
          loading: false
        });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
      this.fetchdata();
  }

  rowClik1 = (e,rowData) => {
    e.preventDefault();
    this.setState({
      loading : true,
      id_antrian : rowData.id_mst_antrian });

      const url5 ='https://zav-wawi.herokuapp.com/api/antrian/processed/antrianid=';
      axios.get(url5 + this.state.id_antrian )
      .then(response => {
        this.setState({
          loading: false
        });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
      this.fetchdata();
  }

  cek =(e) =>{
    e.preventDefault();
    this.setState({
        loading:true
    })
    this.fetchdata();
    
  }



    render(){
        let content;
        if (this.state.loading) {
            content = <div>Loading...</div>;
        } else { 
            content =  
            <div>
            <MTable 
            title="Antrian Pasien"
            columns={this.state.columns}
            data={this.state.data}
            onRowClick={this.rowClik}
            />
            <br/>
            <div className="row">
                <div className="col-md-6">
                    <MTable 
                    title="Antrian Pasien (Sudah Konfirmasi Datang)"
                    columns={this.state.columnscon}
                    data={this.state.datacon}
                    onRowClick={this.rowClik1}
                    />
                </div>
                <div className="col-md-6">
                <MTable 
                    title="Antrian Pasien (Sudah Diproses)"
                    columns={this.state.columnspro}
                    data={this.state.datapro}
                    />
                </div>
            </div>
            </div>
        }
        return(
            <div>
                <Paper className="paper">
                    <br/>
                    <div className="isi">
                    <h5>Input Terlebih dahulu</h5>
                    <div className="row">
                        
                        <div className="col-md-3">
                            
                            <NativeSelect id="select"
                                value={this.state.puskesmasid}
                                onChange={this.handleChangeAdd}
                                input={<OutlinedInput name="puskesmasid" value={this.state.puskesmasid} fullWidth id="outlined-age-simple"  />}
                            >
                                <option>- Pilih Puskesmas -</option>
                                <option value={1}>Puskesmas Kenes</option>
                                <option value={2}>Puskesmas Kayun</option>
                                <option value={3}>Puskesmas Argono</option>
                                <option value={4}>Puskesmas Tirta</option>
                                <option value={5}>Puskesmas Endra</option>
                                <option value={6}>Puskesmas Irsad</option>
                                <option value={7}>Puskesmas Wasis</option>
                                <option value={8}>Puskesmas Ivan</option>
                                <option value={9}>Puskesmas Balapati</option>
                                <option value={10}>Puskesmas Edison</option>
                                <option value={12}>Puskesmas Update</option>
                                <option value={13}>Puskesmas Kayun</option>
                            </NativeSelect>
                        </div>
                        <div className="col-md-3">
                            
                            <NativeSelect id="select"
                                value={this.state.poliid}
                                onChange={this.handleChangeAdd}
                                input={<OutlinedInput name="poliid" value={this.state.poliid} fullWidth id="outlined-age-simple"  />}
                            >
                                <option>- Pilih Poli -</option>
                                <option value={1}>Poli -1</option>
                                <option value={2}>Poli -2</option>
                                <option value={3}>Poli -3</option>
                                <option value={4}>Poli -4</option>
                                <option value={5}>Poli -5</option>
                                <option value={6}>Poli -6</option>
                                <option value={7}>Poli -7</option>
                                <option value={8}>Poli -8</option>
                                <option value={9}>Poli -9</option>
                                <option value={10}>Poli -10</option>
                            </NativeSelect>
                        </div>
                        <div className="col-md-3">
                            
                            <NativeSelect id="select"
                                value={this.state.dokterid}
                                onChange={this.handleChangeAdd}
                                input={<OutlinedInput name="dokterid" value={this.state.dokterid} fullWidth id="outlined-age-simple"  />}
                            >
                                <option>- Id Dokter -</option>
                                <option value={1}>Dokter -1</option>
                                <option value={2}>Dokter -2</option>
                                <option value={3}>Dokter -3</option>
                                <option value={4}>Dokter -4</option>
                                <option value={5}>Dokter -5</option>
                                <option value={6}>Dokter -6</option>
                                <option value={7}>Dokter -7</option>
                                <option value={8}>Dokter -8</option>
                                <option value={9}>Dokter -9</option>
                                <option value={10}>Dokter -10</option>
                            </NativeSelect>
                        </div>
                        <Button type="submit" color="grey" onClick={this.cek} >Cek Antrian</Button>
                    </div>
                    </div>
                    <br/>
                </Paper>
                <br/>
                {content}
            </div>
        )
    }

}