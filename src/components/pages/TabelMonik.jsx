import React from 'react';
import axios from 'axios';
import MTable, {MTableToolbar} from 'material-table';
import Chip from '@material-ui/core/Chip';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Maps from './Maps';





export default class TabelArtikel extends React.Component{
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
      long:'',
      lat:'',

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
    this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
    this.toggleU = this.toggleU.bind(this);
    this.toggle = this.toggle.bind(this);
    this.resetstate =  this.resetstate.bind(this);
  }

//ketika submit dari form artikel (POST DATA)
handleSubmitAdd (e){
  e.preventDefault();
  const apiurl = 'https://zav-wawi.herokuapp.com/api/jadwal_monik/create'
  const add ={
    id_mst_monik : this.state.idmonik,
    lat_monik : this.state.lat,
    long_monik : this.state.long,
    jam_mulai_monik : this.state.mulai,
    jam_selesai_monik : this.state.selesai,
    kegiatan : this.state.kegiatan,
    tgl_kegiatan : this.state.tgl
    
  };
  axios.post(apiurl, add)
  .then(res => {
    this.fetchdata();
    console.log(res.data);
  })
  this.resetstate();
  this.toggle();
}

//ketika submit dari form artikel (PUT DATA)
handleSubmitPut (e){
  e.preventDefault();
  const id = this.state.id
  const apiurl = 'https://zav-wawi.herokuapp.com/api/jadwal_monik/update/jadwalmonikid='
  console.log(apiurl + id);
  debugger
  const put ={
    id_mst_monik : this.state.idmonik,
    lat_monik : this.state.lat,
    long_monik : this.state.long,
    jam_mulai_monik : this.state.mulai,
    jam_selesai_monik : this.state.selesai,
    kegiatan : this.state.kegiatan,
    tgl_kegiatan : this.state.tgl 
  };
  axios.put(apiurl + id, put)
  .then(res => {
    this.fetchdata();
    console.log(res.data);
  })
  this.resetstate();
  this.toggleU();
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





// kumpulan handle onclik/onchange

//reset state
resetstate(){
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
// untuk buka modal add
toggle() {
    this.setState(prevState => ({
      modaladd: !prevState.modaladd    
    }));
};

toggleU() {
  this.setState(prevState => ({
    modalup: !prevState.modalup    
  }));
}
  //untuk form add masukin value ke state
  handleChangeAdd = event =>{
    this.setState({
      [event.target.name]: event.target.value
  })
  };
handleDel = event =>{
  event.preventDefault();
  axios.delete(`https://zav-wawi.herokuapp.com/api/jadwal_monik/delete/jadwalmonikid=${this.state.id}`)
  .then(res => {
    console.log(res);
    console.log(res.data);
  })

}

handleLatChange = (value)=>{
  this.setState({
    lat : value
  })
 
}
handleLngChange = (newvalue)=>{
  this.setState({
    long : newvalue
  })
}


//handle yang ambil data dari table
rowClik = (e,rowData) => {
  e.preventDefault();
  this.setState({
    id : rowData.id_jadwal_monik,
    idmonik: rowData.id_mst_monik,
    mulai:rowData.jam_mulai_monik,
    selesai:rowData.jam_selesai_monik,
    kegiatan : rowData.kegiatan,
    tgl: rowData.tgl_kegiatan,
    long: rowData.long_monik,
    lat: rowData.lat_monik,
  });
  this.toggleU();
//isi data state nya pake roeData.var
  console.log('ini id');
  
}


render () {
//content
  let content;
  if (this.state.loading) {
    content = <div>Loading...</div>;
  } else { 
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

  }

  return (
    <div>
      {content}
      {/* modal untuk add form */}
      <Modal isOpen={this.state.modaladd} toggle={this.toggle} className="modal-lg">
          <ModalHeader toggle={this.toggle}><b>Tambah Jadwal Monik</b></ModalHeader>
          <form method="post" onSubmit ={(e) => this.handleSubmitAdd(e)}  >
          <ModalBody>
  
          
          <Maps
            google={this.props.google}
            center={{lat: -7.790073587756385, lng: 110.36041300469356}}
            height='300px'
            zoom={15}
            onLatChange ={(value)=> this.handleLatChange(value)}
            onLngChange ={(value)=> this.handleLngChange(value)}
             /> <br/><br/>
            <div>
              <pre> debug long : {this.state.long}</pre>
              <pre> debug lat : {this.state.lat}</pre>
              <pre> debug tgl : {this.state.tgl}</pre>
              <pre> debug mulai : {this.state.mulai}</pre>
              <pre> debug selesai : {this.state.selesai}</pre>
              <pre> debug kegiatan : {this.state.kegiatan}</pre>
            
            </div>

            <TextField
              name="kegiatan"
              id="outlined-name"
              label="Kegiatan"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeAdd}
            />
        <br/>
        
              <TextField
              id="date"
              name="tgl"
              label="Tanggal Pelaksanaan"
              type="date"
              defaultValue="2019-05-24"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChangeAdd}
            />
            &emsp; &emsp; &emsp;
            <TextField
              id="time"
              name="mulai"
              label="Waktu Mulai"
              type="time"
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              onChange={this.handleChangeAdd}
            />
            &emsp; &emsp; &emsp;
            <TextField
              id="time"
              label="Waktu Selesai"
              name="selesai"
              type="time"
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              onChange={this.handleChangeAdd}

            />
          <br/>
          <br/>
          <br/>

           
           
          </ModalBody>
          <ModalFooter>
        
            <Button type="submit" color="grey">Submit</Button>
          </ModalFooter>
          </form>
        </Modal>
      



 {/* modal untuk update form */}
 <Modal isOpen={this.state.modalup} toggle={this.toggleU} className="modal-lg">
          <ModalHeader toggle={this.toggleU}><b>Update Artikel {this.state.id}</b></ModalHeader>
          <form method="post" onSubmit ={(e) => this.handleSubmitPut(e)}  >
          <ModalBody>
         
            <TextField
              name="Judul"
              id="outlined-name"
              label="Judul Artikel"
              margin="normal"
              variant="outlined"
              defaultValue=''
              value = {this.state.Judul}
              onChange={this.handleChangeAdd}
            />
        <br/>
            <TextField
              id="outlined-multiline-static"
              label="Isi Artikel"
              name="Isi"
              fullWidth
              multiline
              rows="7"
              defaultValue=''
              margin="normal"
              variant="outlined"
              value = {this.state.Isi}
              onChange={this.handleChangeAdd}
             
            />

            <TextField
              name="Foto"
              id="outlined-name"
              label="Link Foto"
              margin="normal"
              defaultValue=''
              variant="outlined"
              value = {this.state.Foto}
              onChange={this.handleChangeAdd}
            />
           
          </ModalBody>
          <ModalFooter>
            <Button type="button" color="red" onClick={(e) => this.handleDel(e)}>Delete</Button>
            <Button type="submit" color="cyan">Update</Button>
          </ModalFooter>
          </form>
        </Modal>




    </div>
  )
}
}
