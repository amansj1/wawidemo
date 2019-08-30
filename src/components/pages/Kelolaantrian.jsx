import React from 'react';
import axios from 'axios';
import MTable from 'material-table';
import NativeSelect from '@material-ui/core/NativeSelect';
import { OutlinedInput } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import './Kelolaantrian.css';
import { Button} from 'reactstrap';
import Swal from 'sweetalert2';


export default class Kelolaantrian extends React.Component{
constructor(props){
    super(props);
    this.state ={
        rowklik:false,
        loading:'',
        puskesmasid:'',
        poliid:'',
        dokterid:'',
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
          datadokter:[],
          datapoli:[],
    }
}
fetchdata = () =>{

    const url ='https://zav-wawi.herokuapp.com/api/antrian/puskesmasid=';
    axios.get(url + this.props.ipus + '&&poliid=' + this.state.poliid + '&&dokterid=' + this.state.dokterid + '&&all=true' )
    .then(response => {
      this.setState({
        data: response.data.data,
        loading: false
      });
      // console.log(response);
    })
    .catch(error => {
      console.log(error.response);
    });


    const url1 ='https://zav-wawi.herokuapp.com/api/antrian/hasconfirm/puskesmasid=';
    axios.get(url1 + this.props.ipus + '&&poliid=' + this.state.poliid + '&&dokterid=' + this.state.dokterid )
    .then(response => {
      this.setState({
        datacon: response.data.data,
        loading: false
      });
      
      // console.log(response);
    })
    .catch(error => {
      console.log(error.response);
    });


    const url2 ='https://zav-wawi.herokuapp.com/api/antrian/hasprocess/puskesmasid=';
    axios.get(url2 + this.props.ipus + '&&poliid=' + this.state.poliid + '&&dokterid=' + this.state.dokterid )
    .then(response => {
      this.setState({
        datapro: response.data.data,
        loading: false
        
      });
      Swal.fire(
        'Connected!',
        'Loading Selesai',
        'success'
      )
      // console.log(response);
    })
    .catch(error => {
      console.log(error.response);
    });


this.getdatadokter();

    
  }

  getdatadokter = ()=>{
    const url ='https://zav-wawi.herokuapp.com/api/dokter/bypuskesmasid=';
    axios.get(url + this.props.ipus)
    .then(response => {
      this.setState({
        datadokter: response.data.data,
      });
      // console.log(response.data.data);
    })
    .catch(error => {
      console.log(error.response);
    });

    const url1 ='https://zav-wawi.herokuapp.com/api/poli/all';
    axios.get(url1)
    .then(response => {
      this.setState({
        datapoli: response.data.data,
      });
      // console.log(response.data.data);
    })
    .catch(error => {
      console.log(error.response);
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
      Swal.showLoading();

      const url4 ='https://zav-wawi.herokuapp.com/api/antrian/confirm/antrianid=';
      axios.get(url4 + this.state.id_antrian )
      .then(response => {
        this.fetchdata();
        this.setState({
          loading: false
        });
        Swal.fire(
          'Connected!',
          'Loading Selesai',
          'success'
        )
        
        // console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      });
      
  }

  rowClik1 = (e,rowData) => {
    e.preventDefault();
    this.setState({
      loading : true,
      id_antrian : rowData.id_mst_antrian });
      Swal.showLoading();

      const url5 ='https://zav-wawi.herokuapp.com/api/antrian/processed/antrianid=';
      axios.get(url5 + this.state.id_antrian )
      .then(response => {
        this.fetchdata();
        this.setState({
          loading: false
        });
        Swal.fire(
          'Connected!',
          'Loading Selesai',
          'success'
        )
        
        // console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      });
      
  }

  cek =(e) =>{
    e.preventDefault();
    Swal.showLoading();
    this.setState({
        loading:true
    })
    Swal.showLoading();
    this.fetchdata();
    
  }



    render(){
      let nuk;
      if(this.state.poliid>0&&this.state.dokterid>0){
        nuk = <Button type="submit" color="grey" onClick={this.cek} >Cek Antrian</Button>
      }else{
        nuk = <Button type="submit" color="grey" onClick={this.cek} >Cek Antrian</Button>
      }

      let dokter = this.state.datadokter.map(function(item, i){
        return <option key={i} value={item.id}>{item.name}</option>;
      });
      let poli = this.state.datapoli.map(function(item, i){
        return <option key={i} value={item.id_mst_jenis_poli}>{item.nama_poli}</option>;
      });

        let content;
        if (this.state.loading) {
            content = Swal.showLoading();
        } else if(this.state.loading===false) { 
            content =  
            <div>
            <MTable       
            title="Antrian Pasien (Belum Datang)"
            columns={this.state.columns}
            data={this.state.data}
            onRowClick={this.rowClik}
            />
            <br/>
            <div className="row">
                <div className="col-md-6">
                    <MTable 
                    title="Antrian Pasien (Sudah Datang)"
                    columns={this.state.columnscon}
                    data={this.state.datacon}
                    onRowClick={this.rowClik1}
                    />
                </div>
                <div className="col-md-6">
                <MTable 
                    title="Antrian Pasien (Sudah Antri)"
                    columns={this.state.columnspro}
                    data={this.state.datapro}
                    />
                </div>
            </div>
            </div>
        } else{
          content = <div/>
        }

        
        return(
            <div>
                <Paper className="paper">
                    <br/>
                    <div className="isi">
                 
                    <div className="row">
                        
                       
                        <div className="col-md-3">
                            
                            <NativeSelect id="select"
                                value={this.state.poliid}
                                onChange={this.handleChangeAdd}
                                input={<OutlinedInput name="poliid" value={this.state.poliid} fullWidth id="outlined-age-simple"  />}
                            >
                                <option>- Pilih Poli -</option>
                               {poli}
                            </NativeSelect>
                        </div>
                        <div className="col-md-3">
                            
                            <NativeSelect id="select"
                                value={this.state.dokterid}
                                onChange={this.handleChangeAdd}
                                input={<OutlinedInput name="dokterid" value={this.state.dokterid} fullWidth id="outlined-age-simple"  />}
                            >
                                <option>- Pilih Dokter -</option>
                                {dokter}
                            </NativeSelect>
                        </div>
                        {nuk}
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