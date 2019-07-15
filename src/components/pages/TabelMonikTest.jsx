import React from 'react';
import axios from 'axios';
import MTable, {MTableToolbar} from 'material-table';
import Chip from '@material-ui/core/Chip';
import Maps from './Maps';

export default class TabelMonikTest  extends React.Component{
    constructor(props){
        super(props);
        this.state ={
          //variable untuk diisi
          id : '',
          idmonik:'',
          mulai:'',
          selesai:'',
          kegiatan:'',
          tgl:'',
          long: 0,
          lat: 0,
    
          //property table untuk disi pake API
          columns: [
            {title:'Id', field:'id_jadwal_monik'},
            {title:'Id Monik', field:'id_mst_monik'},
            {title:'Mulai', field:'jam_mulai_monik'},
            {title:'Selesai', field:'jam_selesai_monik'},
            {title:'Kegiatan', field:'kegiatan'},
            {title:'Tanggal Kegiatan', field:'tgl_kegiatan'},
          ],
          data:[],
    
          //manage tampilan
          loading : true,
          modaladd:false,
          modalup:false,
        };
        // this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
        this.toggleU = this.toggleU.bind(this);
        // this.toggle = this.toggle.bind(this);
        this.resetstate =  this.resetstate.bind(this);
      }

// ambil data ke API (GET DATA)
fetchdata = () =>{
  const url ='https://zav-wawi.herokuapp.com/api/jadwal_monik/all';
  axios.get(url)
  .then(response => {
    this.setState({
      data: response.data.data,
      loading: false
    });
    console.log(response.data.data);
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

//reset state
resetstate = () =>{
  this.setState({
    id : '',
    idmonik:'',
    mulai:'',
    selesai:'',
    kegiatan:'',
    tgl:'',
    long:'',
    lat:'',
  })
  }

  toggleU() {
    this.setState({
      modalup: true
    });
    // this.setState(prevState => ({
    //   modalup: !prevState.modalup    
    // }));
  }

  rowClik = (e,rowData) => {
    e.preventDefault();
    this.setState({
      id : rowData.id_jadwal_monik,
      idmonik: rowData.id_mst_monik,
      mulai:rowData.jam_mulai_monik,
      selesai:rowData.jam_selesai_monik,
      kegiatan : rowData.kegiatan,
      tgl: rowData.tgl_kegiatan,
      long: parseFloat(rowData.long_monik),
      lat: parseFloat(rowData.lat_monik),
    });
    this.toggleU();
  //isi data state nya pake roeData.var
    
  }


    render(){
    
  let content;
  if (this.state.loading) {
    content = <div>Loading...</div>;
  } else { 

  if(this.state.modalup){
    content =
    <div>

<pre> debug long : {this.state.long}</pre>
              <pre> debug lat : {this.state.lat}</pre>
    <Maps
    google={this.props.google}
    center={{lat: this.state.lat, lng: this.state.long}}
    height='300px'
    zoom={15}
    onLatChange ={(value)=> this.handleLatChange(value)}
    onLngChange ={(value)=> this.handleLngChange(value)}
     /> <br/><br/>



    <MTable 
    title="Jadwal Monik"
    columns={this.state.columns}
    data={this.state.data}
    onRowClick={this.rowClik}
    components={{
      Toolbar: props => (
        <div>
          <MTableToolbar {...props} />
          <div style={{padding: '0px 10px'}}>
            <Chip label="+ Tambah Jadwal" onClick={this.toggle}  style={{marginLeft: 5}}/>
          </div>
        </div>
      ),
    }}
    />
  </div>
  }else{
    content =  <MTable 
    title="Jadwal Monik"
    columns={this.state.columns}
    data={this.state.data}
    onRowClick={this.rowClik}
    components={{
      Toolbar: props => (
        <div>
          <MTableToolbar {...props} />
          <div style={{padding: '0px 10px'}}>
            <Chip label="+ Tambah Jadwal" onClick={this.toggle}  style={{marginLeft: 5}}/>
          </div>
        </div>
      ),
    }}
    />

  }}



  
        
        return(
          <div>
             {content}
          </div>
           
        )
    }
}